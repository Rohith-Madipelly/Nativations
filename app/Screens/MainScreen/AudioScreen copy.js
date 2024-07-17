import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const AudioPlayer = () => {
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [status, setStatus] = useState({});

    

    const playSound = async () => {
        if (sound) {
            await sound.playAsync();
        } else {
            const { sound } = await Audio.Sound.createAsync(
                { uri: 'https://www.satyasadhna.com/upload/audios/1721054604383.mp3' },
                { shouldPlay: true }
            );
            setSound(sound);
            sound.setOnPlaybackStatusUpdate(updateStatus);
        }
        setIsPlaying(true);
    };

    const pauseSound = async () => {
        if (sound) {
            await sound.pauseAsync();
        }
        setIsPlaying(false);
    };

    const stopSound = async () => {
        if (sound) {
            await sound.stopAsync();
        }
        setIsPlaying(false);
    };

    const updateStatus = (status) => {
        setStatus(status);
    };

    useEffect(() => {
        setStatus(status);
    }, [status])

    useEffect(() => {
        return sound ? () => { sound.unloadAsync(); } : undefined;
    }, [sound]);

    return (
        <View style={styles.container}>
            <Button
                title={isPlaying ? "Pause" : "Play"}
                onPress={isPlaying ? pauseSound : playSound}
            />
            {isPlaying && (
                <Button title="Stop" onPress={stopSound} />
            )}
            {status.isLoaded && (
                <Text style={styles.status}>
                    {`Position: ${(status.positionMillis / 1000).toFixed(2)} / ${(status.durationMillis / 1000).toFixed(2)} sec`}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    status: {
        marginTop: 16,
        fontSize: 16,
    },
});

export default AudioPlayer;
