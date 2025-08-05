import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import KidiaBackground from '../components/KidiaBackground';
import KidiaMascot from '../components/KidiaMascot';
import { useApp } from '../context/AppContext';

const StudentDashboard = ({ navigation }) => {
  const { currentUser, quizzes, getQuizResultsByStudent } = useApp();
  const [studentResults, setStudentResults] = useState([]);

  // Load data when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [currentUser])
  );

  const loadData = () => {
    if (currentUser) {
      const results = getQuizResultsByStudent(currentUser.id);
      setStudentResults(results);
    }
  };

  const getQuizResult = (quizId) => {
    return studentResults.find(result => result.quizId === quizId);
  };

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

  const quizCategories = [
    {
      id: 1,
      title: 'Mathematics',
      icon: '🔢',
      color: '#FF6B6B',
      quizCount: quizzes.filter(q => q.category === 'math').length || Math.floor(Math.random() * 5) + 3
    },
    {
      id: 2,
      title: 'Science',
      icon: '🔬',
      color: '#4ECDC4',
      quizCount: quizzes.filter(q => q.category === 'science').length || Math.floor(Math.random() * 5) + 2
    },
    {
      id: 3,
      title: 'History',
      icon: '📚',
      color: '#45B7D1',
      quizCount: quizzes.filter(q => q.category === 'history').length || Math.floor(Math.random() * 5) + 1
    },
    {
      id: 4,
      title: 'Geography',
      icon: '🌍',
      color: '#96CEB4',
      quizCount: quizzes.filter(q => q.category === 'geography').length || Math.floor(Math.random() * 5) + 2
    },
    {
      id: 5,
      title: 'Language',
      icon: '📝',
      color: '#FFEAA7',
      quizCount: quizzes.filter(q => q.category === 'language').length || Math.floor(Math.random() * 5) + 4
    },
    {
      id: 6,
      title: 'Art',
      icon: '🎨',
      color: '#DDA0DD',
      quizCount: quizzes.filter(q => q.category === 'art').length || Math.floor(Math.random() * 5) + 1
    }
  ];

  const renderCategoryCard = (category) => (
    <TouchableOpacity
      key={category.id}
      style={[styles.categoryCard, { backgroundColor: category.color }]}
      onPress={() => navigation.navigate('CategoryQuizzes', { category })}
    >
      <View style={styles.categoryIcon}>
        <Text style={styles.categoryEmoji}>{category.icon}</Text>
      </View>
      <Text style={styles.categoryTitle}>{category.title}</Text>
      <Text style={styles.categoryCount}>{category.quizCount} Quizzes</Text>
    </TouchableOpacity>
  );

  const renderRecentQuiz = (quiz) => {
    const result = getQuizResult(quiz.id);
    const hasCompleted = !!result;

    return (
      <TouchableOpacity
        key={quiz.id}
        style={styles.recentQuizCard}
        onPress={() => navigation.navigate('TakeQuiz', { quiz })}
      >
        <View style={styles.quizCardContent}>
          <View style={styles.quizInfo}>
            <Text style={styles.quizTitle}>{quiz.title}</Text>
            <Text style={styles.quizTeacher}>by {quiz.teacherName}</Text>
            <Text style={styles.quizQuestions}>{quiz.questions.length} questions</Text>
          </View>
          <View style={styles.quizStatus}>
            {hasCompleted ? (
              <View style={styles.completedBadge}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={styles.completedText}>Completed</Text>
              </View>
            ) : (
              <View style={styles.playButton}>
                <Ionicons name="play-circle" size={24} color="#8B5FBF" />
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <KidiaBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <View style={styles.userInfo}>
                <Text style={styles.greeting}>Hello,</Text>
                <Text style={styles.userName}>{currentUser?.name || 'Student'}!</Text>
              </View>
              <TouchableOpacity style={styles.profileButton}>
                <View style={styles.profileAvatar}>
                  {currentUser?.profile?.character ? (
                    <Text style={styles.avatarEmoji}>{currentUser.profile.character.emoji}</Text>
                  ) : (
                    <Ionicons name="person" size={24} color="#8B5FBF" />
                  )}
                </View>
              </TouchableOpacity>
            </View>

            <Text style={styles.subtitle}>Let's make this day productive</Text>

            {/* Stats Cards */}
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{getCompletedQuizzesCount()}</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{quizzes.length}</Text>
                <Text style={styles.statLabel}>Total Quizzes</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{getAverageScore()}%</Text>
                <Text style={styles.statLabel}>Average Score</Text>
              </View>
            </View>
          </View>

          {/* Categories Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Categories</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.categoriesGrid}>
              {quizCategories.map(renderCategoryCard)}
            </View>
          </View>

          {/* Recent Quizzes Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Quizzes</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.recentQuizzes}>
              {quizzes.slice(0, 3).map(renderRecentQuiz)}
              {quizzes.length === 0 && (
                <View style={styles.emptyState}>
                  <KidiaMascot size="medium" />
                  <Text style={styles.emptyTitle}>No quizzes yet!</Text>
                  <Text style={styles.emptyText}>Your teachers will add quizzes soon</Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KidiaBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 24,
  },
  profileButton: {
    padding: 4,
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#8B5FBF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B5FBF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
  },
  seeAllText: {
    fontSize: 14,
    color: '#8B5FBF',
    fontWeight: '600',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  categoryCount: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  recentQuizzes: {
    gap: 12,
  },
  recentQuizCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#8B5FBF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quizCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quizInfo: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  quizTeacher: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  quizQuestions: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  quizStatus: {
    alignItems: 'center',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedText: {
    fontSize: 12,
    color: '#4CAF50',
    marginLeft: 4,
    fontWeight: '600',
  },
  playButton: {
    padding: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default StudentDashboard;
