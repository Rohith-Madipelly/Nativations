import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Entypo} from "@expo/vector-icons";
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import { GUEST_URL } from '../Enviornment';



const Snap_Carousel7 = ({ relatedPostsData }) => {
  const [spinnerBool, setSpinnerbool] = useState(false)
  const navigation = useNavigation();
  const carouselRef = useRef(null);


  const goToNext = () => {
    carouselRef.current.snapToNext();
  }
  const goToPrev = () => {
    carouselRef.current.snapToPrev();
  }

  if (!relatedPostsData) {
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
    <View style={{}}>
      <View style={{ marginHorizontal: 20, marginTop: 10, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>

        <Text style={[styles.Heading_U3]}>Related Posts</Text>

        <Entypo name="chevron-small-right" size={20} color="black" />

      </View>

      <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row' }}>

        <View style={{ width: '100%', height: 200, marginHorizontal: 10 }}>
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="space-x-4"
            // contentContainerStyle={{ paddingHorizontal: 10 }}
            >
              {relatedPostsData.map(item => (
                <View key={item.id} style={{ width: 170, paddingHorizontal: 12, marginRight: 0 }}>
                  <TouchableOpacity onPress={() => { navigation.navigate('VideoScreen', { id: `${item.id}` }); }}>

                    <Image source={{ uri: `${GUEST_URL}/${item.thumbnail}` }} style={{ width: '100%', height: '100%', borderRadius: 20, }} />
                  </TouchableOpacity>
                </View>
              ))}


            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Snap_Carousel7

const styles = StyleSheet.create({
  Heading_U3: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400'
  }
})