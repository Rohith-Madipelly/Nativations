// BottomTabScreen.js
import React from 'react';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import { Dimensions, Platform, Text, TouchableOpacity, View } from 'react-native';
import DownloadFliesList from '../Screens/MainScreen/DownloadFliesList';
import LiveScreen from '../Screens/MainScreen/LiveScreen';
import LiveActive from '../assets/SVGS/LiveActive';
import LiveIcon from '../assets/SVGS/LiveIcon';
import HomeIcon from '../assets/SVGS/HomeIcon';
import HomeActive from '../assets/SVGS/HomeActive';
import ProfileIcon from '../assets/SVGS/ProfileIcon';
import ProfileActive from '../assets/SVGS/ProfileActive';
import Options from '../assets/SVGS/Navigation/Options';
import BackIcons from '../assets/SVGS/Navigation/BackIcons';
import Metrics from '../utils/ResposivesUtils/Metrics';
import FloatingPlayer from '../../FloatingPlayer';


// import SideBar from '../Screens/Drawer/SideBar';


const BottomTabConfig = {
  headerShown: true,
  headerBackVisible: true,
  // headerTitle: 'Hello Rohith',
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTintColor: '#030370',
  headerTitleStyle: {
    fontFamily: 'Gabarito-VariableFont',
    fontSize: 20,
    fontWeight: '600',
  },
}

const Tab = createBottomTabNavigator();

const { width, height } = Dimensions.get('screen')
const BottomTabScreen = ({ route }) => {

  return (
    <Tab.Navigator
      tabBar={(props) => (
        <>
          <FloatingPlayer />
          <BottomTabBar {...props} />
        </>
      )}
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarPosition: 'left',
        tabBarStyle: {
          flex: Platform.OS === "ios" ? 0.07 : 0.100,
          backgroundColor: '#EEEEFF',
        },

        tabBarItemStyle: {
          width: 120, // Customize the width of each tab
          // backgroundColor:"red",
        },
        // tabBarBackground: () => (
        //   <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
        // ),
        tabBarIcon: ({ focused, size, colour }) => {

          if (route.name === "Home") {
            return (
              <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 5, width: Metrics.rfv(90) }}>
                {focused ? <HomeIcon /> : <HomeActive />}
                <Text style={{ fontSize: Metrics.rfv(12), marginTop: Metrics.rfv(5), width: '100%', color: focused ? "#030370" : "#64748B", fontWeight: focused ? 700 : 500, textAlign: 'center' }}>Home</Text>
              </View>)
          }




          else if (route.name === "Live Page") {
            return (
              <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 5, width: Metrics.rfv(90) }}>
                {focused ? <LiveActive /> : <LiveIcon />}
                <Text style={{ fontSize: Metrics.rfv(12), marginTop: Metrics.rfv(5), width: '100%', color: focused ? "#030370" : "#64748B", fontWeight: focused ? 700 : 500, textAlign: 'center' }}>Live</Text>
              </View>)
          }

          else if (route.name === "Downloads") {
            return (
              <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 5, width: Metrics.rfv(90) }}>
                {/* {focused ? <LiveActive /> : <LiveIcon />} */}
                {focused ? <Feather name="download" size={24} color="#030370" /> : <Feather name="download" size={24} color="#64748B" />}
                <Text style={{ fontSize: Metrics.rfv(12), marginTop: Metrics.rfv(5), width: '100%', color: focused ? "#030370" : "#64748B", fontWeight: focused ? 700 : 500, textAlign: 'center' }}>Downloads</Text>
              </View>)
          }


          else if (route.name === "Profile") {
            return (
              <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 5, width: Metrics.rfv(90) }}>
                {focused ? <ProfileActive /> : <ProfileIcon />}
                <Text style={{ fontSize: Metrics.rfv(12, 700), marginTop: Metrics.rfv(5), width: '100%', color: focused ? "#030370" : "#64748B", fontWeight: focused ? 700 : 500, textAlign: 'center' }}>Profile</Text>
              </View>)
          }




        }
      })}>

      <Tab.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          ...BottomTabConfig,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ marginLeft: 15 }}>
              <Options />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ marginRight: 15 }}>
              <View style={{}}></View>
            </TouchableOpacity>
          ),
        })}
      />


      <Tab.Screen name="Live Page" component={LiveScreen}
        options={({ navigation }) => ({
          ...BottomTabConfig,
          // Live Channel
          headerTitle: 'Live Channel',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginLeft: 15 }}>
              <BackIcons />
            </TouchableOpacity>
          ),


          // headerShown: false,
        })}
      />



      <Tab.Screen name="Downloads" component={DownloadFliesList}
        options={({ navigation }) => ({
          ...BottomTabConfig,

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginLeft: 15 }}>
              <BackIcons />
            </TouchableOpacity>
          ),

        })}
      />

      <Tab.Screen name="Profile" component={Profile}
        options={({ navigation }) => ({
          ...BottomTabConfig,

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginLeft: 15 }}>
              <BackIcons />
            </TouchableOpacity>
          ),
        })}
      />

    </Tab.Navigator>



  );
};

export default BottomTabScreen;