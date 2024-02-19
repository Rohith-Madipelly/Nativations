import { Button, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';

import { LinearGradient } from 'expo-linear-gradient';
import image from '../../../assets/image/Logo120.png'
import CustomButton from '../../../Components/UI/Button/ButtonC1';



const Login = () => {
    return (

        <LinearGradient style={{ height: '100%' }} colors={['rgba(20, 0, 255, 0.91)', 'rgba(255, 255, 255, 0.77)', 'rgba(255, 255, 255, 1)']} >
            <View style={{ marginTop: '19%' }}>
                {/* <View style={{marginTop:80}}> */}
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        // style={styles.image}
                        style={{ width: 60, height: 60 }}

                        source={require("../../../assets/image/Logo120.png")}
                        contentFit="cover"
                        transition={1000}
                    />
                    <Text style={styles.TextSize_H3}>Let’s Onboard</Text>
                    <Text style={[styles.paragraphy, { marginTop: 10, marginBottom: 10, paddingBottom: 10, width: '75%', textAlign: 'center', color: '#FFF', }]}>Sign in to the app using any of given login
                        types for better experience</Text>
                </View>



                <View style={{

                    backgroundColor: 'white',
                    height: '75%',
                    borderRadius: 20,


                }}>
                    <View style={{ marginTop: 10, }}>
                        <View>

                            <ImageBackground
                                style={{ width: '100%', marginTop: 20, paddingTop: 40, display: 'flex', alignItems: 'center', height: '100%' }}
                                source={require("../../../assets/image/Rectangle 33.png")}
                            >


                                <CustomButton onPress={{}} icon={"eye"}> Sign in with Google</CustomButton>


                                <CustomButton onPress={{}} icon={"mail"} style={{}}>Sign in with Email</CustomButton>



                                <View style={{ width: '65%', textAlign: 'center' }}>

                                    <Text style={[styles.paragraphy, { marginTop: 30, textAlign: 'center', color: '#2E0366', fontWeight: '400' }]}>By Signing in you are agreeing to our
                                        Terms of Use and <Text style={styles.underline}>Privacy Policy</Text></Text>
                                </View>

                                <ImageBackground
                                    style={{ width: '100%', marginTop: 50, height: '70%' }}
                                    source={require("../../../assets/image/Rectangle 40.png")}
                                >
                                </ImageBackground>
                            </ImageBackground>
                        </View>

                    </View>
                </View>
            </View>
            {/* <View style={[styles.container]}>
          <Image
                    style={styles.image}
                    source={require("../../../assets/image/Logo120.png")}
                    // source={require("../../../assets/utilsImages/profile.png")}
                    // placeholder={blurhash}
                    contentFit="cover"
                    transition={1000}
                />
                <Text style={styles.text}>Sign in with Facebook</Text>
           
            
            <Text>Login</Text>
        </View> */}
            <StatusBar style="auto" />
        </LinearGradient>
    )
}

export default Login

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