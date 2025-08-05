import React, { createContext, useContext, useReducer, useEffect } from 'react';
import storage from '../utils/storage';
import { mockQuizzes, mockUsers, mockQuizResults } from '../data/mockData';

// Initial state
const initialState = {
  currentUser: null,
  quizzes: mockQuizzes,
  users: mockUsers,
  quizResults: mockQuizResults,
  isLoading: false,
  error: null,
};

// Action types
export const ActionTypes = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  ADD_USER: 'ADD_USER',
  ADD_QUIZ: 'ADD_QUIZ',
  UPDATE_QUIZ: 'UPDATE_QUIZ',
  DELETE_QUIZ: 'DELETE_QUIZ',
  ADD_QUIZ_RESULT: 'ADD_QUIZ_RESULT',
  LOAD_DATA: 'LOAD_DATA',
  LOGOUT: 'LOGOUT',
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ActionTypes.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case ActionTypes.ADD_QUIZ:
      return {
        ...state,
        quizzes: [...state.quizzes, action.payload],
      };
    case ActionTypes.UPDATE_QUIZ:
      return {
        ...state,
        quizzes: state.quizzes.map(quiz =>
          quiz.id === action.payload.id ? action.payload : quiz
        ),
      };
    case ActionTypes.DELETE_QUIZ:
      return {
        ...state,
        quizzes: state.quizzes.filter(quiz => quiz.id !== action.payload),
      };
    case ActionTypes.ADD_QUIZ_RESULT:
      return {
        ...state,
        quizResults: [...state.quizResults, action.payload],
      };
    case ActionTypes.LOAD_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Context provider
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from AsyncStorage on app start
  useEffect(() => {
    loadStoredData();
  }, []);

  // Save data to AsyncStorage whenever state changes
  useEffect(() => {
    saveDataToStorage();
  }, [state.quizzes, state.quizResults]);

  const loadStoredData = async () => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });

      // Web platformunda AsyncStorage sorunları olabileceği için try-catch ile sarmalayalım
      let storedUser = null;
      let storedQuizzes = null;
      let storedResults = null;

      try {
        storedUser = await storage.getItem('currentUser');
        storedQuizzes = await storage.getItem('quizzes');
        storedResults = await storage.getItem('quizResults');
      } catch (storageError) {
        console.warn('Storage error, using default data:', storageError);
      }

      const loadedData = {};

      // Don't auto-load currentUser - always start from login screen
      // if (storedUser) {
      //   try {
      //     loadedData.currentUser = JSON.parse(storedUser);
      //   } catch (parseError) {
      //     console.warn('Error parsing stored user:', parseError);
      //   }
      // }

      if (storedQuizzes) {
        try {
          loadedData.quizzes = JSON.parse(storedQuizzes);
        } catch (parseError) {
          console.warn('Error parsing stored quizzes:', parseError);
        }
      }

      if (storedResults) {
        try {
          loadedData.quizResults = JSON.parse(storedResults);
        } catch (parseError) {
          console.warn('Error parsing stored results:', parseError);
        }
      }

      if (Object.keys(loadedData).length > 0) {
        dispatch({ type: ActionTypes.LOAD_DATA, payload: loadedData });
      }
    } catch (error) {
      console.error('Error loading stored data:', error);
      dispatch({ type: ActionTypes.SET_ERROR, payload: 'Veri yüklenirken hata oluştu' });
    } finally {
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    }
  };

  const saveDataToStorage = async () => {
    try {
      // Don't persist currentUser - always start from login
      // if (state.currentUser) {
      //   try {
      //     await storage.setItem('currentUser', JSON.stringify(state.currentUser));
      //   } catch (error) {
      //     console.warn('Error saving current user:', error);
      //   }
      // }
      try {
        await storage.setItem('quizzes', JSON.stringify(state.quizzes));
        await storage.setItem('quizResults', JSON.stringify(state.quizResults));
      } catch (error) {
        console.warn('Error saving quizzes/results:', error);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  // Action creators
  const addUser = (user) => {
    dispatch({ type: ActionTypes.ADD_USER, payload: user });
  };

  const login = (user) => {
    dispatch({ type: ActionTypes.SET_CURRENT_USER, payload: user });
  };

  const logout = async () => {
    try {
      try {
        await storage.removeItem('currentUser');
      } catch (storageError) {
        console.warn('Error removing user from storage:', storageError);
      }
      dispatch({ type: ActionTypes.LOGOUT });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const addQuiz = (quiz) => {
    const newQuiz = {
      ...quiz,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      teacherId: state.currentUser.id,
      teacherName: state.currentUser.name,
    };
    dispatch({ type: ActionTypes.ADD_QUIZ, payload: newQuiz });
  };

  const updateQuiz = (quiz) => {
    dispatch({ type: ActionTypes.UPDATE_QUIZ, payload: quiz });
  };

  const deleteQuiz = (quizId) => {
    dispatch({ type: ActionTypes.DELETE_QUIZ, payload: quizId });
  };

  const submitQuizResult = (result) => {
    const newResult = {
      ...result,
      id: Date.now().toString(),
      studentId: state.currentUser.id,
      studentName: state.currentUser.name,
      completedAt: new Date().toISOString(),
    };
    dispatch({ type: ActionTypes.ADD_QUIZ_RESULT, payload: newResult });
  };

  const getQuizzesByTeacher = (teacherId) => {
    return state.quizzes.filter(quiz => quiz.teacherId === teacherId);
  };

  const getQuizResultsByStudent = (studentId) => {
    return state.quizResults.filter(result => result.studentId === studentId);
  };

  const getQuizResultsByQuiz = (quizId) => {
    return state.quizResults.filter(result => result.quizId === quizId);
  };

  const value = {
    ...state,
    addUser,
    login,
    logout,
    addQuiz,
    updateQuiz,
    deleteQuiz,
    submitQuizResult,
    getQuizzesByTeacher,
    getQuizResultsByStudent,
    getQuizResultsByQuiz,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
