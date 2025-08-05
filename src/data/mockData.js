// Mock data for the quiz app
export const mockQuizzes = [
  {
    id: '1',
    title: 'Matematik Temelleri',
    description: 'Temel matematik işlemleri',
    teacherId: 'teacher1',
    teacherName: 'Ayşe Öğretmen',
    createdAt: '2024-01-15',
    questions: [
      {
        id: 'q1',
        question: '5 + 3 = ?',
        options: ['6', '7', '8', '9'],
        correctAnswer: 2, // index of correct answer
        points: 10
      },
      {
        id: 'q2',
        question: '12 - 4 = ?',
        options: ['6', '7', '8', '9'],
        correctAnswer: 2,
        points: 10
      },
      {
        id: 'q3',
        question: '3 × 4 = ?',
        options: ['10', '11', '12', '13'],
        correctAnswer: 2,
        points: 10
      },
      {
        id: 'q4',
        question: '15 ÷ 3 = ?',
        options: ['3', '4', '5', '6'],
        correctAnswer: 2,
        points: 10
      }
    ]
  },
  {
    id: '2',
    title: 'Türkçe Kelimeler',
    description: 'Temel Türkçe kelime bilgisi',
    teacherId: 'teacher1',
    teacherName: 'Ayşe Öğretmen',
    createdAt: '2024-01-16',
    questions: [
      {
        id: 'q5',
        question: '"Kitap" kelimesinin çoğulu nedir?',
        options: ['Kitaplar', 'Kitapları', 'Kitaba', 'Kitabın'],
        correctAnswer: 0,
        points: 10
      },
      {
        id: 'q6',
        question: '"Güzel" kelimesinin zıt anlamlısı nedir?',
        options: ['İyi', 'Kötü', 'Çirkin', 'Büyük'],
        correctAnswer: 2,
        points: 10
      },
      {
        id: 'q7',
        question: 'Hangi kelime isimdir?',
        options: ['Koşmak', 'Güzel', 'Masa', 'Hızlı'],
        correctAnswer: 2,
        points: 10
      }
    ]
  },
  {
    id: '3',
    title: 'Fen Bilgisi',
    description: 'Temel fen bilgisi soruları',
    teacherId: 'teacher2',
    teacherName: 'Mehmet Öğretmen',
    createdAt: '2024-01-17',
    questions: [
      {
        id: 'q8',
        question: 'Güneş sisteminde kaç gezegen vardır?',
        options: ['7', '8', '9', '10'],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 'q9',
        question: 'Su hangi sıcaklıkta donar?',
        options: ['0°C', '10°C', '100°C', '-10°C'],
        correctAnswer: 0,
        points: 10
      }
    ]
  }
];

export const mockUsers = [
  {
    id: 'teacher1',
    name: 'Ayşe Öğretmen',
    role: 'teacher',
    email: 'ayse@kidia.com'
  },
  {
    id: 'teacher2',
    name: 'Mehmet Öğretmen',
    role: 'teacher',
    email: 'mehmet@kidia.com'
  },
  {
    id: 'student1',
    name: 'Ali Öğrenci',
    role: 'student',
    email: 'ali@kidia.com'
  },
  {
    id: 'student2',
    name: 'Zehra Öğrenci',
    role: 'student',
    email: 'zehra@kidia.com'
  }
];

// Mock quiz results
export const mockQuizResults = [
  {
    id: 'result1',
    quizId: '1',
    studentId: 'student1',
    studentName: 'Ali Öğrenci',
    score: 30,
    totalPoints: 40,
    correctAnswers: 3,
    totalQuestions: 4,
    completedAt: '2024-01-18T10:30:00Z',
    answers: [
      { questionId: 'q1', selectedAnswer: 2, isCorrect: true },
      { questionId: 'q2', selectedAnswer: 1, isCorrect: false },
      { questionId: 'q3', selectedAnswer: 2, isCorrect: true },
      { questionId: 'q4', selectedAnswer: 2, isCorrect: true }
    ]
  }
];
