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
} from 'react-native';

import WebSafeButton from '../components/WebSafeButton';
import WebSafeCard from '../components/WebSafeCard';
import { useApp } from '../context/AppContext';

const LoginScreen = () => {
  const { users, login } = useApp();
  const [selectedRole, setSelectedRole] = useState('student');
  const [showUserList, setShowUserList] = useState(false);

  const handleRoleSelection = () => {
    setShowUserList(true);
  };

  const handleUserSelection = (user) => {
    setShowUserList(false);
    login(user);
  };

  const filteredUsers = users.filter(user => user.role === selectedRole);

  if (showUserList) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.logoContainer}>
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>KIDIA</Text>
              <Text style={styles.logoSubtext}>Quiz App</Text>
            </View>
          </View>

          <WebSafeCard style={styles.card}>
            <WebSafeCard.Content>
              <Text style={styles.title}>Kullanıcı Seçin</Text>
              <Text style={styles.subtitle}>
                {selectedRole === 'teacher' ? 'Öğretmen' : 'Öğrenci'} olarak giriş yapmak için bir kullanıcı seçin:
              </Text>

              {filteredUsers.map((user) => (
                <TouchableOpacity
                  key={user.id}
                  style={styles.userItem}
                  onPress={() => handleUserSelection(user)}
                >
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                </TouchableOpacity>
              ))}
            </WebSafeCard.Content>

            <WebSafeCard.Actions>
              <WebSafeButton
                mode="outlined"
                onPress={() => setShowUserList(false)}
              >
                Geri
              </WebSafeButton>
            </WebSafeCard.Actions>
          </WebSafeCard>
        </ScrollView>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>KIDIA</Text>
            <Text style={styles.logoSubtext}>Quiz App</Text>
          </View>
        </View>

        <WebSafeCard style={styles.card}>
          <WebSafeCard.Content>
            <Text style={styles.title}>Hoş Geldiniz!</Text>
            <Text style={styles.subtitle}>
              Lütfen rolünüzü seçin ve giriş yapın
            </Text>

            <View style={styles.roleContainer}>
              <Text style={styles.roleTitle}>Rol Seçimi:</Text>

              <View style={styles.radioContainer}>
                <TouchableOpacity
                  style={styles.radioItem}
                  onPress={() => setSelectedRole('student')}
                >
                  <View style={[
                    styles.radioButton,
                    selectedRole === 'student' && styles.radioButtonSelected
                  ]} />
                  <Text style={styles.radioLabel}>Öğrenci</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioItem}
                  onPress={() => setSelectedRole('teacher')}
                >
                  <View style={[
                    styles.radioButton,
                    selectedRole === 'teacher' && styles.radioButtonSelected
                  ]} />
                  <Text style={styles.radioLabel}>Öğretmen</Text>
                </TouchableOpacity>
              </View>
            </View>

            <WebSafeButton
              mode="contained"
              onPress={handleRoleSelection}
              style={styles.loginButton}
            >
              Giriş Yap
            </WebSafeButton>
          </WebSafeCard.Content>
        </WebSafeCard>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Demo uygulama - Gerçek kimlik doğrulama gerektirmez
          </Text>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: '#6200ee',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoSubtext: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
  card: {
    elevation: 4,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  roleContainer: {
    marginBottom: 30,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#6200ee',
    marginRight: 8,
  },
  radioButtonSelected: {
    backgroundColor: '#6200ee',
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    marginTop: 20,
  },
  userItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginVertical: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default LoginScreen;
