import { saveFile } from "./SaveFile_To_Private";
import * as FileSystem from 'expo-file-system';

async function OtherDownloads(URL_Download, filename) {
    // const URL_Download = "https://ads-book-s3.s3.ap-south-1.amazonaws.com/first.mp4"
    // const filename = "Hello 123456"
    // console.log("Data vachinda ra ", URL_Download, "<><>", filename)
    console.log("This the download URL > ", URL_Download, "<><>", filename)

    // setDownloadDisplay(true)
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



export default OtherDownloads

