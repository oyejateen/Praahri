import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Pencil, Hand, Eye, Trash2 } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import * as Haptics from 'expo-haptics';

interface DrawingModeSelectorProps {
  mode: 'draw' | 'edit' | 'view';
  onModeChange: (mode: 'draw' | 'edit' | 'view') => void;
  onClear: () => void;
}

const DrawingModeSelector: React.FC<DrawingModeSelectorProps> = ({
  mode,
  onModeChange,
  onClear,
}) => {
  const handleModeChange = (newMode: 'draw' | 'edit' | 'view') => {
    onModeChange(newMode);
    
    // Trigger haptic feedback on iOS/Android
    if (Platform.OS !== 'web') {
      Haptics.selectionAsync();
    }
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, mode === 'draw' && styles.activeButton]}
        onPress={() => handleModeChange('draw')}
      >
        <Pencil 
          size={22} 
          color={mode === 'draw' ? Colors.white : Colors.gray[600]} 
        />
        <Text 
          style={[styles.buttonText, mode === 'draw' && styles.activeText]}
        >
          Draw
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.button, mode === 'edit' && styles.activeButton]}
        onPress={() => handleModeChange('edit')}
      >
        <Hand 
          size={22} 
          color={mode === 'edit' ? Colors.white : Colors.gray[600]} 
        />
        <Text 
          style={[styles.buttonText, mode === 'edit' && styles.activeText]}
        >
          Edit
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.button, mode === 'view' && styles.activeButton]}
        onPress={() => handleModeChange('view')}
      >
        <Eye 
          size={22} 
          color={mode === 'view' ? Colors.white : Colors.gray[600]} 
        />
        <Text 
          style={[styles.buttonText, mode === 'view' && styles.activeText]}
        >
          View
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.button, styles.clearButton]}
        onPress={onClear}
      >
        <Trash2 size={22} color={Colors.error[600]} />
        <Text style={[styles.buttonText, styles.clearText]}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  activeButton: {
    backgroundColor: Colors.primary[600],
  },
  clearButton: {
    backgroundColor: Colors.gray[100],
  },
  buttonText: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.gray[700],
  },
  activeText: {
    color: Colors.white,
  },
  clearText: {
    color: Colors.error[600],
  },
});

export default DrawingModeSelector;