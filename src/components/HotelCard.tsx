import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {Hotel} from '../types/Hotel';

const PLACEHOLDER_IMAGE = 'https://fakeimg.pl/300x200?text=No+Image';

interface Props {
  hotel: Hotel;
  onPress: () => void;
}

const HotelCard: React.FC<Props> = ({hotel, onPress}) => {
  const [imageError, setImageError] = useState(false);
  const hotelImage =
    hotel.gallery.length > 0 ? hotel.gallery[0] : PLACEHOLDER_IMAGE;

  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.card}>
        <Image
          source={{uri: imageError ? PLACEHOLDER_IMAGE : hotelImage}}
          style={styles.image}
          onError={() => setImageError(true)} // Set error state when image fails to load
        />
        <Card.Content>
          <Text variant="titleLarge">{hotel.name}</Text>
          <Text variant="bodyMedium">{hotel.location.city}</Text>
          <Text variant="bodySmall">
            ⭐ {hotel.stars} | Rating: {hotel.userRating}
          </Text>
          <Text variant="bodySmall">
            💰 {hotel.price} {hotel.currency}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {marginVertical: 10, overflow: 'hidden'},
  image: {width: '100%', height: 150},
});

export default HotelCard;
