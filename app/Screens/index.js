import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useMemo, useEffect } from "react";


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
import ChangePassword from "./MainScreen/OtherPages/ChangePassword";
import UpdateProfile from "./MainScreen/OtherPages/UpdateProfile";
// import FormScreen123 from "./MainScreen/OtherPages/FormScreen123";
import FormScreen from "./MainScreen/OtherPages/FormScreen";
import Reloading from "./Demo/Reloading";
import DeleteAccount from "./MainScreen/OtherPages/DeleteAccount";
import PrivacyPolicy from "./MainScreen/OtherPages/PrivacyPolicy";
import About from "./MainScreen/OtherPages/About";
import Help from "./MainScreen/OtherPages/Help";
import FormScreen123 from "./MainScreen/OtherPages/FormScreen123";
import TestingPage from "./MainScreen/OtherPages/TestingPage";
import ProfilePicUpdate from "./Demo/ProfilePic";
import FormScreenCopy from "./MainScreen/OtherPages/FormScreenCopy";
import FormScreenNew from "./MainScreen/OtherPages/FormScreenNew";


// import * as SplashScreen from 'expo-splash-screen';

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
    });

  }



  // To Call verifyToken()
  useEffect(() => {
    const fetchData = async () => {
      await verifyToken();
    };
    fetchData();
  }, []);

  useEffect(() => {
    setUser(loginSelector)

  }, [loginSelector])


  return (
    <NavigationContainer >

      <Stack.Navigator
        // initialRouteName={user ? 'Bottom-navigator' : 'Register'}
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Group >
          {user ? (
            <>
              <Stack.Screen name="FormScreen12344Test" component={FormScreenNew} />
              <Stack.Screen name="Home" component={BottomTabScreen} />
              <Stack.Screen name="VideoScreen" component={VideoScreen} />
              <Stack.Screen name="FormScreen" component={FormScreen} />
              <Stack.Screen name="FullProfile" component={UpdateProfile} />
              <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
              <Stack.Screen name="ProfilePassword" component={ChangePassword} />
              <Stack.Screen name="FormScreen12" component={FormScreenCopy} />
              <Stack.Screen name="FormScreen123" component={FormScreen123} />
              <Stack.Screen name="About" component={About} />
              <Stack.Screen name="Help" component={Help} />
              <Stack.Screen name="Privacy Policy" component={PrivacyPolicy} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              {/* <Stack.Screen name="Onboard" component={Onboard} /> */}
              <Stack.Screen name="ForgotPasswordEmail" component={OtpSender} />
              <Stack.Screen name="OtpVerify" component={OtpVerify} />
              <Stack.Screen name="Register" component={Register} />
              {/* <Stack.Screen name="Register" component={Register} /> */}
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            </>
          )
          }
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

