import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Platform } from 'react-native';

// Types
interface Location {
  latitude: number;
  longitude: number;
}

interface Polygon {
  id: string;
  name: string;
  points: Location[];
  createdAt: string;
}

interface EmptyPolygon {
  id: string;
  name: string;
  points: Location[];
}

interface LocationContextType {
  currentLocation: Location | null;
  selectedPolygon: EmptyPolygon;
  savedPolygons: Polygon[];
  isLoading: boolean;
  addPoint: (point: Location) => void;
  removeLastPoint: () => void;
  clearPolygon: () => void;
  savePolygon: () => void;
  selectSavedPolygon: (index: number) => void;
}

// Create the context
const LocationContext = createContext<LocationContextType | undefined>(undefined);

// Provider component
export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [selectedPolygon, setSelectedPolygon] = useState<EmptyPolygon>({
    id: '',
    name: '',
    points: [],
  });
  const [savedPolygons, setSavedPolygons] = useState<Polygon[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load saved polygons from storage on app start
  useEffect(() => {
    const loadSavedPolygons = async () => {
      try {
        const savedPolygonsJson = await AsyncStorage.getItem('@savedPolygons');
        if (savedPolygonsJson) {
          setSavedPolygons(JSON.parse(savedPolygonsJson));
        }
      } catch (error) {
        console.error('Error loading saved polygons:', error);
      }
    };

    loadSavedPolygons();
    
    // Set a default location for demo purposes
    setCurrentLocation({
      latitude: 37.78825,
      longitude: -122.4324,
    });
  }, []);

  // Save polygons to storage whenever they change
  useEffect(() => {
    const savePolygonsToStorage = async () => {
      try {
        await AsyncStorage.setItem('@savedPolygons', JSON.stringify(savedPolygons));
      } catch (error) {
        console.error('Error saving polygons:', error);
      }
    };

    if (savedPolygons.length > 0) {
      savePolygonsToStorage();
    }
  }, [savedPolygons]);

  // Add a point to the current polygon
  const addPoint = (point: Location) => {
    setSelectedPolygon(prev => ({
      ...prev,
      points: [...prev.points, point],
    }));
  };

  // Remove the last point from the current polygon
  const removeLastPoint = () => {
    if (selectedPolygon.points.length === 0) return;
    
    setSelectedPolygon(prev => ({
      ...prev,
      points: prev.points.slice(0, -1),
    }));
  };

  // Clear the current polygon
  const clearPolygon = () => {
    setSelectedPolygon({
      id: '',
      name: '',
      points: [],
    });
  };

  // Save the current polygon
  const savePolygon = () => {
    if (selectedPolygon.points.length < 3) {
      Alert.alert('Error', 'A polygon needs at least 3 points');
      return;
    }

    const newPolygon: Polygon = {
      id: Date.now().toString(),
      name: `Land Area ${savedPolygons.length + 1}`,
      points: [...selectedPolygon.points],
      createdAt: new Date().toISOString(),
    };

    setSavedPolygons(prev => [...prev, newPolygon]);
    
    // Keep the polygon selected after saving
    setSelectedPolygon({
      ...newPolygon,
    });
  };

  // Select a saved polygon
  const selectSavedPolygon = (index: number) => {
    if (index >= 0 && index < savedPolygons.length) {
      const polygon = savedPolygons[index];
      setSelectedPolygon({
        id: polygon.id,
        name: polygon.name,
        points: [...polygon.points],
      });
    }
  };

  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        selectedPolygon,
        savedPolygons,
        isLoading,
        addPoint,
        removeLastPoint,
        clearPolygon,
        savePolygon,
        selectSavedPolygon,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

// Hook for using the location context
export const useLocationContext = () => {
  const context = useContext(LocationContext);
  
  if (context === undefined) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  
  return context;
};