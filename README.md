# 🎓 Kidia Quiz App

Modern, interactive quiz application designed for children aged 2-11, featuring beautiful UI and separate interfaces for teachers and students.

## ✨ Features

### 👩‍🏫 For Teachers
- ✅ **Modern Dashboard** - Overview with statistics and quick actions
- ✅ **Quiz Management** - Create, edit, and delete quizzes with ease
- ✅ **Student Analytics** - Track student performance and progress
- ✅ **Profile Setup** - Custom teacher profiles with school and subject info
- ✅ **Real-time Stats** - Live quiz statistics and completion rates

### 🎓 For Students
- ✅ **Interactive Quizzes** - Engaging quiz-taking experience
- ✅ **Category Browse** - Organized quiz categories (Math, Science, etc.)
- ✅ **Progress Tracking** - Personal statistics and achievements
- ✅ **Character System** - Choose and customize your learning character
- ✅ **Modern UI** - Child-friendly design with Kidia branding

## 🛠 Technology Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **React Navigation** - Navigation management
- **Expo Linear Gradient** - Beautiful gradient backgrounds
- **AsyncStorage** - Local data persistence
- **Context API** - State management
- **Ionicons** - Modern icon library

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **Git** - Version control system

### 📥 Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/fironihabib/kidia-quizapp.git
cd kidia-quizapp
```

2. **Install dependencies:**
```bash
npm install
# or if you prefer yarn
yarn install
```

3. **Install Expo CLI globally (if not already installed):**
```bash
npm install -g @expo/cli
```

4. **Start the development server:**
```bash
npm start
# or
expo start
```

5. **Run the app:**
   - **📱 Mobile**:
     - Install [Expo Go](https://expo.dev/client) on your phone
     - Scan the QR code displayed in terminal/browser
   - **🌐 Web**: Press `w` in terminal or open http://localhost:8081
   - **🤖 Android**: Press `a` in terminal (requires Android Studio/emulator)
   - **🍎 iOS**: Press `i` in terminal (requires Xcode/simulator - macOS only)

## 🎮 How to Use

### 🆕 First Time Setup
1. **Launch the app** - You'll see the beautiful Kidia splash screen
2. **Choose your role:**
   - **👩‍🏫 Teacher** - Create and manage quizzes, track student progress
   - **🎓 Student** - Take quizzes and track your learning progress
3. **Create your profile** - Follow the guided setup process

### 👩‍🏫 For Teachers
1. **Profile Setup** (4 steps):
   - Personal information
   - School details and teaching experience
   - Subject specialization
   - Welcome and start teaching!

2. **Dashboard Features:**
   - **📊 Overview** - Statistics and quick actions
   - **📚 Quiz Management** - Create, edit, delete quizzes
   - **👥 Student Analytics** - Track student performance

### 🎓 For Students
1. **Profile Setup** (5 steps):
   - Personal information
   - Age selection
   - Interest selection
   - Character choice
   - Welcome and start learning!

2. **Learning Features:**
   - **🏠 Dashboard** - Browse quiz categories
   - **📝 Take Quizzes** - Interactive quiz experience
   - **📊 Track Progress** - View your achievements

## 👥 Demo Users (for testing)

The app includes pre-loaded demo users you can select during login:

### Teachers
- **Ayşe Öğretmen** - Mathematics teacher
- **Mehmet Öğretmen** - Science teacher

### Students
- **Ali Öğrenci** - 8 years old, loves science
- **Zehra Öğrenci** - 6 years old, interested in arts

## 🏗 Project Structure

```
kidia-quizapp/
├── 📁 src/
│   ├── 📁 components/       # Reusable UI components
│   │   ├── KidiaButton.js   # Custom button component
│   │   ├── KidiaInput.js    # Custom input component
│   │   ├── KidiaLogo.js     # Kidia logo component
│   │   └── ...
│   ├── 📁 context/          # State management
│   │   └── AppContext.js    # Global app state
│   ├── 📁 data/            # Mock data and constants
│   ├── 📁 navigation/      # Navigation configuration
│   │   └── AppNavigator.js  # Main navigation setup
│   ├── 📁 screens/         # App screens
│   │   ├── LoginScreen.js   # Login and role selection
│   │   ├── TeacherDashboard.js  # Teacher main screen
│   │   ├── StudentDashboard.js  # Student main screen
│   │   └── ...
│   └── 📁 utils/           # Utility functions
├── 📁 assets/              # Images and icons
├── 📄 App.js               # Main app component
├── 📄 package.json         # Dependencies and scripts
└── 📄 README.md           # This file
```

## 🎨 Design Features

### 🌈 Kidia Branding
- **Custom Logo** - Multi-colored geometric Kidia logo
- **Gradient Backgrounds** - Beautiful pink-purple gradients
- **Modern UI** - Card-based design with shadows and rounded corners

### 👶 Child-Friendly Design
- **Large Touch Targets** - Easy for small fingers
- **Bright Colors** - Engaging and fun color scheme
- **Clear Typography** - Easy-to-read fonts and sizes
- **Visual Feedback** - Animations and progress indicators

## 🔧 Development Commands

```bash
# Start development server
npm start

