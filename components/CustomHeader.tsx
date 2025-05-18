import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Menu, HelpCircle } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';

interface CustomHeaderProps {
  title: string;
  showHelp?: boolean;
  onHelpPress?: () => void;
}

export default function CustomHeader({ title, showHelp = false, onHelpPress }: CustomHeaderProps) {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleMenuPress = () => {
    // Add your menu logic here
    signOut();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
        <Menu size={24} color="#000" />
      </TouchableOpacity>
      
      <Text style={styles.title}>{title}</Text>
      
      {showHelp && (
        <TouchableOpacity onPress={onHelpPress} style={styles.helpButton}>
          <HelpCircle size={24} color="#000" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  helpButton: {
    padding: 8,
  },
}); 