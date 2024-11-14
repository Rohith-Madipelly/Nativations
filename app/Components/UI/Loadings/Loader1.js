import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay'

const Loader1 = ({visible,color}) => {
    
  return (
    <Spinner
        visible={visible}
        color={color?color:"#4A3AFF"}
        animation={'fade'}
      />
  )
}

export default Loader1

const styles = StyleSheet.create({})