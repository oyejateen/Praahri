import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Menu, HelpCircle } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';
import HelpModal from '@/components/HelpModal';

interface HeaderProps {
  showHelp?: boolean;
  onHelpPress?: () => void;
}

export default function Header({ showHelp = false, onHelpPress }: HeaderProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.menuButton}
        onPress={() => {
          // Add your menu navigation logic here
        }}
      >
        <Menu size={24} color={Colors.gray[800]} />
      </TouchableOpacity>

      <Text style={styles.title}>Praahri</Text>

      {showHelp ? (
        <TouchableOpacity 
          style={styles.helpButton}
          onPress={onHelpPress}
        >
          <HelpCircle size={24} color={Colors.gray[800]} />
        </TouchableOpacity>
      ) : (
        <View style={styles.helpButton} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 24,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  menuButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.gray[900],
  },
  helpButton: {
    padding: 8,
    width: 40,
    alignItems: 'center',
  },
});