import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  Text,
  Card,
  Title,
  Button,
  Chip,
  Divider,
  List,
} from 'react-native-paper';

import { useApp } from '../context/AppContext';

const QuizDetailScreen = ({ route, navigation }) => {
  const { quiz } = route.params;
  const { getQuizResultsByQuiz } = useApp();
  
  const results = getQuizResultsByQuiz(quiz.id);
  const totalAttempts = results.length;
  const averageScore = totalAttempts > 0 
    ? Math.round(results.reduce((sum, result) => sum + (result.score / result.totalPoints * 100), 0) / totalAttempts)
    : 0;
  const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);

  const renderQuestion = ({ item, index }) => (
    <Card style={styles.questionCard}>
      <Card.Content>
        <View style={styles.questionHeader}>
          <Text style={styles.questionNumber}>Soru {index + 1}</Text>
          <Chip style={styles.pointsChip}>{item.points} puan</Chip>
        </View>
        
        <Text style={styles.questionText}>{item.question}</Text>
        
        <View style={styles.optionsContainer}>
          {item.options.map((option, optionIndex) => (
            <View 
              key={optionIndex} 
              style={[
                styles.option,
                item.correctAnswer === optionIndex && styles.correctOption
              ]}
            >
              <Text 
                style={[
                  styles.optionText,
                  item.correctAnswer === optionIndex && styles.correctOptionText
                ]}
              >
                {String.fromCharCode(65 + optionIndex)}) {option}
              </Text>
              {item.correctAnswer === optionIndex && (
                <Text style={styles.correctLabel}>✓ Doğru Cevap</Text>
              )}
            </View>
          ))}
        </View>
      </Card.Content>
    </Card>
  );

  const renderResult = ({ item }) => (
    <List.Item
      title={item.studentName}
      description={`${item.correctAnswers}/${quiz.questions.length} doğru • ${Math.round((item.score / item.totalPoints) * 100)}%`}
      left={props => (
        <List.Icon 
          {...props} 
          icon="account-student" 
          color={item.score / item.totalPoints >= 0.8 ? '#4CAF50' : item.score / item.totalPoints >= 0.6 ? '#FF9800' : '#F44336'}
        />
      )}
      right={props => (
        <View style={styles.resultScore}>
          <Text style={[
            styles.scoreText,
            { color: item.score / item.totalPoints >= 0.8 ? '#4CAF50' : item.score / item.totalPoints >= 0.6 ? '#FF9800' : '#F44336' }
          ]}>
            {item.score}/{item.totalPoints}
          </Text>
        </View>
      )}
    />
  );

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.headerCard}>
        <Card.Content>
          <Title style={styles.quizTitle}>{quiz.title}</Title>
          <Text style={styles.quizDescription}>{quiz.description}</Text>
          
          <View style={styles.quizMeta}>
            <Chip icon="calendar" style={styles.metaChip}>
              {quiz.createdAt}
            </Chip>
            <Chip icon="help-circle" style={styles.metaChip}>
              {quiz.questions.length} Soru
            </Chip>
            <Chip icon="star" style={styles.metaChip}>
              {totalPoints} Puan
            </Chip>
          </View>
        </Card.Content>
        
        <Card.Actions>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('EditQuiz', { quiz })}
          >
            Düzenle
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.statsCard}>
        <Card.Content>
          <Title style={styles.sectionTitle}>İstatistikler</Title>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{totalAttempts}</Text>
              <Text style={styles.statLabel}>Toplam Deneme</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{averageScore}%</Text>
              <Text style={styles.statLabel}>Ortalama Başarı</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{quiz.questions.length}</Text>
              <Text style={styles.statLabel}>Soru Sayısı</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {results.length > 0 && (
        <Card style={styles.resultsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Öğrenci Sonuçları</Title>
            <FlatList
              data={results}
              renderItem={renderResult}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <Divider />}
            />
          </Card.Content>
        </Card>
      )}

      <View style={styles.questionsSection}>
        <Title style={styles.sectionTitle}>Sorular</Title>
        <FlatList
          data={quiz.questions}
          renderItem={renderQuestion}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  headerCard: {
    elevation: 4,
    marginBottom: 16,
  },
  quizTitle: {
    fontSize: 24,
    marginBottom: 8,
    color: '#333',
  },
  quizDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    lineHeight: 22,
  },
  quizMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metaChip: {
    marginRight: 8,
    marginBottom: 4,
  },
  statsCard: {
    elevation: 2,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 16,
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  resultsCard: {
    elevation: 2,
    marginBottom: 16,
  },
  resultScore: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '600',
  },
  questionsSection: {
    marginBottom: 20,
  },
  questionCard: {
    marginBottom: 12,
    elevation: 2,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6200ee',
  },
  pointsChip: {
    backgroundColor: '#E3F2FD',
  },
  questionText: {
    fontSize: 16,
    marginBottom: 16,
    color: '#333',
    lineHeight: 22,
  },
  optionsContainer: {
    marginTop: 8,
  },
  option: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  correctOption: {
    backgroundColor: '#E8F5E8',
    borderColor: '#4CAF50',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  correctOptionText: {
    color: '#2E7D32',
    fontWeight: '500',
  },
  correctLabel: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
    marginTop: 4,
  },
});

export default QuizDetailScreen;
