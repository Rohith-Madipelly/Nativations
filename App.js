import { View, Text } from 'react-native'
import React from 'react'
import Screen from './app/Screens'
import { store } from './app/redux/store'
import { Provider } from 'react-redux'
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Path to the JKS file
const jksFilePath = Platform.select({
  // ios: `${FileSystem.documentDirectory}/path/to/your/file.jks`,
  android: `/vardhaman-satyasadhna-key.keystore`,
});

// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();
export default function App() {
  // <StatusBar translucent={true} backgroundColor="transparent" />
  // const [appIsReady, setAppIsReady] = useState(false);
  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       // Pre-load fonts, make any API calls you need to do here
  //       await Font.loadAsync(Entypo.font);
  //       // Artificially delay for two seconds to simulate a slow loading
  //       // experience. Please remove this if you copy and paste the code!
  //       await new Promise(resolve => setTimeout(resolve, 2000));
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       // Tell the application to render
  //       setAppIsReady(true);
  //     }
  //   }

  //   prepare();
  // }, []);

  // const onLayoutRootView = useCallback(async () => {
  //   if (appIsReady) {
  //     // This tells the splash screen to hide immediately! If we call this after
  //     // `setAppIsReady`, then we may see a blank screen while the app is
  //     // loading its initial state and rendering its first pixels. So instead,
  //     // we hide the splash screen once we know the root view has already
  //     // performed layout.
  //     // await SplashScreen.hideAsync();
  //   }
  // }, [appIsReady]);

  // if (!appIsReady) {
  //   return null;
  // }



  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1}}>
        <StatusBar
          animated={true}
          backgroundColor="#006AFF"
          barStyle={'dark-content'}
        />
        <Provider store={store}>
          <Screen />
          <Toast />
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}
