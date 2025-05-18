import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, Platform, ScrollView, Alert } from 'react-native';
import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useLocationContext } from '@/context/LocationContext';
import { MapPin, Trash2, Save } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import DrawingModeSelector from '@/components/map/DrawingModeSelector';
import Button from '@/components/common/Button';
import { router } from 'expo-router';

// Bhilwara, Rajasthan coordinates
const BHILWARA_REGION = {
  latitude: 25.3407,
  longitude: 74.6313,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function HomeScreen() {
  const mapRef = useRef<MapView>(null);
  const { 
    currentLocation, 
    selectedPolygon, 
    addPoint, 
    removeLastPoint, 
    clearPolygon,
    savePolygon,
    savedPolygons,
    selectSavedPolygon,
    isLoading
  } = useLocationContext();
  const [drawingMode, setDrawingMode] = useState<'draw' | 'edit' | 'view'>('view');
  const [mapRegion, setMapRegion] = useState(BHILWARA_REGION);

  const handleMapPress = (e: any) => {
    if (drawingMode === 'draw') {
      const { latitude, longitude } = e.nativeEvent.coordinate;
      addPoint({ latitude, longitude });
      
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }
  };

  const handleSavePolygon = () => {
    if (selectedPolygon.points.length < 3) {
      Alert.alert('Error', 'Please draw at least 3 points to create a polygon');
      return;
    }
    
    savePolygon();
    setDrawingMode('view');
    
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const handleAnalyze = () => {
    router.push('/analysis');
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={BHILWARA_REGION}
        onPress={handleMapPress}
        showsUserLocation
        showsMyLocationButton
      >
        {selectedPolygon.points.length > 0 && (
          <Polygon
            coordinates={selectedPolygon.points}
            strokeWidth={2}
            strokeColor={Colors.primary[700]}
            fillColor={`${Colors.primary[500]}40`}
          />
        )}
        
        {drawingMode === 'draw' && selectedPolygon.points.map((point, index) => (
          <Marker
            key={`point-${index}`}
            coordinate={point}
            pinColor={Colors.primary[500]}
            title={`Point ${index + 1}`}
          />
        ))}
        
        {savedPolygons.map((polygon, polygonIndex) => (
          <Polygon
            key={`polygon-${polygonIndex}`}
            coordinates={polygon.points}
            strokeWidth={2}
            strokeColor={Colors.secondary[700]}
            fillColor={`${Colors.secondary[500]}40`}
            tappable
            onPress={() => {
              selectSavedPolygon(polygonIndex);
              if (Platform.OS !== 'web') {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }
            }}
          />
        ))}
      </MapView>
      
      <View style={styles.drawingModeContainer}>
        <DrawingModeSelector
          mode={drawingMode}
          onModeChange={setDrawingMode}
          onClear={() => {
            clearPolygon();
            if (Platform.OS !== 'web') {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }
          }}
        />
      </View>
      
      {drawingMode === 'draw' && selectedPolygon.points.length > 0 && (
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={removeLastPoint}
          >
            <Trash2 size={24} color={Colors.error[500]} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.saveButton]}
            onPress={handleSavePolygon}
          >
            <Save size={24} color={Colors.white} />
            <Text style={styles.saveButtonText}>Save Area</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {(drawingMode === 'view' && selectedPolygon.points.length >= 3) && (
        <View style={styles.analyzeButtonContainer}>
          <Button 
            title="Analyze This Area" 
            onPress={handleAnalyze}
            isLoading={isLoading}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  map: {
    flex: 1,
  },
  drawingModeContainer: {
    position: 'absolute',
    top: 1,
    alignSelf: 'center',
    zIndex: 1,
  },
  actionButtonsContainer: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    zIndex: 1,
  },
  actionButton: {
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 48,
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: Colors.primary[600],
    paddingHorizontal: 24,
    minWidth: 120,
  },
  saveButtonText: {
    color: Colors.white,
    fontFamily: 'Inter-Medium',
    marginLeft: 8,
    fontSize: 16,
  },
  analyzeButtonContainer: {
    position: 'absolute',
    bottom: 40,
    width: '90%',
    alignSelf: 'center',
    zIndex: 1,
  },
});