import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Platform, Alert, StyleSheet } from 'react-native';

import { Image } from 'expo-image';
import { MaterialCommunityIcons, } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';



import CustomStatusBar from '../../Components/UI/StatusBar/CustomStatusBar';
import GlobalStyles from '../../Components/UI/GlobalStyles';

import MusicIcon from '../../assets/SVGS/MusicPlayer/MusicIcon';
import Metrics from '../../utils/ResposivesUtils/Metrics';


import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useFocusEffect } from '@react-navigation/native';
import { Audio } from 'expo-av';

import Slider from '@react-native-community/slider';
import UnMuteIcon from '../../assets/SVGS/MusicPlayer/Player/UnMuteIcon';
import MuteIcon from '../../assets/SVGS/MusicPlayer/Player/MuteIcon';
import PauseIcon from '../../assets/SVGS/MusicPlayer/Player/Pause';
import PlayIcon from '../../assets/SVGS/MusicPlayer/Player/PlayIcon';

const DownloadFliesList = () => {
    const [sound, setSound] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [downloadedFiles, setDownloadedFiles] = useState([]);
    const [songData, setSongData] = useState({})



    const DeleteAlert = (item) => {
        Alert.alert(
            "Delete Video",
            "Are you sure you want to delete this video?",
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
        try {
            const fileToDelete = downloadedFiles.find(file => file.id === id);
            if (!fileToDelete) {
                Alert.alert('Error', 'File not found.');
                return;
            }

            // Delete the file from the file system
            await FileSystem.deleteAsync(fileToDelete.musicURL);

            // Update the downloaded files list
            const updatedFiles = downloadedFiles.filter(file => file.id !== id);

            // Save the updated list to AsyncStorage
            await AsyncStorage.setItem('downloadedFiles12', JSON.stringify(updatedFiles));

            setDownloadedFiles(updatedFiles);
            Alert.alert('File deleted', 'The file has been deleted successfully.');
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };



    const fetchDownloads = async () => {
        const files = await AsyncStorage.getItem('SatyaSadhnaDownload');
        console.log("files", files)
        setDownloadedFiles(files ? JSON.parse(files) : []);
    };

    useFocusEffect(
        useCallback(() => {
            fetchDownloads();
        }, [])
    )


    const onPlaybackStatusUpdate = (status) => {
        console.log(status.isPlaying, "onPlaybackStatusUpdate")

        if (status.isLoaded) {
            setCurrentTime(status.positionMillis);
            setTotalDuration(status.durationMillis);
        }
        if (status.didJustFinish) {
            setIsPlaying(false); // Stop playback when the song finishes
        }
        if (status.isPlaying) {
            setIsPlaying(true)
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
            if (isPlaying) {
                await sound.pauseAsync();
                setIsPlaying(false);
            } else {
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
            paddingHorizontal: 18
        }}>
            {/* <ScrollView> */}
            <CustomStatusBar barStyle="dark-content" backgroundColor={GlobalStyles.CustomStatusBarMainColor} />

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

                    <View style={{
                        width: 40,
                        height: 40,
                    }}>

                    </View>
                </View>
            </View>
            <View style={{ flex: 1, marginTop: 10 }}>
                <Text>All Downloads</Text>
                <FlatList
                    data={downloadedFiles}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => {
                                console.log("dcd >>>", item.musicURL)
                                loadAudio(item.musicURL)
                                setSongData(item)
                                console.log("Ready to Play")
                            }}
                            style={[styles.listItem, { borderBottomColor: '#DADADA', borderBottomWidth: 1, borderBottomWidth: downloadedFiles.length === index ? 1 : 0 }]}
                        >
                            {/* <Text style={styles.listIndex}>{index + 1})</Text> */}
                            <View style={{ width: 'auto', height: 'auto', marginVertical: 4, marginRight: 10 }}>

                                {songData.id === item.id && isPlaying ? <Image
                                    source={require('../../assets/MusicPlaying.gif')}
                                    style={{ width: 25, height: 25 }}
                                /> : <MusicIcon />}
                            </View>
                            <View style={[{ alignItems: 'flex-start', gap: 1.3, width: '77%' }, styles.listName]}>
                                <Text style={[{ fontFamily: 'Gabarito-VariableFont', color: '#030370', fontSize: Metrics.rfv(16) },]} numberOfLines={2}>{item.name}</Text>
                                {item.type ? <Text>{item.type}</Text> : ""}
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