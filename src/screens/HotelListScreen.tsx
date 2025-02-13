import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {Hotel} from '../types/Hotel';
import HotelList from '../components/HotelList';
import {fetchHotels} from '../api/hotels';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const HotelListScreen: React.FC = () => {
  const {top, bottom} = useSafeAreaInsets();

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHotels = async () => {
      try {
        const data = await fetchHotels();
        setHotels(data);
      } catch (err) {
        setError('Failed to load hotels. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadHotels();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <HotelList hotels={hotels} style={{paddingBottom: bottom}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10},
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  errorText: {color: 'red', fontSize: 16},
});

export default HotelListScreen;
