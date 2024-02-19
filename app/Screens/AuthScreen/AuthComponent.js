import { Button, Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';

import { LinearGradient } from 'expo-linear-gradient';



const AuthComponent = ({ NameUnderLogo, titleUnder, screenName, children }) => {
    return (
                <LinearGradient style={{ height: 880 }} colors={['rgba(20, 0, 255, 0.91)', 'rgba(255, 255, 255, 0.77)', '#FFF']}>

                    <View style={{ marginTop: '19%' }}>

                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                style={{ width: 60, height: 60 }}

                                source={require("../../../assets/image/Logo120.png")}
                                contentFit="cover"
                                transition={1000}
                                alt=''
                            />
                            <Text style={styles.TextSize_H3}>{NameUnderLogo}</Text>
                            <Text style={[styles.paragraphy, { marginTop: 2, width: '70%', textAlign: 'center', color: '#FFF', }]}>{titleUnder}</Text>
                        </View>


                        <View style={{ borderRadius: 30, overflow: 'scroll' }}>

                            <ImageBackground
                                style={{ width: '100%', position: 'relative', paddingTop: 25, marginTop: 1, display: 'flex', alignItems: 'center', height: '90%' }}
                                contentFit="fixed"
                                // blurRadius={0.2}
                                source={require("../../../assets/image/Rectangle 33.png")}
                            >
                                <View style={{ marginBottom: 1, marginTop: 10, display: 'flex', alignItems: 'center', }} >
                                    <Text style={[styles.TextSize_H2, { marginVertical: 10, alignItems: 'center' }]}>{screenName}</Text>
                                </View>
                                {/* children data over here */}
                                <View style={{ width: '100%' }}>
                                    {children}
                                </View>

                            </ImageBackground>
                        </View>

                    </View>
                    <StatusBar style="auto" />
                </LinearGradient>
    )
}

export default AuthComponent

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