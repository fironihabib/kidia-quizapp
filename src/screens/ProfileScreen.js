import React from 'react';
import {
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  Text,
  Card,
  Title,
  Button,
  List,
  Divider,
  Avatar,
} from 'react-native-paper';

import { useApp } from '../context/AppContext';

const ProfileScreen = ({ navigation }) => {
  const { currentUser, logout, getQuizzesByTeacher, getQuizResultsByStudent } = useApp();

  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Çıkış yapmak istediğinizden emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Çıkış Yap',
          style: 'destructive',
          onPress: () => logout(),
        },
      ]
    );
  };

  const getStats = () => {
    if (currentUser?.role === 'teacher') {
      const quizzes = getQuizzesByTeacher(currentUser.id);
      const totalQuestions = quizzes.reduce((sum, quiz) => sum + quiz.questions.length, 0);
      return {
        quizzes: quizzes.length,
        questions: totalQuestions,
      };
    } else {
      const results = getQuizResultsByStudent(currentUser.id);
      const averageScore = results.length > 0 
        ? Math.round(results.reduce((sum, result) => sum + (result.score / result.totalPoints * 100), 0) / results.length)
        : 0;
      return {
        completed: results.length,
        averageScore: averageScore,
      };
    }
  };

  const stats = getStats();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar.Text 
          size={80} 
          label={currentUser?.name?.charAt(0) || 'U'} 
          style={styles.avatar}
        />
        <Title style={styles.name}>{currentUser?.name}</Title>
        <Text style={styles.role}>
          {currentUser?.role === 'teacher' ? 'Öğretmen' : 'Öğrenci'}
        </Text>
        <Text style={styles.email}>{currentUser?.email}</Text>
      </View>

      <Card style={styles.statsCard}>
        <Card.Content>
          <Title style={styles.statsTitle}>İstatistikler</Title>
          {currentUser?.role === 'teacher' ? (
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.quizzes}</Text>
                <Text style={styles.statLabel}>Oluşturulan Quiz</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.questions}</Text>
                <Text style={styles.statLabel}>Toplam Soru</Text>
              </View>
            </View>
          ) : (
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.completed}</Text>
                <Text style={styles.statLabel}>Tamamlanan Quiz</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.averageScore}%</Text>
                <Text style={styles.statLabel}>Ortalama Başarı</Text>
              </View>
            </View>
          )}
        </Card.Content>
      </Card>

      <Card style={styles.menuCard}>
        <Card.Content>
          <List.Section>
            <List.Subheader>Hesap</List.Subheader>
            <List.Item
              title="Bildirimler"
              description="Bildirim ayarlarını yönet"
              left={props => <List.Icon {...props} icon="bell" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {
                Alert.alert('Bilgi', 'Bu özellik henüz mevcut değil.');
              }}
            />
            <Divider />
            <List.Item
              title="Gizlilik"
              description="Gizlilik ayarları"
              left={props => <List.Icon {...props} icon="shield-account" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {
                Alert.alert('Bilgi', 'Bu özellik henüz mevcut değil.');
              }}
            />
            <Divider />
            <List.Item
              title="Yardım"
              description="Sık sorulan sorular ve destek"
              left={props => <List.Icon {...props} icon="help-circle" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {
                Alert.alert('Yardım', 'Kidia Quiz App v1.0\n\nBu uygulama Kidia için geliştirilmiş bir demo quiz uygulamasıdır.');
              }}
            />
            <Divider />
            <List.Item
              title="Hakkında"
              description="Uygulama bilgileri"
              left={props => <List.Icon {...props} icon="information" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {
                Alert.alert(
                  'Hakkında', 
                  'Kidia Quiz App\nVersiyon: 1.0.0\n\n2-11 yaş arası çocuklar için eğitici quiz uygulaması.\n\nGeliştirici: React Native Developer'
                );
              }}
            />
          </List.Section>
        </Card.Content>
      </Card>

      <View style={styles.logoutContainer}>
        <Button
          mode="contained"
          onPress={handleLogout}
          style={styles.logoutButton}
          buttonColor="#F44336"
          icon="logout"
        >
          Çıkış Yap
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#6200ee',
    paddingTop: 60,
  },
  avatar: {
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  name: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 4,
  },
  role: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.9,
    marginBottom: 4,
  },
  email: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
  statsCard: {
    margin: 16,
    elevation: 4,
  },
  statsTitle: {
    fontSize: 18,
    marginBottom: 16,
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  menuCard: {
    margin: 16,
    marginTop: 0,
    elevation: 4,
  },
  logoutContainer: {
    padding: 16,
    marginTop: 'auto',
  },
  logoutButton: {
    paddingVertical: 8,
  },
});

export default ProfileScreen;
