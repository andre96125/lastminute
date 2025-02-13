/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {PaperProvider} from 'react-native-paper';

const CustomIcon = props => {
  return null; // No icon rendering fon react-native-paper without vector-icons
};

export default function Main() {
  return (
    <PaperProvider settings={{icon: CustomIcon}}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
