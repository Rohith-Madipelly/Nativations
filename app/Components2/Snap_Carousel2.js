import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
// import Carousel from 'react-native-snap-carousel';
import Carousel from 'react-native-reanimated-carousel';

import { Dimensions } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { BASE_URL, GUEST_URL } from '../Enviornment';
import LoadingImage from '../Components/ImageConatiners/LoadingImage';


const Snap_Carousel2 = ({ BannerData2, CarouselName }) => {
    const { width, height } = Dimensions.get('window');
    const carouselRef = useRef(null);
    const navigation = useNavigation();

    const RenderItem = ({ item, index }) => {

        console.log("item", item?.thumbnail)
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
                navigation.navigate('VideoScreen', { id: `${item.id}`, selectedVideoData: item, totalVideoData: BannerData2, title:"Pravachan / Event Videos" })
            }
        }


        console.log("item", item.thumbnail)


        let videoURL = `${BASE_URL}/${item.thumbnail}`
        return (
            <Pressable onPress={() => { Navigationn() }} styles={{}}>

                <View style={{ width: '100%', height: '100%', alignSelf: 'center' }} >
                    <LoadingImage
                        // source={{ uri: `${GUEST_URL}/${item.thumbnail}` }}
                        source={{ uri: videoURL }}
                        //   style={{ width: '100%', height: 240, }}
                        style={{ width: '100%', height: '100%', borderRadius: 20 }}
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

                <Text style={[styles.Heading_U3, {}]}>{CarouselName}</Text>
            </View>

            {!BannerData2.length == 0 ? <View style={{ marginTop: 10, flexDirection: 'row', alignSelf: 'center' }}>

                <TouchableOpacity onPress={goToPrev} style={{ width: 35, height: height * 0.20, justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="arrow-left-drop-circle" size={30} color="black" />
                </TouchableOpacity>




                <Carousel
                    ref={carouselRef}
                    loop={true}
                    // ref={carouselRef}
                    width={width - 80}
                    height={height * 0.20}
                    // autoPlay={true}

                    data={BannerData2}
                    scrollAnimationDuration={4000}
                    renderItem={RenderItem}
                />

                <TouchableOpacity onPress={goToNext} style={{ width: 35, height: height * 0.20, justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="arrow-right-drop-circle" size={30} color="black" />
                </TouchableOpacity>

            </View> :
                <View style={{ height: 171, width: width, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
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