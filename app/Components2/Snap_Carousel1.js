import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import Carousel from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GUEST_URL } from '../Enviornment';


const Snap_Carousel1 = ({ BannerData }) => {

    const { width, height } = Dimensions.get('window');

    const carouselRef = useRef(null);
    const navigation = useNavigation();


    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",BannerData)
    const RenderItem = ({ item, index }) => {

        return (
            <Pressable onPress={() => {navigation.navigate('VideoScreen', { id: `${item.id}` });}}>
                <View style={{ padding: 10, marginLeft: 8 }} >
                    <Image source={{ uri: `${GUEST_URL}/thumbnail/${item.thumbnail}` }} style={{ width: width * 0.90, height: 200, borderRadius: 20 }} />
                </View> 
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
        <View>
            <Carousel
                ref={carouselRef}
                loop={true}
                data={BannerData}
                renderItem={RenderItem}
                // sliderWidth={350}
                sliderWidth={400}
                itemWidth={510}
                autoplay={true}
                autoplayDelay={4000}
            />
        </View>
    )
}

export default Snap_Carousel1

