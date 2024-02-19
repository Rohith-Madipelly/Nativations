import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react'
import ytdl from "react-native-ytdl";
import * as FileSystem from 'expo-file-system';
import { Entypo, Feather } from '@expo/vector-icons';


import ButtonC1Cricle from '../Components/UI/Button/ButtonC1Cricle.js'
import onShare from '../utils/ShareBtn.js';
import { saveFile } from './SaveFile_To_Private.js';


const ButtonTotal = ({ youtubeURL }) => {


  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadDisplay, setDownloadDisplay] = useState(false)
  const callback = downloadProgress => {
    const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
    setDownloadProgress(progress);
  };
  const YoutubeDownloader = async () => {
    const basicInfo = await ytdl.getBasicInfo(youtubeURL);
    const Videotitle123 = basicInfo.player_response.videoDetails.title;
    const videoUrls = await ytdl(youtubeURL, { quality: "highestaudio" });
    const videoFinalUri = videoUrls[0].url;
    console.log(videoFinalUri)
    download(videoFinalUri, Videotitle123)
  }

  async function download(URL_Download, filename) {
    // const URL_Download = "https://ads-book-s3.s3.ap-south-1.amazonaws.com/first.mp4"
    // const filename = "Hello 123456"
    console.log("Data vachinda ra ", URL_Download, "<><>", filename)

    setDownloadDisplay(true)
    try {
      const DataDownload = FileSystem.createDownloadResumable(
        URL_Download,
        FileSystem.documentDirectory + filename, // Destination file path
        {}, // Optional options object
        callback // Progress callback
      );

      const result = await DataDownload.downloadAsync()
      const contentType = result.headers['Content-Type'];
      saveFile(result.uri, filename, contentType);

    } catch (e) {
      console.log("Error haa", e)
    }



  }


  return (
    <View>
    {/* // Working Fine */}
      <View style={{ marginTop: 20, flexDirection: 'row' }}>

        <ButtonC1Cricle
          onPress={() => { onShare(`${youtubeURL}`) }}
        >
          <Entypo name="share" size={20} color="white" />
        </ButtonC1Cricle>
        
        <ButtonC1Cricle
          styleData={{ marginLeft: 20 }}
          onPress={YoutubeDownloader}
        >
          <Feather name="arrow-down" size={20} color="white" />
        </ButtonC1Cricle>




      </View>
      <Text>{downloadDisplay ? <Text style={{ marginTop: 20 }}>Download Progress: {Math.round(downloadProgress * 100)}%</Text> : ""}</Text>
    </View>
  )
}

export default ButtonTotal

const styles = StyleSheet.create({})


