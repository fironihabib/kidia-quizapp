# Kidia Quiz App

A React Native quiz application designed for children aged 2-11, featuring separate interfaces for teachers and students.

## 🎯 Features

### For Teachers
- ✅ Create and manage quizzes
- ✅ Add multiple-choice questions with customizable points
- ✅ Edit existing quizzes
- ✅ View quiz statistics and student results
- ✅ Delete quizzes

### For Students
- ✅ Browse available quizzes
- ✅ Take quizzes with interactive interface
- ✅ View detailed results and scores
- ✅ Retake quizzes for practice
- ✅ Track progress and statistics

## 🛠 Technology Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **React Navigation** - Navigation management
- **React Native Paper** - Material Design UI components
- **AsyncStorage** - Local data persistence
- **Context API** - State management

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Expo Go app (for mobile testing)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kidia-quizapp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Test the app:
   - **Mobile**: Scan QR code with Expo Go app
   - **Web**: Open http://localhost:8081 in browser

## 👥 Demo Users

### Teachers
- **Ayşe Öğretmen** (ayse@kidia.com)
- **Mehmet Öğretmen** (mehmet@kidia.com)

### Students
- **Ali Öğrenci** (ali@kidia.com)
- **Zehra Öğrenci** (zehra@kidia.com)

## 📱 Usage

1. **Login**: Select your role (Teacher/Student) and choose a demo user
2. **Teachers**: Create quizzes, add questions, and monitor student progress
3. **Students**: Browse quizzes, take tests, and view your results

## 🏗 Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # State management
├── data/               # Mock data and constants
├── navigation/         # Navigation configuration
├── screens/            # App screens
├── utils/              # Utility functions
└── types/              # TypeScript type definitions
```

## 🎨 Design

The app features a child-friendly design with:
- Bright, engaging colors
- Large, easy-to-tap buttons
- Clear typography
- Intuitive navigation
- Progress indicators

## 🔧 Development

### Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser

### Key Components

- **AppContext**: Global state management
- **AppNavigator**: Navigation structure
- **WebSafe Components**: Cross-platform UI components
- **Storage Wrapper**: Platform-specific data persistence

## 📊 Features in Detail

### Quiz Management
- Create quizzes with title and description
- Add multiple-choice questions (4 options each)
- Set point values for each question
- Edit and delete existing quizzes

### Quiz Taking
- Step-by-step question navigation
- Progress tracking
- Answer selection with visual feedback
- Immediate result calculation

### Results & Analytics
- Detailed score breakdown
- Question-by-question analysis
- Performance statistics
- Historical data tracking

## 🌐 Cross-Platform Support

The app runs on:
- **iOS** (via Expo Go or standalone build)
- **Android** (via Expo Go or standalone build)
- **Web** (modern browsers)

## 🔒 Data Storage

- Local storage using AsyncStorage (mobile) and localStorage (web)
- No external database required
- Data persists between app sessions

## 🎓 Educational Focus

Designed specifically for Kidia's educational platform:
- Age-appropriate interface (2-11 years)
- Simple, intuitive interactions
- Encouraging feedback and progress tracking
- Teacher tools for curriculum management

## 📝 License

This project is developed for Kidia educational platform.

## 🤝 Contributing

This is a demo project for Kidia. For production use, consider:
- Adding user authentication
- Implementing a backend database
- Adding more question types
- Including multimedia support
- Adding accessibility features

---

**Developed for Kidia** - Empowering children's education through technology
