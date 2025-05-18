import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { X } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface HelpModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function HelpModal({ visible, onClose }: HelpModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={Colors.gray[800]} />
          </TouchableOpacity>

          <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>How to Use the Map</Text>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>1. Drawing Mode</Text>
              <Text style={styles.sectionText}>
                • Select "Draw" mode to start marking your land area{'\n'}
                • Tap on the map to place points{'\n'}
                • Create at least 3 points to form a polygon{'\n'}
                • Use "Edit" mode to adjust existing points{'\n'}
                • Switch to "View" mode to explore the map
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>2. Managing Areas</Text>
              <Text style={styles.sectionText}>
                • Save your marked areas for future reference{'\n'}
                • View previously saved areas on the map{'\n'}
                • Tap on saved areas to select them{'\n'}
                • Use the clear button to remove current selection
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>3. Navigation</Text>
              <Text style={styles.sectionText}>
                • Pan and zoom the map using touch gestures{'\n'}
                • Use the location button to center on your position{'\n'}
                • Double tap to zoom in{'\n'}
                • Two-finger pinch to zoom out
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>4. Analysis</Text>
              <Text style={styles.sectionText}>
                • Select a saved area to analyze{'\n'}
                • Navigate to the Analysis tab{'\n'}
                • Choose time periods for comparison{'\n'}
                • View detailed vegetation change results
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    width: '90%',
    maxHeight: '80%',
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
  },
  scrollView: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.gray[900],
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 10,
    color: Colors.primary[600],
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.gray[700],
    fontFamily: 'Inter-Regular',
  },
}); 