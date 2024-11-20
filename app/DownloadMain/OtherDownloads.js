import { useState } from "react";
import { saveFile } from "./SaveFile_To_Private";
import * as FileSystem from 'expo-file-system';
import { ToastAndroid } from "react-native";

async function OtherDownloads(URL_Download, filename) {
    console.log("This the download URL > ", URL_Download, "<><>", filename)
    // ToastAndroid.show('Downloading started', ToastAndroid.SHORT);

    try {
      const DataDownload = FileSystem.createDownloadResumable(
        URL_Download,
        FileSystem.documentDirectory + filename, // Destination file path
        {}, // Optional options object
        // callback // Progress callback
      );
      const result = await DataDownload.downloadAsync()
      const contentType = result.headers['Content-Type'];


      console.log("Tester >",result.uri, "Tester >", filename,"Tester >", contentType);

      
      saveFile(result.uri, filename, contentType);
    } catch (e) {
      console.log("Error haa", e)
    }
  }



export default OtherDownloads

