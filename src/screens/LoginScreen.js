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

const LoginScreen = ({ navigation }) => {
  const { users, login } = useApp();
  const [currentScreen, setCurrentScreen] = useState('welcome'); // welcome, signup, signin, roleSelect, userSelect
  const [selectedRole, setSelectedRole] = useState('student');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    agreeTerms: false
  });

  const handleSignUp = () => {
    setCurrentScreen('signup');
  };

  const handleSignIn = () => {
    setCurrentScreen('signin');
  };

  const handleCreateAccount = () => {
    // Validate form
    if (!formData.email || !formData.password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }
    if (!formData.agreeTerms) {
      Alert.alert('Hata', 'Lütfen şartları kabul edin');
      return;
    }
    // Navigate to account setup for students
    navigation.navigate('AccountSetup', {
      email: formData.email,
      password: formData.password
    });
  };

  const handleSignInSubmit = () => {
    // Validate form
    if (!formData.email || !formData.password) {
      Alert.alert('Hata', 'Lütfen email ve şifrenizi girin');
      return;
    }
    // For demo, go to role selection
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
      setCurrentScreen(formData.email ? 'signin' : 'welcome');
    } else if (currentScreen === 'signup' || currentScreen === 'signin') {
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              </Text>

              <View style={styles.buttonContainer}>
                <KidiaButton
                  variant="primary"
                  onPress={handleSignUp}
                  style={styles.primaryButton}
                >
                  Sign up
                </KidiaButton>

                <Text style={styles.orText}>Or,</Text>

                <KidiaButton
                  variant="secondary"
                  onPress={handleSignIn}
                  style={styles.secondaryButton}
                >
                  Sign in
                </KidiaButton>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KidiaBackground>
    );
  }

  // Sign Up Screen
  if (currentScreen === 'signup') {
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

            <View style={styles.authCard}>
              <Text style={styles.authTitle}>Create Account</Text>
              <Text style={styles.authSubtitle}>
                Complete the process to continue
              </Text>

              <View style={styles.formContainer}>
                <KidiaInput
                  placeholder="Email"
                  value={formData.email}
                  onChangeText={(text) => setFormData({...formData, email: text})}
                  keyboardType="email-address"
                  icon="mail-outline"
                />

                <KidiaInput
                  placeholder="Password"
                  value={formData.password}
                  onChangeText={(text) => setFormData({...formData, password: text})}
                  secureTextEntry
                  icon="lock-closed-outline"
                />

                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => setFormData({...formData, agreeTerms: !formData.agreeTerms})}
                >
                  <View style={[styles.checkbox, formData.agreeTerms && styles.checkboxChecked]}>
                    {formData.agreeTerms && (
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    )}
                  </View>
                  <Text style={styles.checkboxText}>
                    I agree with your <Text style={styles.linkText}>Terms & Conditions</Text>
                  </Text>
                </TouchableOpacity>

                <KidiaButton
                  variant="primary"
                  onPress={handleCreateAccount}
                  style={styles.authButton}
                >
                  Sign up
                </KidiaButton>

                <Text style={styles.orText}>Or, Sign up with :</Text>

                <View style={styles.socialContainer}>
                  <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
                    <Ionicons name="logo-google" size={24} color="#DB4437" />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
                    <Ionicons name="logo-facebook" size={24} color="#4267B2" />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.socialButton, styles.twitterButton]}>
                    <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KidiaBackground>
    );
  }

  // Sign In Screen
  if (currentScreen === 'signin') {
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

            <View style={styles.authCard}>
              <Text style={styles.authTitle}>Welcome Back!</Text>
              <Text style={styles.authSubtitle}>
                Sign in to your account
              </Text>

              <View style={styles.formContainer}>
                <KidiaInput
                  placeholder="Email"
                  value={formData.email}
                  onChangeText={(text) => setFormData({...formData, email: text})}
                  keyboardType="email-address"
                  icon="mail-outline"
                />

                <KidiaInput
                  placeholder="Password"
                  value={formData.password}
                  onChangeText={(text) => setFormData({...formData, password: text})}
                  secureTextEntry
                  icon="lock-closed-outline"
                />

                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                <KidiaButton
                  variant="primary"
                  onPress={handleSignInSubmit}
                  style={styles.authButton}
                >
                  Sign in
                </KidiaButton>

                <Text style={styles.orText}>Or, Sign up with :</Text>

                <View style={styles.socialContainer}>
                  <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
                    <Ionicons name="logo-google" size={24} color="#DB4437" />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
                    <Ionicons name="logo-facebook" size={24} color="#4267B2" />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.socialButton, styles.twitterButton]}>
                    <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
                  </TouchableOpacity>
                </View>
              </View>
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
  authCard: {
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
  authTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#6B7280',
    marginBottom: 8,
  },
  authSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#9CA3AF',
    marginBottom: 30,
  },
  formContainer: {
    gap: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#8B5FBF',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#8B5FBF',
  },
  checkboxText: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  linkText: {
    color: '#8B5FBF',
    textDecorationLine: 'underline',
  },
  authButton: {
    marginTop: 16,
    marginBottom: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#8B5FBF',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 16,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  socialIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  googleButton: {
    backgroundColor: '#FEF2F2',
  },
  facebookButton: {
    backgroundColor: '#EFF6FF',
  },
  twitterButton: {
    backgroundColor: '#F0F9FF',
  },
});

export default LoginScreen;
