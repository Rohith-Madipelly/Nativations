import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Linking, TouchableOpacity, ScrollView, Platform, Image } from 'react-native';
import * as FileSystem from 'expo-file-system';


async function fetchFileList() {
    const { status } = await FileSystem.requestPermissionsAsync();
    if (!status == 'granted') {
      console.log('Permission denied for accessing media library');
      return;
    }


    try {
        const internalDirectory = FileSystem.documentDirectory;
        const files = await FileSystem.readDirectoryAsync(internalDirectory);
        console.log("File Data", files)
        return files;
    } catch (error) {
        console.error('Error fetching file list:', error);
        return [];
    }
}



const DownloadsList = async () => {

    const [fileList, setFileList] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(false);


    // useEffect(() => {
    //     // Fetch the list of files when the component mounts
    //     fetchFileList().then(files => setFileList(files));
    // }, []);

    const data = () => {

        fetchFileList().then(files => setFileList(files));
    }


    // Function to handle when a video item is pressed
    const handleVideoPress = async (filename) => {
        const internalDirectory = FileSystem.documentDirectory;
        const videoUri = `${internalDirectory}${filename}`;
        setSelectedVideo(videoUri);
        console.log("selectedVideo", Platform.OS, selectedVideo)
    };

    // Render each item in the list
    const renderItem = ({ item }) => (

        <TouchableOpacity onPress={() => handleVideoPress(item)} style={{ padding: 10, margin: 20, marginVertical: 10, backgroundColor: 'pink', borderWidth: 2, borderRadius: 20 }}>
            <Text>{item}</Text>
        </TouchableOpacity>
    );



    return (
        <View>
            <ScrollView style={{ marginBottom: 70 }}>

                {selectedVideo ? (
                    <Video
                        source={{ uri: selectedVideo }}
                        style={{ width: '100%', height: 300 }}
                        resizeMode="contain"
                        useNativeControls
                        autoplay
                        shouldPlay={true}
                        // isLooping
                        // onPlaybackStatusUpdate={status => {
                        //     if (!status.isPlaying && status.positionMillis !== 0 && status.didJustFinish) {
                        //         setSelectedVideo(null);
                        //     }
                        // }}
                        error
                    />
                ) : ""}

                {/* {selectedVideo?<View style={{backgroundColor:'red'}}>
                <Image
              src={{ uri: selectedVideo }}
              style={{ width: '100%', height: 300 }}
             
              /></View>:""} */}
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Download List :</Text>
                        <View>
                            <TouchableOpacity style={{ padding: 10 }} onPress={data}>
                                <Text>Reload List </Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    {/* <FlatList
                        data={fileList.filter(item => !ignoreFileName.includes(item))}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    /> */}
                </View>
            </ScrollView>
        </View>
    )
}

export default DownloadsList