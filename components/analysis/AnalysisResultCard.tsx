import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '@/constants/Colors';
import { AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface AnalysisResultCardProps {
  ndviDifference: number;
  imageUrl: string;
  period1: string;
  period2: string;
  status: 'no-change' | 'possible-illegal';
  details: string;
}

const AnalysisResultCard: React.FC<AnalysisResultCardProps> = ({
  ndviDifference,
  imageUrl,
  period1,
  period2,
  status,
  details,
}) => {
  const [imageError, setImageError] = useState(false);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);
  
  React.useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
    scale.value = withTiming(1, { duration: 400 });
  }, []);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });
  
  const getStatusColor = () => {
    return status === 'no-change' ? Colors.success[500] : Colors.error[500];
  };
  
  const getStatusIcon = () => {
    return status === 'no-change' ? (
      <CheckCircle size={24} color={Colors.success[500]} />
    ) : (
      <AlertTriangle size={24} color={Colors.error[500]} />
    );
  };
  
  const getStatusText = () => {
    return status === 'no-change' ? 'No Significant Change' : 'Possible Illegal Activity';
  };
  
  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.imageContainer}>
        <Image 
          source={imageError ? require('@/assets/images/analysis-placeholder.jpg') : { uri: imageUrl }}
          style={styles.image}
          onError={() => setImageError(true)}
        />
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>{getStatusText()}</Text>
        </View>
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.periodContainer}>
          <View style={styles.periodItem}>
            <Text style={styles.periodLabel}>First Period:</Text>
            <Text style={styles.periodValue}>{period1}</Text>
          </View>
          <View style={styles.periodItem}>
            <Text style={styles.periodLabel}>Second Period:</Text>
            <Text style={styles.periodValue}>{period2}</Text>
          </View>
        </View>
        
        <View style={styles.resultContainer}>
          <View style={styles.ndviContainer}>
            <Text style={styles.ndviLabel}>NDVI Difference:</Text>
            <Text style={[styles.ndviValue, { color: getStatusColor() }]}>
              {ndviDifference.toFixed(3)}
            </Text>
          </View>
          
          <View style={styles.statusContainer}>
            {getStatusIcon()}
            <Text style={[styles.statusDetailText, { color: getStatusColor() }]}>
              {getStatusText()}
            </Text>
          </View>
          
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsText}>{details}</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.helpButton}>
          <HelpCircle size={20} color={Colors.primary[600]} />
          <Text style={styles.helpText}>What does this mean?</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  statusBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: Colors.white,
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  infoContainer: {
    padding: 16,
  },
  periodContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  periodItem: {
    flex: 1,
  },
  periodLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.gray[600],
    marginBottom: 4,
  },
  periodValue: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.gray[800],
  },
  resultContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
    paddingTop: 16,
  },
  ndviContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ndviLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.gray[700],
    marginRight: 8,
  },
  ndviValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusDetailText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginLeft: 8,
  },
  detailsContainer: {
    marginTop: 8,
  },
  detailsText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.gray[700],
    lineHeight: 20,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  helpText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.primary[600],
    marginLeft: 8,
  },
});

export default AnalysisResultCard;