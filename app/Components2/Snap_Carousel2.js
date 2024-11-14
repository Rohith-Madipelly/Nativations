import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
// import Carousel from 'react-native-snap-carousel';
import Carousel from 'react-native-reanimated-carousel';

import { Dimensions } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { GUEST_URL } from '../Enviornment';
import LoadingImage from '../Components/ImageConatiners/LoadingImage';


const Snap_Carousel2 = ({ BannerData2, CarouselName }) => {
    const { width, height } = Dimensions.get('window');
    const carouselRef = useRef(null);
    const navigation = useNavigation();








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
            <Pressable onPress={() => { Navigationn() }} styles={{ justifyContent: 'center', }}>
                <View style={{ height: 171, width: width * 0.78, marginHorizontal: 10 }} >
                    {/* <Image source={{ uri: `${GUEST_URL}/thumbnail/${item.thumbnail}` }} style={{ width: width * 0.78, height: 171, borderRadius: 20 }} /> */}

                    <LoadingImage
                        source={{ uri: `${GUEST_URL}/${item.thumbnail}` }}
                        //   style={{ width: '100%', height: 240, }}
                        style={{ width: width * 0.78, height: 175, borderRadius: 20 }}
                        loaderColor="#ff0000" // Optional: change loader color
                        resizeMode='cover'
                    />


                </View>
            </Pressable>
        );
    }


    const goToNext = () => {
        carouselRef.current.next();
    }
    const goToPrev = () => {
        carouselRef.current.prev();
    }

    return (
        <View style={{ marginTop: 10, marginTop: 15 }}>
            <View style={{ marginLeft: 20 }}>

                <Text style={[styles.Heading_U3,{}]}>{CarouselName}</Text>
            </View>

            {!BannerData2.length == 0 ? <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row' }}>

                <TouchableOpacity onPress={goToPrev} style={{ justifyContent: 'center' }}>
                    <MaterialCommunityIcons name="arrow-left-drop-circle" size={30} color="black" />
                </TouchableOpacity>



                <Carousel
                    ref={carouselRef}
                    loop={true}

                    // ref={carouselRef}
                    width={width * 0.83}
                    height={180}
                    // autoPlay={true}
                    data={BannerData2}
                    scrollAnimationDuration={4000}
                    renderItem={RenderItem}
                />
                <TouchableOpacity onPress={goToNext} style={{ justifyContent: 'center' }}>
                    <MaterialCommunityIcons name="arrow-right-drop-circle" size={30} color="black" />
                </TouchableOpacity>

            </View> :
                <View style={{ height: 171, width: width,alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ height: 171, width: width * 0.78, marginHorizontal: 10, backgroundColor: '#E8E8E899', alignItems: 'center', justifyContent: 'center', borderRadius: 15 }} >
                        <Text>No posts available</Text>
                    </View>
                </View>
            }

        </View>
    )
}

export default Snap_Carousel2

const styles = StyleSheet.create({
    Heading_U3: {
        color: 'black',
        fontSize: 16,
        fontWeight: '400'
    }
})