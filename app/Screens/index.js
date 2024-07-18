import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useMemo, useEffect, useCallback } from "react";


import ASO from "../utils/AsyncStorage_Calls";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from '../redux/actions/loginAction'


import VideoScreen from './MainScreen/VideoScreen';




import Login from "./AuthScreen/Login";
import Register from "./AuthScreen/Register copy";
import ForgotPassword from "./AuthScreen/ForgotPassword";
import BottomTabScreen from "../Navigations/BottomTabScreen";
// import DownloadScreen123 from "../../Hello.js/DownloadScreen123";
import OtpSender from "./AuthScreen/OtpSender";
import OtpVerify from "./AuthScreen/OtpVerify";

import Reloading from "./Demo/Reloading";
// import FormScreen123 from "./MainScreen/OtherPages/FormScreen123";
import FormScreen from "./MainScreen/OtherPages/FormScreen";
import DeleteAccount from "./MainScreen/OtherPages/DeleteAccount";
import PrivacyPolicy from "./MainScreen/OtherPages/PrivacyPolicy";
import About from "./MainScreen/OtherPages/About";
import Help from "./MainScreen/OtherPages/Help";
import ChangePassword from "./MainScreen/OtherPages/ChangePassword";
import UpdateProfile from "./MainScreen/OtherPages/UpdateProfile";
import About_Guruji from "./MainScreen/OtherPages/About_Guruji";
import SatyaSadhana from "./MainScreen/OtherPages/SatyaSadhana";

import * as SplashScreen from 'expo-splash-screen';

import ErrorBoundary from "react-native-error-boundary";
import NetInfo from '@react-native-community/netinfo';
import { Alert, View, Text } from "react-native";
import AudioScreen from "./MainScreen/AudioScreen";
import YoutudeScreen from "./MainScreen/YoutudeScreen";



// SplashScreen.preventAutoHideAsync();
export default function Screens() {
  const [user, setUser] = useState()

  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();

  const loginSelector = useSelector((state) => state.isLogin);
  console.log(">>>>>>>>>>>>>>>>>isLogin", loginSelector)



  // Method to verifiy where user is login or not from async-storage
  const verifyToken = async () => {

    ASO.getTokenJWT('Token', (error, token) => {
      if (error) {
        console.error('Error getting token:', error);
      } else {
        if (token != null) {
          dispatch(setToken(token));
        }
      }
      setAppIsReady(true);

    });

  }




  useEffect(() => {
    setUser(loginSelector)
  }, [loginSelector])


  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await verifyToken();
    };
    fetchData();
  }, []);

  console.log("Cs",appIsReady)
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      console.log("Cs")
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }


  const CustomFallback = (props) => (
    <View>
      <Text> Ooops! Got Error</Text>
    </View>
  );



  return (
    // <NavigationContainer >
    <NavigationContainer onLayout={onLayoutRootView}>
      <ErrorBoundary FallbackComponent={CustomFallback}>
        <Stack.Navigator
          // initialRouteName={user ? 'Bottom-navigator' : 'Register'}
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Group >
            {user ? (
              <>
                {/* <Stack.Screen name="FormScreen12" component={FormScreenChecker} /> */}

                {/* <Stack.Screen name="FormScreen" component={FormScreen} /> */}
                <Stack.Screen name="BottomTabScreen" component={BottomTabScreen} />
                <Stack.Screen name="VideoScreen" component={VideoScreen} />
                <Stack.Screen name="AudioScreen" component={AudioScreen} />
                <Stack.Screen name="YoutudeScreen" component={YoutudeScreen} />
                <Stack.Screen name="FormScreen" component={FormScreen} />

                <Stack.Screen name="About_Guruji" component={About_Guruji} />
                <Stack.Screen name="About_SatyaSadhana" component={SatyaSadhana} />
                <Stack.Screen name="FullProfile" component={UpdateProfile} />
                <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
                <Stack.Screen name="ProfilePassword" component={ChangePassword} />
                <Stack.Screen name="About" component={About} />
                <Stack.Screen name="Help" component={Help} />
                <Stack.Screen name="Privacy Policy" component={PrivacyPolicy} />
              </>
            ) : (
              <>

                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="ForgotPasswordEmail" component={OtpSender} />
                <Stack.Screen name="OtpVerify" component={OtpVerify} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                {/* <Stack.Screen name="Register" component={Register} /> */}
                {/* <Stack.Screen name="ForgotPassword" component={ForgotPassword} /> */}
              </>
            )
            }
          </Stack.Group>
        </Stack.Navigator>
      </ErrorBoundary>
    </NavigationContainer>
  );
}

