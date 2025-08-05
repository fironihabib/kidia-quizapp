import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Card,
  Title,
  IconButton,
  Divider,
  Chip,
} from 'react-native-paper';

import { useApp } from '../context/AppContext';

const CreateQuizScreen = ({ navigation }) => {
  const { addQuiz } = useApp();
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [questions, setQuestions] = useState([
    {
      id: Date.now().toString(),
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      points: 10,
    }
  ]);

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now().toString(),
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      points: 10,
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (questionId) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== questionId));
    } else {
      Alert.alert('Uyarı', 'En az bir soru olmalıdır.');
    }
  };

  const updateQuestion = (questionId, field, value) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, [field]: value } : q
    ));
  };

  const updateQuestionOption = (questionId, optionIndex, value) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { 
            ...q, 
            options: q.options.map((option, index) => 
              index === optionIndex ? value : option
            )
          }
        : q
    ));
  };

  const validateQuiz = () => {
    if (!quizTitle.trim()) {
      Alert.alert('Hata', 'Quiz başlığı gereklidir.');
      return false;
    }

    if (!quizDescription.trim()) {
      Alert.alert('Hata', 'Quiz açıklaması gereklidir.');
      return false;
    }

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      
      if (!question.question.trim()) {
        Alert.alert('Hata', `${i + 1}. sorunun metni gereklidir.`);
        return false;
      }

      const emptyOptions = question.options.filter(option => !option.trim());
      if (emptyOptions.length > 0) {
        Alert.alert('Hata', `${i + 1}. sorunun tüm seçenekleri doldurulmalıdır.`);
        return false;
      }
    }

    return true;
  };

  const handleSaveQuiz = () => {
    if (!validateQuiz()) return;

    const newQuiz = {
      title: quizTitle.trim(),
      description: quizDescription.trim(),
      questions: questions.map(q => ({
        ...q,
        question: q.question.trim(),
        options: q.options.map(option => option.trim()),
      })),
    };

    addQuiz(newQuiz);
    Alert.alert(
      'Başarılı',
      'Quiz başarıyla oluşturuldu!',
      [
        {
          text: 'Tamam',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const renderQuestion = (question, index) => (
    <Card key={question.id} style={styles.questionCard}>
      <Card.Content>
        <View style={styles.questionHeader}>
          <Title style={styles.questionTitle}>Soru {index + 1}</Title>
          <IconButton
            icon="delete"
            size={20}
            onPress={() => removeQuestion(question.id)}
            disabled={questions.length === 1}
          />
        </View>

        <TextInput
          label="Soru metni"
          value={question.question}
          onChangeText={(text) => updateQuestion(question.id, 'question', text)}
          mode="outlined"
          multiline
          style={styles.questionInput}
        />

        <Text style={styles.optionsLabel}>Seçenekler:</Text>
        {question.options.map((option, optionIndex) => (
          <View key={optionIndex} style={styles.optionContainer}>
            <TextInput
              label={`Seçenek ${optionIndex + 1}`}
              value={option}
              onChangeText={(text) => updateQuestionOption(question.id, optionIndex, text)}
              mode="outlined"
              style={styles.optionInput}
            />
            <Chip
              selected={question.correctAnswer === optionIndex}
              onPress={() => updateQuestion(question.id, 'correctAnswer', optionIndex)}
              style={styles.correctChip}
            >
              {question.correctAnswer === optionIndex ? 'Doğru' : 'Seç'}
            </Chip>
          </View>
        ))}

        <View style={styles.pointsContainer}>
          <Text style={styles.pointsLabel}>Puan:</Text>
          <TextInput
            value={question.points.toString()}
            onChangeText={(text) => {
              const points = parseInt(text) || 0;
              updateQuestion(question.id, 'points', points);
            }}
            mode="outlined"
            keyboardType="numeric"
            style={styles.pointsInput}
          />
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Card style={styles.headerCard}>
          <Card.Content>
            <Title>Quiz Bilgileri</Title>
            <TextInput
              label="Quiz Başlığı"
              value={quizTitle}
              onChangeText={setQuizTitle}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Quiz Açıklaması"
              value={quizDescription}
              onChangeText={setQuizDescription}
              mode="outlined"
              multiline
              numberOfLines={3}
              style={styles.input}
            />
          </Card.Content>
        </Card>

        <View style={styles.questionsHeader}>
          <Title>Sorular</Title>
          <Button
            mode="outlined"
            icon="plus"
            onPress={addQuestion}
            style={styles.addButton}
          >
            Soru Ekle
          </Button>
        </View>

        {questions.map((question, index) => renderQuestion(question, index))}

        <View style={styles.bottomActions}>
          <Button
            mode="contained"
            onPress={handleSaveQuiz}
            style={styles.saveButton}
            contentStyle={styles.saveButtonContent}
          >
            Quiz'i Kaydet
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  headerCard: {
    marginBottom: 16,
    elevation: 2,
  },
  input: {
    marginBottom: 12,
  },
  questionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    borderColor: '#6200ee',
  },
  questionCard: {
    marginBottom: 16,
    elevation: 2,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  questionTitle: {
    fontSize: 18,
  },
  questionInput: {
    marginBottom: 16,
  },
  optionsLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionInput: {
    flex: 1,
    marginRight: 8,
  },
  correctChip: {
    minWidth: 60,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  pointsLabel: {
    fontSize: 16,
    marginRight: 12,
    color: '#333',
  },
  pointsInput: {
    width: 80,
  },
  bottomActions: {
    marginTop: 24,
    marginBottom: 40,
  },
  saveButton: {
    backgroundColor: '#6200ee',
  },
  saveButtonContent: {
    paddingVertical: 8,
  },
});

export default CreateQuizScreen;
