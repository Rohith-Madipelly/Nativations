import { View, Text, Alert, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import DownloadIcon from '../../assets/SVGS/MusicPlayer/DownloadIcon'
import Play_Circle from '../../assets/SVGS/MusicPlayer/Play_Circle'
import { TouchableOpacity } from 'react-native'
import MusicIcon from '../../assets/SVGS/MusicPlayer/MusicIcon'
import Metrics from '../../utils/ResposivesUtils/Metrics'
import SkeletonLoader2 from '../../Components/UI/Loadings/SkeletonLoader'
import { useSelector } from 'react-redux'
import { ServerTokenError_Logout } from '../../utils/ServerError'
import { ServerError } from '../../utils/CustomReuseAlerts'
import { ALL_QUOTES_API, CATEGORY_POSTS_API } from '../../utils/API_Calls'
import MusicList from '../../Components2/Music/MusicList'
import { RefreshControl } from 'react-native'
import NoTrackAvailable from '../../assets/SVGS/UIScrees/NoTrackAvailable'

const TracksListByCategory = ({ navigation, route }) => {

    console.log("router", route.params)

    const Category = route.params?.Category
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: Category || "Category",
        });
    }, [navigation]);




    const [loadingList, setLoadingList] = useState(true)
    // console.log(Data)
    // const Data = []



    // useEffect(() => {
    //     if (Data && Data.length <= 0) {
    //         console.log("Empty")
    //         setTimeout(() => {
    //             setLoadingList(false)
    //         }, 2000)
    //     } else {
    //         setLoadingList(false)
    //     }
    // }, [])





    const QuotesData = [
        { quote: "Today is a new day, whatever happened yesterday, good or bad doesn't matter." },
        { quote: "If you can win over your mind, you can win over the whole world." },
        { quote: "Any definition of a successful life must include service to others." },
        { quote: "Wish healing to those who have given you pain, this is how you heal yourself and the other." },
        { quote: "If you want peace then calm your desires." },
        { quote: "The self-observation of CHANGES in the BODY will lead to equanimity in all EXTERNAL CHANGES." },
        { quote: "Any definition of a successful life must include service to others." },
    ];


    const [refreshing, setRefreshing] = useState(false);
    const [isloading, setIsLoading] = useState(true)
    const [trackListData, setTrackListData] = useState([])


    let tokenn = useSelector((state) => state.token);

    try {
        if (tokenn != null) {
            tokenn = tokenn.replaceAll('"', '');
        }
    }
    catch (err) {
        console.log("Error in token quotes", err)
        if (err.response.status === 500) {
            console.log("Internal Server Error", err.message)
        }
    }


    const onRefresh = useCallback(() => {
        getAllCategory()
        setTimeout(() => {
            setRefreshing(false);
        }, 2000)

    }, []);



    useEffect(() => {
        if (trackListData && trackListData.length <= 0) {
            console.log("Empty")
            setTimeout(() => {
                setLoadingList(false)
            }, 2000)
        } else {
            setLoadingList(false)
        }
    }, [])


    const getAllCategory = async () => {
        try {
            setTrackListData([])
            const res = await CATEGORY_POSTS_API(tokenn)
            if (res) {
                setTimeout(() => {
                    console.log(":", trackListData)
                    console.log("Category", Category === "For Children's" ? "Hello" : "Bye")

                    if (Category === "For Children's") {
                        setTrackListData(res.data.allChildrenPosts)
                    }
                    else if (Category === "For New Sadhak") {
                        setTrackListData(res.data.allNewSadhakPosts)
                    }
                    else {
                        setTrackListData(res.data.allOldSadhakPosts)
                    }

                }, 500);
            }
        } catch (error) {
            console.log("Error in APi Call in GET_ALL_BANNERS_API >", error.response)
            if (error.response) {
                if (error.response.status === 400) {
                    console.log("sd", 401)
                }
                else if (error.response.status === 401) {
                    Alert.alert("No Quotes are available right now...!")
                    // console.log("Error With 401", error.response.data)
                }
                else if (error.response.status === 403) {
                    console.log("Error With 403", error.response.data.message)
                }
                else if (error.response.status === 404) {
                    console.log("Error With 404", error.response.data.message)
                    ServerTokenError_Logout(undefined, undefined, dispatch)
                }
                else if (error.response.status >= 500) {
                    // console.log("Internal Server Error", error.message)
                    ServerError(undefined, `${error.message}`)
                }
                else {
                    console.log("An error occurred response.>>", error)
                }
            }
            else if (error.code === 'ECONNABORTED') {
                console.log('Request timed out. Please try again later.');
            }
            else if (error.request) {
                console.log("No Response Received From the Server.")
                if (error.request.status === 0) {
                    Alert.alert("No Network Found", "Please Check your Internet Connection")
                }
            }
            else {
                console.log("Error in Setting up the Request.")
            }

        } finally {
            setTimeout(() => {
                setLoadingList(false)
            }, 500)
        }
    }


   const  ClickAction=(item, download)=>{
    NavigationTo(item, download)
   }

   const NavigationTo = (item, download) => {
    console.log("::",item)
    if (item.type == "Youtube" || item.type == undefined) {
      navigation.navigate('YoutudeScreen', { id: `${item.id}`, download: download })
      // console.log("chgchgcjyhcjhc", item.id)
    }
    else if (item.type == "Audio") {
        console.log(item)
      console.log("this is Audio >>>",`${item._id}`)
      navigation.navigate('AudioScreen', { id: `${item._id}`, download: download })
    }
    else if (item.type == "Video") {
      console.log("video",`${item._id}`)
      navigation.navigate('VideoScreen', { id: `${item._id}`, download: download })
    }
  }


    useEffect(() => {
        getAllCategory()
    }, [])


    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
            paddingHorizontal: 17
        }}>


            <View style={{ marginVertical: 10, }}>
                <ScrollView
                      refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }>
                    {trackListData && trackListData.map((item, index) => (
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



                    <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }}>

                        {/* 
                    {visibleItems === 5  && (
                            <Pressable
                                // title={isExpanded ? "Show Less" : "Show More"}
                                onPress={handleShowLess}
                                style={{ justifyContent: 'center', alignItems: 'center' }}
                            >
                                <Text style={{ fontFamily: 'Gabarito-VariableFont', color: '#030370', fontSize: Metrics.rfv(16) }}>
                                    {visibleItems === 5 ? "Show less":"" }
                                </Text>
                            </Pressable>
                        )} */}



                        {/* {Data.length > 3 && (
                            <Pressable
                                // title={isExpanded ? "Show Less" : "Show More"}
                                onPress={handleShowMore}
                                style={{ justifyContent: 'center', alignItems: 'center' }}
                            >
                                <Text style={{ fontFamily: 'Gabarito-VariableFont', color: '#030370', fontSize: Metrics.rfv(16) }}>
                                    {visibleItems === 3 ? "Show More" : "View All"}
                                </Text>
                            </Pressable>
                        )} */}
                    </View>

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

                    {!loadingList && trackListData && trackListData.length <= 0 && <View style={{
                        width: '100%', flex:1,justifyContent:'center',alignItems:'center',
                        height: Metrics.height-90, justifyContent: "center", alignItems: 'center',
                    }}>
                       
                        <NoTrackAvailable/>
                        <Text style={{ fontFamily: 'Gabarito-VariableFont', color: 'rgba(3, 3, 112, 1)', fontSize: Metrics.rfv(18),marginTop:18}}>No Tracks Available</Text>
                    </View>}

                </ScrollView>
            </View>










        </View>
    )
}

export default TracksListByCategory