import { Alert, Dimensions, Image, Platform, Pressable, SafeAreaView, StyleSheet, Text, ToastAndroid, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
// import MovingText from '../../Components/UI/Marquee'
import Marquee from '../../Components/UI/Marquee'
import Slider from '@react-native-community/slider';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Feather, Octicons } from '@expo/vector-icons';
import ProgressBar from '../../Components/UI/ProgressBar/ProgressBar';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ASO from '../../utils/AsyncStorage_Calls.js'
import ButtonC1Cricle from '../../Components/UI/Button/ButtonC1Cricle.js'
import { Audio } from 'expo-av';
import Spinner from 'react-native-loading-spinner-overlay';
import { VideoPageData } from '../../utils/API_Calls';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL, GUEST_URL } from '../../Enviornment';
import Snap_Carousel7 from '../../Components2/Snap_Carousel7';
import { Button } from 'react-native';
import OtherDownloads from '../../DownloadMain/OtherDownloads';
import OtherDownloadBtn from '../../DownloadMain/OtherDownloadBtn.js';
import NewToaster from '../../utils/NewToaster.js';
import CustomStatusBar from '../../Components/UI/StatusBar/CustomStatusBar.js';
import { CustomAlerts_Continue } from '../../utils/CustomReuseAlerts.js';
import LoadingImage from '../../Components/ImageConatiners/LoadingImage.js';
import PauseIcon from '../../assets/SVGS/MusicPlayer/Player/Pause.js';
import PlayIcon from '../../assets/SVGS/MusicPlayer/Player/PlayIcon.js';
import UnMuteIcon from '../../assets/SVGS/MusicPlayer/Player/UnMuteIcon.js';
import MuteIcon from '../../assets/SVGS/MusicPlayer/Player/MuteIcon.js';
import Metrics from '../../utils/ResposivesUtils/Metrics.js';


