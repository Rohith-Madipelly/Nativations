import { Alert, Dimensions, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { VideoPageData } from '../../utils/API_Calls';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../Enviornment';
import Snap_Carousel7 from '../../Components2/Snap_Carousel7';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { SatyaSadhnaDownload } from '../AppContant';
import { useToast } from 'react-native-toast-notifications';
import CustomStatusBar from '../../Components/UI/StatusBar/CustomStatusBar';
import { CustomAlerts_Continue } from '../../utils/CustomReuseAlerts';
import LoadingImage from '../../Components/ImageConatiners/LoadingImage';
import PauseIcon from '../../assets/SVGS/MusicPlayer/Player/Pause';
import PlayIcon from '../../assets/SVGS/MusicPlayer/Player/PlayIcon';
import UnMuteIcon from '../../assets/SVGS/MusicPlayer/Player/UnMuteIcon';
import MuteIcon from '../../assets/SVGS/MusicPlayer/Player/MuteIcon';
import Metrics from '../../utils/ResposivesUtils/Metrics';
import { useAudio } from '../../context/AudioProvider';

const AudioScreen = ({ route }) => {
    const { id, download } = route.params || {};
    const { width, height } = Dimensions.get('screen');
    const navigation = useNavigation();
    const toast = useToast();
    const { currentTrack, isPlaying, currentTime, totalDuration, togglePlayPause, stopTrack, seekTo, toggleMute, isMuted } = useAudio();
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [spinnerBool, setSpinnerBool] = useState(true);
    const [downloadLoading, setDownloadLoading] = useState(false);
    const [isLoadingRelated, setIsLoadingRelated] = useState(true);

    const tokenn = useSelector((state) => state.token)?.replaceAll('"', '') || '';

    const HomeData = async (retries = 3) => {
        if (!id) {
            toast.show('Invalid track ID', { type: 'danger' });
            setSpinnerBool(false);
            return;
        }
        setSpinnerBool(true);
        try {
            const res = await VideoPageData(tokenn, id);
            if (res?.data?.postDetails) {
                const { postDetails, relatedPosts } = res.data;
                setRelatedPosts(relatedPosts || []);
                playTrack({
                    id,
                    title: postDetails.title,
                    audioUrl: `${BASE_URL}/${postDetails.audioUrl}`,
                    thumbnail: `${BASE_URL}/${postDetails.thumbnail}`,
                });
                if (download) {
                    CustomAlerts_Continue(
                        'Download',
                        'Would you like to save this track for offline listening?',
                        () => downloadAudio(`${BASE_URL}/${postDetails.audioUrl}`, `${postDetails.title}.mp3`, id)
                    );
                }
            } else {
                toast.show('No track data available', { type: 'warning' });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            if (retries > 0) {
                toast.show('Retrying...', { type: 'warning' });
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return HomeData(retries - 1);
            }
            toast.show('Error fetching track data', { type: 'danger' });
        } finally {
            setSpinnerBool(false);
            setIsLoadingRelated(false);
        }
    };

    const downloadAudio = async (audioUrl, fileName, id) => {
        try {
            setDownloadLoading(true);
            const storedFiles = await AsyncStorage.getItem(SatyaSadhnaDownload);
            const downloadedFiles = storedFiles ? JSON.parse(storedFiles) : [];
            const isAlreadyDownloaded = downloadedFiles.some((file) => file.id === id);
            if (isAlreadyDownloaded) {
                toast.show('This file has already been downloaded', { type: 'warning' });
                return;
            }

            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                toast.show('Permission denied for media library access', { type: 'danger' });
                return;
            }

            const fileUri = FileSystem.documentDirectory + fileName;
            const { uri } = await FileSystem.downloadAsync(audioUrl, fileUri);
            const newDownload = { id, name: fileName, musicURL: uri, fileType: 'audio' };
            const updatedFiles = [...downloadedFiles, newDownload];
            await AsyncStorage.setItem(SatyaSadhnaDownload, JSON.stringify(updatedFiles));
            Alert.alert(
                'Download complete',
                'The file has been downloaded successfully.',
                [
                    { text: 'Go to downloads', onPress: () => navigation.navigate('Downloads') },
                    { text: 'OK', onPress: () => {} },
                ]
            );
        } catch (error) {
            console.error('Error downloading file:', error);
            toast.show('Failed to download file', { type: 'danger' });
        } finally {
            setDownloadLoading(false);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleSliderChange = async (value) => {
        if (currentTrack && currentTrack.id === id) {
            const seekPosition = value * totalDuration;
            await seekTo(seekPosition);
        }
    };

    useEffect(() => {
        HomeData();
    }, [id]);

    if (spinnerBool) {
        return (
            <Spinner
                visible={spinnerBool}
                color="#5F2404"
                animation="fade"
            />
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomStatusBar barStyle="dark-content" backgroundColor="rgba(20, 0, 230, 0.5)" />
            <Spinner visible={downloadLoading} color="#5F2404" animation="fade" />
            <LinearGradient
                style={{ flex: 1 }}
                colors={['rgba(20, 0, 255, 0.5)', 'rgba(255, 255, 255, 0.3)', '#FFF']}
            >
                <View style={{ height: 50 }}>
                    <Pressable
                        style={{ position: 'absolute', top: '15%', left: 20, borderRadius: 50, marginTop: 10 }}
                        onPress={() => navigation.goBack()}
                    >
                        <Feather name="arrow-left" size={27} color="black" />
                    </Pressable>
                </View>
                <View style={{ flex: 1, alignItems: 'center', paddingTop: 10, marginHorizontal: 18 }}>
                    <LoadingImage
                        source={{ uri: currentTrack?.thumbnail || '' }}
                        style={{ width: '90%', height: height * 0.4, borderRadius: 15 }}
                        loaderColor="#4A3AFF"
                        resizeMode="contain"
                    />
                    <View style={{ width: '80%', marginTop: 10, overflow: 'hidden', marginBottom: 10 }}>
                        <Text numberOfLines={2} style={{ alignSelf: 'center', fontSize: 18, color: '#030370' }}>
                            {currentTrack?.title || 'No Title'}
                        </Text>
                    </View>
                    <View style={{ width: '80%', marginTop: 10, marginBottom: 10 }}>
                        <Slider
                            minimumValue={0}
                            maximumValue={1}
                            value={totalDuration && currentTrack?.id === id ? currentTime / totalDuration : 0}
                            minimumTrackTintColor="#6200ee"
                            maximumTrackTintColor="#d3d3d3"
                            thumbTintColor="#6200ee"
                            onSlidingComplete={handleSliderChange}
                        />
                        <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                            <Text style={styles.timeText}>{formatTime(totalDuration)}</Text>
                        </View>
                    </View>
                    <View style={{ width: '70%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <TouchableOpacity style={styles.button} onPress={toggleMute}>
                            {isMuted ? <MuteIcon /> : <UnMuteIcon />}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={togglePlayPause}
                        >
                            {isPlaying && currentTrack?.id === id ? <PauseIcon /> : <PlayIcon />}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => downloadAudio(currentTrack?.audioUrl, `${currentTrack?.title}.mp3`, id)}
                            accessible={true}
                            accessibilityLabel="Download audio"
                        >
                            <Feather name="arrow-down" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 25 }}>
                        {isLoadingRelated ? (
                            <Text>Loading related posts...</Text>
                        ) : relatedPosts?.length > 0 ? (
                            <Snap_Carousel7 relatedPostsData={relatedPosts} />
                        ) : (
                            <View style={{ margin: 20 }}>
                                <Text>No Related Posts</Text>
                            </View>
                        )}
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    timeText: {
        fontSize: 16,
        color: '#030370',
    },
    button: {
        backgroundColor: '#030370',
        borderRadius: Metrics.rfv(20),
        width: Metrics.rfv(40),
        height: Metrics.rfv(40),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
});

export default AudioScreen;