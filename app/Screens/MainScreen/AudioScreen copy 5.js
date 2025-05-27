import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { SatyaSadhnaDownload } from '../../utils/AsyncStorageKeys';
import { HomeData } from '../../services/APIs';
import CustomSpinner from '../../components/utils/CustomSpinner';
import CustomAlert from '../../components/utils/CustomAlert';

const AudioScreen = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const requestPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === 'granted';
  };

  const fetchAudioData = async () => {
    setLoading(true);
    try {
      const res = await HomeData();
      setAudio(res?.data?.audioUrl);
    } catch (error) {
      console.error("Error fetching audio:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadAudio = async (uri) => {
    if (!uri) return;
    const { sound } = await Audio.Sound.createAsync({ uri });
    setSound(sound);
  };

  const playPauseAudio = async () => {
    if (!sound && audio) {
      await loadAudio(audio);
    }
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  const downloadAudio = async (url, fileName, id) => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      Alert.alert("Permission Denied", "Media library permission is required.");
      return;
    }

    setDownloadLoading(true);

    try {
      const uri = FileSystem.documentDirectory + fileName;
      const { uri: localUri } = await FileSystem.downloadAsync(url, uri);
      const asset = await MediaLibrary.createAssetAsync(localUri);
      await MediaLibrary.createAlbumAsync('Download', asset, false);

      // Save metadata to AsyncStorage
      const existingData = await AsyncStorage.getItem(SatyaSadhnaDownload);
      const downloads = existingData ? JSON.parse(existingData) : [];

      const updatedDownloads = [...downloads, {
        id,
        fileName,
        audioUrl: url,
        date: new Date().toISOString(),
      }];

      await AsyncStorage.setItem(SatyaSadhnaDownload, JSON.stringify(updatedDownloads));
      Alert.alert("Download Complete", "Audio downloaded to your device.");
    } catch (error) {
      console.error("Download failed:", error);
      Alert.alert("Download Failed", "Something went wrong while downloading.");
    } finally {
      setDownloadLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!audio) {
      Alert.alert("Audio not available");
      return;
    }

    const fileName = `satyasadhna_${Date.now()}.mp3`;
    const id = Date.now();

    try {
      const data = await AsyncStorage.getItem(SatyaSadhnaDownload);
      const downloads = data ? JSON.parse(data) : [];
      const isAlreadyDownloaded = downloads.some(item => item.id === id);

      if (isAlreadyDownloaded) {
        Alert.alert("Already Downloaded", "This audio file has already been downloaded.");
        return;
      }

      await downloadAudio(audio, fileName, id);
    } catch (error) {
      console.error("Error checking download status:", error);
    }
  };

  useEffect(() => {
    fetchAudioData();
  }, []);

  useEffect(() => {
    if (audio) {
      loadAudio(audio);
    }

    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [audio]);

  if (loading) return <CustomSpinner />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Satya Sadhna Audio</Text>

      <TouchableOpacity style={styles.button} onPress={playPauseAudio}>
        <Ionicons name={isPlaying ? 'pause' : 'play'} size={32} color="#fff" />
        <Text style={styles.buttonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={stopAudio}>
        <Ionicons name="stop" size={32} color="#fff" />
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleDownload}>
        {downloadLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="download" size={32} color="#fff" />
            <Text style={styles.buttonText}>Download</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AudioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
    color: '#fff',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginVertical: 10,
    width: '80%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});
