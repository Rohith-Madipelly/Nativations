import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Audio } from 'expo-av';
import { useToast } from 'react-native-toast-notifications';
import { AppState } from 'react-native';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    const toast = useToast();
    const [currentTrack, setCurrentTrack] = useState(null);
    const [sound, setSound] = useState(null);
    const [path,setPath]=useState(false)
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isLooping, setIsLooping] = useState(false); // Looping disabled by default

    const configureAudioMode = async () => {
        try {
            await Audio.setAudioModeAsync({
                staysActiveInBackground: true,
                playsInSilentModeIOS: true,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX || 1,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX || 1,
                shouldDuckAndroid: false,
            });
            console.log('Audio mode configured successfully');
            // Explicitly activate audio session on iOS
            if (typeof Audio.activateAudioSessionAsync === 'function') {
                await Audio.activateAudioSessionAsync();
                console.log('Audio session activated');
            }
        } catch (error) {
            console.error('Error setting audio mode:', error);
              toast.hideAll()
            toast.show('Failed to configure audio mode', { type: 'danger' });
            // Fallback to minimal configuration
            await Audio.setAudioModeAsync({
                staysActiveInBackground: true,
                playsInSilentModeIOS: true,
            }).catch((fallbackError) => {
                console.error('Error setting fallback audio mode:', fallbackError);
            });
        }
    };

    const playTrack = async (track) => {
        try {
            if (sound) {
                await sound.unloadAsync();
                setSound(null);
                setIsPlaying(false);
            }

            await configureAudioMode(); // Ensure audio mode is set before playing
            const { sound: newSound, status } = await Audio.Sound.createAsync(
                { uri: track.audioUrl },
                { shouldPlay: true },
                onPlaybackStatusUpdate
            );
            await newSound.setIsLoopingAsync(isLooping);
            setSound(newSound);
            setPath(track.downloaded);
            setCurrentTrack(track);
            setIsPlaying(true);
            onPlaybackStatusUpdate(status);
        } catch (error) {
            console.error('Error playing track:', error);
              toast.hideAll()
            toast.show('Failed to play track', { type: 'danger' });
        }
    };

    const togglePlayPause = async () => {
        if (!sound || !currentTrack) {
              toast.hideAll()
            toast.show('No track is currently loaded', { type: 'warning' });
            return;
        }
        try {
            if (isPlaying) {
                await sound.pauseAsync();
                setIsPlaying(false);
            } else {
                if (currentTime >= totalDuration && totalDuration > 0) {
                    await sound.replayAsync();
                } else {
                    await sound.playAsync({ positionMillis: currentTime });
                }
                setIsPlaying(true);
            }
        } catch (error) {
            console.error('Error toggling play/pause:', error);
              toast.hideAll()
            toast.show('Error controlling playback', 
                // { type: 'danger' }
            );
        }
    };

    const stopTrack = async () => {
        if (sound) {
            try {
                await sound.stopAsync();
                await sound.unloadAsync();
                setSound(null);
                setCurrentTrack(null);
                setIsPlaying(false);
                setCurrentTime(0);
                setTotalDuration(0);
            } catch (error) {
                console.error('Error stopping track:', error);
                  toast.hideAll()
                toast.show('Error stopping track', 
                    // { type: 'danger' }

                );
            }
        }
    };

    const seekTo = async (positionMillis) => {
        if (sound && currentTrack) {
            try {
                await sound.setPositionAsync(positionMillis);
            } catch (error) {
                console.error('Error seeking track:', error);
                  toast.hideAll()
                toast.show('Failed to seek track', 
                    // { type: 'danger' }
                );
            }
        }
    };

    const toggleMute = async () => {
        if (sound) {
            try {
                await sound.setIsMutedAsync(!isMuted);
                setIsMuted(!isMuted);
            } catch (error) {
                console.error('Error toggling mute:', error);
                  toast.hideAll()
                toast.show('Failed to toggle mute', { type: 'danger' });
            }
        }
    };

    const toggleLoop = async () => {
        if (sound) {
            try {
                await sound.setIsLoopingAsync(!isLooping);
                setIsLooping(!isLooping);
                toast.hideAll()
                toast.show(isLooping ? 'Looping disabled' : 'Looping enabled',
                    // { type: 'success' }

                );
            } catch (error) {
                console.error('Error toggling loop:', error);
                  toast.hideAll()
                toast.show('Failed to toggle loop',
                    //  { type: 'danger' }
                    );
            }
        }
    };

    const onPlaybackStatusUpdate = (status) => {
        if (status.isLoaded) {
            setCurrentTime(status.positionMillis);
            setTotalDuration(status.durationMillis || 0);
            setIsPlaying(status.isPlaying);
            if (status.didJustFinish && !status.isLooping) {
                setIsPlaying(false);
            }
        } else if (status.error) {
            console.error('Playback error:', status.error);
            toast.show('Playback error occurred', { type: 'danger' });
        }
    };

    useEffect(() => {
        configureAudioMode();

        const handleAppStateChange = async (nextAppState) => {
            console.log('AppState changed:', nextAppState, 'IsPlaying:', isPlaying);
            if (nextAppState === 'active' && sound && currentTrack) {
                try {
                    // Reconfigure audio mode to ensure session is active
                    await configureAudioMode();
                    const status = await Promise.race([
                        sound.getStatusAsync(),
                        new Promise((_, reject) => setTimeout(() => reject(new Error('Status check timeout')), 5000)),
                    ]);
                    console.log('Sound status on active:', status);
                    if (status.isLoaded && !status.isPlaying && isPlaying) {
                        console.log('Resuming playback after returning to foreground');
                        if (status.positionMillis >= status.durationMillis && status.durationMillis > 0) {
                            await sound.replayAsync();
                        } else {
                            await sound.playAsync({ positionMillis: currentTime });
                        }
                        setIsPlaying(true);
                    }
                } catch (error) {
                    console.error('Error resuming playback:', error);
                    toast.show('Failed to resume playback', { type: 'danger' });
                    // Fallback: Reload track if resumption fails
                    if (currentTrack) {
                        console.log('Reloading track as fallback');
                        await playTrack(currentTrack);
                    }
                }
            }
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            if (sound) {
                sound.unloadAsync().catch((error) => {
                    console.error('Error unloading sound:', error);
                });
            }
            subscription.remove();
        };
    }, [sound, currentTrack]);

    const providerValue = useMemo(
        () => ({
            currentTrack,
            isPlaying,
            currentTime,
            totalDuration,
            isMuted,
            isLooping,
            playTrack,
            togglePlayPause,
            stopTrack,
            seekTo,
            toggleMute,
            toggleLoop,
            path
        }),
        [currentTrack, isPlaying, currentTime, totalDuration, isMuted, isLooping]
    );

    return <AudioContext.Provider value={providerValue}>{children}</AudioContext.Provider>;
};

export const useAudio = () => useContext(AudioContext);