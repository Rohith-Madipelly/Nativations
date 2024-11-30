import { useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { useAudioPlayer } from 'expo-audio';

export default function App() {
  const player = useAudioPlayer("https://www.satyasadhna.com/upload/audios/1731759861954.mp3");

  return (
    <View style={styles.container}>
      <Button title="Play Sound" onPress={() => player.play()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
