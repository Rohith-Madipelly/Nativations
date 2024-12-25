import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Linking, TouchableOpacity, ScrollView, Platform, Image, RefreshControl, Alert, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';

import {
    Entypo,
    Feather,
    AntDesign,
    MaterialIcons,
    Ionicons, FontAwesome,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Audio } from 'expo-av';
import { Video } from 'expo-av';
import CustomStatusBar from '../../Components/UI/StatusBar/CustomStatusBar';
import GlobalStyles from '../../Components/UI/GlobalStyles';
import Slider from '@react-native-community/slider';
import UnMuteIcon from '../../assets/SVGS/MusicPlayer/Player/UnMuteIcon';
import MuteIcon from '../../assets/SVGS/MusicPlayer/Player/MuteIcon';
import Metrics from '../../utils/ResposivesUtils/Metrics';
import PauseIcon from '../../assets/SVGS/MusicPlayer/Player/Pause';
import PlayIcon from '../../assets/SVGS/MusicPlayer/Player/PlayIcon';
import { useFocusEffect } from '@react-navigation/native';

const ignoreFileName = [".com.google.firebase.crashlytics.files.v2:host.exp.exponent", "RCTAsyncLocalStorage", "profileInstalled", "generatefid.lock", "ExperienceData", ".expo-internal", "PersistedInstallation.W0RFRkFVTFRd+MTozNjczMTUxNzQ2OTM6YW5kcm9pZDpmOTY4ZWZiYjQxZDFmYTdh.json", "profileinstaller_profileWrittenFor_lastUpdateTime.dat", "dev.expo.modules.core.logging.dev.expo.updates", "BridgeReactNativeDevBundle.js"];

// Function to fetch the list of files in the internal directory
async function fetchFileList() {
    try {
        const internalDirectory = FileSystem.documentDirectory;
        const files = await FileSystem.readDirectoryAsync(internalDirectory);
        return files;
    } catch (error) {
        console.error('Error fetching file list:', error);
        return [];
    }
}


