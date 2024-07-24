import { Alert, Image, Pressable, SafeAreaView, StyleSheet, Text, ToastAndroid, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
// import MovingText from '../../Components/UI/Marquee'
import Marquee from '../../Components/UI/Marquee'

import AntDesign from '@expo/vector-icons/AntDesign';
import { Feather, Octicons } from '@expo/vector-icons';
import ProgressBar from '../../Components/UI/ProgressBar/ProgressBar';
import { useNavigation } from '@react-navigation/native';

import ButtonC1Cricle from '../../Components/UI/Button/ButtonC1Cricle.js'
import { Audio } from 'expo-av';
import Spinner from 'react-native-loading-spinner-overlay';
import { VideoPageData } from '../../utils/API_Calls';
import { useSelector } from 'react-redux';
import { GUEST_URL } from '../../Enviornment';
import Snap_Carousel7 from '../../Components2/Snap_Carousel7';
import { Button } from 'react-native';
import OtherDownloads from '../../DownloadMain/OtherDownloads';
import OtherDownloadBtn from '../../DownloadMain/OtherDownloadBtn.js';
import NewToaster from '../../utils/NewToaster.js';
const AudioScreen = ({ route }) => {

    const { id } = route.params

    const [isPlaying, setIsPlaying] = useState(false)
    const [sound, setSound] = useState();
    const [spinnerBool, setSpinnerBool] = useState(true);
    const [status, setStatus] = useState({});

    const [isMuted, setIsMuted] = useState(false);

    const [postion, setPostion] = useState(0);
    const [Timer, setTimer] = useState(0);
    let tokenn = useSelector((state) => state.token);
    const navigation = useNavigation();

    const [relatedPosts, setRelatedPosts] = useState()


    const [thumbnail, setThumbnail] = useState("")
    const [title, setTitle] = useState()
    const [audio, setAudio] = useState()
    const [postDetails, setPostDetails] = useState()

    // >>>>>>>>>>>>>>>>>>

    try {
        if (tokenn != null) {
            tokenn = tokenn.replaceAll('"', '');
        }
    }
    catch (err) {
        console.log("Error in token quotes", err)
    }


    useEffect(() => {
        HomeData()
    }, [id])


    const HomeData = async () => {
        setSpinnerBool(true)
        // console.log("fshjjb")
        try {
            const res = await VideoPageData(tokenn, id)

            if (res) {
                console.log("data mes", res.data.postDetails)
                setThumbnail(res.data.postDetails.thumbnail)
                setTitle(res.data.postDetails.title)
                setAudio(res.data.postDetails.audioUrl)
                // console.log(res.data.postDetails.audioUrl)
                setRelatedPosts(res.data.relatedPosts)

                setPostDetails(res.data.postDetails)

            }
            else {
                console.log("No Respones")
            }


        } catch (error) {
            setTimeout(() => {
                console.log("Error in fetching", error)
            }, 1000);

            // setTimeout(() => {
            //   setSpinnerbool(false)
            // }, 5000)
        }
        finally {
            // setSpinnerBool(false)
            //   setRefreshing(false);
        }
    }











    const LoadSound = async () => {
        console.log('Loading Sound');
        setSpinnerBool(true)
        try {
            const { sound } = await Audio.Sound.createAsync(
                { uri: `${GUEST_URL}/${audio}` },
                // require('./assets/Hello.mp3')

            );
            setSound(sound)


            sound.setOnPlaybackStatusUpdate((status) => {
                // console.log("ds")
            });
            sound.setOnPlaybackStatusUpdate(updateStatus);
        } catch (error) {
            console.log(error.message)
            Alert.alert(`${GUEST_URL}/${audio}`, error.message)
        }


        setSpinnerBool(false)
        console.log('Unloading Sound');
    }




    async function playSound() {
        if (sound) {
            console.log('isPlaying Sound');
            await sound.playAsync();
            setIsPlaying(true);
        }
        else {
            LoadSound()
        }

    }

    async function pauseSound() {
        console.log("dsmhjb")
        if (sound) {
            await sound.pauseAsync();
        }
        setIsPlaying(false);
    };

    async function toggleMute() {
        if (sound) {
            await sound.setIsMutedAsync(!isMuted);
            setIsMuted(!isMuted);
        }
    };

    async function stopSound() {
        if (sound) {
            await sound.stopAsync();
        }
        setIsPlaying(false);
    };

    const updateStatus = (status) => {
        setStatus(status);
    };

    useEffect(() => {
        if (audio) {
            LoadSound()
        }

    }, [audio])


    useEffect(() => {
        return sound ? () => { sound.unloadAsync(); } : undefined;
    }, [sound]);


    if (spinnerBool) {
        return <Spinner
            visible={spinnerBool}
            color={"#5F2404"}
            animation={'fade'}
        />
    }



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Spinner
                visible={spinnerBool}
                color={"#5F2404"}
                animation={'fade'}
            />
            <LinearGradient
                style={{ flex: 1 }}
                colors={['rgba(20, 0, 255, 0.5)', 'rgba(255, 255, 255, 0.3)', '#FFF']}
            >


                <View style={{ height: 25 }}>

                </View>
                <View style={{ height: 50 }}>
                    <Pressable style={{ position: "absolute", top: '15%', left: 20, backgroundColor: '#3d423e', borderRadius: 50 }} onPress={() => { navigation.goBack(); }}>
                        <Feather name="arrow-left" size={35} color="white" />
                    </Pressable>
                </View>


                <View style={{ flex: 1, alignItems: 'center', paddingTop: 10, marginHorizontal: 18 }}>
                    <Image
                        source={{ uri: `${GUEST_URL}/${thumbnail}` }}
                        style={{ width: '90%', height: 250, opacity: 0.8, borderRadius: 15 }}
                        resizeMode='cover'
                    />
                    <View style={{ width: '80%', marginTop: 10, overflow: 'hidden', marginBottom: 10 }}>
                        <Marquee text={title} />
                    </View>


                    {/* <View style={{ width: '80%', marginTop: 10, overflow: 'hidden', marginBottom: 10 }}>
                        <ProgressBar progressData={postion} />
                        <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text>{(status.positionMillis / 1000).toFixed(2)} sec</Text>
                           
                            <Text>{(status.durationMillis / 1000).toFixed(0)} sec</Text>
                        </View>
                    </View> */}
                    <View style={{
                        width: '70%',
                        flexDirection: 'row',
                        justifyContent: 'space-between', marginTop: 10,

                    }}>

                        <View style={{ justifyContent: 'center' }}>
                            <ButtonC1Cricle
                                styleData={{}}
                                onPress={toggleMute}
                            >
                                {isMuted ? <Octicons name="mute" size={20} color="white" /> : <Octicons name="unmute" size={20} color="white" />}
                            </ButtonC1Cricle>
                        </View>
                        <View>
                            <TouchableOpacity
                                // title={isPlaying ? "Pause" : "Play"}
                                onPress={isPlaying ? pauseSound : playSound}
                            >
                                {!isPlaying ? <AntDesign name="play" size={50} color="black" /> : <AntDesign name="pausecircle" size={50} color="black" />}
                            </TouchableOpacity>
                            {/* <Text>{isPlaying.toString()}</Text> */}
                        </View>
                        <View style={{ justifyContent: 'center' }}>
                            <ButtonC1Cricle
                                styleData={{}}
                                onPress={() => { OtherDownloads(`${GUEST_URL}/${audio}`, `${postDetails.title} : ${postDetails.type}`) }}
                            >
                                <Feather name="arrow-down" size={20} color="white" />
                            </ButtonC1Cricle>


                            {/* <OtherDownloadBtn URL_Download={`${GUEST_URL}/${audio}`} filename={`${postDetails.title} : ${postDetails.type}`}>

                            </OtherDownloadBtn> */}

                        </View>

                        <Button onPress={()=>{NewToaster()}} title='Heloo'></Button>


                        {/* <View>
                            <TouchableOpacity onPress={() => { setPlaying(!isPlaying) }}>
                                {isPlaying ? <AntDesign name="play" size={40} color="black" /> : <AntDesign name="pausecircle" size={40} color="black" />}
                            </TouchableOpacity>
                        </View> */}
                    </View>

                    {/* <View style={{marginTop:20}}>
                        <ButtonC1Cricle
                            styleData={{ marginLeft: 20 }}
                            onPress={() => { OtherDownloads(`${GUEST_URL}/${audio}`, `${postDetails.title} : ${postDetails.type}`) }}
                        >
                            <Feather name="arrow-down" size={20} color="white" />
                        </ButtonC1Cricle>
                    </View> */}
                    <View style={{ marginTop: 25 }}>
                        {relatedPosts ? <View>
                            <Snap_Carousel7 relatedPostsData={relatedPosts} />
                        </View> : <View>
                            <Text>No Related Posts</Text>
                        </View>}
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default AudioScreen

const styles = StyleSheet.create({})