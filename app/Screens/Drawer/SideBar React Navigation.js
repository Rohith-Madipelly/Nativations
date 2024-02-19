import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../MainScreen/Home';
import ProfilePage from '../MainScreen/ProfilePage';
import { MaterialIcons } from '@expo/vector-icons';
import {DrawerContent} from './DrawerContent';

const Drawer = createDrawerNavigator();
const SideBar = () => {
  return (
    <Drawer.Navigator
    // drawerContent={DrawerContent}

      drawerContent={(props) => {
        return (
          <SafeAreaView>
            <View
              style={{
                height:222,
                width: '100%',
                // width: 322,
                justifyContent: 'center',
                alignItems: 'center',
                borderBlockColor: '#f4f4f4',
                borderBottomWidth: 1,
                backgroundColor: 'blue',
               borderBottomEndRadius:50,
               borderBottomLeftRadius:50
              }}>

              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
                style={{
                  height: 130,
                  width: 130,
                  borderRadius: 65
                }}>

              </Image>
            </View>

            <View>

            </View>
          </SafeAreaView>
        )
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fff',
          width: 280
        },
        headerStyle: {
          backgroundColor: '#006BFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '500',
          fontSize: 20
        },
        drawerActiveTintColor: "blue",
        drawerLabelStyle: {
          color: '#111'
        }
      }}
    >
      {/* <View>
      <Text>Rohith</Text>
    </View> */}


      <Drawer.Screen
        key='Home'
        name='Home'
        component={Home}
        options={{
          drawerLabel: 'Home',
          title: 'Home',
          // drawerIcon:()=>(
          //   <MaterialIcons name="Timer" size={20} color="#808080"/>
          // )
        }}
      />



    </Drawer.Navigator>
  )
}

export default SideBar

const styles = StyleSheet.create({})