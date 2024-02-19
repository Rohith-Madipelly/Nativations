import { Alert, Button, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react'
import { shareAsync } from 'expo';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
// import { saveFile } from '../../FileSave_Functionality/SaveFile_To_Phone_Storage';
import { saveFile } from '../../FileSave_Functionality/SaveFile_To_Private';

import {ButtonC1Cricle} from '../../Components/UI/Button/ButtonC1Cricle'
import { Feather } from '@expo/vector-icons';

const UrlDownloadFunction = ({ filename, URL_Download }) => {

  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadDisplay, setDownloadDisplay] = useState(false)


  const callback = downloadProgress => {
    const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
    setDownloadProgress(progress);
  };

  async function download() {
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

      // console.log(result.uri, filename, contentType);

      //  For Downloading pdf we get >>> Content-type  // application/pdf; qs=0.001
      //  For Downloading video we get >>> Content-Type  // 
      // "video/mp4"    


      saveFile(result.uri, filename, contentType);

    } catch (e) {
      console.log(e)
    }



  }

  const datadownload=()=>{
  console.log("dcsdcs")
  }
  return (
    // Working Fine
    <View>




          {URL_Download ? <Button title="Download to Phone" onPress={download} /> : ""}
    

          {downloadDisplay ? <Text style={{ marginTop: 20 }}>Download Progress: {Math.round(downloadProgress * 100)}%</Text> : ""}

        
    </View>

  )
}

export default UrlDownloadFunction

const styles = StyleSheet.create({})

