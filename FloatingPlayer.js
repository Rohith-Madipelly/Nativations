import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

import PauseIcon from './app/assets/SVGS/MusicPlayer/Player/Pause';
import PlayIcon from './app/assets/SVGS/MusicPlayer/Player/PlayIcon';
import Metrics from './app/utils/ResposivesUtils/Metrics';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAudio } from './app/context/AudioProvider';
import { Image } from 'expo-image';
import LoadingImage from './app/Components/ImageConatiners/LoadingImage';


const FloatingPlayer = ({ styleProps }) => {
  const { currentTrack, isPlaying, togglePlayPause, stopTrack, imageURl, path } = useAudio();
  const navigation = useNavigation();

  if (!currentTrack) {
    return null; // Don't render if no track is playing
  }

  const colorDot = "white"
  // console.log(currentTrack.audioUrl)
  return (
    <View style={[styles.container, styleProps]}>
      <TouchableOpacity
        style={[
          styles.trackInfo,
          { gap: 5 }]}
        onPress={() => {
          if (path) {
            navigation.navigate('BottomTabScreen', {
              screen: 'Downloads',
            });
          } else {
            navigation.navigate('AudioScreen', { id: currentTrack.id, isPlay: isPlaying })
          }
        }}
      >
        <View>
          <LoadingImage
            source={{ uri: currentTrack?.thumbnail }}
            style={{ width: '90%', height: 40, width: 40 }}
            loaderColor="#4A3AFF"
          // resizeMode="contain"
          />
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text numberOfLines={1} style={[styles.title, { textAlign: 'left' }]}>
            {currentTrack.title || 'Unknown Track'}
          </Text>
          {/* <Text numberOfLines={1} style={[styles.title, { fontSize: Metrics.rfv(12), textAlign: 'left' }]}> {currentTrack.title || 'Unknown Track'}
          </Text> */}
        </View>
        {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {isPlaying ? <Image
            source={require('./app/assets/MusicPlaying.gif')}
            style={{ width: 40, height: 40, alignSelf: 'center' }}
          /> :
            <View style={{ width: 40, height: 40, alignSelf: 'center', flexDirection: 'row', gap: 2.6, paddingLeft: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ width: 5, height: 5, backgroundColor: colorDot, borderRadius: 2.5 }}> </Text>
              <Text style={{ width: 5, height: 5, backgroundColor: colorDot, borderRadius: 2.5 }}> </Text>
              <Text style={{ width: 5, height: 5, backgroundColor: colorDot, borderRadius: 2.5 }}> </Text>
              <Text style={{ width: 5, height: 5, backgroundColor: colorDot, borderRadius: 2.5 }}> </Text>
              <Text style={{ width: 5, height: 5, backgroundColor: colorDot, borderRadius: 2.5 }}> </Text>
            </View>}
        </View> */}

      </TouchableOpacity>


      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={togglePlayPause}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={stopTrack}>
          <Feather name="square" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Metrics.rfv(90),
    left: 20,
    right: 20,
    backgroundColor: 'rgba(3, 3, 112, 0.9)',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    //  flex: Platform.OS === "ios" ? 0.07 : 0.100,
    // zIndex: 20
  },
  trackInfo: {
    flex: 2,
    paddingRight: 10,
    flexDirection: 'row'
  },
  title: {
    color: 'white',
    fontSize: Metrics.rfv(14),
    fontFamily: 'Gabarito-VariableFont',
  },
  controls: {
    flexDirection: 'row',
    gap: 10,
    flex: 1,
    justifyContent: 'flex-end'
  },
  button: {
    backgroundColor: '#030370',
    borderRadius: Metrics.rfv(20),
    width: Metrics.rfv(40),
    height: Metrics.rfv(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FloatingPlayer;