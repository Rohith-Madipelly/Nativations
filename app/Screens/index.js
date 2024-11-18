import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useMemo, useEffect, useCallback } from "react";


import ASO from "../utils/AsyncStorage_Calls";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from '../redux/actions/loginAction'


import VideoScreen from './MainScreen/VideoScreen';

import { SafeAreaProvider } from 'react-native-safe-area-context';


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
import { useFonts } from 'expo-font';
import Donation from "./MainScreen/OtherPages/Donation";
import BackIcons from "../assets/SVGS/Navigation/BackIcons";
import { TouchableOpacity } from "react-native";
import QuotesScreen from "./MainScreen/QuotesScreen";
import TracksAudios from "./MainScreen/TracksAudios";
import TracksListByCategory from "./MainScreen/TracksListByCategory";


// SplashScreen.preventAutoHideAsync();
export default function Screens() {
  const [user, setUser] = useState()

  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();

  const loginSelector = useSelector((state) => state.isLogin);
  console.log(">>>>>>>>>>>>>>>>>isLogin", loginSelector)

  const [fontsLoaded] = useFonts({
    'Gabarito-VariableFont': require('../../app/assets/Fonts/Gabarito-VariableFont_wght.ttf'),
    'Outfit': require('../../app/assets/Fonts/Outfit-VariableFont_wght.ttf'),
    'VIVALDII': require('../../app/assets/Fonts/VIVALDII 2.ttf'),
  });

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



  console.log("Cs", appIsReady)
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      console.log("Cs")
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady) {
    return null;
  }


  const CustomFallback = (props) => (
    <View>
      <Text> Ooops! Got Error</Text>
    </View>
  );



  const defaultHeaderOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTintColor: 'red',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerBackTitleVisible: false,
  });

  const customHeaderOptions = ({ navigation }) => ({
    // headerShadowVisible: false,
    // headerTitle: 'Hello Rohith',
    headerStyle: {
      backgroundColor: 'white',
      borderBottomWidth: 4,

    },


    headerTintColor: '#030370',
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontFamily: 'Gabarito-VariableFont',
      fontSize: 20,
      fontWeight: '600',

      // fontWeight: 'bold',
    },
    headerBackTitleVisible: false,



    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 5, padding: 10 }}>
        <BackIcons />
      </TouchableOpacity>
    ),

  });


  return (
    // <NavigationContainer >
    <SafeAreaProvider>
      <NavigationContainer onLayout={onLayoutRootView}>
        <ErrorBoundary FallbackComponent={CustomFallback}>
          <Stack.Navigator
            // initialRouteName={user ? 'Bottom-navigator' : 'Register'}
            screenOptions={{
              headerStyle: {
                backgroundColor: 'white',
              },
              headerTintColor: 'red',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              // headerShown: false,
            }}
          >

            {user ? (
              <>
                <Stack.Group options={defaultHeaderOptions}>
                  <Stack.Screen name="BottomTabScreen" component={BottomTabScreen}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen name="VideoScreen" component={VideoScreen} options={{
                    headerShown: false,
                  }} />
                  <Stack.Screen name="AudioScreen" component={AudioScreen} options={{
                    headerShown: false,
                  }} />
                  <Stack.Screen name="YoutudeScreen" component={YoutudeScreen} />
                  <Stack.Screen name="Quotes" component={QuotesScreen}
                    options={customHeaderOptions} />


                  <Stack.Screen name="TracksAudios" component={TracksAudios}
                    options={customHeaderOptions} />

                  <Stack.Screen name="TracksListByCategory" component={TracksListByCategory}
                    options={customHeaderOptions} />


                  <Stack.Screen name="FormScreen" component={FormScreen}
                    options={{
                      headerShown: false,
                    }} />
                  <Stack.Screen name="Donation" component={Donation}
                    options={customHeaderOptions}
                  />



                  <Stack.Screen name="About_Guruji" component={About_Guruji}
                    // options={customHeaderOptions} 
                    options={{
                      headerShown: false,
                    }} />

                  <Stack.Screen name="About_SatyaSadhana" component={SatyaSadhana}
                    // options={customHeaderOptions} 
                    options={{
                      headerShown: false,
                    }} />

                  <Stack.Screen name="FullProfile" component={UpdateProfile}
                    options={customHeaderOptions} />

                  <Stack.Screen name="DeleteAccount" component={DeleteAccount}
                    options={customHeaderOptions} />

                  <Stack.Screen name="ProfilePassword" component={ChangePassword}
                    options={customHeaderOptions}
                  // options={{
                  //   headerShown: false,
                  // }}
                  />

                  <Stack.Screen name="About" component={About}
                    options={customHeaderOptions} />

                  <Stack.Screen name="Help" component={Help}
                    options={customHeaderOptions} />


                  <Stack.Screen name="Privacy Policy" component={PrivacyPolicy}
                    options={customHeaderOptions} />
                </Stack.Group>
              </>
            ) : (
              <Stack.Group
                screenOptions={{
                  headerShown: false, // This hides the header for all screens in this group
                }}
              >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="ForgotPasswordEmail" component={OtpSender} />
                <Stack.Screen name="OtpVerify" component={OtpVerify} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                {/* <Stack.Screen name="Register" component={Register} /> */}
                {/* <Stack.Screen name="ForgotPassword" component={ForgotPassword} /> */}
              </Stack.Group>)}

          </Stack.Navigator>
        </ErrorBoundary>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

