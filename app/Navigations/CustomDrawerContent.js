import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { StyleSheet, Text, View } from 'react-native'


import React from 'react'

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View>
        <Text>Hello </Text>
        <Text>Hello Hero</Text>
      </View>
      <DrawerItemList {...props} />
   </DrawerContentScrollView>
  )
}

export default CustomDrawerContent




// import React from 'react'

// const CustomDrawerContent = ({ props }) => {
//   return (

//     <DrawerContentScrollView {...props}>
//       <View>
//         <Text>Hello </Text>
//         <Text>Hello Hero</Text>
//       </View>
//       <View
//         style={
//           styles.drawerContent
//         }
//       >
//         <View style={styles.userInfoSection}>

//         </View>
//         <Drawer.Section style={styles.drawerSection}>
//           <DrawerItem
//             label="Preferences"
//             onPress={() => { }}
//           />
//           <DrawerItem
//             label="Classes"
//             onPress={() => props.navigation.navigate('ClassHome')} // user props here
//           />
//         </Drawer.Section>
//       </View>
//     </DrawerContentScrollView>

//   )
// }

// export default CustomDrawerContent

// const styles = StyleSheet.create({})