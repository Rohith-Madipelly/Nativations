import { Button, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Metrics from '../../utils/ResposivesUtils/Metrics'
import { FlatList } from 'react-native'
import MusicIcon from '../../assets/SVGS/MusicPlayer/MusicIcon'
import DownloadIcon from '../../assets/SVGS/MusicPlayer/DownloadIcon'
import Play_Circle from '../../assets/SVGS/MusicPlayer/Play_Circle'
import SkeletonLoader2 from '../../Components/UI/Loadings/SkeletonLoader'
import { useNavigation } from '@react-navigation/native'

const MusicList = ({ Data, ClickAction }) => {
    const navigation = useNavigation()

    const [loadingList, setLoadingList] = useState(true)
    // console.log(Data)
    // const Data = []

    const [visibleItems, setVisibleItems] = useState(3);

    const handleShowMore = () => {
        if (visibleItems === 3) {
            setVisibleItems(5); // Expand to show 5 items
        } else {
            navigation.navigate("TracksAudios", { data: Data }); // Navigate to another page
        }
    };

    const handleShowLess = () => {
        setVisibleItems(3);
    };
    useEffect(() => {
        if (Data && Data.length <= 0) {
            console.log("Empty")
            setTimeout(() => {
                setLoadingList(false)
            }, 2000)
        } else {
            setLoadingList(false)
        }
    }, [])



    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5, marginHorizontal: 10, borderRadius: 13, marginTop: 15, }}>


            {/* Track List Heading */}
            <View style={{ flex: 0.2, width: '100%', justifyContent: 'space-between', flexDirection: 'row', gap: 10 }}>
                <View style={{ width: '70%' }}>
                    <Text style={{
                        fontFamily: 'Gabarito-VariableFont', color: 'rgba(100, 116, 139, 1)', fontSize: Metrics.rfv(16)
                    }}>Satya Sadhna Tracks</Text>
                </View>

                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => { navigation.navigate("TracksAudios", { data: Data }); }}>
                    <Text style={{
                        color: 'rgba(3, 3, 112, 1)', fontSize: Metrics.rfv(14),
                        fontWeight: '600'
                    }}>View all</Text>
                </TouchableOpacity>
            </View>


            <View style={{ flex: 0.8, marginVertical: 10, width: '95%' }}>

                {/* {Data&&Data.map((index,data))} */}

                <ScrollView>
                    {Data && Data.slice(0, visibleItems).map((item, index) => (
                        <View key={index} style={{ width: "100%", height: 'auto', justifyContent: 'flex-start', flexDirection: 'row', marginVertical: 5, borderBottomColor: '#DADADA', borderBottomWidth: 1, marginBottom: 10, paddingBottom: 10 }}>
                            <View style={{ width: 'auto', height: 'auto', width: '10%', marginVertical: 4 }}>
                                <MusicIcon />
                            </View>
                            <View style={{ alignItems: 'flex-start', gap: 2, width: '70%' }}>
                                <Text numberOfLines={2} style={{
                                    fontFamily: 'Gabarito-VariableFont', color: '#030370', fontSize: Metrics.rfv(16)
                                }}>{item.title || item.id}</Text>
                                <Text>{item.type}</Text>
                            </View>

                            <View style={{ justifyContent: 'flex-end', gap: 2, flexDirection: 'row', alignItems: 'center', width: "20%" }}>
                                <TouchableOpacity style={{ padding: 1 }} onPress={() => { ClickAction(item, false); }}>
                                    <Play_Circle />
                                </TouchableOpacity>

                                <TouchableOpacity style={{ padding: 1 }} onPress={() => { ClickAction(item, true); }}>
                                    <DownloadIcon />
                                </TouchableOpacity>

                            </View>
                        </View>
                    ))}



                    {/* <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center',flexDirection:'row' }}>
                    {visibleItems === 5  && (
                            <Pressable
                                onPress={handleShowLess}
                                style={{ justifyContent: 'center', alignItems: 'center' }}
                            >
                                <Text style={{ fontFamily: 'Gabarito-VariableFont', color: '#030370', fontSize: Metrics.rfv(16) }}>
                                    {visibleItems === 5 ? "Show less":"" }
                                </Text>
                            </Pressable>
                        )}
                        {Data.length > 3 && (
                            <Pressable
                                onPress={handleShowMore}
                                style={{ justifyContent: 'center', alignItems: 'center' }}
                            >
                                <Text style={{ fontFamily: 'Gabarito-VariableFont', color: '#030370', fontSize: Metrics.rfv(16) }}>
                                    {visibleItems === 3 ? "Show More" : "View All"}
                                </Text>
                            </Pressable>
                        )}
                    </View> */}
        
                    {loadingList ? <SkeletonLoader2
                        style={{
                            width: '100%',
                            height: Metrics.rfv(30),
                            borderRadius: 5,
                            marginBottom: 10,
                        }}
                    // visible={!allBranchesData}
                    >
                    </SkeletonLoader2> : ""}

                    {!loadingList && Data && Data.length <= 0 && <View style={{
                        width: '100%', width: '100%',
                        height: Metrics.rfv(30), justifyContent: "center", alignItems: 'center'
                    }}>
                 <Text style={{ fontFamily: 'Gabarito-VariableFont', color: 'rgba(3, 3, 112, 1)', fontSize: Metrics.rfv(18)}}>No Tracks Available</Text>
                    </View>}

                </ScrollView>

                {/* <FlatList
                    data={Data}
                    renderItem={({ item, index }) => (
                        <View key={index} style={{ width: "100%", height: 'auto', justifyContent: 'flex-start', flexDirection: 'row', marginVertical: 5, borderBottomColor: '#DADADA', borderBottomWidth: 1, marginBottom: 10, paddingBottom: 10 }}>
                            <View style={{ width: 'auto', height: 'auto', width: '10%', marginVertical: 4 }}>
                                <MusicIcon />
                            </View>
                            <View style={{ alignItems: 'flex-start', gap: 2, width: '70%' }}>
                                <Text style={{
                                    fontFamily: 'Gabarito-VariableFont', color: '#030370', fontSize: Metrics.rfv(16)

                                }}>{item.id}</Text>
                                <Text>{item.type}</Text>
                            </View>

                            <View style={{ justifyContent: 'flex-end', gap: 2, flexDirection: 'row', alignItems: 'center', width: "20%" }}>
                                <TouchableOpacity style={{ padding: 1 }}>
                                    <Play_Circle />
                                </TouchableOpacity>

                                <TouchableOpacity style={{ padding: 1 }}>
                                    <DownloadIcon />
                                </TouchableOpacity>

                            </View>
                        </View>
                    )}
                /> */}
            </View>

        </View>
    )
}

export default MusicList

const styles = StyleSheet.create({})