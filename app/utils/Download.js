import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import * as FileSystem from 'expo-file-system';

const Download = async () => {
    //     try {
    //       const urlLink = 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'; // Replace with your AWS video URL
    //   console.log('Data url link',urlLink)
    //       // Create a download path based on the platform
    //     //   const downloadDir = Platform.OS === 'ios'? RNFS.DocumentDirectoryPath: RNFS.ExternalDirectoryPath;
    //       const downloadDir = FileSystem.documentDirectory;

    //       const fileName = 'downloadedVideo.mp4';
    //       const downloadPath = `${downloadDir}/${fileName}`;

    //       // Use RNFetchBlob to download the video
    //       await RNFetchBlob.config({
    //         fileCache: true,
    //         path: downloadPath,
    //       })
    //       .fetch('GET', urlLink, {})
    //       .progress({ count: 10 }, (received, total) => {
    //         console.log(`Progress: ${(received / total) * 100}%`);
    //       })
    //       .then((res) => {
    //         console.log('Download complete. File saved at:', res.path());
    //       });
    //     } catch (error) {
    //       console.error('Error downloading video:', error);
    //     }



    // try {
    //     const downloadResumable = FileSystem.createDownloadResumable(
    //         'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    //         FileSystem.documentDirectory + '/big_buck_bunny.mp4'
    //     );

    //     const { uri } = await downloadResumable.downloadAsync();
    //     Alert.alert('Download complete!', `File saved at: ${uri}`);
    // } catch (error) {
    //     console.error('Error downloading video:', error);
    //     Alert.alert('Error', 'Failed to download video.');
    // }
};
export default Download