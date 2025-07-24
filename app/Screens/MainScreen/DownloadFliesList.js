import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Platform, Alert, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Video } from 'expo-av';
import CustomStatusBar from '../../Components/UI/StatusBar/CustomStatusBar';
import GlobalStyles from '../../Components/UI/GlobalStyles';
import MusicIcon from '../../assets/SVGS/MusicPlayer/MusicIcon';
import Metrics from '../../utils/ResposivesUtils/Metrics';
import { useFocusEffect } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import UnMuteIcon from '../../assets/SVGS/MusicPlayer/Player/UnMuteIcon';
import MuteIcon from '../../assets/SVGS/MusicPlayer/Player/MuteIcon';
import PauseIcon from '../../assets/SVGS/MusicPlayer/Player/Pause';
import PlayIcon from '../../assets/SVGS/MusicPlayer/Player/PlayIcon';
import { SatyaSadhnaDownload } from '../AppContant';
import { useToast } from 'react-native-toast-notifications';
import { useAudio } from '../../context/AudioProvider';

const DownloadFliesList = () => {
    const { playTrack, togglePlayPause, currentTrack, isPlaying, currentTime, totalDuration, isMuted, toggleMute,path } = useAudio();
    const [downloadedFiles, setDownloadedFiles] = useState([]);
    const [videoData, setVideoData] = useState(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const videoRef = useRef(null);
    const toast = useToast();

    const fetchDownloads = async () => {
        try {
            const files = await AsyncStorage.getItem(SatyaSadhnaDownload);
            console.log('Fetched files from AsyncStorage:', files);
            setDownloadedFiles(files ? JSON.parse(files) : []);
        } catch (error) {
            console.error('Error fetching downloads:', error);
            toast.show('Failed to fetch downloads', { type: 'danger' });
        }
    };

    const DeleteAlert = (item) => {
        Alert.alert(
            'Delete file',
            'Are you sure you want to delete this file?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => deleteAudio(item.id) },
            ],
            { cancelable: false }
        );
    };

    const deleteAudio = async (id) => {
        if (currentTrack?.id === id) {
            await togglePlayPause(); // Pause if the current track is being deleted
        }
        if (videoData?.id === id) {
            setIsVideoPlaying(false);
            setVideoData(null);
        }
        try {
            const fileToDelete = downloadedFiles.find(file => file.id === id);
            if (!fileToDelete) {
                toast.show('File not found', { type: 'danger' });
                return;
            }
            if (fileToDelete.musicURL || fileToDelete.fileURL) {
                await FileSystem.deleteAsync(fileToDelete.musicURL || fileToDelete.fileURL);
            }
            const updatedFiles = downloadedFiles.filter(file => file.id !== id);
            await AsyncStorage.setItem(SatyaSadhnaDownload, JSON.stringify(updatedFiles));
            setDownloadedFiles(updatedFiles);
            toast.show('File deleted successfully', { type: 'success' });
        } catch (error) {
            console.error('Error deleting file:', error);
            toast.show('Failed to delete file', { type: 'danger' });
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchDownloads();
        }, [])
    );

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleSliderChange = async (value) => {
        const { seekTo } = useAudio();
        if (currentTrack) {
            const seekPosition = value * totalDuration;
            await seekTo(seekPosition);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <CustomStatusBar barStyle="dark-content" backgroundColor={GlobalStyles.CustomStatusBarMainColor} />
            <View style={{ paddingHorizontal: 18 }}>
                {currentTrack && currentTrack.fileType === 'audio' ? (
                    <View style={{ backgroundColor: '#EEEEFF', padding: 10, borderRadius: 15 }}>
                        <View>
                            {isPlaying ? (
                                <Image
                                    source={require('../../assets/MusicPlaying.gif')}
                                    style={{ width: 40, height: 40, alignSelf: 'center' }}
                                />
                            ) : (
                                <View style={{ width: 40, height: 40, alignSelf: 'center', flexDirection: 'row', gap: 2.6, paddingLeft: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ width: 5, height: 5, backgroundColor: '#030370', borderRadius: 2.5 }} />
                                    <Text style={{ width: 5, height: 5, backgroundColor: '#030370', borderRadius: 2.5 }} />
                                    <Text style={{ width: 5, height: 5, backgroundColor: '#030370', borderRadius: 2.5 }} />
                                    <Text style={{ width: 5, height: 5, backgroundColor: '#030370', borderRadius: 2.5 }} />
                                    <Text style={{ width: 5, height: 5, backgroundColor: '#030370', borderRadius: 2.5 }} />
                                </View>
                            )}
                        </View>
                        <Text style={{ textAlign: 'center' }}>{currentTrack.name}</Text>
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
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <TouchableOpacity style={styles.button} onPress={toggleMute}>
                                {isMuted ? <MuteIcon /> : <UnMuteIcon />}
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={togglePlayPause}>
                                {isPlaying ? <PauseIcon /> : <PlayIcon />}
                            </TouchableOpacity>
                            <View style={{ width: 40, height: 40 }} />
                        </View>
                    </View>
                ) : null}
                {videoData && (
                    <View>
                        <Video
                            ref={videoRef}
                            source={{ uri: videoData.fileURL }}
                            style={styles.video}
                            useNativeControls
                            resizeMode="contain"
                            onPlaybackStatusUpdate={(status) => {
                                console.log('Video onPlaybackStatusUpdate:', status);
                                if (status.isLoaded) {
                                    setIsVideoLoaded(true);
                                }
                                setIsVideoPlaying(status.isPlaying);
                            }}
                        />
                        {!isVideoLoaded && (
                            <View style={[styles.video, { position: 'absolute', top: 0, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }]}>
                                <Text style={{ color: 'white' }}>Loading...</Text>
                            </View>
                        )}
                    </View>
                )}
            </View>
            <View style={{ flex: 1, marginTop: 10, paddingHorizontal: 18 }}>
                <Text>All Downloads</Text>
                <FlatList
                    data={downloadedFiles}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => {
                                if (item.fileType === 'video') {
                                    setVideoData(item);
                                    setCurrentTrack(null);
                                    if (isPlaying) {
                                        togglePlayPause();
                                    }
                                } else {
                                    playTrack({
                                        id: item.id,
                                        title: item.name,
                                        audioUrl: item.musicURL,
                                        fileType: 'audio',
                                        // downloaded:true,
                                        
                                    });
                                    setVideoData(null);
                                }
                            }}
                            style={[styles.listItem, { borderBottomColor: '#DADADA', borderBottomWidth: downloadedFiles.length - 1 === index ? 0 : 1 }]}
                        >
                            <View style={{ width: 'auto', height: 'auto', marginVertical: 4, marginRight: 10 }}>
                                {item.fileType === 'audio' ? (
                                    currentTrack && currentTrack.fileType === 'audio' &&
                                    item.id === currentTrack?.id && isPlaying ? (
                                        <Image source={require('../../assets/MusicPlaying.gif')} style={{ width: 25, height: 25 }} />
                                    ) : (
                                        <MusicIcon />
                                    )
                                ) : (
                                    <MaterialIcons name="videocam" size={24} color="#030370" />
                                )}
                            </View>
                            <View style={[{ alignItems: 'flex-start', gap: 1.3, width: '77%' }, styles.listName]}>
                                <Text style={{ fontFamily: 'Gabarito-VariableFont', color: '#030370', fontSize: Metrics.rfv(16) }} numberOfLines={2}>
                                    {item.name}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => DeleteAlert(item.id)}>
                                <MaterialCommunityIcons name="delete" size={24} color="#030370" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                        <View style={{ justifyContent: 'flex-end', alignItems: 'center', height: Metrics.height * 0.45 }}>
                            <Text style={{ textAlign: 'center', fontFamily: 'Gabarito-VariableFont', color: '#030370', fontSize: Metrics.rfv(16) }}>
                                No Downloads
                            </Text>
                        </View>
                    }
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
    listName: {
        marginLeft: 5,
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
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    timeText: {
        fontSize: 16,
    },
});