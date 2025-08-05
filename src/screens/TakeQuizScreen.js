import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  BackHandler,
} from 'react-native';
import {
  Text,
  Card,
  Title,
  Button,
  RadioButton,
  ProgressBar,
  Portal,
  Dialog,
} from 'react-native-paper';

import { useApp } from '../context/AppContext';

const TakeQuizScreen = ({ route, navigation }) => {
  const { quiz } = route.params;
  const { submitQuizResult } = useApp();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const progress = (currentQuestionIndex + 1) / totalQuestions;

  // Handle back button press
  useEffect(() => {
    const backAction = () => {
      if (quizStarted) {
        setShowExitDialog(true);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [quizStarted]);

  // Timer effect (optional - can be enabled for timed quizzes)
  useEffect(() => {
    if (timeRemaining !== null && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      handleSubmitQuiz();
    }
  }, [timeRemaining]);

  const startQuiz = () => {
    setQuizStarted(true);
    // Uncomment to enable timer (e.g., 30 seconds per question)
    // setTimeRemaining(totalQuestions * 30);
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex,
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateResults = () => {
    let correctAnswers = 0;
    let totalScore = 0;
    const detailedAnswers = [];

    quiz.questions.forEach((question) => {
      const selectedAnswer = answers[question.id];
      const isCorrect = selectedAnswer === question.correctAnswer;
      
      if (isCorrect) {
        correctAnswers++;
        totalScore += question.points;
      }

      detailedAnswers.push({
        questionId: question.id,
        selectedAnswer: selectedAnswer,
        isCorrect: isCorrect,
      });
    });

    const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);

    return {
      quizId: quiz.id,
      score: totalScore,
      totalPoints: totalPoints,
      correctAnswers: correctAnswers,
      totalQuestions: totalQuestions,
      answers: detailedAnswers,
    };
  };

  const handleSubmitQuiz = () => {
    const unansweredQuestions = quiz.questions.filter(
      question => answers[question.id] === undefined
    );

    if (unansweredQuestions.length > 0) {
      Alert.alert(
        'Eksik Cevaplar',
        `${unansweredQuestions.length} soru cevaplanmadı. Yine de bitirmek istiyor musunuz?`,
        [
          { text: 'İptal', style: 'cancel' },
          { text: 'Bitir', onPress: submitQuiz },
        ]
      );
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = () => {
    const results = calculateResults();
    submitQuizResult(results);
    
    navigation.replace('QuizResult', {
      result: results,
      quiz: quiz,
    });
  };

  const handleExitQuiz = () => {
    setShowExitDialog(false);
    navigation.goBack();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!quizStarted) {
    return (
      <View style={styles.container}>
        <Card style={styles.startCard}>
          <Card.Content>
            <Title style={styles.quizTitle}>{quiz.title}</Title>
            <Text style={styles.quizDescription}>{quiz.description}</Text>
            
            <View style={styles.quizInfo}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Soru Sayısı:</Text>
                <Text style={styles.infoValue}>{totalQuestions}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Toplam Puan:</Text>
                <Text style={styles.infoValue}>
                  {quiz.questions.reduce((sum, q) => sum + q.points, 0)}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Öğretmen:</Text>
                <Text style={styles.infoValue}>{quiz.teacherName}</Text>
              </View>
            </View>

            <Text style={styles.instructions}>
              • Her soru için bir seçenek işaretleyin{'\n'}
              • Sorular arasında ileri-geri gidebilirsiniz{'\n'}
              • Tüm soruları cevapladıktan sonra quiz'i bitirin
            </Text>
          </Card.Content>
          
          <Card.Actions style={styles.startActions}>
            <Button
              mode="contained"
              onPress={startQuiz}
              style={styles.startButton}
              contentStyle={styles.startButtonContent}
            >
              Quiz'i Başlat
            </Button>
          </Card.Actions>
        </Card>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Soru {currentQuestionIndex + 1} / {totalQuestions}
          </Text>
          {timeRemaining !== null && (
            <Text style={styles.timerText}>
              {formatTime(timeRemaining)}
            </Text>
          )}
        </View>
        <ProgressBar 
          progress={progress} 
          color="#6200ee" 
          style={styles.progressBar}
        />
      </View>

      <Card style={styles.questionCard}>
        <Card.Content>
          <Title style={styles.questionTitle}>
            {currentQuestion.question}
          </Title>
          
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <View key={index} style={styles.optionItem}>
                <RadioButton
                  value={index}
                  status={answers[currentQuestion.id] === index ? 'checked' : 'unchecked'}
                  onPress={() => handleAnswerSelect(currentQuestion.id, index)}
                  color="#6200ee"
                />
                <Text 
                  style={styles.optionText}
                  onPress={() => handleAnswerSelect(currentQuestion.id, index)}
                >
                  {option}
                </Text>
              </View>
            ))}
          </View>

          <Text style={styles.pointsText}>
            Bu soru {currentQuestion.points} puan değerindedir
          </Text>
        </Card.Content>
      </Card>

      <View style={styles.navigationContainer}>
        <Button
          mode="outlined"
          onPress={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
          style={styles.navButton}
        >
          Önceki
        </Button>

        {currentQuestionIndex === totalQuestions - 1 ? (
          <Button
            mode="contained"
            onPress={handleSubmitQuiz}
            style={[styles.navButton, styles.submitButton]}
          >
            Quiz'i Bitir
          </Button>
        ) : (
          <Button
            mode="contained"
            onPress={goToNextQuestion}
            style={styles.navButton}
          >
            Sonraki
          </Button>
        )}
      </View>

      <Portal>
        <Dialog visible={showExitDialog} onDismiss={() => setShowExitDialog(false)}>
          <Dialog.Title>Quiz'den Çık</Dialog.Title>
          <Dialog.Content>
            <Text>Quiz'den çıkmak istediğinizden emin misiniz? İlerlemeniz kaybedilecek.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowExitDialog(false)}>İptal</Button>
            <Button onPress={handleExitQuiz}>Çık</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  startCard: {
    flex: 1,
    justifyContent: 'center',
    elevation: 4,
  },
  quizTitle: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  quizDescription: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
    fontSize: 16,
  },
  quizInfo: {
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  instructions: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
  },
  startActions: {
    justifyContent: 'center',
    paddingTop: 16,
  },
  startButton: {
    backgroundColor: '#6200ee',
    minWidth: 200,
  },
  startButtonContent: {
    paddingVertical: 8,
  },
  header: {
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  timerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F44336',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  questionCard: {
    flex: 1,
    elevation: 4,
    marginBottom: 16,
  },
  questionTitle: {
    fontSize: 20,
    marginBottom: 24,
    color: '#333',
    lineHeight: 28,
  },
  optionsContainer: {
    marginBottom: 16,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 8,
    flex: 1,
    color: '#333',
    lineHeight: 22,
  },
  pointsText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
  },
});

export default TakeQuizScreen;
