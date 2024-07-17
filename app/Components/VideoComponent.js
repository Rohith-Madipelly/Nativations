import { StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Video } from 'expo-av';
import { BASE_URL } from '../Enviornment';
import CustomButton from './UI/Button/ButtonC1Cricle';

const VideoComponent = ({ DataPage }) => {

  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null)

  const togglePlaying = () => {
    if (playing) {
      videoRef.current.pauseAsync();
    } else {
      videoRef.current.playAsync();
    }
    setPlaying(!playing);
  };

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <View style={styles.container}>

        <Video
          ref={videoRef}
          // onBuffer={onBuffer}
          // onError={onError}
          repeat={true}
          // resizeMode='cover'
          resizeMode="contain"
          // paused={false}
          source={{ uri: `${BASE_URL}/${DataPage.videoUrl}` }}
          // source={item.video}
          // source={{
          //   uri: 'https://ads-book-s3.s3.ap-south-1.amazonaws.com/NTNfMTcwMzY2NDQ3MDIwMl81OQ==.mp4',
          // }}
          isLooping
          useNativeControls
          // useNativeControls={false}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute'
          }}
        // onPlaybackStatusUpdate={(status) => console.log("dS",status)}

        />



      </View>

      <CustomButton
        onPress={togglePlaying}
        styleData={{ paddingHorizontal: 20, marginVertical: 10,width:'50%' }}>
        {playing ? 'Pause' : 'Watch Now'}
      </CustomButton>
   </View>


  )
}

export default VideoComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: 300,
  },
});