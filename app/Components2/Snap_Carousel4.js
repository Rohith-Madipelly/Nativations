import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import Carousel from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';
import {    MaterialCommunityIcons} from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { GUEST_URL } from '../Enviornment';


const Snap_Carousel4 = ({PreviousEventsData}) => {
    console.log("PreviousEventsData 4",PreviousEventsData)
    const { width, height } = Dimensions.get('window');
    const carouselRef = useRef(null);
    const navigation = useNavigation();

    const RenderItem = ({ item, index }) => {
        return (
            <Pressable onPress={() => { navigation.navigate('VideoScreen', { id: `${item.id}` }); }} styles={{ justifyContent: 'center', }}>
                <View style={{ height: 171, width: width * 0.78, marginHorizontal: 10 }} >
                    <Image source={{ uri: `${GUEST_URL}/thumbnail/${item.thumbnail}` }} style={{ width: width * 0.78, height: 171, borderRadius: 20 }} />
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
        <View style={{marginTop:10}}>
            <View style={{marginLeft:20}}>

                <Text style={[styles.Heading_U3]}>Previous Event Videos</Text>
            </View>

            <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row' }}>

                <TouchableOpacity onPress={goToPrev} style={{ justifyContent: 'center' }}>
                    <MaterialCommunityIcons name="arrow-left-drop-circle" size={30} color="black" />
                </TouchableOpacity>

                <Carousel
                    // ref={(c) => { this._carousel = c; }}
                    ref={carouselRef}
                    loop={true}
                    data={PreviousEventsData}
                    renderItem={RenderItem}
                    sliderWidth={350}
                    itemWidth={510}
                    autoplay={false}
                    // autoplayDelay={10000}
                    autoplayInterval={50000}
                />
                <TouchableOpacity onPress={goToNext} style={{ justifyContent: 'center' }}>
                    <MaterialCommunityIcons name="arrow-right-drop-circle" size={30} color="black" />
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Snap_Carousel4

const styles = StyleSheet.create({
    Heading_U3:{
        color:'black',
        fontSize:16,
        fontWeight:'400'
    }
})