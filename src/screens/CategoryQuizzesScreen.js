import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import KidiaBackground from '../components/KidiaBackground';
import KidiaButton from '../components/KidiaButton';
import { useApp } from '../context/AppContext';

const CategoryQuizzesScreen = ({ navigation, route }) => {
  const { category } = route.params;
  const { currentUser, quizzes, getQuizResultsByStudent } = useApp();
  const [studentResults, setStudentResults] = useState([]);
  const [categoryQuizzes, setCategoryQuizzes] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [currentUser])
  );

  const loadData = () => {
    if (currentUser) {
      const results = getQuizResultsByStudent(currentUser.id);
      setStudentResults(results);
      
      // Filter quizzes by category or show all if no specific category filter
      const filtered = quizzes.filter(quiz => 
        quiz.category === category.title.toLowerCase() || 
        category.title === 'All'
      );
      setCategoryQuizzes(filtered.length > 0 ? filtered : quizzes);
    }
  };

  const getQuizResult = (quizId) => {
    return studentResults.find(result => result.quizId === quizId);
  };

  const renderQuizCard = ({ item }) => {
    const result = getQuizResult(item.id);
    const hasCompleted = !!result;
    const scorePercentage = hasCompleted 
      ? Math.round((result.score / result.totalPoints) * 100)
      : 0;

    return (
      <TouchableOpacity 
        style={styles.quizCard}
        onPress={() => navigation.navigate('TakeQuiz', { quiz: item })}
      >
        <View style={styles.quizHeader}>
          <View style={[styles.quizIcon, { backgroundColor: category.color }]}>
            <Text style={styles.quizEmoji}>{category.icon}</Text>
          </View>
          {hasCompleted && (
            <View style={styles.completedBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={styles.scoreText}>{scorePercentage}%</Text>
            </View>
          )}
        </View>
        
        <View style={styles.quizContent}>
          <Text style={styles.quizTitle}>{item.title}</Text>
          <Text style={styles.quizDescription}>{item.description}</Text>
          <Text style={styles.quizTeacher}>by {item.teacherName}</Text>
          
          <View style={styles.quizMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="help-circle-outline" size={14} color="#6B7280" />
              <Text style={styles.metaText}>{item.questions.length} questions</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={14} color="#6B7280" />
              <Text style={styles.metaText}>~{item.questions.length * 2} min</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.quizAction}>
          {hasCompleted ? (
            <KidiaButton 
              variant="outline" 
              onPress={() => navigation.navigate('TakeQuiz', { quiz: item })}
              style={styles.actionButton}
            >
              Retake
            </KidiaButton>
          ) : (
            <KidiaButton 
              variant="primary" 
              onPress={() => navigation.navigate('TakeQuiz', { quiz: item })}
              style={styles.actionButton}
            >
              Start Quiz
            </KidiaButton>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>{category.icon}</Text>
      <Text style={styles.emptyTitle}>No {category.title} quizzes yet</Text>
      <Text style={styles.emptyText}>
        Your teachers will add {category.title.toLowerCase()} quizzes soon
      </Text>
    </View>
  );

  return (
    <KidiaBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
              <Text style={styles.categoryEmoji}>{category.icon}</Text>
            </View>
            <Text style={styles.headerTitle}>{category.title}</Text>
            <Text style={styles.headerSubtitle}>{categoryQuizzes.length} quizzes available</Text>
          </View>
        </View>

        <FlatList
          data={categoryQuizzes}
          renderItem={renderQuizCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </KidiaBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryEmoji: {
    fontSize: 28,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  quizCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#8B5FBF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  quizIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizEmoji: {
    fontSize: 20,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scoreText: {
    fontSize: 12,
    color: '#4CAF50',
    marginLeft: 4,
    fontWeight: '600',
  },
  quizContent: {
    marginBottom: 16,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  quizDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    lineHeight: 20,
  },
  quizTeacher: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  quizMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  quizAction: {
    alignItems: 'flex-end',
  },
  actionButton: {
    paddingHorizontal: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 100,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#374151',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6B7280',
    lineHeight: 24,
  },
});

export default CategoryQuizzesScreen;
