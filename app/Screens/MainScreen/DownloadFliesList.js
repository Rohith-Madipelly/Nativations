import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Platform, Alert, StyleSheet, Dimensions } from 'react-native';

import { Image } from 'expo-image';
import { MaterialCommunityIcons, MaterialIcons, } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Video } from 'expo-av';

import CustomStatusBar from '../../Components/UI/StatusBar/CustomStatusBar';
import GlobalStyles from '../../Components/UI/GlobalStyles';

import MusicIcon from '../../assets/SVGS/MusicPlayer/MusicIcon';
import Metrics from '../../utils/ResposivesUtils/Metrics';


import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { Audio } from 'expo-av';

import Slider from '@react-native-community/slider';
import UnMuteIcon from '../../assets/SVGS/MusicPlayer/Player/UnMuteIcon';
import MuteIcon from '../../assets/SVGS/MusicPlayer/Player/MuteIcon';
import PauseIcon from '../../assets/SVGS/MusicPlayer/Player/Pause';
import PlayIcon from '../../assets/SVGS/MusicPlayer/Player/PlayIcon';
import { SatyaSadhnaDownload } from '../AppContant';
import { useToast } from 'react-native-toast-notifications';

const DownloadFliesList = () => {
    const [sound, setSound] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [downloadedFiles, setDownloadedFiles] = useState([]);
    const [songData, setSongData] = useState({})

    const [isLooping, setIsLooping] = useState(false);
    const [videoData, setVideoData] = useState(null)
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false)
    const videoRef = useRef(null);
    const toast = useToast();


    const isFocused = useIsFocused();
    useEffect(() => {
     

        if(!isFocused && isPlaying){
            playPauseAudio()
        }
    }, [isFocused])
    const fetchDownloads = async () => {

        const files = await AsyncStorage.getItem(SatyaSadhnaDownload, (error, data) => {
            if (error) {
                console.log("Error ", error)
            } else {
                console.log("data...", data)
                setDownloadedFiles(data ? JSON.parse(data) : []);
            }
        });


        // console.log("downloadedFiles", downloadedFiles)

        // setDownloadedFiles(files ? JSON.parse(files) : []);

        // if (downloadedFiles && downloadedFiles != []) {
        //     console.log("1234567890 downloadedFiles", downloadedFiles)
        // } else { 
        //     console.log("good boy ")
        // }
    };
    const DeleteAlert = (item) => {
        Alert.alert(
            "Delete file",
            "Are you sure you want to delete this file?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => { deleteAudio(item) } }
            ],
            { cancelable: false }
        );
    }


    const deleteAudio = async (id) => {

        if (songData && songData.id === id) {
            await sound.pauseAsync();
            setIsPlaying(false);
            await sound.unloadAsync();
            setSongData("")
        }

        if (videoData && videoData?.id === id) {
            // await sound.pauseAsync();
            setIsVideoPlaying(false);
            // await sound.unloadAsync();
            setVideoData("")
        }
        try {
            const fileToDelete = downloadedFiles.find(file => file.id === id);
            if (!fileToDelete) {
                Alert.alert('Error', 'File not found.');
                return;
            }

            console.log("DeleteAudio 1", fileToDelete)
            if (fileToDelete.musicURL) {
                // Delete the file from the file system
                await FileSystem.deleteAsync(fileToDelete.musicURL);
            } else {

                await FileSystem.deleteAsync(fileToDelete.fileURL);
            }
            console.log("DeleteAudio 2")
            // Update the downloaded files list

        } catch (error) {
            console.error('Error deleting file:', error);
        }
        finally {
            const updatedFiles = downloadedFiles.filter(file => file.id !== id);

            console.log("updatedFiles", updatedFiles)

            console.log("DeleteAudio 3")
            // Save the updated list to AsyncStorage
            await AsyncStorage.setItem(SatyaSadhnaDownload, JSON.stringify(updatedFiles));

            console.log("DeleteAudio 4")
            setDownloadedFiles(updatedFiles);
            // Alert.alert('File deleted', 'The file has been deleted successfully.');
            toast.show("File has been deleted successfully. ")
        }
    };







    useFocusEffect(
        useCallback(() => {
            fetchDownloads();
        }, [])
    )


    const onPlaybackStatusUpdate = (status) => {
        // console.log(status.isPlaying, "onPlaybackStatusUpdate")

        if (status.isLoaded) {
            setCurrentTime(status.positionMillis);
            setTotalDuration(status.durationMillis);
        }
        if (status.didJustFinish) {
            setIsPlaying(false); // Stop playback when the song finishes
        }
        if (status.isPlaying) {
            setIsPlaying(true)
            setIsVideoPlaying(true)
        }
    };

    const loadAudio = async (audioUrl, local = false) => {
        try {

            if (sound) {
                await sound.unloadAsync(); // Unload any previous sound
            }

            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: local ? audioUrl : audioUrl },

                { shouldPlay: true, isMuted: isMuted },
                onPlaybackStatusUpdate
            );
            // await sound.setIsLoopingAsync(isLooping);
            setSound(newSound);
            setIsPlaying(true);
        } catch (error) {
            console.error('Error loading audio:', error);
        }
    };

    const handleSliderChange = async (value) => {
        if (sound) {
            const seekPosition = value * totalDuration;
            await sound.setPositionAsync(seekPosition);
            setCurrentTime(seekPosition);
        }
    };

    const toggleMute = async () => {
        if (sound) {
            await sound.setIsMutedAsync(!isMuted);
            setIsMuted(!isMuted);
        }
    };

    const playPauseAudio = async () => {

        if (sound) {
            const status = await sound.getStatusAsync();
            if (isPlaying) {
                await sound.pauseAsync();
                setIsPlaying(false);
            } else {
                console.log(status.positionMillis / status.durationMillis > 0.998)

                if (status.positionMillis / status.durationMillis > 0.998) {
                    await sound.setPositionAsync(0);
                }
                await sound.playAsync();
                setIsPlaying(true);
            }
        } else {
            Alert.alert("Please select a song.");
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };





    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
            flex: 1,
            // marginTop: 70,
            // paddingHorizontal: 18
        }}>
            {/* <ScrollView> */}
            <CustomStatusBar barStyle="dark-content" backgroundColor={GlobalStyles.CustomStatusBarMainColor} />

            <View style={{
                paddingHorizontal: 18
            }}>
                {songData && songData?.fileType === "audio" ? <>
                    {/* Audio Offline */}
                    <View style={{ backgroundColor: '#EEEEFF', padding: 10, borderRadius: 15 }}>

                        <View style={{}}>
                            {isPlaying ? <Image
                                source={require('../../assets/MusicPlaying.gif')}
                                style={{ width: 40, height: 40, alignSelf: 'center' }}
                            /> :
                                <View style={{ width: 40, height: 40, alignSelf: 'center', flexDirection: 'row', gap: 2.6, paddingLeft: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ width: 5, height: 5, backgroundColor: '#030370', borderRadius: 2.5 }}> </Text>
                                    <Text style={{ width: 5, height: 5, backgroundColor: '#030370', borderRadius: 2.5 }}> </Text>
                                    <Text style={{ width: 5, height: 5, backgroundColor: '#030370', borderRadius: 2.5 }}> </Text>
                                    <Text style={{ width: 5, height: 5, backgroundColor: '#030370', borderRadius: 2.5 }}> </Text>
                                    <Text style={{ width: 5, height: 5, backgroundColor: '#030370', borderRadius: 2.5 }}> </Text>
                                </View>}

                        </View>

                        <Text style={{ textAlign: 'center' }}>{songData.name}</Text>
                        <Slider
                            minimumValue={0}
                            maximumValue={1}
                            value={currentTime / totalDuration || 0}
                            minimumTrackTintColor="#6200ee"
                            maximumTrackTintColor="#d3d3d3"
                            thumbTintColor="#6200ee"
                            onSlidingComplete={handleSliderChange}
                        />

                        <View style={styles.timeContainer}>
                            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                            <Text style={styles.timeText}>{formatTime(totalDuration)}</Text>
                        </View>


                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between', marginTop: 10,
                        }}>
                            <TouchableOpacity style={[styles.button, {

                            }]} onPress={toggleMute}>
                                {isMuted ? <MuteIcon /> : <UnMuteIcon />}
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.button, {
                            }]} onPress={playPauseAudio}>
                                {isPlaying ? <PauseIcon /> : <PlayIcon />}
                            </TouchableOpacity>


                            {/* <Button
                        title={`Turn Looping ${isLooping ? 'Off' : 'On'}`}
                        onPress={toggleLoop}
                    /> */}
                            <View style={{
                                width: 40,
                                height: 40,
                            }}>

                            </View>
                        </View>
                    </View>
                </> : <>
                    {songData && songData?.fileType === "video" && <View style={{ backgroundColor: '#EEEEFF', padding: 10, borderRadius: 15 }}>

                    </View>}
                </>}
            </View>
            {/* {console.log(videoData?.fileURL)} */}
            {videoData && <View>
                <Video
                    ref={videoRef}
                    source={{
                        uri: `${videoData?.fileURL}`,
                        // uri: 'https://www.satyasadhna.com/upload/videos/1735145757433.mp4'
                    }}
                    style={styles.video}
                    useNativeControls
                    // useNativeControls={false}
                    resizeMode="contain"
                    onPlaybackStatusUpdate={(status) => {
                        console.log("onPlaybackStatusUpdate", status)
                        if (status.isLoaded) {
                            setIsVideoLoaded(true)
                        }
                        setIsVideoPlaying(status.isPlaying)
                    }}
                />
                {!isVideoLoaded &&
                    <View style={[styles.video, { position: 'absolute', top: 0, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }]}>
                        <Text style={{ color: 'white' }}>Loading.....</Text>
                    </View>}
            </View>}

            <View style={{ flex: 1, marginTop: 10, paddingHorizontal: 18 }}>
                <Text>All Downloads</Text>
                <FlatList
                    data={downloadedFiles}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => {

                                if (item.fileType === "video") {
                                    console.log("kkkk", item)
                                    setVideoData(item)
                                    setSongData("")
                                    if (isPlaying) {
                                        playPauseAudio()
                                    }

                                } else {
                                    loadAudio(item.musicURL)
                                    setSongData(item)
                                    setVideoData("")
                                }
                            }}
                            style={[styles.listItem, { borderBottomColor: '#DADADA', borderBottomWidth: 1, borderBottomWidth: downloadedFiles.length === index ? 1 : 0 }]}
                        >
                            {/* <Text style={styles.listIndex}>{index + 1})</Text> */}
                            <View style={{ width: 'auto', height: 'auto', marginVertical: 4, marginRight: 10 }}>

                                {item.fileType == "audio" ? <>
                                    {songData.id === item.id && isPlaying ? <Image
                                        source={require('../../assets/MusicPlaying.gif')}
                                        style={{ width: 25, height: 25 }}
                                    /> : <MusicIcon />}
                                </> : <>
                                    {songData.id === item.id && isPlaying ? <Image
                                        source={require('../../assets/MusicPlaying.gif')}
                                        style={{ width: 25, height: 25 }}
                                    /> : <MaterialIcons name="videocam" size={24} color="#030370" />}
                                </>}

                            </View>
                            <View style={[{ alignItems: 'flex-start', gap: 1.3, width: '77%' }, styles.listName]}>
                                <Text style={[{ fontFamily: 'Gabarito-VariableFont', color: '#030370', fontSize: Metrics.rfv(16) },]} numberOfLines={2}>{item.name}</Text>
                                {/* {item.type ? <Text>{item.type}x</Text> : ""} */}
                            </View>

                            <TouchableOpacity
                                style={{ padding: 1, }}
                                // onPress={() => deleteAudio(item.id)}
                                onPress={() => DeleteAlert(item.id)}
                            >
                                <MaterialCommunityIcons name="delete" size={24} color="#030370" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={(
                        <View style={{ justifyContent: 'flex-end', alignItems: 'center', height: Metrics.height * 0.45, }}>
                            <Text style={{ textAlign: 'center', fontFamily: 'Gabarito-VariableFont', color: '#030370', fontSize: Metrics.rfv(16) }}>No Downloads</Text>
                        </View>
                    )}
                />
            </View>
        </View>

    );
};

export default DownloadFliesList;


const styles = StyleSheet.create({
    shadowStyle: {
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    video: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * (9 / 16), // 16:9 aspect ratio
    },


    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    listIndex: {
        fontWeight: 'bold',
    },
    listName: {
        marginLeft: 5,
    },



    controlButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    container: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#030370',
        marginVertical: 10,
        borderRadius: 25,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    sliderContainer: {
        width: '90%',
        alignItems: 'center',
        marginTop: 20,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    timeText: {
        fontSize: 16,
    },
})