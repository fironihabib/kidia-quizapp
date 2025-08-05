import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import {
  Text,
  Card,
  Title,
  Paragraph,
  Button,
  FAB,
  Chip,
  IconButton,
  Searchbar,
} from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

import { useApp } from '../context/AppContext';

const TeacherDashboard = ({ navigation }) => {
  const { currentUser, getQuizzesByTeacher, deleteQuiz, getQuizResultsByQuiz } = useApp();
  const [quizzes, setQuizzes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);

  // Load quizzes when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadQuizzes();
    }, [currentUser])
  );

  // Filter quizzes based on search query
  React.useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredQuizzes(quizzes);
    } else {
      const filtered = quizzes.filter(quiz =>
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredQuizzes(filtered);
    }
  }, [searchQuery, quizzes]);

  const loadQuizzes = () => {
    if (currentUser) {
      const teacherQuizzes = getQuizzesByTeacher(currentUser.id);
      setQuizzes(teacherQuizzes);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadQuizzes();
    setRefreshing(false);
  }, []);

  const handleDeleteQuiz = (quizId, quizTitle) => {
    Alert.alert(
      'Quiz Sil',
      `"${quizTitle}" adlı quiz'i silmek istediğinizden emin misiniz?`,
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => {
            deleteQuiz(quizId);
            loadQuizzes();
          },
        },
      ]
    );
  };

  const getQuizStats = (quizId) => {
    const results = getQuizResultsByQuiz(quizId);
    const totalAttempts = results.length;
    const averageScore = totalAttempts > 0 
      ? results.reduce((sum, result) => sum + (result.score / result.totalPoints * 100), 0) / totalAttempts
      : 0;
    
    return {
      attempts: totalAttempts,
      averageScore: Math.round(averageScore),
    };
  };

  const renderQuizCard = ({ item }) => {
    const stats = getQuizStats(item.id);
    
    return (
      <Card style={styles.quizCard}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <View style={styles.titleContainer}>
              <Title style={styles.quizTitle}>{item.title}</Title>
              <Paragraph style={styles.quizDescription}>{item.description}</Paragraph>
            </View>
            <View style={styles.actionButtons}>
              <IconButton
                icon="pencil"
                size={20}
                onPress={() => navigation.navigate('EditQuiz', { quiz: item })}
              />
              <IconButton
                icon="delete"
                size={20}
                onPress={() => handleDeleteQuiz(item.id, item.title)}
              />
            </View>
          </View>

          <View style={styles.quizInfo}>
            <Chip icon="help-circle" style={styles.chip}>
              {item.questions.length} Soru
            </Chip>
            <Chip icon="calendar" style={styles.chip}>
              {item.createdAt}
            </Chip>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.attempts}</Text>
              <Text style={styles.statLabel}>Deneme</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.averageScore}%</Text>
              <Text style={styles.statLabel}>Ort. Başarı</Text>
            </View>
          </View>
        </Card.Content>

        <Card.Actions>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('QuizDetail', { quiz: item })}
          >
            Detaylar
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('EditQuiz', { quiz: item })}
          >
            Düzenle
          </Button>
        </Card.Actions>
      </Card>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Henüz quiz oluşturmadınız</Text>
      <Text style={styles.emptyText}>
        İlk quiz'inizi oluşturmak için aşağıdaki butona tıklayın
      </Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('CreateQuiz')}
        style={styles.emptyButton}
      >
        Quiz Oluştur
      </Button>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Merhaba, {currentUser?.name}!</Title>
        <Paragraph style={styles.headerSubtitle}>Quiz'lerinizi yönetin</Paragraph>
      </View>

      <Searchbar
        placeholder="Quiz ara..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      <FlatList
        data={filteredQuizzes}
        renderItem={renderQuizCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('CreateQuiz')}
        label="Quiz Oluştur"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#6200ee',
    paddingTop: 50,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
  },
  headerSubtitle: {
    color: '#fff',
    opacity: 0.8,
  },
  searchbar: {
    margin: 16,
    elevation: 2,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  quizCard: {
    marginBottom: 16,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  quizDescription: {
    color: '#666',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  quizInfo: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 16,
  },
  chip: {
    marginRight: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#333',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
    lineHeight: 24,
  },
  emptyButton: {
    paddingHorizontal: 24,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200ee',
  },
});

export default TeacherDashboard;
