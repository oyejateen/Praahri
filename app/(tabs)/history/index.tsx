import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '@/components/common/EmptyState';
import HistoryCard from '@/components/history/HistoryCard';
import Colors from '@/constants/Colors';
import { useAnalysisContext } from '@/context/AnalysisContext';
import { History } from 'lucide-react-native';
import HelpModal from '@/components/HelpModal';

export default function HistoryScreen() {
  const { analysisHistory } = useAnalysisContext();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={analysisHistory}
        keyExtractor={(item, index) => `history-${index}`}
        renderItem={({ item }) => (
          <HistoryCard 
            date={item.date}
            location={item.location}
            status={item.status}
            ndviDifference={item.ndviDifference}
            imageUrl={item.imageUrl}
            onPress={() => {
              // Navigate to detailed view or re-analyze
            }}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState
            title="No Analysis History"
            message="Your analysis history will appear here once you've performed analyses"
            icon={<History size={60} color={Colors.gray[400]} />}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  listContent: {
    padding: 16,
  },
  scrollView: {
    flex: 1,
  },
});