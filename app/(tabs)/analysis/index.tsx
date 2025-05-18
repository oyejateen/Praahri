import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocationContext } from '@/context/LocationContext';
import { useAnalysisContext } from '@/context/AnalysisContext';
import Button from '@/components/common/Button';
import DateRangePicker from '@/components/analysis/DateRangePicker';
import AnalysisResultCard from '@/components/analysis/AnalysisResultCard';
import EmptyState from '@/components/common/EmptyState';
import Colors from '@/constants/Colors';
import { AlertCircle } from 'lucide-react-native';
import { formatDate } from '@/utils/dateHelpers';
import HelpModal from '@/components/HelpModal';

export default function AnalysisScreen() {
  const { selectedPolygon, savedPolygons } = useLocationContext();
  const { 
    startDate1, 
    endDate1, 
    startDate2, 
    endDate2,
    setStartDate1,
    setEndDate1,
    setStartDate2,
    setEndDate2,
    analysisResult,
    isLoading,
    performAnalysis,
    error
  } = useAnalysisContext();

  const [showHelp, setShowHelp] = useState(false);

  const handleAnalysis = async () => {
    if (selectedPolygon.points.length < 3) {
      Alert.alert('Error', 'Please select a valid land area first from the Map tab');
      return;
    }

    if (!startDate1 || !endDate1 || !startDate2 || !endDate2) {
      Alert.alert('Error', 'Please select both date ranges for comparison');
      return;
    }

    await performAnalysis(selectedPolygon);
  };

  const noPolygonSelected = selectedPolygon.points.length < 3;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {noPolygonSelected ? (
          <EmptyState
            title="No Land Area Selected"
            message="Please go to the Map tab and select or draw a land area to analyze"
            icon={<AlertCircle size={60} color={Colors.gray[400]} />}
          />
        ) : (
          <>
            <View style={styles.dateRangeSection}>
              <Text style={styles.sectionTitle}>Select Time Periods for Comparison</Text>
              
              <View style={styles.dateRangeContainer}>
                <Text style={styles.dateRangeLabel}>First Period:</Text>
                <DateRangePicker
                  startDate={startDate1}
                  endDate={endDate1}
                  onStartDateChange={setStartDate1}
                  onEndDateChange={setEndDate1}
                  maxDate={new Date()}
                />
              </View>
              
              <View style={styles.dateRangeContainer}>
                <Text style={styles.dateRangeLabel}>Second Period:</Text>
                <DateRangePicker
                  startDate={startDate2}
                  endDate={endDate2}
                  onStartDateChange={setStartDate2}
                  onEndDateChange={setEndDate2}
                  maxDate={new Date()}
                />
              </View>
              
              <Button
                title="Analyze Vegetation Changes"
                onPress={handleAnalysis}
                isLoading={isLoading}
                style={styles.analyzeButton}
              />
            </View>
            
            {error && (
              <View style={styles.errorContainer}>
                <AlertCircle size={24} color={Colors.error[500]} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
            
            {analysisResult && (
              <View style={styles.resultSection}>
                <Text style={styles.sectionTitle}>Analysis Results</Text>
                <AnalysisResultCard
                  ndviDifference={analysisResult.ndviDifference}
                  imageUrl={analysisResult.imageUrl}
                  period1={`${formatDate(startDate1)} to ${formatDate(endDate1)}`}
                  period2={`${formatDate(startDate2)} to ${formatDate(endDate2)}`}
                  status={analysisResult.status}
                  details={analysisResult.details}
                />
              </View>
            )}
          </>
        )}
      </ScrollView>

      <HelpModal
        visible={showHelp}
        onClose={() => setShowHelp(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
  },
  dateRangeSection: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
    color: Colors.gray[900],
  },
  dateRangeContainer: {
    marginBottom: 16,
  },
  dateRangeLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
    color: Colors.gray[700],
  },
  analyzeButton: {
    marginTop: 8,
  },
  resultSection: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.error[50],
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.error[200],
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.error[700],
    marginLeft: 8,
    flex: 1,
  },
});