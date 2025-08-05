import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  Text,
  Card,
  Title,
  Button,
  Chip,
  Divider,
} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const QuizResultScreen = ({ route, navigation }) => {
  const { result, quiz } = route.params;
  
  const scorePercentage = Math.round((result.score / result.totalPoints) * 100);
  const wrongAnswers = result.totalQuestions - result.correctAnswers;

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return '#4CAF50'; // Green
    if (percentage >= 60) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };

  const getScoreMessage = (percentage) => {
    if (percentage >= 90) return 'Mükemmel! 🎉';
    if (percentage >= 80) return 'Çok İyi! 👏';
    if (percentage >= 70) return 'İyi! 👍';
    if (percentage >= 60) return 'Orta 📚';
    return 'Daha Çok Çalışmalısın 💪';
  };

  const getScoreIcon = (percentage) => {
    if (percentage >= 80) return 'emoji-events';
    if (percentage >= 60) return 'thumb-up';
    return 'school';
  };

  const renderQuestionResult = (question, index) => {
    const userAnswer = result.answers.find(a => a.questionId === question.id);
    const isCorrect = userAnswer?.isCorrect || false;
    const selectedOptionIndex = userAnswer?.selectedAnswer;
    
    return (
      <Card key={question.id} style={styles.questionCard}>
        <Card.Content>
          <View style={styles.questionHeader}>
            <Text style={styles.questionNumber}>Soru {index + 1}</Text>
            <MaterialIcons
              name={isCorrect ? 'check-circle' : 'cancel'}
              size={24}
              color={isCorrect ? '#4CAF50' : '#F44336'}
            />
          </View>
          
          <Text style={styles.questionText}>{question.question}</Text>
          
          <View style={styles.optionsContainer}>
            {question.options.map((option, optionIndex) => {
              const isSelected = selectedOptionIndex === optionIndex;
              const isCorrectOption = question.correctAnswer === optionIndex;
              
              let optionStyle = styles.option;
              let optionTextStyle = styles.optionText;
              
              if (isCorrectOption) {
                optionStyle = [styles.option, styles.correctOption];
                optionTextStyle = [styles.optionText, styles.correctOptionText];
              } else if (isSelected && !isCorrect) {
                optionStyle = [styles.option, styles.wrongOption];
                optionTextStyle = [styles.optionText, styles.wrongOptionText];
              }
              
              return (
                <View key={optionIndex} style={optionStyle}>
                  <View style={styles.optionContent}>
                    <Text style={optionTextStyle}>{option}</Text>
                    {isCorrectOption && (
                      <MaterialIcons name="check" size={20} color="#4CAF50" />
                    )}
                    {isSelected && !isCorrect && (
                      <MaterialIcons name="close" size={20} color="#F44336" />
                    )}
                  </View>
                </View>
              );
            })}
          </View>
          
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsText}>
              {isCorrect ? `+${question.points}` : '0'} / {question.points} puan
            </Text>
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.resultCard}>
        <Card.Content>
          <View style={styles.resultHeader}>
            <MaterialIcons
              name={getScoreIcon(scorePercentage)}
              size={60}
              color={getScoreColor(scorePercentage)}
            />
            <Title style={styles.resultTitle}>{getScoreMessage(scorePercentage)}</Title>
          </View>

          <View style={styles.scoreContainer}>
            <Text style={[styles.scoreText, { color: getScoreColor(scorePercentage) }]}>
              {scorePercentage}%
            </Text>
            <Text style={styles.scoreSubtext}>
              {result.score} / {result.totalPoints} puan
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{result.correctAnswers}</Text>
              <Text style={styles.statLabel}>Doğru</Text>
              <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{wrongAnswers}</Text>
              <Text style={styles.statLabel}>Yanlış</Text>
              <MaterialIcons name="cancel" size={20} color="#F44336" />
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{result.totalQuestions}</Text>
              <Text style={styles.statLabel}>Toplam</Text>
              <MaterialIcons name="quiz" size={20} color="#666" />
            </View>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.quizInfoContainer}>
        <Title style={styles.sectionTitle}>Quiz Bilgileri</Title>
        <Card style={styles.infoCard}>
          <Card.Content>
            <Text style={styles.quizTitle}>{quiz.title}</Text>
            <Text style={styles.quizDescription}>{quiz.description}</Text>
            <View style={styles.quizMeta}>
              <Chip icon="account" style={styles.metaChip}>
                {quiz.teacherName}
              </Chip>
              <Chip icon="calendar" style={styles.metaChip}>
                {quiz.createdAt}
              </Chip>
            </View>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.detailsContainer}>
        <Title style={styles.sectionTitle}>Soru Detayları</Title>
        {quiz.questions.map((question, index) => 
          renderQuestionResult(question, index)
        )}
      </View>

      <View style={styles.actionsContainer}>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('TakeQuiz', { quiz })}
          style={styles.actionButton}
        >
          Tekrar Çöz
        </Button>
        
        <Button
          mode="contained"
          onPress={() => navigation.navigate('StudentTabs')}
          style={styles.actionButton}
        >
          Ana Sayfaya Dön
        </Button>
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
  resultCard: {
    elevation: 4,
    marginBottom: 16,
  },
  resultHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 12,
    color: '#333',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  scoreSubtext: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  quizInfoContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 12,
    color: '#333',
  },
  infoCard: {
    elevation: 2,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  quizDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  quizMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metaChip: {
    marginRight: 8,
    marginBottom: 4,
  },
  detailsContainer: {
    marginBottom: 16,
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
  questionText: {
    fontSize: 16,
    marginBottom: 16,
    color: '#333',
    lineHeight: 22,
  },
  optionsContainer: {
    marginBottom: 12,
  },
  option: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  correctOption: {
    backgroundColor: '#E8F5E8',
    borderColor: '#4CAF50',
  },
  wrongOption: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
  },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  correctOptionText: {
    color: '#2E7D32',
    fontWeight: '500',
  },
  wrongOptionText: {
    color: '#C62828',
  },
  pointsContainer: {
    alignItems: 'flex-end',
  },
  pointsText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default QuizResultScreen;
