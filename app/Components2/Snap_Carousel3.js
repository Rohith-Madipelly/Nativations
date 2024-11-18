import { Dimensions, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Entypo } from "@expo/vector-icons";
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import { GUEST_URL } from '../Enviornment';
import LoadingImage from '../Components/ImageConatiners/LoadingImage';



const Snap_Carousel3 = ({ BannerDataPravachan }) => {
  const [spinnerBool, setSpinnerbool] = useState(false)
  const navigation = useNavigation();
  const carouselRef = useRef(null);

  const { width, height } = Dimensions.get('window');
  const goToNext = () => {
    carouselRef.current.next();
  }
  const goToPrev = () => {
    carouselRef.current.prev();
  }



  // if (!BannerDataPravachan) {
  //   return (
  //     <SafeAreaView>
  //       <Spinner
  //         visible={spinnerBool}
  //         color={"#5F2404"}
  //         animation={'fade'}
  //       />
  //     </SafeAreaView>
  //   );
  // }


  const Navigationn = (item) => {
    if (item.type == "Youtube" || item.type == undefined) {
        navigation.navigate('YoutudeScreen', { id: `${item.id}` })
        // console.log("chgchgcjyhcjhc", item.id)
    }
    else if (item.type == "Audio") {
        // console.log("this is Audio ")
        navigation.navigate('AudioScreen', { id: `${item.id}` })
    }
    else if (item.type == "Video") {
        // console.log("video")
        navigation.navigate('VideoScreen', { id: `${item.id}` })
    }
}


  

  return (
    <View style={{ marginTop: 10 }}>
      <View style={{ marginHorizontal: 20, marginTop: 10, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>

        <Text style={[styles.Heading_U3]}>Pravachan / Videos</Text>

        {/* <TouchableOpacity onPress={goToNext}>

          <Entypo name="chevron-small-right" size={20} color="black" />
        </TouchableOpacity> */}

      </View>

      <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row' }}>

        <View style={{ width: '100%', height: 200, }}>
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="space-x-4"
            // contentContainerStyle={{ paddingHorizontal: 10 }}
            >

              {BannerDataPravachan.map(item => (
            <View key={item.id} style={{ width: 170, paddingHorizontal: 12, marginRight: 0 }}>
                  <TouchableOpacity onPress={()=>{Navigationn(item)}}>
                    {/* <Image source={{ uri: `${GUEST_URL}/thumbnail/${item.thumbnail}` }} style={{ width: '100%', height: '100%', borderRadius: 20,  }} /> */}

                    <LoadingImage
                      source={{ uri: `${GUEST_URL}/${item.thumbnail}` }}
                        // style={{ width: '100%', height: 240, }}
                        style={{ width: '100%', height: '100%', borderRadius: 20, }}
                      loaderColor="#ff0000" // Optional: change loader color
                    // resizeMode="contain"
                    />

                  </TouchableOpacity>
                </View>
              ))}

              {BannerDataPravachan.length === 0 ?
                <View style={{ height: 171,  width: width * 0.78, backgroundColor: '#E8E8E899', alignItems: 'center', justifyContent: 'center' }} >
                  <Text>No posts available</Text>
                </View>
                :""}


            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Snap_Carousel3

const styles = StyleSheet.create({
  Heading_U3: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400'
  }
})