# Run on specific platforms
npm run android    # Android device/emulator
npm run ios        # iOS device/simulator
npm run web        # Web browser

# Other useful commands
expo doctor        # Check for common issues
expo install       # Install compatible package versions
expo build         # Build for production (legacy)
eas build          # Build with EAS (recommended)
```

## 🛠 Troubleshooting

### Common Issues & Solutions

**📱 Metro bundler issues:**
```bash
# Clear cache and restart
expo start --clear
# or
npx expo start --clear
```

**📦 Package version conflicts:**
```bash
# Install compatible versions
expo install --fix
```

**🌐 Web not loading:**
- Make sure you're using a modern browser
- Check if port 8081 is available
- Try opening http://localhost:8081 manually

**📱 Expo Go connection issues:**
- Ensure phone and computer are on same WiFi network
- Try using tunnel mode: `expo start --tunnel`

## 📊 Key Features in Detail

### 🎯 Quiz System
- **📝 Multiple Choice Questions** - 4 options per question
- **⚡ Real-time Feedback** - Instant answer validation
- **📊 Custom Scoring** - Flexible point system
- **🔄 Retake Option** - Practice makes perfect
- **📈 Progress Tracking** - Visual progress indicators

### 👩‍🏫 Teacher Tools
- **📊 Analytics Dashboard** - Student performance insights
- **📚 Quiz Library** - Organize by categories and subjects
- **👥 Student Management** - Track individual progress
- **📈 Statistics** - Completion rates and average scores

### 🎓 Student Experience
- **🎮 Gamified Learning** - Character system and achievements
- **📱 Mobile-First Design** - Optimized for touch interaction
- **🌈 Visual Appeal** - Colorful, engaging interface
- **🏆 Achievement System** - Motivational progress tracking

## 🌐 Platform Support

| Platform | Status | Notes |
|----------|--------|-------|
| 📱 **iOS** | ✅ Full Support | Via Expo Go or standalone build |
| 🤖 **Android** | ✅ Full Support | Via Expo Go or standalone build |
| 🌐 **Web** | ✅ Full Support | Modern browsers, responsive design |
| 💻 **Desktop** | ✅ Web Version | Runs in browser with mobile viewport |

## 💾 Data & Storage

- **📱 Mobile**: AsyncStorage for persistent data
- **🌐 Web**: localStorage for browser storage
- **🔄 Sync**: No external database required
- **💾 Persistence**: Data survives app restarts
- **🧹 Reset**: Easy data clearing for development

## 🎓 Educational Design

### Age-Appropriate Features (2-11 years)
- **👆 Large Touch Targets** - Easy interaction for small hands
- **🎨 Bright Colors** - Engaging visual design
- **📝 Simple Language** - Clear, age-appropriate text
- **🎵 Audio Feedback** - Sound effects and encouragement
- **🏆 Positive Reinforcement** - Celebration of achievements

### Learning Categories
- 🔢 **Mathematics** - Numbers, counting, basic operations
- 🔬 **Science** - Nature, experiments, discovery
- 📚 **History** - Stories from the past
- 🌍 **Geography** - World exploration
- 📖 **Language** - Reading, vocabulary, grammar
- 🎨 **Art** - Creativity and expression

## 🚀 Deployment

### Development
```bash
# Local development
npm start
```

### Production Build
```bash
# Web build
expo build:web

# Mobile builds (requires EAS)
eas build --platform ios
eas build --platform android
```

## 📝 License

This project is developed for **Kidia Educational Platform**.

## 🤝 Future Enhancements

For production deployment, consider adding:
- 🔐 **User Authentication** - Secure login system
- 🗄️ **Backend Database** - Cloud data storage
- 🎵 **Multimedia Support** - Audio/video questions
- 🌍 **Multi-language** - Internationalization
- ♿ **Accessibility** - Screen reader support
- 📊 **Advanced Analytics** - Detailed learning insights

---

## 💝 About Kidia

**Kidia** is dedicated to empowering children's education through innovative technology. This quiz app represents our commitment to creating engaging, educational experiences that make learning fun and accessible for all children.

### 🌟 Our Mission
*"Making quality education accessible and enjoyable for every child, everywhere."*

---

**🎓 Developed with ❤️ for Kidia** - *Transforming Education Through Technology*
