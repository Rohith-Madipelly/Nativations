import { Text, StyleSheet, ImageBackground, View, ScrollView, Image, TouchableOpacity, Alert, Platform, Button, RefreshControl, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { Component, useCallback, useEffect, useState } from 'react'

import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, Octicons } from '@expo/vector-icons';

const SatyaSadhana = () => {
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

    const P5Data = [
        {
            Heading: "CHILDREN AND SATYA SADHNA",
            RelatedData: "To brighten the future of our children we provide them with the best possible education, clothes, food and we continuously work towards making them happy fulfilling their desires. However even after giving so much efforts we find that the children are filled with jealousy, anger, hatred, indiscipline and some even suffer from depression. The children are always living in constant pressure, anxiety and stress. And then we wonder where did we go wrong? Apart from giving the children outside education it is very important to develop their mind to remain calm, balanced. That’s what SATYA SADHNA does it helps the mind to become calm and face the challenges of the world without any stress or anxiety. The SATYA SADHNA children camps are usually from 1-3 days in which they are taught Swas Darshan Meditation. Any child in the age group 8-18 years can participate in these courses."
        },
        {
            Heading: "GYPSY CAMP:",
            RelatedData: "On getting an invitation from different places and with the permission of SHRI PUJYAJI SHRI JIN CHANDRA SURIJI MAHARJSAHAB the assistant teachers go and conduct 10-day SATYA SADHNA Camp in various cities so that the locals of that place can also be benefited from it. Once the date and the timings are finalised the information is published in the newsletter and the website so that people in the nearby places can also join in."
        },
        {
            Heading: "One- Day Course:",
            RelatedData: "One day course are regularly held at Satya Sadhna Kendra and other places. Those who have already done a 10-day course may participate in these courses. Anyone above the age of 18 can participate in this one day course. Participating in these one day courses helps in rejuvenating one self."
        },
        {
            Heading: "Introductory Sessions:  ",
            RelatedData: "One hour introductory sessions of SatyaSadhna are regularly organised all over the world in which everyone can participate. These sessions provide an insight to Satya Sadhna as well as help everyone to start the practice of Satya Sadhna daily for 10-15 minutes."
        },
        {
            Heading: "Donation:  ",
            RelatedData: "Satya Sadhna courses are organised free of cost. In Satya Sadhna tradition all activities including the courses the maintenance and day to day expense are carried out through the donation received. After the course is over the meditator out of gratitude gives donation which is used for carrying out the establishment and maintenance cost of the kendras."
        }
    ]

    const Guidelines = [
        { Guidelines: "To learn and practice Satya Sadhna one has to participate in a 10-Day residential course." },
        { Guidelines: "The meditator has to stay at SATYA SADHNA campus for all of the 10 days. " },
        { Guidelines: "One is prohibited from taking any kind of intoxication- i.e alcohol, pan –parag, tobacco, drugs or any other form of intoxicants. " },
        { Guidelines: "During the course one is also prohibited from reading any newspaper, books, novels and magazines." },
        { Guidelines: "The participant has to deposit his mobile and laptop in the office and he is not allowed to use any tv, internet, mobile, whatsapp, face book or any other social sites." },
        { Guidelines: "One has to observe noble silence during the course- meaning not communicating with anyone. " },
        { Guidelines: "The meditator is prohibited to use gestures or sign languages also. If you have any doubts, questions or problems related to Sadhna then you can communicate with the teacher – who is conducting the course." },
        { Guidelines: "The day starts from 4:30 am and ends at 9:00pm. Meditation is carried out throughout the day. However in between short breaks/ intervals are given for daily chores." },
    ]
    return (
        // <ScrollView>
        <View style={{ height: '100%' }}>
            <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
                <LinearGradient style={{ height: "100%", }} colors={['rgba(20, 0, 255, 0.75)', 'rgba(255, 255, 255, 0.77)', '#FFF']}>
                    {/* background */}
                </LinearGradient>
            </View>
            <View style={{ position: 'relative', top: '10%', backgroundColor: 'pink', height: '100%', borderRadius: 30, overflow: 'scroll', backgroundColor: 'white' }}>
            <Text style={{ fontWeight: 900, fontSize: 23, margin:20 }}>About</Text>
                
                <ScrollView>
                    <View style={{ margin: 15, marginTop: 5 }}>
                        <View>
                            <Text style={{ marginBottom: 10, marginLeft: 10 }}>
                            <Text> </Text>Satya means truth and Sadhna means to be with truth of the mind and to experience this truth. Satya Sadhna is the process of experiencing the truth of the mind and the truth of oneself.
                                When the mind starts experiencing the truth of one self – its starts to understand the reality of the world within us. It starts living in the present moment with equanimity.
                                With the practice of Satya Sadhna Meditation we bring happiness, peace and balance in our lives. We don’t get affected by the situations and circumstances around us for e.g we don’t loose our balance in every unpleasant situation on the contrary we face it with bravery. And when we have a favourable situation we enjoy it remaining in equanimity.
                                Satya Sadhna gives us happiness and peace. The knowledge gained by practicing Satya Sadhna is the knowledge of the sub conscious mind and it goes on improving the condition of our sub conscious and leads us to enlightenment.
                                Satya Sadhna makes us NIRBHAY, NIRVAR, NIRLEP.
                            </Text>
                        </View>


                        <Text>
                            <Text style={{ fontWeight: 900, fontSize: 15, marginBottom: 10 }}>Nirbhay </Text>
                            <Text style={{ marginBottom: 10, marginLeft: 10 }}>
                                means to carry out all activities with a calm and poised mind without any expectation of the result.
                            </Text>
                        </Text>

                        <Text style={{ marginVertical: 10 }}>
                            <Text style={{ fontWeight: 900, fontSize: 15, marginBottom: 10 }}>Nirvair </Text>
                            <Text style={{ marginBottom: 10, marginLeft: 10 }}>

                                expectation of the result.
                                Nirvair means to have love and compassion towards all beings.

                            </Text>
                        </Text>

                        <Text style={{ marginBottom: 5 }}>
                            <Text style={{ fontWeight: 900, fontSize: 15, marginBottom: 10 }}>Nirlep </Text>
                            <Text style={{ marginBottom: 10, marginLeft: 10 }}>
                                means to be free from any layers or bondages.
                            </Text>
                        </Text>


              

                        <View style={{display:'flex',gap:5}}>
                            <View><Text><Text> </Text>Apart from gaining inner peace and happiness Satya Sadhna helps in improving our physical health and virtues. With Satya Sadhna meditation we stop condemning and criticizing people and we develop gratitude and happiness. A person becomes more aware, independent, peaceful and free from delusion. The life of a person becomes more tranquil with the practice of Satya Sadhna.</Text></View>
                            <View><Text><Text> </Text>With daily and continuous practice of Satya Sadhna meditation the mind is filled with gratitude and the mind becomes serene and peaceful. The alertness and compassion of the mind increases and the meditator tries to help others and spread happiness.</Text></View>
                            <View><Text><Text> </Text>Psychologists have observed that those who practice meditation on a daily basis have better control over their emotions and are not effected by stress and anxiety. Practice of Satya Sadhna helps in producing the happiness hormone serotonin and makes the mind calm and serene, increases our level of tolerance and concentration. Satya Sadhna also produces the hormones dopamine and endorphins which helps us in maintaining equanimity and balance on our emotions.</Text></View>
                            <View><Text><Text> </Text>Satya Sadhna meditation is not associated with any religion or sect. Any person irrespective of his caste, creed, originality can practice Satya Sadhna.</Text></View>
                        </View>



                        <Text style={{ fontWeight: 900, fontSize: 15, marginBottom: 10, marginTop: 10 }}>Who teaches Satya Sadhna?</Text>
                        <View style={{ display: 'flex', gap: 5 }}>
                            <View>
                                <Text><Text> </Text><Text> </Text>Satya Sadhna is a blessing for humanity. It is an age-old practice which can be learnt under the guidance and direction of a GURU.  At present SHRI PUJYA SHRI JIN CHANDRA SURIJI MAHARAJSAHAB preaches and inspires everyone to move ahead on the path of SATYA SADHNA.</Text>
                            </View>

                            <View>
                                <Text><Text> </Text><Text> </Text>PARAM PUJYA GURUDEV SHRI PUJYAJI SHRI JIN CHANDRA SURIJI MAHARAJSAHAB is the present Acharya of KHATTERGACCH in the lineage of the 24thTirthankar of Jain religion Lord Mahavir. The head of the KHATTERGACCH is known as SHRI PUJYA JI who continues to teach this technique of SATYA SADHNA generation after generation. In this tradition were born FOUR DADA GURUDEVS in between the 10th and 15th century there names were Shri Jin DuttSuriji, Manidhari Shri Jin Chandra Suriji, Shri Jin Kushal Suriji and Shri Jin Chandra Suriji. Shri Jin DuttSuriji named his successor as Manidhari Shri Jin Chandra Surji and from there on this tradition has been established where every 4th Acharya is named SHRI JIN CHANDRA SURIJI. The present Acharya SHRI JIN CHANDRA SURIJI is also a follower of this 1000 year old tradition.</Text>
                            </View>

                            <View>
                                <Text><Text> </Text><Text> </Text>ACHARYAJI himself along with his appointed teachers preach and spread Satya Sadhna not over in India but all across the globe.</Text>
                            </View>
                        </View>

                        <View>
                            <Text style={{ fontWeight: 900, fontSize: 15, marginBottom: 10, marginTop: 10 }}>Guidelines for SATYA SADHNA meditation course</Text>
                            <View style={{ marginLeft: 5 }}>
                                {Guidelines.map((Data,index) => (
                                    <View style={{ margin: 5 }} key={index}><Text><Octicons name="dot-fill" size={15} color="black" style={{ marginRight: 10 }} /> <Text> </Text> {Data.Guidelines}</Text></View>
                                ))}
                            </View>
                        </View>


                        <View style={{ marginTop: 50 }}>


                            <Text style={{ fontWeight: 900, }}>Satya Sadhna Meditation is taught in 4 steps:-</Text>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ marginVertical: 10 }}>1)	Sadhachar- Following the five precepts Of Truth, Non-violence, Non –stealing, Non-possession, Celibacy.</Text>
                                <Text style={{ marginVertical: 10 }}>2)	Swas Darshan- To observe the incoming and outgoing breath at the moustache area.</Text>
                                <Text style={{ marginVertical: 10 }}>3)	Satya Darshan- To observe the sensation, to observe the change in sensations all over the body and maintain equilibrium and equanimity.</Text>
                                <Text style={{ marginVertical: 10 }}>4)	Maitri Sadhna –To spread the love, peace, happiness, goodness that we have gathered in the 10 days to all beings of the world.</Text>
                            </View>
                        </View>




                        {P5Data.map((DataP5,index) => (
                            <View style={{ marginVertical: 10 }} key={index}>
                                <Text style={{ fontWeight: 900, textDecorationLine: 'underline', marginBottom: 10 }}>{DataP5.Heading}</Text>
                                <Text style={{ marginLeft: 5 }}>{DataP5.RelatedData}</Text>
                            </View>
                        ))}





                        <Text>
                            We are at:
                            www.satyasadhna.com, or Satya Sadhna Application  or
                            Satya Sadhna Facebook Page.Twitter, Instagram .

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

export default SatyaSadhana;

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
