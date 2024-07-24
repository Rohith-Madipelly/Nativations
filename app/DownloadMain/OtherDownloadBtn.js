import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react'
import ytdl from "react-native-ytdl";
import * as FileSystem from 'expo-file-system';
import { Entypo, Feather } from '@expo/vector-icons';


import ButtonC1Cricle from '../Components/UI/Button/ButtonC1Cricle.js'
import onShare from '../utils/ShareBtn.js';
import { saveFile } from './SaveFile_To_Private.js';


const OtherDownloadBtn = ({ URL_Download,filename }) => {


  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadDisplay, setDownloadDisplay] = useState(false)
  const callback = downloadProgress => {
    const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
    setDownloadProgress(progress);
  };


  async function OtherDownloads() {
  
      console.log("This the download URL > ", URL_Download, "<><>", filename)
      try {
        const DataDownload = FileSystem.createDownloadResumable(
          URL_Download,
          FileSystem.documentDirectory + filename, // Destination file path
          {}, // Optional options object
          // callback // Progress callback
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
      <View style={{ flexDirection: 'row' }}>


        <ButtonC1Cricle
          onPress={OtherDownloads}
        >
          
          <Feather name="arrow-down" size={20} color="white" />
        </ButtonC1Cricle>

      </View>
      <Text>{downloadDisplay ? <Text style={{ marginTop: 20 }}>Download Progress: {Math.round(downloadProgress * 100)}%</Text> : ""}</Text>

      <Text>
        {downloadDisplay ? (
          <Text style={{ marginTop: 20 }}>
            {downloadProgress === 1
              ? "Download Success"
              : `Download Progress: ${Math.round(downloadProgress * 100)}%`}
          </Text>
        ) : (
          ""
        )}
      </Text>

    </View>
  )
}

export default OtherDownloadBtn

const styles = StyleSheet.create({})


