import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { formatDate } from '@/utils/dateHelpers';

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  minDate,
  maxDate,
}) => {
  const [showStartPicker, setShowStartPicker] = React.useState(false);
  const [showEndPicker, setShowEndPicker] = React.useState(false);

  const handleStartDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || startDate;

    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      setShowStartPicker(false);
    }

    if (currentDate) {
      onStartDateChange(currentDate);
      
      // If end date is before start date, update end date
      if (endDate && currentDate > endDate) {
        onEndDateChange(currentDate);
      }
    }
  };

  const handleEndDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || endDate;

    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      setShowEndPicker(false);
    }

    if (currentDate) {
      onEndDateChange(currentDate);
      
      // If start date is after end date, update start date
      if (startDate && currentDate < startDate) {
        onStartDateChange(currentDate);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowStartPicker(true)}
        >
          <Calendar size={20} color={Colors.gray[600]} />
          <Text style={styles.dateText}>
            {startDate ? formatDate(startDate) : 'Select start date'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.separator}>to</Text>

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowEndPicker(true)}
        >
          <Calendar size={20} color={Colors.gray[600]} />
          <Text style={styles.dateText}>
            {endDate ? formatDate(endDate) : 'Select end date'}
          </Text>
        </TouchableOpacity>
      </View>

      {(showStartPicker || showEndPicker) && Platform.OS === 'web' && (
        <View style={styles.webPickerContainer}>
          {showStartPicker && (
            <View style={styles.webPicker}>
              <Text style={styles.webPickerTitle}>Select Start Date</Text>
              <DateTimePicker
                value={startDate || new Date()}
                mode="date"
                onChange={handleStartDateChange}
                minimumDate={minDate}
                maximumDate={maxDate || endDate}
              />
              <TouchableOpacity
                style={styles.webPickerButton}
                onPress={() => setShowStartPicker(false)}
              >
                <Text style={styles.webPickerButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          )}

          {showEndPicker && (
            <View style={styles.webPicker}>
              <Text style={styles.webPickerTitle}>Select End Date</Text>
              <DateTimePicker
                value={endDate || new Date()}
                mode="date"
                onChange={handleEndDateChange}
                minimumDate={startDate || minDate}
                maximumDate={maxDate}
              />
              <TouchableOpacity
                style={styles.webPickerButton}
                onPress={() => setShowEndPicker(false)}
              >
                <Text style={styles.webPickerButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {showStartPicker && Platform.OS !== 'web' && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          onChange={handleStartDateChange}
          minimumDate={minDate}
          maximumDate={maxDate || endDate}
        />
      )}

      {showEndPicker && Platform.OS !== 'web' && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          onChange={handleEndDateChange}
          minimumDate={startDate || minDate}
          maximumDate={maxDate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray[100],
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flex: 1,
  },
  dateText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.gray[800],
  },
  separator: {
    marginHorizontal: 10,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.gray[500],
  },
  webPickerContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    zIndex: 1000,
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  webPicker: {
    padding: 16,
    alignItems: 'center',
  },
  webPickerTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 12,
    color: Colors.gray[800],
  },
  webPickerButton: {
    marginTop: 16,
    backgroundColor: Colors.primary[600],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  webPickerButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.white,
  },
});

export default DateRangePicker;