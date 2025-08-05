import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import { useApp } from '../context/AppContext';

// Import screens
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import AccountSetupScreen from '../screens/AccountSetupScreen';
import TeacherDashboard from '../screens/TeacherDashboard';
import StudentDashboard from '../screens/StudentDashboard';
import CategoryQuizzesScreen from '../screens/CategoryQuizzesScreen';
import CreateQuizScreen from '../screens/CreateQuizScreen';
import EditQuizScreen from '../screens/EditQuizScreen';
import QuizDetailScreen from '../screens/QuizDetailScreen';
import TakeQuizScreen from '../screens/TakeQuizScreen';
import QuizResultScreen from '../screens/QuizResultScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Teacher Tab Navigator
const TeacherTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'dashboard';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={TeacherDashboard} 
        options={{ title: 'Ana Sayfa' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: 'Profil' }}
      />
    </Tab.Navigator>
  );
};

// Student Tab Navigator
const StudentTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'quiz';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={StudentDashboard} 
        options={{ title: 'Quizler' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: 'Profil' }}
      />
    </Tab.Navigator>
  );
};

// Auth Stack Navigator
const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="AccountSetup" component={AccountSetupScreen} />
    </Stack.Navigator>
  );
};

// Main App Stack Navigator
const AppStackNavigator = () => {
  const { currentUser } = useApp();

  return (
    <Stack.Navigator>
      {currentUser?.role === 'teacher' ? (
        <>
          <Stack.Screen 
            name="TeacherTabs" 
            component={TeacherTabNavigator} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="CreateQuiz" 
            component={CreateQuizScreen}
            options={{ 
              title: 'Quiz Oluştur',
              headerStyle: { backgroundColor: '#6200ee' },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen 
            name="EditQuiz" 
            component={EditQuizScreen}
            options={{ 
              title: 'Quiz Düzenle',
              headerStyle: { backgroundColor: '#6200ee' },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen 
            name="QuizDetail" 
            component={QuizDetailScreen}
            options={{ 
              title: 'Quiz Detayları',
              headerStyle: { backgroundColor: '#6200ee' },
              headerTintColor: '#fff',
            }}
          />
        </>
      ) : currentUser?.role === 'student' ? (
        <>
          <Stack.Screen
            name="StudentTabs"
            component={StudentTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CategoryQuizzes"
            component={CategoryQuizzesScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TakeQuiz"
            component={TakeQuizScreen}
            options={{
              title: 'Quiz',
              headerStyle: { backgroundColor: '#6200ee' },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen
            name="QuizResult"
            component={QuizResultScreen}
            options={{
              title: 'Sonuç',
              headerStyle: { backgroundColor: '#6200ee' },
              headerTintColor: '#fff',
              headerLeft: null, // Prevent going back
            }}
          />
        </>
      ) : null}
    </Stack.Navigator>
  );
};

// Main App Navigator
const AppNavigator = () => {
  const { currentUser } = useApp();

  return (
    <NavigationContainer>
      {currentUser ? <AppStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
