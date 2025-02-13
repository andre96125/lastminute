import React, {useState, useMemo} from 'react';
import {View, FlatList, StyleSheet, ViewStyle} from 'react-native';
import {Searchbar, Text} from 'react-native-paper';
import HotelCard from './HotelCard';
import {Hotel} from '../types/Hotel';
import {Dropdown} from 'react-native-paper-dropdown';

interface Props {
  hotels: Hotel[];
  style: ViewStyle;
}

enum SortOptions {
  PriceLow = 'priceLow',
  PriceHigh = 'priceHigh',
  Rating = 'rating',
  Stars = 'stars',
}

enum StarRatings {
  All = 'all',
  ThreeStars = '3',
  FourStars = '4',
  FiveStars = '5',
}

enum MinRatings {
  All = '0',
  SixPlus = '6',
  SevenPlus = '7',
  EightPlus = '8',
  NinePlus = '9',
}

const CustomIcon: React.FC<{name: string; size?: number; color?: string}> = ({
  name,
  size = 24,
  color = 'black',
}) => {
  const iconMap: {[key: string]: string} = {
    search: '🔍',
    cancel: 'Ⓧ',
  };

  return <Text style={{fontSize: size, color}}>{iconMap[name] || ''}</Text>;
};

const HotelList: React.FC<Props> = ({hotels, style}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState(SortOptions.PriceLow);
  const [minRating, setMinRating] = useState(MinRatings.All);
  const [selectedStars, setSelectedStars] = useState(StarRatings.All);

  // Handle Search
  const filteredHotels = useMemo(() => {
    return hotels
      .filter(
        hotel =>
          hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          hotel.userRating >= parseInt(minRating) &&
          (selectedStars !== StarRatings.All
            ? hotel.stars === parseInt(selectedStars)
            : true),
      )
      .sort((a, b) => {
        if (sortOption === SortOptions.PriceLow) return a.price - b.price;
        if (sortOption === SortOptions.PriceHigh) return b.price - a.price;
        if (sortOption === SortOptions.Rating)
          return b.userRating - a.userRating;
        if (sortOption === SortOptions.Stars) return b.stars - a.stars;
        return 0;
      });
  }, [hotels, searchQuery, sortOption, minRating, selectedStars]);

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <Searchbar
        placeholder="Search hotels..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchBar}
        icon={() => CustomIcon({name: 'search'})}
        clearIcon={() => CustomIcon({name: 'cancel'})}
      />

      <View style={styles.dropdown}>
        {/* Sorting Options */}
        <Dropdown
          label="Sort by"
          options={[
            {label: 'Price: Low to High', value: SortOptions.PriceLow},
            {label: 'Price: High to Low', value: SortOptions.PriceHigh},
            {label: 'User Rating', value: SortOptions.Rating},
            {label: 'Stars', value: SortOptions.Stars},
          ]}
          value={sortOption}
          onSelect={value => setSortOption(value as SortOptions)}
        />

        {/* Star Rating Filter */}
        <Dropdown
          label="Star Rating"
          options={[
            {label: 'All', value: StarRatings.All},
            {label: '3 Stars', value: StarRatings.ThreeStars},
            {label: '4 Stars', value: StarRatings.FourStars},
            {label: '5 Stars', value: StarRatings.FiveStars},
          ]}
          value={selectedStars}
          onSelect={value => setSelectedStars(value as StarRatings)}
        />

        {/* Minimum Rating Filter */}
        <Dropdown
          label="Minimum Rating"
          options={[
            {label: 'All Ratings', value: MinRatings.All},
            {label: '6+', value: MinRatings.SixPlus},
            {label: '7+', value: MinRatings.SevenPlus},
            {label: '8+', value: MinRatings.EightPlus},
            {label: '9+', value: MinRatings.NinePlus},
          ]}
          value={minRating}
          onSelect={value => setMinRating(value as MinRatings)}
        />
      </View>
      {/* Render Hotel List */}
      <FlatList
        data={filteredHotels}
        contentContainerStyle={style}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <HotelCard hotel={item} onPress={() => console.log(item.name)} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  searchBar: {marginBottom: 10},
  dropdown: {marginBottom: 10, gap: 10},
});

export default HotelList;
