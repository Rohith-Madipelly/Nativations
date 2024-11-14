import { StyleSheet,Platform } from 'react-native'
import { Colors } from '../../Contants/Colors'

export default StyleSheet.create({

    CustomStatusBar: '#030370E8',
    CustomStatusBarMainColor: 'white',

    androidSafeArea:{
        backgroundColor:'white',
        // paddingTop:Platform.OS==='android'?30:0,
        // backgroundColor:"#e93288"
    } 
})