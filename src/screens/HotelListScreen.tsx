import React, {useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import {Hotel} from '../types/Hotel';
import HotelCard from '../components/HotelCard';
import {API_URL} from '../constants/globalConst';

const HotelListScreen = ({navigation}: any) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setHotels(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching hotels:', error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Hotels in London" />
      </Appbar.Header>

      {loading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <FlatList
          data={hotels}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <HotelCard
              hotel={item}
              onPress={() => navigation.navigate('HotelDetail', {hotel: item})}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f5f5f5'},
  loader: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default HotelListScreen;
