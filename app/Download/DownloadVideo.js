import { Button, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import ytdl from "react-native-ytdl";
import UrlDownloadFunction from './NewUtils/UrlDownloadFunction.js';
import * as FileSystem from 'expo-file-system';
import { Entypo, Feather } from '@expo/vector-icons';

import ButtonC1Cricle from '../Components/UI/Button/ButtonC1Cricle.js'
import onShare from '../utils/ShareBtn.js';
const DownloaderVideo = ({youtubeURL}) => {


  const [videoFinalUri, setvideoFinalUri] = useState("") 
  const [Videotitle, setVideotitle] = useState("") 

  const YoutubeDownloader = async () => {
    const basicInfo = await ytdl.getBasicInfo(youtubeURL);
    const Videotitle123 = basicInfo.player_response.videoDetails.title;
    const videoUrls = await ytdl(youtubeURL, { quality: "highestaudio" });

    const videoFinalUri = videoUrls[0].url;
    console.log(videoFinalUri)

    setVideotitle(Videotitle123)
    setvideoFinalUri(videoFinalUri)


  }

  return (
      <View style={{ marginTop: 20, flexDirection: 'row' }}>
        {/* <Button onPress={YoutubeDownloader} title='Download from Youtude123' style={{width:230}}></Button> */}
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

        <UrlDownloadFunction filename={Videotitle} URL_Download={videoFinalUri} />
      </View>
  )
}

export default DownloaderVideo

const styles = StyleSheet.create({})