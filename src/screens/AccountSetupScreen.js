import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

import KidiaBackground from '../components/KidiaBackground';
import KidiaButton from '../components/KidiaButton';
import KidiaInput from '../components/KidiaInput';
import { useApp } from '../context/AppContext';

const AccountSetupScreen = ({ navigation, route }) => {
  const { login, addUser } = useApp();
  const { email, password, role = 'student' } = route.params || {};
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState({
    fullName: '',
    gender: 'Male',
    nickname: '',
    age: role === 'teacher' ? 25 : 5,
    interests: [],
    character: null,
    // Teacher specific fields
    school: '',
    subject: '',
    experience: 1
  });
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);

  const interests = [
    'Science', 'Arts', 'History', 'Languages', 'Software', 'Movies',
    'Math', 'Space', 'Games', 'Animals', 'Music', 'Reading',
    'Sports', 'Food'
  ];

  const teacherSubjects = [
    'Mathematics', 'Science', 'History', 'Geography', 'Language Arts',
    'Art', 'Music', 'Physical Education', 'Computer Science', 'Biology',
    'Chemistry', 'Physics', 'Literature', 'Social Studies', 'Psychology'
  ];

  const characters = [
    { id: 1, name: 'Corgi', emoji: '🐕', color: '#FF6B6B' },
    { id: 2, name: 'Cat', emoji: '🐱', color: '#4ECDC4' },
    { id: 3, name: 'Fox', emoji: '🦊', color: '#45B7D1' },
    { id: 4, name: 'Panda', emoji: '🐼', color: '#96CEB4' },
    { id: 5, name: 'Rabbit', emoji: '🐰', color: '#FFEAA7' }
  ];

  const handleNext = () => {
    if (currentStep === 1) {
      if (!profileData.fullName.trim()) {
        Alert.alert('Hata', 'Lütfen adınızı girin');
        return;
      }
    }

    if (role === 'teacher') {
      if (currentStep === 2) {
        if (!profileData.school.trim()) {
          Alert.alert('Hata', 'Lütfen okul adını girin');
          return;
        }
      }
      if (currentStep === 3) {
        if (!profileData.subject.trim()) {
          Alert.alert('Hata', 'Lütfen bir ders seçin');
          return;
        }
      }
      // Teachers have 4 steps instead of 5
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      // Student flow
      if (currentStep === 4) {
        if (!profileData.character) {
          Alert.alert('Hata', 'Lütfen bir karakter seçin');
          return;
        }
      }
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleComplete = () => {
    // Create user profile and login
    const newUser = {
      id: Date.now(),
      name: profileData.fullName,
      email: email || (role === 'teacher' ? 'teacher@demo.com' : 'student@demo.com'),
      password: password,
      role: role,
      profile: profileData
    };

    // Add user to users list and login
    addUser(newUser);
    login(newUser);
  };

  const toggleInterest = (interest) => {
    const newInterests = profileData.interests.includes(interest)
      ? profileData.interests.filter(i => i !== interest)
      : [...profileData.interests, interest];
    
    setProfileData({ ...profileData, interests: newInterests });
  };

  const selectCharacter = (character) => {
    setProfileData({ ...profileData, character });
  };

  const renderProgressBar = () => {
    const totalSteps = role === 'teacher' ? 4 : 5;
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(currentStep / totalSteps) * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>{currentStep}/{totalSteps}</Text>
      </View>
    );
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>
        {role === 'teacher' ? 'Tell us about yourself' : 'Tell us a bit about our kid'}
      </Text>
      
      <View style={styles.formContainer}>
        <Text style={styles.fieldLabel}>Full name</Text>
        <KidiaInput
          placeholder="Tom"
          value={profileData.fullName}
          onChangeText={(text) => setProfileData({...profileData, fullName: text})}
        />

        <Text style={styles.fieldLabel}>Gender</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowGenderDropdown(!showGenderDropdown)}
        >
          <Text style={styles.dropdownText}>{profileData.gender}</Text>
          <Ionicons
            name={showGenderDropdown ? "chevron-up" : "chevron-down"}
            size={20}
            color="#8B5FBF"
          />
        </TouchableOpacity>

        {showGenderDropdown && (
          <View style={styles.dropdownOptions}>
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => {
                setProfileData({...profileData, gender: 'Male'});
                setShowGenderDropdown(false);
              }}
            >
              <Text style={[styles.dropdownOptionText, profileData.gender === 'Male' && styles.selectedOption]}>
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => {
                setProfileData({...profileData, gender: 'Female'});
                setShowGenderDropdown(false);
              }}
            >
              <Text style={[styles.dropdownOptionText, profileData.gender === 'Female' && styles.selectedOption]}>
                Female
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.fieldLabel}>Nickname (Optional)</Text>
        <KidiaInput
          placeholder=""
          value={profileData.nickname}
          onChangeText={(text) => setProfileData({...profileData, nickname: text})}
        />
      </View>
    </View>
  );

  const renderStep2 = () => {
    if (role === 'teacher') {
      return (
        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>Where do you teach?</Text>
          <Text style={styles.stepSubtitle}>Tell us about your school</Text>

          <View style={styles.formContainer}>
            <Text style={styles.fieldLabel}>School Name</Text>
            <KidiaInput
              placeholder="Enter your school name"
              value={profileData.school}
              onChangeText={(text) => setProfileData({...profileData, school: text})}
            />

            <Text style={styles.fieldLabel}>Teaching Experience</Text>
            <View style={styles.ageContainer}>
              <View style={styles.ageDisplay}>
                <Text style={styles.ageNumber}>{profileData.experience}</Text>
                <Text style={styles.ageUnit}>years</Text>
              </View>

              <View style={styles.sliderContainer}>
                <Slider
                  style={styles.slider}
                  minimumValue={1}
                  maximumValue={30}
                  value={profileData.experience}
                  onValueChange={(value) => setProfileData({...profileData, experience: Math.round(value)})}
                  minimumTrackTintColor="#8B5FBF"
                  maximumTrackTintColor="#E5E7EB"
                  thumbStyle={styles.sliderThumb}
                />
              </View>
            </View>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>How old is your child?</Text>
        <Text style={styles.stepSubtitle}>This will help us set the right content for your child</Text>

        <View style={styles.ageContainer}>
          <View style={styles.ageDisplay}>
            <Text style={styles.ageNumber}>{profileData.age}</Text>
          </View>

          <View style={styles.sliderContainer}>
            <View style={styles.sliderTrack}>
              <View style={styles.sliderNumbers}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <Text key={num} style={styles.sliderNumber}>{num}</Text>
                ))}
              </View>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={10}
                value={profileData.age}
                onValueChange={(value) => setProfileData({...profileData, age: Math.round(value)})}
                minimumTrackTintColor="#8B5FBF"
                maximumTrackTintColor="#E5E7EB"
                thumbStyle={styles.sliderThumb}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderStep3 = () => {
    if (role === 'teacher') {
      return (
        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>What subject do you teach?</Text>
          <Text style={styles.stepSubtitle}>Select your primary teaching subject</Text>

          <View style={styles.interestsContainer}>
            {teacherSubjects.map((subject) => (
              <TouchableOpacity
                key={subject}
                style={[
                  styles.interestChip,
                  profileData.subject === subject && styles.interestChipSelected
                ]}
                onPress={() => setProfileData({...profileData, subject})}
              >
                <Text style={[
                  styles.interestText,
                  profileData.subject === subject && styles.interestTextSelected
                ]}>
                  {subject}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }

    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>What are some of your child's interests?</Text>

        <View style={styles.interestsContainer}>
          {interests.map((interest) => (
            <TouchableOpacity
              key={interest}
              style={[
                styles.interestChip,
                profileData.interests.includes(interest) && styles.interestChipSelected
              ]}
              onPress={() => toggleInterest(interest)}
            >
              <Text style={[
                styles.interestText,
                profileData.interests.includes(interest) && styles.interestTextSelected
              ]}>
                {interest}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderStep4 = () => {
    if (role === 'teacher') {
      return (
        <View style={styles.stepContainer}>
          <View style={styles.congratsContainer}>
            <View style={styles.congratsIcon}>
              <Text style={styles.congratsEmoji}>🎉</Text>
            </View>
            <Text style={styles.congratsTitle}>Welcome to Kidia!</Text>
            <Text style={styles.congratsSubtitle}>
              Your teacher profile is ready. Start creating engaging quizzes for your students!
            </Text>

            <KidiaButton
              variant="primary"
              onPress={handleComplete}
              style={styles.startButton}
            >
              Start Teaching
            </KidiaButton>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Choose your Character</Text>

        <View style={styles.characterContainer}>
          <View style={styles.characterDisplay}>
            {profileData.character ? (
              <Text style={styles.characterEmoji}>{profileData.character.emoji}</Text>
            ) : (
              <View style={styles.characterPlaceholder}>
                <Ionicons name="person" size={60} color="#8B5FBF" />
              </View>
            )}
          </View>

          <View style={styles.characterNavigation}>
            <TouchableOpacity style={styles.navButton}>
              <Ionicons name="chevron-back" size={24} color="#8B5FBF" />
            </TouchableOpacity>

            <View style={styles.characterOptions}>
              {characters.map((character) => (
                <TouchableOpacity
                  key={character.id}
                  style={[
                    styles.characterOption,
                    { backgroundColor: character.color },
                    profileData.character?.id === character.id && styles.characterOptionSelected
                  ]}
                  onPress={() => selectCharacter(character)}
                >
                  <Text style={styles.characterOptionEmoji}>{character.emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.navButton}>
              <Ionicons name="chevron-forward" size={24} color="#8B5FBF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderStep5 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.congratsContainer}>
        <View style={styles.congratsIcon}>
          <Text style={styles.congratsEmoji}>🎉</Text>
        </View>

        <Text style={styles.congratsTitle}>Congratulations!</Text>
        <Text style={styles.congratsSubtitle}>Your account has been successfully created</Text>

        <KidiaButton
          variant="primary"
          onPress={handleComplete}
          style={styles.startButton}
        >
          Start
        </KidiaButton>
      </View>
    </View>
  );

  return (
    <KidiaBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#8B5FBF" />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Account setup</Text>
              {renderProgressBar()}
            </View>
          </View>

          <View style={styles.card}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && role === 'student' && renderStep5()}

            {((role === 'teacher' && currentStep < 4) || (role === 'student' && currentStep < 5)) && (
              <KidiaButton
                variant="primary"
                onPress={handleNext}
                style={styles.continueButton}
              >
                Continue
              </KidiaButton>
            )}

            {role === 'student' && currentStep === 5 && (
              <KidiaButton
                variant="primary"
                onPress={handleComplete}
                style={styles.continueButton}
              >
                Start Learning
              </KidiaButton>
            )}
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
    paddingTop: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8B5FBF',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5FBF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 30,
    flex: 1,
    shadowColor: '#8B5FBF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  stepSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 30,
  },
  formContainer: {
    gap: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 50,
  },
  dropdownText: {
    fontSize: 16,
    color: '#374151',
  },
  dropdownOptions: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#374151',
  },
  selectedOption: {
    color: '#8B5FBF',
    fontWeight: '600',
  },
  ageContainer: {
    alignItems: 'center',
    flex: 1,
  },
  ageDisplay: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  ageNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#8B5FBF',
  },
  ageUnit: {
    fontSize: 16,
    color: '#8B5FBF',
    marginTop: 8,
    fontWeight: '500',
  },
  sliderContainer: {
    width: '100%',
    alignItems: 'center',
  },
  sliderTrack: {
    width: '100%',
  },
  sliderNumbers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sliderNumber: {
    fontSize: 12,
    color: '#6B7280',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderThumb: {
    backgroundColor: '#8B5FBF',
    width: 20,
    height: 20,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  interestChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  interestChipSelected: {
    backgroundColor: '#8B5FBF',
    borderColor: '#8B5FBF',
  },
  interestText: {
    fontSize: 14,
    color: '#6B7280',
  },
  interestTextSelected: {
    color: '#FFFFFF',
  },
  continueButton: {
    marginTop: 40,
  },
  characterContainer: {
    alignItems: 'center',
    flex: 1,
  },
  characterDisplay: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  characterEmoji: {
    fontSize: 80,
  },
  characterPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  characterOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  characterOptionSelected: {
    borderColor: '#8B5FBF',
    transform: [{ scale: 1.1 }],
  },
  characterOptionEmoji: {
    fontSize: 24,
  },
  congratsContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  congratsIcon: {
    marginBottom: 20,
  },
  congratsEmoji: {
    fontSize: 60,
  },
  congratsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  congratsSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 50,
  },
  startButton: {
    width: '100%',
  },
});

export default AccountSetupScreen;
