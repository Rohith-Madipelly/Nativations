import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { ToasterSender } from '../utils/Toasters/Toaster';



// To store the file into internalDirectory of app



export async function saveFile(uri, filename, mimetype) {
  if (Platform.OS === "android") {
    // Check if the media library permissions are granted android
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (!status == 'granted') {
      console.log('Permission denied for accessing media library');
      return;
    }

    // Get the app's internal directory
    const internalDirectory = FileSystem.documentDirectory;
    console.log(internalDirectory, "<1>")
    console.log(uri, "<2>")

    // Read the file content
    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });

    try {
      // Write the file to the internal storage
      const savedUri = `${internalDirectory}${filename}`;
      await FileSystem.writeAsStringAsync(savedUri, base64, { encoding: FileSystem.EncodingType.Base64 });

      console.log('Download complete. File saved at:', savedUri);
      ToasterSender({ Message: `${filename} Download complete` })
    } catch (error) {
      console.error('Error saving file:', error);
    }
  } else {
    // Check if the media library permissions are granted
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission denied for accessing media library');
      return;
    }


    try {
      // Determine the file extension based on the type of video file
      const fileExtension = 'mp4'; // Assuming the video file is in MP4 format
      const internalDirectory = FileSystem.documentDirectory;
      console.log(internalDirectory, "<1>")
      console.log(uri, "<2>")
      const pinnn = uri + ".mp4"
      console.log(pinnn)
      let uriString = pinnn.toString();
      try {

        // Save the file to the camera roll with the specified file extension
        const asset = await MediaLibrary.createAssetAsync(uriString, {
          // mimeType: `video/${fileExtension}`,
          mimeType: `video/mp4`,
          mediaType: 'video', // Specify that it's a video
          album: 'My Videos', // Specify the album name
          copyToAlbum: true, // Copy the asset to the specified album
          metadata: {  // Additional metadata if needed
            title: 'My Video',
            description: 'Description of my video'
          }
        });
        ToasterSender("Download complete.")
      }
      catch (e) {
        console.log("ASDa", e)
      }
   
      console.log('Download complete. File saved to camera roll');
    } catch (error) {
      console.error('Error saving file to camera roll:', error);
    }
  }
}
