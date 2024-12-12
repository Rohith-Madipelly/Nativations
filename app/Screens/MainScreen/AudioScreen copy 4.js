import { Alert, Dimensions, Image, Platform, Pressable, SafeAreaView, StyleSheet, Text, ToastAndroid, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
// import MovingText from '../../Components/UI/Marquee'
import Marquee from '../../Components/UI/Marquee'
import Slider from '@react-native-community/slider';
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
import CustomStatusBar from '../../Components/UI/StatusBar/CustomStatusBar.js';
import { CustomAlerts_Continue } from '../../utils/CustomReuseAlerts.js';
import LoadingImage from '../../Components/ImageConatiners/LoadingImage.js';

const AudioScreen = ({ route }) => {

    const { id, download } = route.params
    const { width, height } = Dimensions.get('screen')

    if (!id) {
        console.log("Not respose ...")
    }

    const [currentSound, setCurrentSound] = useState();
    const [spinnerBool, setSpinnerBool] = useState(true);

    const [isMuted, setIsMuted] = useState(false);

    let tokenn = useSelector((state) => state.token);
    const navigation = useNavigation();

    const [relatedPosts, setRelatedPosts] = useState()


    const [thumbnail, setThumbnail] = useState("")
    const [title, setTitle] = useState()
    const [audio, setAudio] = useState()
    const [postDetails, setPostDetails] = useState()

    const [currentTime, setCurrentTime] = useState(0)
    const [totalDuration, setTotalDuration] = useState(0)

    const [isPlaying, setIsPlaying] = useState(false)

    const [progress, setProgress] = useState()
    const [sliderData, setSliderData] = useState()
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
        if (download) {
            setTimeout(() => {
                // Alert.alert('Want to download the track')
                CustomAlerts_Continue(
                    `Download`,
                    `Would you like to save this track for offline listening?`,
                    // `Applying for ${data.jobTitle}`,
                    // data.jobTitle,
                    () => {
                        // OtherDownloads(`${GUEST_URL}/${audio}`, `${postDetails.title} : ${postDetails.type}`)
                    }
                )
            }, 200)
        }
    }, [id])


    const HomeData = async () => {
        setSpinnerBool(true)
        console.log("ajhjh", id)
        try {
            const res = await VideoPageData(tokenn, id)

            if (res) {
                // console.log(">>>>>>>>>>>>>>>>")
                console.log("data mes", res.data)
                // setTrackData(res.data)
                // console.log(">>>>>>>>>>>>>>>>")
                setThumbnail(res.data.postDetails.thumbnail)
                setTitle(res.data.postDetails.title)
                setAudio(res.data.postDetails.audioUrl)
                console.log("audio",`${GUEST_URL}/${audio}`)
                setRelatedPosts(res.data.relatedPosts)
                setPostDetails(res.data.postDetails)


                // setTimeout(()=>{
                //     console.log("LoadSound")
                //     LoadSound()
                // },2000)

            }
            else {
                console.log("No Respones")
            }


        } catch (error) {
            setTimeout(() => {
                console.log("Error in fetching", error)
            }, 1000);


        }
        finally {
            // setSpinnerBool(false)
            //   setRefreshing(false);
        }
    }



    const LoadSound = async () => {
        console.log('Loading Sound');
        setSpinnerBool(true);
        try {
            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
                staysActiveInBackground: false,
                shouldDuckAndroid: false,
            });
    
            const { sound, status } = await Audio.Sound.createAsync(
                { uri: `${GUEST_URL}/${audio}` },
                { shouldPlay: true, isLooping: false },
                onPlaybackStatusUpdate
            );
    
            setCurrentSound(sound);
            onPlaybackStatusUpdate(status);
            setIsPlaying(status.isLoaded);
            await sound.playAsync();
        } catch (error) {
            console.error('Error loading sound:', error.message);
            Alert.alert('Audio Error', 'Could not load the audio track. Please try again.');
        } finally {
            setSpinnerBool(false);
        }
    };
    

    const onPlaybackStatusUpdate = async (status) => {
        if (status.isLoaded && status.isPlaying) {
            const progress = status.positionMillis / status.durationMillis;
            // console.log(progress)
            setProgress(progress)
            setSliderData(status.positionMillis)
            setCurrentTime(status.positionMillis)
            setTotalDuration(status.durationMillis)
        }
    }




    async function pauseSound() {
        console.log("dsmhjb")
        if (currentSound) {
            await currentSound.pauseAsync();
        }


        setIsPlaying(false);
    };

    async function handlePlayPause() {
        if (currentSound) {
            if (isPlaying) {
                await currentSound.pauseAsync();
            } else {
                await currentSound.playAsync();
            }
            setIsPlaying(!isPlaying)
        }

    }
    async function toggleMute() {
        if (currentSound) {
            await currentSound.setIsMutedAsync(!isMuted);
            setIsMuted(!isMuted);
        }
    };

    async function stopSound() {
        if (currentSound) {
            await currentSound.stopAsync();
        }
        setIsPlaying(false);
    };



    const skipTo = async (value) => {
        // console.log(currentSound)
        // currentSound.setPositionAsync(value);
        await currentSound.setPositionAsync(value);
    }

    useEffect(() => {
        if (audio) {
            LoadSound()
        }

    }, [audio])


    useEffect(() => {
        return currentSound ? () => { currentSound.unloadAsync(); } : undefined;
    }, [currentSound]);


    if (spinnerBool) {
        return <Spinner
            visible={spinnerBool}
            color={"#5F2404"}
            animation={'fade'}
        />
    }

    const circleSize = 12;


    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const secound = Math.floor((time % 60000) / 1000);
        return `${minutes}:${secound < 10 ? "0" : ""}${secound}`
    }




    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomStatusBar barStyle="dark-content" backgroundColor="rgba(20, 0, 230, 0.5)" />
            <Spinner
                visible={spinnerBool}
                color={"#5F2404"}
                animation={'fade'}
            />
            <LinearGradient
                style={{ flex: 1 }}
                colors={['rgba(20, 0, 255, 0.5)', 'rgba(255, 255, 255, 0.3)', '#FFF']}
            >


                <View style={{ height: 50 }}>
                    <Pressable style={{ position: "absolute", top: '15%', left: 20, borderRadius: 50, marginTop: 10 }} onPress={() => { navigation.goBack(); }}>
                        <Feather name="arrow-left" size={27} color="black" />
                    </Pressable>
                </View>
                {/* <View style={{ height: 50 }}>
                    <Pressable style={{ position: "absolute", top: '15%', left: 20, backgroundColor: '#3d423e', borderRadius: 50 }} onPress={() => { navigation.goBack(); }}>
                        <Feather name="arrow-left" size={35} color="white" />
                    </Pressable>
                </View> */}


                <View style={{ flex: 1, alignItems: 'center', paddingTop: 10, marginHorizontal: 18 }}>

                    <LoadingImage
                        source={{ uri: `${GUEST_URL}/${thumbnail}` }}
                        style={{ width: '90%', height: height * 0.4, borderRadius: 15 }}
                        resizeMode='cover'
                        loaderColor="#4A3AFF"

                    />
                    <View style={{ width: '80%', marginTop: 10, overflow: 'hidden', marginBottom: 10 }}>
                        {/* <Marquee text={title} /> */}
                        <Text numberOfLines={2} style={{ alignSelf: 'center' }}>{title}</Text>
                    </View>


                    <View style={{ width: '80%', marginTop: 10, overflow: 'hidden', marginBottom: 10 }}>
                        {/* <ProgressBar progressData={postion} /> */}
                        {/* 
                        <View style={{
                            width: '100%',
                            marginTop: 10,
                            height: 3,
                            backgroundColor: 'gray',
                            borderRadius: 5
                        }}>

                            <View
                                style={[styles.progressBar, { width: `${progress * 100}%` }]} />

                            <View style={[{ position: 'absolute', top: -5, width: circleSize, height: circleSize, borderRadius: circleSize / 2, backgroundColor: 'white' }, { left: `${progress * 100}%`, marginLeft: -circleSize / 2 }]} />
                        </View> */}

                        <View>
                            <Slider
                                style={{ width: '100%', height: 40, marginHorizontal: 0, paddingHorizontal: 0 }}
                                step={1}
                                minimumValue={0}
                                maximumValue={totalDuration}
                                // minimumTrackTintColor="#4A3AFF"
                                minimumTrackTintColor="#4A3AFF"
                                maximumTrackTintColor="#B0B0C1"
                                thumbTintColor="#4A3AFF"
                                value={sliderData}
                                onValueChange={(e) => {
                                    console.log("W", e)
                                    skipTo(e)
                                    setProgress(e)
                                    setSliderData(e)

                                    // callback(RangeData[e],e) 
                                }}

                                // <Text>{formatTime(currentTime)}</Text>
                                // <Text>{formatTime(totalDuration)}</Text>
                                // snapped={true}
                                // lowerLimit={1}
                                // upperLimit={64}
                                // onSlidingStart={(e)=>{console.log("onSliding Started ",e)}}
                                // onValueChange={(e)=>{console.log("onValue Change ",e)}}
                                // onSlidingComplete={(e)=>{console.log(e)}}

                                tapToSeek={true}

                            // vertical
                            // inverted
                            // disabled
                            // maximumTrackImage={require('../assets/favicon.png')}
                            // minimumTrackImage={require('../assets/favicon.png')}
                            // thumbImage={require('../assets/favicon.png')}

                            // trackImage={require('../assets/favicon.png')}
                            />
                        </View>

                        <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text>{formatTime(currentTime)}</Text>

                            <Text>{formatTime(totalDuration)}</Text>
                        </View>
                    </View>
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
                                // onPress={isPlaying ? pauseSound : playSound}
                                onPress={handlePlayPause}
                            >
                                {isPlaying ? <AntDesign name="pausecircle" size={50} color="#030370" /> : <AntDesign name="play" size={50} color="#030370" />}
                            </TouchableOpacity>

                            {/* <Text>{isPlaying.toString()}</Text> */}
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

                        {/* <Button onPress={()=>{NewToaster()}} title='Heloo'></Button> */}


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
                        {relatedPosts && relatedPosts.length > 0 ? <View>
                            <Snap_Carousel7 relatedPostsData={relatedPosts} />
                        </View> : <View style={{ margin: 20 }}>
                            {/* <Text>No Related Posts</Text> */}
                        </View>}
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default AudioScreen

const styles = StyleSheet.create({
    progressBar: {
        height: '100%',
        backgroundColor: 'white'
    }
})