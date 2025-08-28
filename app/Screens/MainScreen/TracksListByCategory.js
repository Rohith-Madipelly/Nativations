import { View, Text, Alert, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import DownloadIcon from '../../assets/SVGS/MusicPlayer/DownloadIcon';
import Play_Circle from '../../assets/SVGS/MusicPlayer/Play_Circle';
import PauseIcon from '../../assets/SVGS/MusicPlayer/Player/Pause'; // Import PauseIcon
import MusicIcon from '../../assets/SVGS/MusicPlayer/MusicIcon';
import Metrics from '../../utils/ResposivesUtils/Metrics';
import SkeletonLoader2 from '../../Components/UI/Loadings/SkeletonLoader';
import { useSelector } from 'react-redux';
import { ServerTokenError_Logout, ServerError } from '../../utils/ServerError';
import { CATEGORY_POSTS_API, GET_TRACK_BY_CATEGORY } from '../../utils/API_Calls';
import NoTrackAvailable from '../../assets/SVGS/UIScrees/NoTrackAvailable';
import CustomStatusBar from '../../Components/UI/StatusBar/CustomStatusBar';
import { BASE_URL } from '../../Enviornment';
import { useAudio } from '../../context/AudioProvider';
import FloatingPlayer from '../../../FloatingPlayer';
import { Image } from 'expo-image';
import PauseIcon2 from '../../assets/SVGS/MusicPlayer/Player/PauseIcon2';

const TracksListByCategory = ({ navigation, route }) => {
    const { playTrack, currentTrack, isPlaying, togglePlayPause } = useAudio();
    const Category = route?.params?.Category || "Default Category";
    const [loadingList, setLoadingList] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [trackListData, setTrackListData] = useState([]);
    const [categoryUrl, setCategoryUrl] = useState("");
    const tokenn = useSelector((state) => state.token)?.replaceAll('"', '') || '';

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: Category,
        });
    }, [navigation, Category]);

    const getAllCategory = async (categoryX) => {
        try {
            setTrackListData([]);
            setLoadingList(true)


            const res = await GET_TRACK_BY_CATEGORY(tokenn, categoryX)
            // const res12 = await CATEGORY_POSTS_API(tokenn,);
            if (res?.data) {
                const categoryKey = Category?.trim();
                if (categoryKey === "For Children's") {
                    console.log("sjhdvjhcs", res.data.allChildrenTracks)
                    setTrackListData(res.data.allChildrenTracks || []);
                } else if (categoryKey === "For New Sadhak") {
                    setTrackListData(res.data.allNewSadhakTracks || []);
                } else {
                    setTrackListData(res.data.allOldSadhakTracks || []);
                }
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    Alert.alert("No Quotes are available right now...!");
                } else if (error.response.status === 403) {
                    console.log("Forbidden:", error.response.data.message);
                } else if (error.response.status === 404) {
                    console.log("Not Found:", error.response.data.message);
                    ServerTokenError_Logout(undefined, undefined);
                } else if (error.response.status >= 500) {
                    ServerError(undefined, `${error.message}`);
                }
            } else if (error.code === 'ECONNABORTED') {
                Alert.alert("Request Timed Out", "Please try again later.");
            } else if (error.request) {
                if (error.request.status === 0) {
                    Alert.alert("No Network Found", "Please check your internet connection.");
                }
            }
        } finally {
            setLoadingList(false);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getAllCategory();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const ClickAction = (item, download) => {
        if (item.type === "Audio") {
            if (item._id === currentTrack?.id && isPlaying) {
                // If the track is already playing, toggle play/pause
                togglePlayPause();
            } else {
                // Play a new track
                playTrack({
                    id: item._id,
                    title: item.title,
                    audioUrl: `${BASE_URL}/${item.audioUrl}`,
                    thumbnail: `${BASE_URL}/${item.thumbnail}`,
                });
            }
            // Navigate to AudioScreen for details/download
            navigation.navigate('AudioScreen', { id: item._id, download });
        } else if (item.type === "Video") {
            navigation.navigate('VideoScreen', { id: item._id, download });
        } else {
            navigation.navigate('YouTubeScreen', { id: item.id || item._id, download });
        }
    };
    const categoryKey = Category?.trim();
    useEffect(() => {
        const categoryKey = Category?.trim();
        if (categoryKey == "For Children's") {
            getAllCategory('childrentracks');
        } else if (categoryKey == "For New Sadhak") {
            getAllCategory('newsadhaktracks');
        } else if (categoryKey == "For Old Sadhak") {
            getAllCategory('oldsadhaktracks');
        } else {
            console.log("ERROR IN categoryKey")
        }

    }, [categoryKey]);




    useEffect(() => {
        if (!trackListData || trackListData.length <= 0) {
            setTimeout(() => {
                setLoadingList(false);
            }, 2000);
        } else {
            setLoadingList(false);
        }
    }, [trackListData]);

    if (!route?.params) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No Category Provided</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'flex-start' }}>
            <CustomStatusBar barStyle="dark-content" backgroundColor="white" />
            {loadingList ? (
                <View style={{ marginTop: 20, paddingHorizontal: 17 }}>
                    <SkeletonLoader2 style={{ width: '100%', height: Metrics.rfv(30), borderRadius: 5 }} />
                    <SkeletonLoader2 style={{ width: '100%', height: Metrics.rfv(30), borderRadius: 5, marginTop: 10 }} />
                </View>
            ) : null}
            <FlatList
                style={{ flex: 1, paddingHorizontal: 17, marginTop: 10 }}
                data={trackListData}
                keyExtractor={(item) => item._id?.toString() || item.id?.toString() || Math.random().toString()}
                renderItem={({ item, index }) => (
                    <View
                        key={index}
                        style={{
                            width: '100%',
                            height: 'auto',
                            justifyContent: 'flex-start',
                            flexDirection: 'row',
                            marginVertical: 5,
                            borderBottomColor: '#DADADA',
                            borderBottomWidth: 1,
                            marginBottom: 10,
                            paddingBottom: 10,
                        }}
                    >
                        <View style={{ width: '10%', marginVertical: 4 }}>

                            <MusicIcon />
                        </View>
                        <View style={{ alignItems: 'flex-start', gap: 2, width: '70%' }}>
                            <Text
                                numberOfLines={2}
                                style={{
                                    fontFamily: 'Gabarito-VariableFont',
                                    color: '#030370',
                                    fontSize: Metrics.rfv(16),
                                }}
                            >
                                {item.title || item.id}
                            </Text>
                            <Text>{item.type}</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-end', gap: 2, flexDirection: 'row', alignItems: 'center', width: '20%' }}>
                            <TouchableOpacity
                                style={{ padding: 10, paddingLeft: 30 }}
                                onPress={() => ClickAction(item, false)}
                            >
                                {item._id === currentTrack?.id && isPlaying ? <PauseIcon2 /> : <Play_Circle />}
                            </TouchableOpacity>
                            <TouchableOpacity style={{ padding: 1 }} onPress={() => ClickAction(item, true)}>
                                <DownloadIcon />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                ListEmptyComponent={
                    !loadingList && (
                        <View style={{ flex: 1, height: Metrics.height, justifyContent: 'center', alignItems: 'center' }}>
                            <NoTrackAvailable />
                            <Text style={{ fontFamily: 'Gabarito-VariableFont', color: 'rgba(3, 3, 112, 1)', fontSize: Metrics.rfv(18), marginTop: 18 }}>
                                No Tracks Available
                            </Text>
                        </View>
                    )
                }
                ListFooterComponent={(
                    <View style={{ height: 200 }}>
                    </View>
                )}
            />
            <FloatingPlayer style={{ bottom: Metrics.rfv(20) }} />
        </View>
    );
};

export default TracksListByCategory;