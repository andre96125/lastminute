import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  Alert,
  Dimensions,
} from 'react-native';
import {Button, Card, Divider} from 'react-native-paper';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'HotelDetail'>;

const {width} = Dimensions.get('window');

const HotelDetailScreen: React.FC<Props> = ({route}) => {
  const {bottom} = useSafeAreaInsets();

  const {hotel} = route.params;
  const [imageError, setImageError] = useState<{[key: number]: boolean}>({});

  const images =
    hotel.gallery.length > 0
      ? hotel.gallery
      : ['https://fakeimg.pl/600x400?text=No+Image'];

  const handleCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`).catch(() =>
      Alert.alert('Phone call is not supported on this device'),
    );
  };

  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`).catch(() =>
      Alert.alert('Email is not supported on this device'),
    );
  };

  const handleImageError = (index: number) => {
    setImageError(prevError => ({
      ...prevError,
      [index]: true,
    }));
  };

  return (
    <View style={styles.container}>
      {/* Image Carousel */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.imageScroll}>
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image
              source={{
                uri: imageError[index]
                  ? 'https://fakeimg.pl/600x400?text=No+Image'
                  : image,
              }}
              style={styles.image}
              onError={() => handleImageError(index)}
            />
          </View>
        ))}
      </ScrollView>
      <ScrollView
        contentContainerStyle={[
          styles.contentContainer,
          {paddingBottom: bottom},
        ]}>
        {/* Hotel Details */}
        <Text style={styles.hotelName}>{hotel.name}</Text>
        <Text style={styles.stars}>{'⭐'.repeat(hotel.stars)}</Text>
        <Text style={styles.userRating}>
          User Rating: {hotel.userRating}/10
        </Text>
        <Text style={styles.price}>
          {hotel.price} {hotel.currency} / night
        </Text>

        {/* Check-in & Check-out Info */}
        <Card style={styles.card}>
          <Card.Title
            title="Check-in & Check-out"
            titleStyle={styles.cardTitle}
          />
          <Card.Content>
            <Text style={styles.checkInOut}>
              Check-in: {hotel.checkIn.from} - {hotel.checkIn.to}
            </Text>
            <Text style={styles.checkInOut}>
              Check-out: {hotel.checkOut.from} - {hotel.checkOut.to}
            </Text>
          </Card.Content>
        </Card>

        {/* Contact Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => handleCall(hotel.contact.phoneNumber)}
            style={styles.ctaButton}>
            Call: {hotel.contact.phoneNumber}
          </Button>
          <Button
            mode="outlined"
            onPress={() => handleEmail(hotel.contact.email)}
            style={styles.ctaButton}>
            Email: {hotel.contact.email}
          </Button>
        </View>

        {/* Address */}
        <Divider style={styles.divider} />
        <Text style={styles.address}>
          📍 {hotel.location.address}, {hotel.location.city}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  imageScroll: {
    maxHeight: 250,
  },
  imageContainer: {
    width: width,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  hotelName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
    color: '#333',
  },
  stars: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 5,
  },
  userRating: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007AFF',
    marginBottom: 15,
  },
  card: {
    marginVertical: 12,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  checkInOut: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
    marginVertical: 3,
  },
  buttonContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  ctaButton: {
    width: '90%',
    marginVertical: 8,
    borderRadius: 30,
    paddingVertical: 5,
  },
  divider: {
    marginVertical: 15,
    backgroundColor: '#E0E0E0',
    height: 1,
  },
  address: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default HotelDetailScreen;
