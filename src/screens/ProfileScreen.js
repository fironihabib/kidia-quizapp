import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import KidiaButton from '../components/KidiaButton';
import { useApp } from '../context/AppContext';

const { width } = Dimensions.get('window');

const ProfileScreen = ({ navigation }) => {
  const { currentUser, logout } = useApp();
  const [showExpandedMenu, setShowExpandedMenu] = useState(false);

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

  // Challenge data
  const challengeData = [
    { title: 'Daily\nChallenge\nStreak', value: '15', icon: '🔥' },
    { title: 'Weekly\nChallenge\nStreak', value: '2', icon: '🔥' },
    { title: 'Monthly\nChallenge\nStreak', value: '0', icon: '🔥' },
  ];

  const menuItems = [
    { icon: 'settings-outline', title: 'Settings', color: '#8B7CF6' },
    { icon: 'shield-checkmark-outline', title: 'Privacy', color: '#8B7CF6' },
    { icon: 'document-text-outline', title: 'Terms & conditions', color: '#8B7CF6' },
    { icon: 'star-outline', title: 'Rate this app', color: '#8B7CF6' },
  ];

  const renderChallengeCard = (item, index) => (
    <View key={index} style={styles.challengeCard}>
      <Text style={styles.challengeTitle}>{item.title}</Text>
      <View style={styles.challengeValue}>
        <Text style={styles.challengeIcon}>{item.icon}</Text>
        <Text style={styles.challengeNumber}>{item.value}</Text>
      </View>
    </View>
  );

  const renderMenuItem = (item, index) => (
    <TouchableOpacity key={index} style={styles.menuItem}>
      <View style={[styles.menuIconContainer, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon} size={20} color="white" />
      </View>
      <Text style={styles.menuItemText}>{item.title}</Text>
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  if (showExpandedMenu) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#F8BBD9', '#E879F9', '#C084FC']}
          style={styles.gradient}
        >
          <ScrollView style={styles.scrollView}>
            {/* Header with close button */}
            <View style={styles.expandedHeader}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowExpandedMenu(false)}
              >
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Challenge Cards */}
            <View style={styles.challengeContainer}>
              {challengeData.map(renderChallengeCard)}
            </View>

            {/* Achievement Progress */}
            <View style={styles.achievementContainer}>
              <Text style={styles.achievementTitle}>Total Achievements Unlocked</Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '22%' }]} />
                </View>
                <Text style={styles.progressText}>12/55</Text>
              </View>
            </View>

            {/* Parent Zone */}
            <TouchableOpacity style={styles.parentZone}>
              <Text style={styles.parentZoneText}>Parent Zone</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            {/* Menu Items */}
            <View style={styles.menuContainer}>
              {menuItems.map(renderMenuItem)}
            </View>

            {/* Edit Profile & Logout */}
            <View style={styles.bottomActions}>
              <TouchableOpacity style={styles.editProfileButton}>
                <Ionicons name="create-outline" size={20} color="#6B7280" />
                <Text style={styles.editProfileText}>Edit Profile</Text>
                <Ionicons name="information-circle-outline" size={20} color="#6B7280" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.logoutButtonExpanded} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={20} color="#EF4444" />
                <Text style={styles.logoutText}>Logout</Text>
                <Ionicons name="close-circle" size={20} color="#EF4444" />
              </TouchableOpacity>

              <KidiaButton
                title="Done"
                onPress={() => setShowExpandedMenu(false)}
                style={styles.doneButton}
              />
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F8BBD9', '#E879F9', '#C084FC']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={24} color="#6B7280" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile</Text>
          </View>

          {/* User Info */}
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>🦊</Text>
              </View>
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>Full Name (Tom)</Text>
              <Text style={styles.userAge}>age: 5 yrs</Text>
            </View>
            <TouchableOpacity style={styles.moreButton}>
              <Ionicons name="ellipsis-horizontal" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* Challenge Cards */}
          <View style={styles.challengeContainer}>
            {challengeData.map(renderChallengeCard)}
          </View>

          {/* Achievement Progress */}
          <View style={styles.achievementContainer}>
            <Text style={styles.achievementTitle}>Total Achievements Unlocked</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '22%' }]} />
              </View>
              <Text style={styles.progressText}>12/55</Text>
            </View>
          </View>

          {/* Parent Zone */}
          <TouchableOpacity style={styles.parentZone}>
            <Text style={styles.parentZoneText}>Parent Zone</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => {
                  if (index === 0) setShowExpandedMenu(true);
                }}
              >
                <View style={[styles.menuIconContainer, { backgroundColor: item.color }]}>
                  <Ionicons name={item.icon} size={20} color="white" />
                </View>
                <Text style={styles.menuItemText}>{item.title}</Text>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  // Header styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 16,
  },
  expandedHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 20,
    paddingBottom: 10,
  },
  closeButton: {
    padding: 8,
  },
  // User info styles
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#F59E0B',
  },
  avatarText: {
    fontSize: 28,
  },
  userDetails: {
    flex: 1,
    paddingVertical: 4,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  userAge: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '500',
  },
  moreButton: {
    padding: 12,
    borderRadius: 8,
  },
  // Challenge cards styles
  challengeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  challengeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 12,
    width: (width - 60) / 3,
    alignItems: 'center',
  },
  challengeTitle: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 14,
    marginBottom: 8,
  },
  challengeValue: {
    alignItems: 'center',
  },
  challengeIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  challengeNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F59E0B',
  },
  // Achievement styles
  achievementContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  achievementTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8B7CF6',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B7CF6',
  },
  // Parent zone styles
  parentZone: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  parentZoneText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  // Menu styles
  menuContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 4,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  menuIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  // Bottom actions styles
  bottomActions: {
    marginBottom: 20,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  editProfileText: {
    flex: 1,
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 12,
  },
  logoutButtonExpanded: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  logoutText: {
    flex: 1,
    fontSize: 16,
    color: '#EF4444',
    marginLeft: 12,
  },
  doneButton: {
    marginTop: 10,
  },
});

export default ProfileScreen;