import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { setDownloadList, setToken } from '../../redux/actions/loginAction.jsx';
import { SatyaSadhnaDownload } from '../AppContant.js';
import { useToast } from 'react-native-toast-notifications';
const AudioScreen = ({ route }) => {

    const { id, download } = route.params
    const { width, height } = Dimensions.get('screen')

    if (!id) {
        console.log("Not respose ...")
    }
    const [thumbnail, setThumbnail] = useState("")
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [spinnerBool, setSpinnerBool] = useState(true);

    let tokenn = useSelector((state) => state.token);
    let listData = useSelector((state) => state.list);
    const navigation = useNavigation();

    const [relatedPosts, setRelatedPosts] = useState()
    const toast = useToast();


    const [title, setTitle] = useState()
    const [audio, setAudio] = useState()
    const [postDetails, setPostDetails] = useState()

    Audio.setAudioModeAsync({
        staysActiveInBackground: false, // explicitly set this
        playsInSilentModeIOS: true,
    });


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

        const datad = null
        // toast.show("Download Button Checking for is alerdy downloaded or not ")

        console.log("d", JSON.parse(datad))
    }, [id])

    const [downloadLoading, setDownloadLoading] = useState([]);

    // const fetchDownloads = async () => {
    //     const files = await AsyncStorage.getItem(SatyaSadhnaDownload, (error, data) => {
    //         console.log("Error in fetchDownloads", error)
    //         console.log(data)

    //         console.log("files", data)
    //         setDownloadedFiles(data ? JSON.parse(data) : []);
    //     });
    //     // console.log("files", files)
    //     setDownloadedFiles(files ? JSON.parse(files) : []);
    // };


    const downloadAudio = async (audioUrl, fileName, id) => {
        // toast.show("Download Button Checking for is alerdy downloaded or not ")
        try {
            // Check if the file is already downloaded
            const files = await AsyncStorage.getItem(SatyaSadhnaDownload, (error, data) => {
                if (error) {
                    toast.show("Error in getting Storage Data")
                } else {
                    if (data) {
                        var datax = JSON.parse(data)
                        const isAlreadyDownloaded = datax.some(datax => datax.id === id);
                        if (isAlreadyDownloaded) {
                            Alert.alert('Already downloaded', 'This file has already been downloaded.');
                            return;
                        } else {
                            downloadAudio2(audioUrl, fileName, id)
                        }
                    } else {
                        downloadAudio2(audioUrl, fileName, id)
                    }
                }

            })
        }
        catch (e) {
            console.log("Error in downloadAudio", e)
        }
        // downloadAudio2(audioUrl, fileName, id)
    }

    const downloadAudio2 = async (audioUrl, fileName, id) => {
        try {
            setDownloadLoading(true)
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission denied', 'Cannot download without media library access.');
                return;
            }

            const fileUri = FileSystem.documentDirectory + fileName;
            const { uri } = await FileSystem.downloadAsync(audioUrl, fileUri);

            // Add the new file to the downloaded files list
            const newDownload = {
                id: id,
                name: fileName,
                musicURL: uri,
                fileType: 'audio',
            };

            await AsyncStorage.getItem(SatyaSadhnaDownload, (e, data) => {
                console.log("e", e, "data filesx", data)
                if (data && data != []) {
                    console.log("1")
                    var datax = JSON.parse(data)
                    const updatedFiles = [...datax, newDownload];
                    AsyncStorage.setItem(SatyaSadhnaDownload, JSON.stringify(updatedFiles));
                }
                else if (data == []) {
                    console.log("2")
                    const updatedFiles = [newDownload];
                    AsyncStorage.setItem(SatyaSadhnaDownload, JSON.stringify(updatedFiles));
                }
                else {
                    console.log("3")
                    const updatedFiles = [newDownload];
                    AsyncStorage.setItem(SatyaSadhnaDownload, JSON.stringify(updatedFiles));
                }
            });


            Alert.alert('Download complete', 'The file has been downloaded successfully.',
                [
                    { text: 'Go to downloads', onPress: () => navigation.navigate('Downloads') },
                    { text: 'OK', onPress: () => { } }
                ]);

        } catch (error) {
            console.error('Error downloading file:', error);
        }
        finally {
            setDownloadLoading(false)
        }
    };





    const HomeData = async () => {

        setSpinnerBool(true)
        try {
            const res = await VideoPageData(tokenn, id)

            if (res.data) {

                setTimeout(() => {
                    console.log("data mes >>", res.data)
                    setThumbnail(`${BASE_URL}/${res.data.postDetails.thumbnail}`)
                    setTitle(res.data.postDetails.title)
                    setAudio(`${BASE_URL}/${res.data.postDetails.audioUrl}`)
                    // console.log("audio >>", `${GUEST_URL}/${audio}`)
                    setRelatedPosts(res.data.relatedPosts)
                    setPostDetails(res.data.postDetails)
                    loadAudio(`${BASE_URL}/${res.data.postDetails.audioUrl}`);
                }, 500)

                if (download) {

                    // Alert.alert('Want to download the track')
                    CustomAlerts_Continue(
                        `Download`,
                        `Would you like to save this track for offline listening?`,
                        // `Applying for ${data.jobTitle}`,
                        // data.jobTitle,
                        () => {
                            setTimeout(() => {
                                downloadAudio(`${BASE_URL}/${res.data.postDetails.audioUrl}`, `${res.data.postDetails.title}` + '.mp3', id)

                            }, 700)
                        }
                    )

                }

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
            // setSpinnerBool(false)
            //   setRefreshing(false);
        }
    }

    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync(); // Unload the sound when the component unmounts
            }
        };
    }, [sound]);

    const loadAudio = async (audioUrlx) => {
        try {
            const { sound: newSound, status } = await Audio.Sound.createAsync(
                { uri: audioUrlx },
                { shouldPlay: false, isMuted: isMuted },
                onPlaybackStatusUpdate
            );
            setSound(newSound);
            onPlaybackStatusUpdate(status);
        } catch (error) {
            console.log('Error loading audio:', error);
        } finally {
            setSpinnerBool(false)

        }
    };



    const playPauseAudio = async () => {
        console.log("playPauseAudio ,,", sound)
        if (!sound) {
            await loadAudio(audio);
            // playPauseAudio() 
        }
        console.log(">>>>><", audio)
        if (sound) {
            if (isPlaying) {
                await sound.pauseAsync();
                setIsPlaying(false);
            } else {
                await sound.playAsync();
                setIsPlaying(true);
            }
        } else {
            console.log("fjbc")
            // playPauseAudio()
        }
    };

    const toggleMute = async () => {
        if (sound) {
            await sound.setIsMutedAsync(!isMuted);
            setIsMuted(!isMuted);
        }
    };

    const onPlaybackStatusUpdate = (status) => {
        if (status.isLoaded) {
            setCurrentTime(status.positionMillis);
            setTotalDuration(status.durationMillis);
        }
    };

    const audiox = 'https://www.satyasadhna.com/upload/audios/1733752486383.mp3';

    useEffect(() => {
        loadAudio(audio);
    }, []);

    if (spinnerBool) {
        return <Spinner
            visible={spinnerBool}
            color={"#5F2404"}
            animation={'fade'}
        />
    }




    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    const handleSliderChangexx = async (value) => {
        if (sound) {
            const seekPosition = value * totalDuration;
            await sound.setPositionAsync(seekPosition);
            setCurrentTime(seekPosition);
        }
    };

    const handleSliderChange = async (value) => {
        if (sound) {
            const seekPosition = value * totalDuration; // Calculate the target position in milliseconds
            await sound.setPositionAsync(seekPosition); // Seek to the target position
            setCurrentTime(seekPosition); // Update the current time
        }
    };



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomStatusBar barStyle="dark-content" backgroundColor="rgba(20, 0, 230, 0.5)" />
            <Spinner
                visible={spinnerBool || downloadLoading}
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


                <View style={{ flex: 1, alignItems: 'center', paddingTop: 10, marginHorizontal: 18 }}>

                    <LoadingImage
                        source={{ uri: `${thumbnail}` }}
                        style={{ width: '90%', height: height * 0.4, borderRadius: 15 }}
                        // resizeMode='cover'
                        loaderColor="#4A3AFF"
                        resizeMode='contain'
                    />
                    <View style={{ width: '80%', marginTop: 10, overflow: 'hidden', marginBottom: 10 }}>
                        <Text numberOfLines={2} style={{ alignSelf: 'center' }}>{title}</Text>
                    </View>


                    <View style={{ width: '80%', marginTop: 10, overflow: 'hidden', marginBottom: 10 }}>


                        <View>
                            <Slider
                                minimumValue={0}
                                maximumValue={1}
                                value={currentTime / totalDuration || 0}
                                minimumTrackTintColor="#6200ee"
                                maximumTrackTintColor="#d3d3d3"
                                thumbTintColor="#6200ee"
                                onSlidingComplete={handleSliderChange}
                            />

                        </View>

                        <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                            <Text style={styles.timeText}>{formatTime(totalDuration)}</Text>
                        </View>
                    </View>
                    <View style={{
                        width: '70%',
                        flexDirection: 'row',
                        justifyContent: 'space-between', marginTop: 10,
                    }}>
                        <TouchableOpacity style={[styles.button, {}]} onPress={toggleMute}>
                            {isMuted ? <MuteIcon /> : <UnMuteIcon />}
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, {
                            borderRadius: Metrics.rfv(25),
                            width: Metrics.rfv(50),
                            height: Metrics.rfv(50),
                        }]} onPress={playPauseAudio}>
                            {isPlaying ? <PauseIcon /> : <PlayIcon />}
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, {}]} onPress={() => {

                            downloadAudio(`${audio}`, `${title}` + '.mp3', id)
                        }}>
                            <Feather name="arrow-down" size={20} color="white" />
                        </TouchableOpacity>




                    </View>

                    <View style={{ marginTop: 25 }}>
                        {relatedPosts && relatedPosts.length > 0 ? <View>
                            <Snap_Carousel7 relatedPostsData={relatedPosts} />
                        </View> : <View style={{ margin: 20, }}>
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
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    timeText: {
        fontSize: 16,
    },
    button: {
        backgroundColor: '#030370',
        borderRadius: Metrics.rfv(20),
        width: Metrics.rfv(40),
        height: Metrics.rfv(40),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    }
})