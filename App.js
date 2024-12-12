import { View, Text } from 'react-native'
import React from 'react'
import Screen from './app/Screens'
import { store } from './app/redux/store'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from 'react-native-toast-notifications'
// Path to the JKS file
const jksFilePath = Platform.select({
  // ios: `${FileSystem.documentDirectory}/path/to/your/file.jks`,
  android: `/vardhaman-satyasadhna-key.keystore`,
});

// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();
export default function App() {

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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ToastProvider
          // renderType={{
          //   custom_type: (toast) => (
          //     <View style={{ padding: 15, backgroundColor: 'grey' }}>
          //       <Text>{toast.message}</Text>
          //     </View>
          //   )
          // }}

          placement="bottom | top"
          duration={5000}
          animationType='slide-in | zoom-in'
          animationDuration={250}
          successColor="green"
          dangerColor="red"
          // dangerColor="red"
          warningColor="orange"
          normalColor="rgba(100, 116, 139, 1)"
          // icon={<Icon />}
          // successIcon={<SuccessIcon />}
          // dangerIcon={<DangerIcon />}
          // warningIcon={<WarningIcon />}
          textStyle={{ fontSize: 20 }}
          offset={50} // offset for both top and bottom toasts
          offsetTop={30}
          offsetBottom={160}
          swipeEnabled={true}
        // renderToast={(toastOptions) => JSX.Element}
        >
          <Provider store={store}>
            <Screen />
            <Toast />
          </Provider>
        </ToastProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}
