import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { formatDate } from '@/utils/dateHelpers';
import { getSatelliteImageUrl } from '@/utils/mapHelpers';

// Types
interface Location {
  latitude: number;
  longitude: number;
}

interface Polygon {
  id: string;
  name: string;
  points: Location[];
}

interface AnalysisResult {
  id: string;
  date: string;
  polygonId: string;
  ndviDifference: number;
  imageUrl: string;
  status: 'no-change' | 'possible-illegal';
  details: string;
}

interface HistoryItem {
  id: string;
  date: string;
  location: string;
  ndviDifference: number;
  imageUrl: string;
  status: 'no-change' | 'possible-illegal';
}

interface AnalysisContextType {
  startDate1: Date | null;
  endDate1: Date | null;
  startDate2: Date | null;
  endDate2: Date | null;
  setStartDate1: (date: Date | null) => void;
  setEndDate1: (date: Date | null) => void;
  setStartDate2: (date: Date | null) => void;
  setEndDate2: (date: Date | null) => void;
  analysisResult: AnalysisResult | null;
  analysisHistory: HistoryItem[];
  isLoading: boolean;
  error: string | null;
  performAnalysis: (polygon: Polygon) => Promise<void>;
}

// Create the context
const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

// Provider component
export const AnalysisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Date range states
  const [startDate1, setStartDate1] = useState<Date | null>(null);
  const [endDate1, setEndDate1] = useState<Date | null>(null);
  const [startDate2, setStartDate2] = useState<Date | null>(null);
  const [endDate2, setEndDate2] = useState<Date | null>(null);
  
  // Analysis states
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Set default dates
  useEffect(() => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
    const fifteenDaysAgo = new Date(now.getTime() - (15 * 24 * 60 * 60 * 1000));
    const fifteenDaysAhead = new Date(now.getTime() + (15 * 24 * 60 * 60 * 1000));
    
    setStartDate1(thirtyDaysAgo);
    setEndDate1(fifteenDaysAgo);
    setStartDate2(now);
    setEndDate2(fifteenDaysAhead);
  }, []);

  // Load analysis history from storage on app start
  useEffect(() => {
    const loadAnalysisHistory = async () => {
      try {
        const historyJson = await AsyncStorage.getItem('@analysisHistory');
        if (historyJson) {
          setAnalysisHistory(JSON.parse(historyJson));
        }
      } catch (error) {
        console.error('Error loading analysis history:', error);
      }
    };

    loadAnalysisHistory();
  }, []);

  // Save analysis history to storage whenever it changes
  useEffect(() => {
    const saveHistoryToStorage = async () => {
      try {
        await AsyncStorage.setItem('@analysisHistory', JSON.stringify(analysisHistory));
      } catch (error) {
        console.error('Error saving analysis history:', error);
      }
    };

    if (analysisHistory.length > 0) {
      saveHistoryToStorage();
    }
  }, [analysisHistory]);

  const performAnalysis = async (polygon: Polygon) => {
    try {
      setIsLoading(true);
      setError(null);

      // Get satellite image URL for the polygon
      const imageUrl = getSatelliteImageUrl(polygon);
      
      // Your existing analysis logic here
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create analysis result
      const result: AnalysisResult = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        polygonId: polygon.id,
        ndviDifference: -0.15 + (Math.random() * 0.3), // Mock NDVI calculation
        imageUrl: imageUrl,
        status: Math.random() > 0.5 ? 'no-change' : 'possible-illegal',
        details: 'Analysis complete. Review the vegetation changes in the satellite imagery.',
      };

      setAnalysisResult(result);

      // Add to history
      const historyItem: HistoryItem = {
        id: result.id,
        date: result.date,
        location: polygon.name || `Area ${analysisHistory.length + 1}`,
        ndviDifference: result.ndviDifference,
        imageUrl: result.imageUrl,
        status: result.status,
      };

      setAnalysisHistory(prev => [historyItem, ...prev]);
      
    } catch (err) {
      setError('Failed to perform analysis. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnalysisContext.Provider
      value={{
        startDate1,
        endDate1,
        startDate2,
        endDate2,
        setStartDate1,
        setEndDate1,
        setStartDate2,
        setEndDate2,
        analysisResult,
        analysisHistory,
        isLoading,
        error,
        performAnalysis,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

// Hook for using the analysis context
export const useAnalysisContext = () => {
  const context = useContext(AnalysisContext);
  
  if (context === undefined) {
    throw new Error('useAnalysisContext must be used within an AnalysisProvider');
  }
  
  return context;
};

export { AnalysisProvider }

export { useAnalysisContext }