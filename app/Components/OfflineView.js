import React from 'react'
import { View,Text } from 'react-native'

function OfflineView() {
  return (
 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} >

        <Text>No network found</Text>
        <Text>Please check your internet connection</Text>
        <Button title='go to Downloads' onPress={() => { navigation.navigate("Downloads") }}></Button>
      </View>
  
  )
}

export default OfflineView