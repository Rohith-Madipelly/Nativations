import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React from 'react'

const NewToaster = () => {
    ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT)
}

export default NewToaster

const styles = StyleSheet.create({})