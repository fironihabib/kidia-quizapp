import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Alert,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';

import KidiaButton from '../components/KidiaButton';
import KidiaLogo from '../components/KidiaLogo';
import { useApp } from '../context/AppContext';

const { width } = Dimensions.get('window');

const TeacherDashboard = ({ navigation }) => {
  const { currentUser, getQuizzesByTeacher, deleteQuiz, getQuizResultsByQuiz, users } = useApp();
  const [quizzes, setQuizzes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // overview, quizzes, students

  // Load quizzes when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadQuizzes();
    }, [currentUser])
  );

  // Get statistics
  const getStats = () => {
    const teacherQuizzes = getQuizzesByTeacher(currentUser?.id || '');
    const totalQuestions = teacherQuizzes.reduce((sum, quiz) => sum + quiz.questions.length, 0);

    // Get all results for teacher's quizzes
    let totalAttempts = 0;
    let totalScore = 0;
    let totalPossibleScore = 0;

    teacherQuizzes.forEach(quiz => {
      const results = getQuizResultsByQuiz(quiz.id);
      totalAttempts += results.length;
      results.forEach(result => {
        totalScore += result.score;
        totalPossibleScore += result.totalPoints;
      });
    });

    const averageScore = totalPossibleScore > 0 ? Math.round((totalScore / totalPossibleScore) * 100) : 0;

    return {
      totalQuizzes: teacherQuizzes.length,
      totalQuestions,
      totalAttempts,
      averageScore
    };
  };

  // Get students who took teacher's quizzes
  const getStudents = () => {
    const teacherQuizzes = getQuizzesByTeacher(currentUser?.id || '');
    const studentResults = new Map();

    teacherQuizzes.forEach(quiz => {
      const results = getQuizResultsByQuiz(quiz.id);
      results.forEach(result => {
        const student = users.find(u => u.id === result.studentId);
        if (student) {
          if (!studentResults.has(student.id)) {
            studentResults.set(student.id, {
              student,
              quizzesTaken: 0,
              totalScore: 0,
              totalPossible: 0,
              results: []
            });
          }
          const studentData = studentResults.get(student.id);
          studentData.quizzesTaken++;
          studentData.totalScore += result.score;
          studentData.totalPossible += result.totalPoints;
          studentData.results.push({ ...result, quizTitle: quiz.title });
        }
      });
    });

    return Array.from(studentResults.values()).map(data => ({
      ...data,
      averageScore: data.totalPossible > 0 ? Math.round((data.totalScore / data.totalPossible) * 100) : 0
    }));
  };

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

  const stats = getStats();
  const students = getStudents();

  const renderOverview = () => (
    <ScrollView style={styles.tabContent}>
      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Ionicons name="library-outline" size={24} color="#8B5FBF" />
          </View>
          <Text style={styles.statNumber}>{stats.totalQuizzes}</Text>
          <Text style={styles.statLabel}>Quiz'lerim</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Ionicons name="help-circle-outline" size={24} color="#E91E63" />
          </View>
          <Text style={styles.statNumber}>{stats.totalQuestions}</Text>
          <Text style={styles.statLabel}>Sorular</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Ionicons name="people-outline" size={24} color="#2196F3" />
          </View>
          <Text style={styles.statNumber}>{stats.totalAttempts}</Text>
          <Text style={styles.statLabel}>Denemeler</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Ionicons name="trophy-outline" size={24} color="#FFC107" />
          </View>
          <Text style={styles.statNumber}>{stats.averageScore}%</Text>
          <Text style={styles.statLabel}>Ort. Başarı</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Hızlı İşlemler</Text>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('CreateQuiz')}
        >
          <View style={styles.actionIconContainer}>
            <Ionicons name="add-circle" size={32} color="#8B5FBF" />
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Yeni Quiz Oluştur</Text>
            <Text style={styles.actionSubtitle}>Öğrencileriniz için yeni quiz hazırlayın</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => setActiveTab('quizzes')}
        >
          <View style={styles.actionIconContainer}>
            <Ionicons name="library" size={32} color="#E91E63" />
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Quiz'lerimi Yönet</Text>
            <Text style={styles.actionSubtitle}>Mevcut quiz'leri düzenleyin veya silin</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => setActiveTab('students')}
        >
          <View style={styles.actionIconContainer}>
            <Ionicons name="analytics" size={32} color="#2196F3" />
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Öğrenci Puanları</Text>
            <Text style={styles.actionSubtitle}>Öğrencilerin performansını görüntüleyin</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderStudents = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Öğrenci Performansı ({students.length})</Text>
      </View>

      {students.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="people-outline" size={64} color="#9CA3AF" />
          <Text style={styles.emptyTitle}>Henüz öğrenci verisi yok</Text>
          <Text style={styles.emptySubtitle}>Öğrenciler quiz'lerinizi çözdükçe burada görünecek</Text>
        </View>
      ) : (
        <View style={styles.studentsContainer}>
          {students.map((studentData) => (
            <View key={studentData.student.id} style={styles.studentCard}>
              <View style={styles.studentHeader}>
                <View style={styles.studentAvatar}>
                  <Text style={styles.studentAvatarText}>
                    {studentData.student.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.studentInfo}>
                  <Text style={styles.studentName}>{studentData.student.name}</Text>
                  <Text style={styles.studentEmail}>{studentData.student.email}</Text>
                </View>
                <View style={styles.studentScore}>
                  <Text style={styles.scoreNumber}>{studentData.averageScore}%</Text>
                  <Text style={styles.scoreLabel}>Ortalama</Text>
                </View>
              </View>

              <View style={styles.studentStats}>
                <View style={styles.studentStat}>
                  <Ionicons name="library-outline" size={16} color="#6B7280" />
                  <Text style={styles.studentStatText}>{studentData.quizzesTaken} quiz</Text>
                </View>
                <View style={styles.studentStat}>
                  <Ionicons name="trophy-outline" size={16} color="#6B7280" />
                  <Text style={styles.studentStatText}>{studentData.totalScore}/{studentData.totalPossible} puan</Text>
                </View>
              </View>

              {/* Recent Results */}
              <View style={styles.recentResults}>
                <Text style={styles.recentTitle}>Son Sonuçlar:</Text>
                {studentData.results.slice(-3).map((result, index) => (
                  <View key={index} style={styles.resultItem}>
                    <Text style={styles.resultQuiz}>{result.quizTitle}</Text>
                    <Text style={styles.resultScore}>
                      {Math.round((result.score / result.totalPoints) * 100)}%
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );

  const renderQuizzes = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Quiz'lerim ({quizzes.length})</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateQuiz')}
        >
          <Ionicons name="add" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {quizzes.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="library-outline" size={64} color="#9CA3AF" />
          <Text style={styles.emptyTitle}>Henüz quiz oluşturmadınız</Text>
          <Text style={styles.emptySubtitle}>İlk quiz'inizi oluşturmak için butona tıklayın</Text>
          <KidiaButton
            title="Quiz Oluştur"
            onPress={() => navigation.navigate('CreateQuiz')}
            style={styles.emptyButton}
          />
        </View>
      ) : (
        <View style={styles.quizzesGrid}>
          {quizzes.map((quiz) => (
            <TouchableOpacity
              key={quiz.id}
              style={styles.quizCard}
              onPress={() => navigation.navigate('QuizDetail', { quiz })}
            >
              <View style={styles.quizHeader}>
                <Text style={styles.quizTitle}>{quiz.title}</Text>
                <TouchableOpacity
                  style={styles.quizMenu}
                  onPress={() => handleDeleteQuiz(quiz.id, quiz.title)}
                >
                  <Ionicons name="ellipsis-vertical" size={16} color="#9CA3AF" />
                </TouchableOpacity>
              </View>

              <Text style={styles.quizDescription} numberOfLines={2}>
                {quiz.description}
              </Text>

              <View style={styles.quizStats}>
                <View style={styles.quizStat}>
                  <Ionicons name="help-circle-outline" size={16} color="#6B7280" />
                  <Text style={styles.quizStatText}>{quiz.questions.length} soru</Text>
                </View>
                <View style={styles.quizStat}>
                  <Ionicons name="people-outline" size={16} color="#6B7280" />
                  <Text style={styles.quizStatText}>{getQuizResultsByQuiz(quiz.id).length} deneme</Text>
                </View>
              </View>

              <View style={styles.quizCategory}>
                <Text style={styles.categoryText}>{quiz.category}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F8BBD9', '#E879F9', '#C084FC']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <KidiaLogo size="small" />
            <View style={styles.headerText}>
              <Text style={styles.welcomeText}>Merhaba, {currentUser?.name}!</Text>
              <Text style={styles.roleText}>Öğretmen Paneli</Text>
            </View>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
            onPress={() => setActiveTab('overview')}
          >
            <Ionicons
              name="home"
              size={20}
              color={activeTab === 'overview' ? '#8B5FBF' : '#9CA3AF'}
            />
            <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
              Genel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'quizzes' && styles.activeTab]}
            onPress={() => setActiveTab('quizzes')}
          >
            <Ionicons
              name="library"
              size={20}
              color={activeTab === 'quizzes' ? '#8B5FBF' : '#9CA3AF'}
            />
            <Text style={[styles.tabText, activeTab === 'quizzes' && styles.activeTabText]}>
              Quiz'ler
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'students' && styles.activeTab]}
            onPress={() => setActiveTab('students')}
          >
            <Ionicons
              name="people"
              size={20}
              color={activeTab === 'students' ? '#8B5FBF' : '#9CA3AF'}
            />
            <Text style={[styles.tabText, activeTab === 'students' && styles.activeTabText]}>
              Öğrenciler
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'quizzes' && renderQuizzes()}
          {activeTab === 'students' && renderStudents()}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  // Header styles
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 12,
    flex: 1,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 2,
  },
  roleText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  // Tab styles
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9CA3AF',
    marginLeft: 6,
  },
  activeTabText: {
    color: '#8B5FBF',
    fontWeight: '600',
  },
  // Content styles
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tabContent: {
    flex: 1,
  },
  // Stats styles
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 16,
    width: (width - 60) / 2,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  // Section styles
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#8B5FBF',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Quick actions styles
  quickActions: {
    marginBottom: 24,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  actionIconContainer: {
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  // Quiz styles
  quizzesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quizCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 16,
    width: (width - 60) / 2,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
    marginRight: 8,
  },
  quizMenu: {
    padding: 4,
  },
  quizDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  quizStats: {
    marginBottom: 12,
  },
  quizStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  quizStatText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
  },
  quizCategory: {
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 12,
    color: '#8B5FBF',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontWeight: '500',
  },
  // Student styles
  studentsContainer: {
    marginBottom: 20,
  },
  studentCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  studentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  studentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8B5FBF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  studentAvatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  studentEmail: {
    fontSize: 14,
    color: '#6B7280',
  },
  studentScore: {
    alignItems: 'center',
  },
  scoreNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#059669',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  studentStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  studentStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studentStatText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  recentResults: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },
  recentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  resultQuiz: {
    fontSize: 13,
    color: '#6B7280',
    flex: 1,
  },
  resultScore: {
    fontSize: 13,
    fontWeight: '600',
    color: '#059669',
  },
  // Empty state styles
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 32,
  },
  emptyButton: {
    marginTop: 8,
  },
});

export default TeacherDashboard;
