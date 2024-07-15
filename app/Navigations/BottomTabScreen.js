// BottomTabScreen.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionic from 'react-native-vector-icons/Ionicons';

import {
  Entypo,
  Feather,
  AntDesign,
  MaterialIcons,
  Ionicons, FontAwesome,
  MaterialCommunityIcons,
  FontAwesome6,
  Fontisto,

} from "@expo/vector-icons";


import Home from '../Screens/MainScreen/Home';
import Profile from '../Screens/MainScreen/Profile';
import { Text, TouchableOpacity, View } from 'react-native';
import DownloadFliesList from '../Screens/MainScreen/DownloadFliesList';
import LiveScreen from '../Screens/MainScreen/LiveScreen';


// import SideBar from '../Screens/Drawer/SideBar';


const Tab = createBottomTabNavigator();

const BottomTabScreen = ({ route }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 55,
          backgroundColor: '#006AFF'

        },

        tabBarIcon: ({ focused, size, colour }) => {
          let iconName;
          if (route.name === "Home") {
            // iconName =  focused ?<FontAwesome6 name="house" size={24} color={colour} />:
            size = focused ? size + 8 : size + 2;


            return (
              <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 5 }}>
                {/* {focused ? <FontAwesome6 name="house" size={20} color="Black" />:<FontAwesome6 name="house" size={20} color="White" />} */}
                {focused ? <FontAwesome6 name="house" size={20} color={"white"} /> : <FontAwesome6 name="house" size={20} color={colour} />}
                <Text style={{ fontSize: 12, marginTop: 5, color: focused ? "white" : "black" }}>Home</Text>
              </View>)
          }

          else if (route.name === "Search") {
            // iconName =  focused ?<Fontisto name="search" size={24} color={colour} />:<Fontisto name="search" size={20} color={colour} />
            size = focused ? size + 8 : size + 2;
            colour = focused ? "Black" : "White";
            return (
              <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 5 }}>
                <Fontisto name="search" size={24} color={colour} />
                <Text style={{ fontSize: 12, marginTop: 5, color: focused ? "white" : "black" }}>search</Text>
              </View>)

          }

          else if (route.name === "Profile") {
            // iconName =  focused ?<Fontisto name="search" size={24} color={colour} />:<Fontisto name="search" size={20} color={colour} />
            size = focused ? size + 8 : size + 2;
            colour = focused ? "Black" : "White";
            return (
              <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 5 }}>
                {focused ? <FontAwesome name="user-circle-o" size={24} color={"white"} /> : <FontAwesome name="user-circle-o" size={24} color={colour} />}
                <Text style={{ fontSize: 12, marginTop: 5, color: focused ? "white" : "black" }}>Profile</Text>
              </View>)

          }



          else if (route.name === "Live Page") {
            // iconName =  focused ?<Fontisto name="search" size={24} color={colour} />:<Fontisto name="search" size={20} color={colour} />
            size = focused ? size + 8 : size + 2;

            return (
              <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 5 }}>
                {focused ? <MaterialIcons name="live-tv" size={24} color={"white"} /> : <MaterialIcons name="live-tv" size={24} color={colour} />}
                <Text style={{ fontSize: 12, marginTop: 5, color: focused ? "white" : "black" }}>Live</Text>
              </View>)

          }

          else if (route.name === "Downloads") {
            // iconName =  focused ?<Fontisto name="search" size={24} color={colour} />:<Fontisto name="search" size={20} color={colour} />
            size = focused ? size + 8 : size + 2;

            return (
              <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 5 }}>
                {focused ? <Feather name="download" size={24} color={"white"} /> : <Feather name="download" size={24} color={colour} />}

                <Text style={{ fontSize: 12, marginTop: 5, color: focused ? "white" : "black" }}>Downloads</Text>
              </View>)

          }




        }
      })}>

      <Tab.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerShown: true,
          headerBackVisible: true, 
          headerStyle: {
            backgroundColor: '#006BFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 20
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Ionicons name="menu-outline" size={24} color="white" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
        })}
      />


      {/* <Tab.Screen name="Search" component={SearchScreen} options={{
          headerShown: true, // Show the header
          headerBackVisible: true, // Hide the back button
        }}/> */}

      <Tab.Screen name="Live Page" component={LiveScreen} options={{
        headerShown: true, // Show the header
        headerBackVisible: true, // Hide the back button
        headerStyle: {
          backgroundColor: '#006BFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '500',
          fontSize: 20
        },
      }} />



      <Tab.Screen name="Downloads" component={DownloadFliesList} options={{
        headerShown: true, // Show the header
        headerBackVisible: true, // Hide the back button
        headerStyle: {
          backgroundColor: '#006BFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '500',
          fontSize: 20
        },
      }} />

      <Tab.Screen name="Profile" component={Profile} options={{
        headerShown: true, // Show the header
        headerBackVisible: true, // Hide the back button
        headerStyle: {
          backgroundColor: '#006BFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '500',
          fontSize: 20
        },
      }} />

    </Tab.Navigator>


 
  );
};

export default BottomTabScreen;



