// Component to display the list of files
const DownloadFliesList = () => {
    const [fileList, setFileList] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(false);
    const [selectedAudio, setSelectedAudio] = useState(false);

    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);

    const audioUrl = 'https://www.satyasadhna.com/upload/audios/1734517994763.mp3';

    // Load and unload the audio
    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync(); // Unload the sound when the component unmounts
            }
        };
    }, [sound]);

    const loadAudio = async (audioUrlx) => {
        console.log("audioUrlx",audioUrlx)
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
        }
    };

    const playPauseAudio = async () => {
        if (!sound) {
            await loadAudio(selectedAudio);
        }
        if (sound) {
            if (isPlaying) {
                await sound.pauseAsync();
                setIsPlaying(false);
            } else {
                await sound.playAsync();
                setIsPlaying(true);
            }
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

    // useEffect(() => {
    //     loadAudio(selectedAudio);
    // }, []);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };



    const handleSliderChange = async (value) => {
        if (sound) {
            const seekPosition = value * totalDuration; // Calculate the target position in milliseconds
            await sound.setPositionAsync(seekPosition); // Seek to the target position
            setCurrentTime(seekPosition); // Update the current time
        }
    };


    useEffect(() => {
        // Fetch the list of files when the component mounts
        fetchFileList().then(files => setFileList(files));
    }, []);

    const data = () => {
        fetchFileList().then(files => setFileList(files));
        setRefreshing(false);
    }


    useFocusEffect(
        useCallback(() => {
            fetchFileList().then(files => setFileList(files));
            data()
        }, [])
      )
    
    // >>>>>>>>>>>>>>>>>
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        data()

    }, []);


    // >>>>>>>>>>>>>>>>>>

    const filteredFileList = fileList.filter(item => !ignoreFileName.includes(item));
    // Function to handle when a video item is pressed
    const handleVideoPress = async (filename) => {
        const internalDirectory = FileSystem.documentDirectory;
        const videoUri = `${internalDirectory}${filename}`;
        console.log("videoUri >>filename", videoUri, "filename >>", filename.slice(-5))

        if (filename.slice(-5) === "Audio") {
            console.log("sdgsv",videoUri)
            setSelectedVideo("");
            setSelectedAudio(videoUri)
            loadAudio(videoUri);

        } else {
            setSelectedVideo(videoUri);
            setSelectedAudio("")
        }


        console.log("selectedVideo", Platform.OS, selectedVideo)
    };

    const Alerter = (item) => {
        Alert.alert(
            "Delete Video",
            "Are you sure you want to delete this video?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => { handleDeleteItem(item) } }
            ],
            { cancelable: false }
        );
    }

    const handleDeleteItem = async (filename) => {
        const internalDirectory = FileSystem.documentDirectory;
        const item = `${internalDirectory}${filename}`;
        if (item) {
            try {
                await FileSystem.deleteAsync(item, { idempotent: true });
                setSelectedVideo(null);
                console.log("Video deleted successfully");
                data()
            } catch (error) {
                console.log("Error deleting video:", error);
            }
        } else {
            console.log("No video selected to delete");
        }
    };
    // Render each item in the list


    console.log("dd", filteredFileList)
    const renderItem = ({ item, index }) => {

        return (
            <View style={styles.shadowStyle}>
                <TouchableOpacity onPress={() => handleVideoPress(item)}
                    style={[{
                        display: 'flex',
                        flexDirection: 'row',
                        padding: 10,
                        margin: 20,
                        marginVertical: 10,
                        // backgroundColor: 'pink',
                        // borderWidth: 2,
                        borderRadius: 20,
                        paddingRight: 20,
                        backgroundColor: 'rgba(168, 168, 255, 0.19)'
                    }]}>
                    <View style={{ flex: 0.1, alignItems: 'center', justifyContent: "center" }}>
                        <Text style={{ fontWeight: 900, }}>{index + 1})</Text>
                    </View>

                    <View style={{ flex: 0.8, justifyContent: "center" }}>
                        <Text style={{ marginLeft: 5 }}> {item}</Text>
                    </View>

                    <TouchableOpacity style={{ flex: 0.1, alignItems: 'center', justifyContent: "center" }} onPress={() => Alerter(item)}>
                        <MaterialCommunityIcons name="delete" size={24} color="black" />
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
        );

    };


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {/* <ScrollView> */}
            <CustomStatusBar barStyle="dark-content" backgroundColor={GlobalStyles.CustomStatusBarMainColor} />
            <View style={{ marginBottom: 0, flex: 1 }}>
            {console.log("dhvcn",selectedVideo)}
                {selectedVideo ? (
                    <Video
              
                        source={{ uri: selectedVideo }}
                        style={{ width: '100%', height: 200, backgroundColor: 'black', position: 'fixed' }}
                        resizeMode="contain"
                        useNativeControls
                        autoplay
                        shouldPlay={true}
                        isLooping
                        onPlaybackStatusUpdate={status => {
                            if (!status.isPlaying && status.positionMillis !== 0 && status.didJustFinish) {
                                setSelectedVideo(false);
                            }
                        }}
                        error
                    />
                ) : ""}

                {selectedAudio ? (
                    <View style={styles.container}>
                        <Text style={styles.title}>Audio Player</Text>
                        <View style={styles.sliderContainer}>

                            <Slider
                                style={styles.slider}
                                minimumValue={0}
                                maximumValue={1}
                                value={currentTime / totalDuration || 0}
                                minimumTrackTintColor="#6200ee"
                                maximumTrackTintColor="#d3d3d3"
                                thumbTintColor="#6200ee"
                                onSlidingComplete={handleSliderChange} // Update only when sliding is complete
                            />

                            <View style={styles.timeContainer}>
                                <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                                <Text style={styles.timeText}>{formatTime(totalDuration)}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '70%' }}>

                            <TouchableOpacity style={[styles.button, {
                                borderRadius: Metrics.rfv(25),
                                width: Metrics.rfv(50),
                                height: Metrics.rfv(50),
                            }]} onPress={toggleMute}>
                                {isMuted ? <UnMuteIcon /> : <MuteIcon />}
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.button, {
                                borderRadius: Metrics.rfv(25),
                                width: Metrics.rfv(50),
                                height: Metrics.rfv(50),
                            }]} onPress={playPauseAudio}>
                                {isPlaying ? <PauseIcon /> : <PlayIcon />}
                            </TouchableOpacity>

                        </View>
                    </View>
                ) : ""}


                <View style={{ flex: 1 }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 12, marginBottom: 0 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 0 }}>Download List :</Text>
                        <View>
                            <TouchableOpacity style={{ padding: 10, paddingTop: 0 }} onPress={data}>
                                {/* <Text>Reload List reload</Text> */}
                                <MaterialCommunityIcons style={{}} name={'reload'} size={25} color={'black'} />
                            </TouchableOpacity>
                        </View>
                    </View>


                    <ScrollView style={{ flex: 1 }}>
                        {filteredFileList.length === 0 ? (
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, paddingVertical: 50, margin: 20, marginVertical: 10, backgroundColor: 'rgba(168, 168, 255, 0.19)' }}>
                                <Text>No downloads</Text>
                            </View>
                        ) : (
                            <View>



                                <FlatList
                                    data={filteredFileList}
                                    renderItem={renderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                    nestedScrollEnabled={true}
                                    scrollEnabled={false}
                                />
                                <View style={{ height: 30 }}>

                                </View>
                            </View>
                        )}
                    </ScrollView>
                </View>
            </View>
            {/* </ScrollView> */}
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
        backgroundColor: '#6200ee',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center'
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