import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';

const AudioPlayer = () => {
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);

    const audioUrl = 'https://www.satyasadhna.com/upload/audios/1733752486383.mp3';

    // Load and unload the audio
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
        }
    };

    const playPauseAudio = async () => {
        if (!sound) {
            await loadAudio(audioUrl);
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

    useEffect(() => {
        loadAudio(audioUrl);
    }, []);

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


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Audio Player</Text>

            <TouchableOpacity style={styles.button} onPress={playPauseAudio}>
                <Text style={styles.buttonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={toggleMute}>
                <Text style={styles.buttonText}>{isMuted ? 'Unmute' : 'Mute'}</Text>
            </TouchableOpacity>

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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
});

export default AudioPlayer;
