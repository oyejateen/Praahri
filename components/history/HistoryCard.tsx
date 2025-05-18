import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { formatDate } from '@/utils/dateHelpers';
import { AlertTriangle, CheckCircle } from 'lucide-react-native';

interface HistoryCardProps {
  date: string;
  location: string;
  status: 'no-change' | 'possible-illegal';
  ndviDifference: number;
  imageUrl: string;
  onPress: () => void;
}

const HistoryCard: React.FC<HistoryCardProps> = ({
  date,
  location,
  status,
  ndviDifference,
  imageUrl,
  onPress,
}) => {
  const formattedDate = formatDate(new Date(date));
  
  const getStatusColor = () => {
    return status === 'no-change' ? Colors.success[500] : Colors.error[500];
  };
  
  const getStatusIcon = () => {
    return status === 'no-change' ? (
      <CheckCircle size={20} color={Colors.success[500]} />
    ) : (
      <AlertTriangle size={20} color={Colors.error[500]} />
    );
  };
  
  const getStatusText = () => {
    return status === 'no-change' ? 'No Significant Change' : 'Possible Illegal Activity';
  };
  
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.dateText}>{formattedDate}</Text>
        <Text style={styles.locationText}>{location}</Text>
        
        <View style={styles.statusContainer}>
          {getStatusIcon()}
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {getStatusText()}
          </Text>
        </View>
        
        <View style={styles.ndviContainer}>
          <Text style={styles.ndviLabel}>NDVI Difference:</Text>
          <Text style={[styles.ndviValue, { color: getStatusColor() }]}>
            {ndviDifference.toFixed(3)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
    padding: 12,
  },
  dateText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.gray[600],
    marginBottom: 4,
  },
  locationText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.gray[900],
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 6,
  },
  ndviContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ndviLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.gray[700],
    marginRight: 4,
  },
  ndviValue: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
  },
});

export default HistoryCard;