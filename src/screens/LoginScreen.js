import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import KidiaBackground from '../components/KidiaBackground';
import KidiaMascot from '../components/KidiaMascot';
import KidiaButton from '../components/KidiaButton';
import KidiaInput from '../components/KidiaInput';
import { useApp } from '../context/AppContext';

const LoginScreen = () => {
  const { users, login } = useApp();
  const [currentScreen, setCurrentScreen] = useState('welcome'); // welcome, roleSelect, userSelect
  const [selectedRole, setSelectedRole] = useState('student');

  const handleGetStarted = () => {
    setCurrentScreen('roleSelect');
  };

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setCurrentScreen('userSelect');
  };

  const handleUserSelection = (user) => {
    login(user);
  };

  const handleBack = () => {
    if (currentScreen === 'userSelect') {
      setCurrentScreen('roleSelect');
    } else if (currentScreen === 'roleSelect') {
      setCurrentScreen('welcome');
    }
  };

  const filteredUsers = users.filter(user => user.role === selectedRole);

  // Welcome Screen
  if (currentScreen === 'welcome') {
    return (
      <KidiaBackground>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.header}>
              <Text style={styles.appTitle}>QUIZZY</Text>
            </View>

            <View style={styles.mascotContainer}>
              <KidiaMascot size="large" />
            </View>

            <View style={styles.welcomeCard}>
              <Text style={styles.welcomeTitle}>WELCOME!</Text>
              <Text style={styles.welcomeSubtitle}>
                Eğlenceli quizlerle öğrenmeye hazır mısın? Hadi başlayalım!
              </Text>

              <View style={styles.buttonContainer}>
                <KidiaButton
                  variant="primary"
                  onPress={handleGetStarted}
                  style={styles.primaryButton}
                >
                  Başlayalım
                </KidiaButton>

                <Text style={styles.orText}>Veya</Text>

                <KidiaButton
                  variant="secondary"
                  onPress={() => setCurrentScreen('roleSelect')}
                  style={styles.secondaryButton}
                >
                  Giriş Yap
                </KidiaButton>
              </View>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Demo uygulama - Gerçek kimlik doğrulama gerektirmez
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KidiaBackground>
    );
  }

  // Role Selection Screen
  if (currentScreen === 'roleSelect') {
    return (
      <KidiaBackground>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#8B5FBF" />
              </TouchableOpacity>
              <Text style={styles.appTitle}>QUIZZY</Text>
              <View style={styles.placeholder} />
            </View>

            <View style={styles.formCard}>
              <Text style={styles.formTitle}>Kimsin Sen?</Text>
              <Text style={styles.formSubtitle}>
                Devam etmek için rolünü seç
              </Text>

              <View style={styles.roleOptions}>
                <TouchableOpacity
                  style={[
                    styles.roleCard,
                    selectedRole === 'student' && styles.roleCardSelected
                  ]}
                  onPress={() => handleRoleSelection('student')}
                >
                  <View style={styles.roleIcon}>
                    <Text style={styles.roleEmoji}>🎓</Text>
                  </View>
                  <Text style={styles.roleTitle}>Öğrenci</Text>
                  <Text style={styles.roleDescription}>Quiz çöz ve öğren</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.roleCard,
                    selectedRole === 'teacher' && styles.roleCardSelected
                  ]}
                  onPress={() => handleRoleSelection('teacher')}
                >
                  <View style={styles.roleIcon}>
                    <Text style={styles.roleEmoji}>👩‍🏫</Text>
                  </View>
                  <Text style={styles.roleTitle}>Öğretmen</Text>
                  <Text style={styles.roleDescription}>Quiz oluştur ve yönet</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KidiaBackground>
    );
  }

  // User Selection Screen
  return (
    <KidiaBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#8B5FBF" />
            </TouchableOpacity>
            <Text style={styles.appTitle}>QUIZZY</Text>
            <View style={styles.placeholder} />
          </View>

          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Hoş Geldin!</Text>
            <Text style={styles.formSubtitle}>
              {selectedRole === 'teacher' ? 'Öğretmen' : 'Öğrenci'} olarak giriş yapmak için bir kullanıcı seç
            </Text>

            <View style={styles.userList}>
              {filteredUsers.map((user) => (
                <TouchableOpacity
                  key={user.id}
                  style={styles.userCard}
                  onPress={() => handleUserSelection(user)}
                >
                  <View style={styles.userAvatar}>
                    <Text style={styles.userAvatarText}>
                      {user.name.charAt(0)}
                    </Text>
                  </View>
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#8B5FBF" />
                </TouchableOpacity>
              ))}
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
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B5FBF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  placeholder: {
    width: 40,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8B5FBF',
    textAlign: 'center',
    letterSpacing: 2,
  },
  mascotContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  welcomeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 30,
    marginHorizontal: 10,
    shadowColor: '#8B5FBF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#8B5FBF',
    marginBottom: 16,
  },
  welcomeSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6B7280',
    marginBottom: 30,
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 16,
  },
  primaryButton: {
    marginBottom: 8,
  },
  secondaryButton: {
    marginTop: 8,
  },
  orText: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 30,
    marginHorizontal: 10,
    marginTop: 20,
    shadowColor: '#8B5FBF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#8B5FBF',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6B7280',
    marginBottom: 30,
  },
  roleOptions: {
    gap: 16,
  },
  roleCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  roleCardSelected: {
    borderColor: '#8B5FBF',
    backgroundColor: '#F3E8FF',
  },
  roleIcon: {
    marginBottom: 12,
  },
  roleEmoji: {
    fontSize: 40,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  userList: {
    gap: 12,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8B5FBF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userAvatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default LoginScreen;
