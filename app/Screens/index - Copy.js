// In App.js in a new project

import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useMemo, useEffect } from "react";
import ASO from "../utils/AsyncStorage_Calls";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate('Details')} title='Hello'></Button>
    </View>
  );
}
function FinalPahe({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      {/* <Button onPress={()=>{navigation.navigate("Home123")}} title='Hello'></Button> */}

      <Text>Home vjdbksj</Text>
      <Text>Home Screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
      <Text>Home Screen edhi redux varaku vachindhi </Text>
      <Button onPress={() => navigation.navigate('Details')} title='Hello'></Button>
    </View>
  );
}

function DetailsScreen({ navigation }) {
  const loginSelector = useSelector((state) => state.isLogin);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen {loginSelector.toString()}</Text>
      <Button onPress={() => navigation.navigate('Home')} title='Hello'></Button>

    </View>
  );
}

const Stack = createNativeStackNavigator();


function Screen() {
  const [user, setUser] = useState(true)

  // const Stack = createNativeStackNavigator();
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
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}

        <Stack.Group
          screenOptions={{ headerStyle: { backgroundColor: 'papayawhip' } }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="Details" component={DetailsScreen} />
          {/* <Stack.Screen name="Share" component={ShareScreen} /> */}
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Screen;