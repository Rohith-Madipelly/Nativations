import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
// import Carousel from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GUEST_URL } from '../Enviornment';

import Carousel from 'react-native-reanimated-carousel';
import LoadingImage from '../Components/ImageConatiners/LoadingImage';



const Snap_Carousel1 = ({ BannerData }) => {

    const { width, height } = Dimensions.get('window');

    const carouselRef = useRef(null);
    const navigation = useNavigation();


    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", BannerData)
    const RenderItem = ({ item, index }) => {

        const Navigationn = () => {
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
            <Pressable onPress={() => { Navigationn() }} key={index} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '98%', justifyContent: 'center', alignItems: 'center', borderRadius: 20, overflow: 'hidden' }} >
                    {/* <Image source={{ uri: `${GUEST_URL}/${item.thumbnail}` }} style={{ width: '100%', height: 200, borderRadius: 20, resizeMode: 'contain', }} /> */}


                    <LoadingImage
                        source={{ uri: `${GUEST_URL}/${item.thumbnail}` }}
                        //   style={{ width: '100%', height: 240, }}
                        style={{ width: '100%', height: 200, borderRadius: 20, resizeMode: 'cover' }}
                        loaderColor="#ff0000" // Optional: change loader color
                    // resizeMode="contain"
                    />


                </View>
                {/* <Text>{`${GUEST_URL}/${item.thumbnail}`}</Text> */}
            </Pressable>
        );
    }


    const goToNext = () => {
        carouselRef.current.snapToNext();
    }
    const goToPrev = () => {
        carouselRef.current.snapToPrev();
    }

    return (
        <View style={{ justifyContent: "center", alignItems: 'center', marginTop: 10 }}>
            {/* <Carousel
                ref={carouselRef}
                loop={true}
                data={BannerData}
                renderItem={RenderItem}
                // sliderWidth={350}
                sliderWidth={400}
                itemWidth={510}
                autoplay={true}
                autoplayDelay={4000}
            /> */}
            {BannerData.length === 0 ?
                <View style={{ height: 171, width: width * 0.78, marginHorizontal: 10, backgroundColor: '#E8E8E899', alignItems: 'center', justifyContent: 'center', borderRadius: 15 }} >
                    <Text>No posts available</Text>
                </View>
                : <Carousel
                    loop
                    // ref={carouselRef}
                    width={width * 0.9}
                    height={width * 0.65}
                    autoPlay={true}
                    data={BannerData}
                    scrollAnimationDuration={4000}
                    renderItem={RenderItem}
                />}
            <View>

            </View>

        </View>
    )
}

export default Snap_Carousel1

