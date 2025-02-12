import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HotelListScreen from './src/screens/HotelListScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HotelList">
          <Stack.Screen
            name="HotelList"
            component={HotelListScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const App = () => <AppNavigator />;

export default App;
