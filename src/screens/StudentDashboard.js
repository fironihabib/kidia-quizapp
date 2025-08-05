import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import {
  Text,
  Card,
  Title,
  Paragraph,
  Button,
  Chip,
  Searchbar,
  Badge,
} from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

import { useApp } from '../context/AppContext';

const StudentDashboard = ({ navigation }) => {
  const { currentUser, quizzes, getQuizResultsByStudent } = useApp();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [studentResults, setStudentResults] = useState([]);

  // Load data when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [currentUser])
  );

  // Filter quizzes based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredQuizzes(quizzes);
    } else {
      const filtered = quizzes.filter(quiz =>
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.teacherName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredQuizzes(filtered);
    }
  }, [searchQuery, quizzes]);

  const loadData = () => {
    if (currentUser) {
      const results = getQuizResultsByStudent(currentUser.id);
      setStudentResults(results);
      setFilteredQuizzes(quizzes);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadData();
    setRefreshing(false);
  }, []);

  const getQuizResult = (quizId) => {
    return studentResults.find(result => result.quizId === quizId);
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return '#4CAF50'; // Green
    if (percentage >= 60) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };

  const renderQuizCard = ({ item }) => {
    const result = getQuizResult(item.id);
    const hasCompleted = !!result;
    const scorePercentage = hasCompleted 
      ? Math.round((result.score / result.totalPoints) * 100)
      : 0;

    return (
      <Card style={styles.quizCard}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <View style={styles.titleContainer}>
              <Title style={styles.quizTitle}>{item.title}</Title>
              <Paragraph style={styles.quizDescription}>{item.description}</Paragraph>
              <Text style={styles.teacherName}>Öğretmen: {item.teacherName}</Text>
            </View>
            {hasCompleted && (
              <View style={styles.scoreContainer}>
                <Badge 
                  style={[
                    styles.scoreBadge, 
                    { backgroundColor: getScoreColor(scorePercentage) }
                  ]}
                >
                  {scorePercentage}%
                </Badge>
              </View>
            )}
          </View>

          <View style={styles.quizInfo}>
            <Chip icon="help-circle" style={styles.chip}>
              {item.questions.length} Soru
            </Chip>
            <Chip icon="calendar" style={styles.chip}>
              {item.createdAt}
            </Chip>
            {hasCompleted && (
              <Chip 
                icon="check-circle" 
                style={[styles.chip, styles.completedChip]}
              >
                Tamamlandı
              </Chip>
            )}
          </View>

          {hasCompleted && (
            <View style={styles.resultContainer}>
              <View style={styles.resultItem}>
                <Text style={styles.resultNumber}>{result.correctAnswers}</Text>
                <Text style={styles.resultLabel}>Doğru</Text>
              </View>
              <View style={styles.resultItem}>
                <Text style={styles.resultNumber}>{result.totalQuestions - result.correctAnswers}</Text>
                <Text style={styles.resultLabel}>Yanlış</Text>
              </View>
              <View style={styles.resultItem}>
                <Text style={styles.resultNumber}>{result.score}</Text>
                <Text style={styles.resultLabel}>Puan</Text>
              </View>
            </View>
          )}
        </Card.Content>

        <Card.Actions>
          <Button
            mode={hasCompleted ? "outlined" : "contained"}
            onPress={() => navigation.navigate('TakeQuiz', { quiz: item })}
          >
            {hasCompleted ? 'Tekrar Çöz' : 'Quiz\'i Başlat'}
          </Button>
          {hasCompleted && (
            <Button
              mode="text"
              onPress={() => navigation.navigate('QuizResult', { 
                result: result,
                quiz: item 
              })}
            >
              Sonuçları Gör
            </Button>
          )}
        </Card.Actions>
      </Card>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Henüz quiz bulunmuyor</Text>
      <Text style={styles.emptyText}>
        Öğretmenleriniz quiz oluşturduğunda burada görünecek
      </Text>
    </View>
  );

  const getCompletedQuizzesCount = () => {
    return studentResults.length;
  };

  const getAverageScore = () => {
    if (studentResults.length === 0) return 0;
    const totalPercentage = studentResults.reduce((sum, result) => 
      sum + (result.score / result.totalPoints * 100), 0
    );
    return Math.round(totalPercentage / studentResults.length);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Merhaba, {currentUser?.name}!</Title>
        <Paragraph style={styles.headerSubtitle}>Quiz'leri çözün ve öğrenin</Paragraph>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{getCompletedQuizzesCount()}</Text>
            <Text style={styles.statLabel}>Tamamlanan</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{quizzes.length}</Text>
            <Text style={styles.statLabel}>Toplam Quiz</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{getAverageScore()}%</Text>
            <Text style={styles.statLabel}>Ort. Başarı</Text>
          </View>
        </View>
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
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingVertical: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
  },
  searchbar: {
    margin: 16,
    elevation: 2,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 20,
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
    marginBottom: 4,
  },
  teacherName: {
    color: '#888',
    fontSize: 12,
    fontStyle: 'italic',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreBadge: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  quizInfo: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  chip: {
    marginRight: 8,
    marginBottom: 4,
  },
  completedChip: {
    backgroundColor: '#4CAF50',
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  resultItem: {
    alignItems: 'center',
  },
  resultNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  resultLabel: {
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
    lineHeight: 24,
  },
});

export default StudentDashboard;
