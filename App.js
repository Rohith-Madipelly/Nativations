import Screen from './app/Screens'
import { store } from './app/redux/store'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from 'react-native-toast-notifications'
import Metrics from './app/utils/ResposivesUtils/Metrics'
import { AudioProvider } from './app/context/AudioProvider'
import FloatingPlayer from './FloatingPlayer'


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
          placement="bottom"
          duration={5000}
          animationType='slide-in'
          animationDuration={250}
          successColor="green"
          dangerColor="red"
          // dangerColor="red"
          warningColor="orange"
          offset={50} // offset for both top and bottom toasts
          offsetTop={1}
          offsetBottom={Metrics.rfv(70)}
          swipeEnabled={true}
        >

          <Provider store={store}>
            <AudioProvider>
            <Screen />
            <Toast />
      
          </AudioProvider>
          </Provider>
        </ToastProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}
