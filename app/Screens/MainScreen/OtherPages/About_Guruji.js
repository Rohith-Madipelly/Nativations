import { Text, StyleSheet, ImageBackground, View, ScrollView, Image, TouchableOpacity, Alert, Platform, Button, RefreshControl, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { Component, useCallback, useEffect, useState } from 'react'

import { useDispatch, useSelector } from "react-redux";
import { setToken } from '../../../redux/actions/loginAction'
import { useNavigation } from '@react-navigation/native';
import Ionic from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';


import { AboutAPI, PlaystoreAPI, UserGetProfileDetails } from '../../../utils/API_Calls'


import NetInfo from '@react-native-community/netinfo';
import OtherComponent from './OtherComponent';
import { LinearGradient } from 'expo-linear-gradient';



const About_Guruji = () => {
    const [spinnerBool, setSpinnerbool] = useState(false)
    const [data, setData] = useState("")
    const [AppLink, setAppLink] = useState("")
    // const [data, setData] = useState("")
    const dispatch = useDispatch();
    let tokenn = useSelector((state) => state.token);
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        return () => {
            unsubscribe();
        };
    }, []);


    // to set the Token Error
    try {
        if (tokenn != null) {
            tokenn = tokenn.replaceAll('"', '');
        }
    }
    catch (err) {
        console.log("Error in token quotes", err)
    }

    useEffect(() => {
        // ProfileNameKosam()
    }, [])


    // >>>>>>>>>>>>>>>>>
    const [refreshing, setRefreshing] = useState(false);
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const onRefresh = useCallback(() => {
        setRefreshing(true);


    }, []);
    // >>>>>>>>>>>>>>>>>>







    const navigation = useNavigation();

    if (!isConnected) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} >
                <Text>No network found</Text>
                <Text>Please check your internet connection</Text>
                <Button title='go to Downloads' onPress={() => { navigation.navigate("Downloads") }}></Button>
            </View>
        );
    }

    return (
        // <ScrollView>
        <View style={{ height: '100%' }}>
            <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
                <LinearGradient style={{ height: "100%", }} colors={['rgba(20, 0, 255, 0.75)', 'rgba(255, 255, 255, 0.77)', '#FFF']}>
                    {/* background */}
                </LinearGradient>
            </View>
            <View style={{ position: 'relative', top: '10%', backgroundColor: 'pink', height: '100%', borderRadius: 30, overflow: 'scroll', backgroundColor: 'white' }}>
                <Text style={{ fontWeight: 900, fontSize: 23, margin:20 }}>About GURUJI:ACHARYA SHRI JIN CHANDRA SURIJI</Text>
                <ScrollView>
                    <View style={{ margin: 15 }}>
                        {/* <Text>{data}</Text> */}
                        <Text style={{ fontWeight: 900, fontSize: 15, marginBottom: 10 }}> Childhood</Text>
                        <Text style={{ marginBottom: 10, marginLeft: 10 }}>Shri Hansmukh Lal Golia and Smt Chandrakala Devi were very happy to have a child. They named him Devendra. Born in a religious family, child Devendra grew up with all the righteous influences. But early in his childhood, his mother passed away. The event changed the child's life forever. The effect of this sad event made Devendra too serious for his age. His father was worried to notice the sudden change in his son's state of mind and sent him to Jaipur, to his maternal family. Even this didn't bring any change in the child. The ephemeral nature of the world had made a deep impact on him. By coincidence, he had an audience with Sadhvi Shri Vinay Shriji. Her inspiration strengthened Devendra's yearning to discover the true.</Text>
                        <Text style={{ fontWeight: 900, fontSize: 15, marginBottom: 10 }}>Younger Days</Text>
                        <Text style={{ marginBottom: 10, marginLeft: 10 }}>
                            At the young age of 15, he was initiated as Yati by Acharya Shri Dharnendra Suriji and given the name Chandroday Gani. Child Devendra and after initiation Chandroday Gani learned Satva Sadhana under the able guidance of guru.
                        </Text>



                        <Text style={{ fontWeight: 900, fontSize: 15, marginBottom: 10 }}>Adulthood Period</Text>
                        <Text style={{ marginBottom: 10, marginLeft: 10 }}>
                            On the insistence of followers, he journeyed to foreign countries in the year 1975. He has been to Thailand, Hong Kong, Japan, the United States of America, Canada and England, etc. His simple explanation of the deep and complicated philosophical thoughts was easily understood and highly valued by the people in those countries. In the Jain society, Bara Upasara has its own importance, and Jains around the world are aware of its importance. Bara Upasara is famous for one of the traditions in Jain culture known as 'Khatargacha' and has its own honor and respect in the Jain society. Satya Sadhna is the identity of Bara Upasara. Paryushana is even celebrated by practicing Satya Sadhna, the way it should actually be practiced. Bara Upasara is as an ideal place for Satya Sadhna. From ten-day courses and one-day courses to courses for children (Bal Shivir), Bara Upasara is bustling with activities.
                        </Text>




                        <Text style={{ fontWeight: 900, fontSize: 15, marginBottom: 10 }}>His Meditation Phase</Text>
                        <Text style={{ marginBottom: 10, marginLeft: 10 }}>
                            Acharya Shri Jin Chandra Suriji started practicing meditation from the initial days of his childhood. And later on, named it Satya Sadhna. He felt Satya Sadhna deserved to be spread and propagated to a larger section of society because of its immense benefit to the world. Thus was born Kushlayatan, at Nal, Bikaner as it is called, today houses the Satya Sadhna Kendra (Meditation Centre), Kushla Vidyapeeth (School), the Kushla Aushdhalay (Health Centre), and a bird sanctuary.Another meditation centre at Khyeda-West Bengal, near Kolkatta
                        </Text>
                    </View>
                    <View style={{ height: 100 }}>
                        <Text>.</Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default About_Guruji;

const styles = StyleSheet.create({

    backgroundContainer: {
        backgroundColor: 'pink',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    inputContainer: {
        backgroundColor: 'red',
        padding: 20,
    },
    absolutePosition: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
