import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Metrics from '../../utils/ResposivesUtils/Metrics'
import { FlatList } from 'react-native'
import MusicIcon from '../../assets/SVGS/MusicPlayer/MusicIcon'
import DownloadIcon from '../../assets/SVGS/MusicPlayer/DownloadIcon'
import Play_Circle from '../../assets/SVGS/MusicPlayer/Play_Circle'
import QuoteIcon from '../../assets/SVGS/MusicPlayer/QuoteIcon'
import SkeletonLoader2 from '../../Components/UI/Loadings/SkeletonLoader'
import { useNavigation } from '@react-navigation/native'

const QuoteOfDay = ({ Quote ,isQuoteOfDay,bgColor}) => {

    const navigation=useNavigation()

    const [loadingList,setLoadingList]=useState(false)
    // console.log(Data)



    useEffect(() => {
        // if (Data && Data.length <= 0) {
        //     console.log("Empty")
            setTimeout(() => {
                setLoadingList(false)
            }, 2000)
        // } else {
        //     setLoadingList(false)
        // }
    }, [])
    return (
        <>
            <TouchableOpacity style={{
                maxHeight: Metrics.height * 0.12,
                minHeight: 120,
                backgroundColor: bgColor?bgColor:'rgba(168, 168, 255, 0.30)',
                padding: 10, marginHorizontal: 10, borderRadius: 13
            }} onPress={() => { navigation.navigate("Quotes") }}>
                <ImageBackground
                    style={{ position: 'relative', display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}
                    // contentFit="fixed"
                    // blurRadius={0.2}
                    resizeMode='fill'
                    source={require("../../assets/image/Home/Vector2.png")}
                >
                    <View style={{ width: '17%', top: 5, left: 5 }}>
                        <QuoteIcon />
                    </View>


                    <View style={{  width: '82%',alignSelf:'center'}}>
                        {isQuoteOfDay?<Text style={{ fontFamily: 'Gabarito-VariableFont', color: 'rgba(3, 3, 112, 1)', fontSize: Metrics.rfv(20) }}>{isQuoteOfDay?"Quote of the day":""}</Text>:""}
                        <Text numberOfLines={3} style={{ fontFamily: 'Gabarito-VariableFont', color: 'rgba(139, 139, 169, 1)', fontSize: Metrics.rfv(14) }}>{Quote?Quote:"No Quote"}</Text>
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
                    </View>
                </ImageBackground>
            </TouchableOpacity>

        </>
    )
}

export default QuoteOfDay

const styles = StyleSheet.create({})