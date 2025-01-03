import {ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { LinearGradient } from 'expo-linear-gradient';



const OtherComponent = ({ screenName, children }) => {
    return (
        <LinearGradient style={{ height: "100%" }} colors={['rgba(20, 0, 255, 0.91)', 'rgba(255, 255, 255, 0.77)', '#FFF']}>

            <View style={{ marginTop: '20%' }}>
                <View style={{ borderRadius: 30, overflow: 'scroll', backgroundColor: 'white' }}>

                    <View style={{ marginBottom: 1, marginTop: 10, display: 'flex', alignItems: 'center' }} >
                        <Text style={[styles.TextSize_H2, { marginVertical: 10, alignItems: 'center' }]}>{screenName}</Text>
                    </View>
                    {/* children data over here */}
                    <View style={{ width: '100%' }}>

                        {children}
                    </View>


                </View>

            </View>
           
        </LinearGradient>
    )
}

export default OtherComponent

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',

    },
    image: {
        width: 20,
    },


    TextSize_H2: {
        color: 'black',
        // fontFamily: 'Jost',
        fontSize: 18,
        fontWeight: '500',
        // lineHeight: 20,
    },

    // Text Styles
    TextSize_H3: {
        color: '#FFF',
        // fontFamily: 'Jost',
        fontSize: 20,
        fontWeight: '500',
        // lineHeight: 20,
    },
    paragraphy: {

        // fontFamily: 'Jost',
        fontSize: 14,
        fontWeight: '300',
        // lineHeight: 20,
    },
    underline: {
        textDecorationLine: 'underline',
    }

})