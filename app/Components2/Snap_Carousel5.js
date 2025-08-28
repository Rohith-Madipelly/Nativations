import { Dimensions, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'


import { Entypo } from "@expo/vector-icons";

import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import { GUEST_URL } from '../Enviornment';
import LoadingImage from '../Components/ImageConatiners/LoadingImage';


const Snap_Carousel5 = ({ BannerDataBajana }) => {
  const carouselRef = useRef(null);
  const navigation = useNavigation();
  const [spinnerBool, setSpinnerbool] = useState(false)

  const { width, height } = Dimensions.get('window');

  const goToNext = () => {
    carouselRef.current.next();
  }
  const goToPrev = () => {
    carouselRef.current.prev();
  }

  if (!BannerDataBajana) {
    return (
      <SafeAreaView>
        <Spinner
          visible={spinnerBool}
          color={"#5F2404"}
          animation={'fade'}
        />
      </SafeAreaView>
    );
  }

  return (
    <View style={{ marginTop: 10 }}>
      <View style={{ marginHorizontal: 20, marginTop: 10, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>

        <Text style={[styles.Heading_U3]}>Bhajans</Text>

        {/* <Entypo name="chevron-small-right" size={20} color="black" /> */}

      </View>

      <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row' }}>
        <View style={{ width: '100%', height: 200,  }}>
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="space-x-4"
            // contentContainerStyle={{ paddingHorizontal: 10 }}
            >
 


              {BannerDataBajana.map(item => (
                <View key={item.id} style={{ width: 170, paddingHorizontal: 12, marginRight: 0 }}>
                  <TouchableOpacity onPress={() => {
                     navigation.navigate('VideoScreen', { id: `${item.id}`, selectedVideoData: item, totalVideoData: BannerDataBajana, title:"Pravachan / Event Videos" })
                    // navigation.navigate('VideoScreen', { id: `${item.id}` });
                     }}>
                    {/* <Image source={{ uri: `${GUEST_URL}/thumbnail/${item.thumbnail}` }} style={{ width: '100%', height: '100%', borderRadius: 20, backgroundColor: 'red' }} /> */}

                    <LoadingImage
                      source={{ uri: `${GUEST_URL}/${item.thumbnail}` }}
                      //   style={{ width: '100%', height: 240, }}
                      style={{ width: '100%', height: '100%', borderRadius: 20, }}
                      loaderColor="#ff0000" // Optional: change loader color
                    // resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              ))}


              {BannerDataBajana.length === 0 ?
                <View style={{ height: 171, width: width * 0.78, marginHorizontal: 10,borderRadius:15, backgroundColor: '#E8E8E899', alignItems: 'center', justifyContent: 'center' }} >
                  <Text>No posts available</Text>
                </View>
                : ""}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Snap_Carousel5

const styles = StyleSheet.create({
  Heading_U3: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400'
  }
})