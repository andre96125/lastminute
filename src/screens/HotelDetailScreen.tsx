import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  Dimensions,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {Hotel} from '../types/Hotel';
import MapView, {Marker} from 'react-native-maps';
import {Button, Card} from 'react-native-paper';

interface HotelDetailScreenProps {
  route: RouteProp<{params: {hotel: Hotel}}, 'params'>;
}

const {width} = Dimensions.get('window');

const HotelDetailScreen: React.FC<HotelDetailScreenProps> = ({route}) => {
  const {hotel} = route.params;
  const [imageError, setImageError] = useState<{[key: number]: boolean}>({});

  const images =
    hotel.gallery.length > 0
      ? hotel.gallery
      : ['https://fakeimg.pl/300x200?text=No+Image'];

  const handleCall = (phoneNumber: string) => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.canOpenURL(phoneUrl)
      .then(supported => {
        if (supported) {
          Linking.openURL(phoneUrl);
        } else {
          Alert.alert('Phone call is not supported on this device');
        }
      })
      .catch(() => Alert.alert('Phone call is not supported on this device'));
  };

  const handleEmail = (email: string) => {
    const emailUrl = `mailto:${email}`;
    Linking.canOpenURL(emailUrl)
      .then(supported => {
        if (supported) {
          Linking.openURL(emailUrl);
        } else {
          Alert.alert('Email is not supported on this device');
        }
      })
      .catch(() => Alert.alert('Email is not supported on this device'));
  };

  const handleImageError = (index: number) => {
    setImageError(prevError => ({
      ...prevError,
      [index]: true,
    }));
  };

  const renderImage = (image: string, index: number) => (
    <View key={index} style={styles.imageContainer}>
      <Image
        source={{
          uri: imageError[index]
            ? 'https://fakeimg.pl/300x200?text=No+Image'
            : image,
        }}
        style={styles.image}
        onError={() => handleImageError(index)}
      />
    </View>
  );

  const renderContactButton = (label: string, onPress: () => void) => (
    <Button mode="contained" onPress={onPress} style={styles.ctaButton}>
      {label}
    </Button>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        {images.map(renderImage)}
      </ScrollView>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.hotelName}>{hotel.name}</Text>
        <Text style={styles.stars}>{'⭐'.repeat(hotel.stars)}</Text>
        <Text style={styles.userRating}>Rating: {hotel.userRating}/10</Text>
        <Text style={styles.price}>
          {hotel.price} {hotel.currency} per night
        </Text>

        <Card style={styles.card}>
          <Card.Title
            title="Check-in/Check-out"
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

        {renderContactButton(`Call us: ${hotel.contact.phoneNumber}`, () =>
          handleCall(hotel.contact.phoneNumber),
        )}
        {renderContactButton(`Email: ${hotel.contact.email}`, () =>
          handleEmail(hotel.contact.email),
        )}

        <Text style={styles.text}>
          Address: {hotel.location.address}, {hotel.location.city}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    maxHeight: 250,
  },
  imageContainer: {
    width: width,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
  },
  hotelName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  stars: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5,
  },
  userRating: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  location: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
  },
  checkInOut: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
  },
  text: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginVertical: 10,
  },
  card: {
    marginVertical: 10,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#f9f9f9',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ctaButton: {
    marginVertical: 10,
    borderRadius: 25,
  },
  contentContainer: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
});

export default HotelDetailScreen;
