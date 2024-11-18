import { Alert, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import CustomStatusBar from '../../Components/UI/StatusBar/CustomStatusBar'
import { TouchableOpacity } from 'react-native'
import QuoteOfDay from '../../Components2/Quote/QuoteOfDay'
import Metrics from '../../utils/ResposivesUtils/Metrics'
import { useSelector } from 'react-redux'
import { ALL_QUOTES_API } from '../../utils/API_Calls'
import SkeletonLoader2 from '../../Components/UI/Loadings/SkeletonLoader'
import { ServerTokenError_Logout } from '../../utils/ServerError'
import { ServerError } from '../../utils/CustomReuseAlerts'

const QuotesScreen = () => {
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
    const [QuotionsData, setQuotionsData] = useState([])

    
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
        getAllQuotes()
        setTimeout(() => {
            setRefreshing(false);
        }, 2000)

    }, []);




    const getAllQuotes = async () => {
        try {
            setQuotionsData([])
            const res = await ALL_QUOTES_API(tokenn)
            if (res) {
                setTimeout(() => {
                    setQuotionsData(res.data.allQuotes)
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
                setIsLoading(true)
            }, 500);
        }
    }



    useEffect(() => {
        getAllQuotes()
    }, [])


    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 15 }}>
            <CustomStatusBar barStyle="dark-content" backgroundColor="white" />
            <FlatList
                // data={QuotesData}
                data={QuotionsData}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                renderItem={({ item, index }) => (
                    <View key={index} style={{
                        maxHeight: Metrics.height * 0.12,
                        minHeight: 120,
                        marginVertical: 7
                    }}>
                        <QuoteOfDay Quote={item.quote} isQuoteOfDay={false}
                        // bgColor={index%2==1?'grey':undefined}
                        />
                    </View>
                )}
                ListEmptyComponent={(
                    <View style={{ flex: 1, height: 500 }}>
                        {!isloading ? <>

                            <SkeletonLoader2
                                style={{
                                    maxHeight: Metrics.height * 0.12,
                                    minHeight: 120,
                                    marginHorizontal: 2,
                                    borderRadius: 13,
                                    alignSelf: 'center',
                                    width: '90%',

                                }}
                            // visible={!allBranchesData}
                            >
                            </SkeletonLoader2>

                            <SkeletonLoader2
                                style={{
                                    marginTop: 20,
                                    maxHeight: Metrics.height * 0.12,
                                    minHeight: 120,
                                    borderRadius: 13,
                                    alignSelf: 'center',
                                    width: '90%',
                                    marginHorizontal: 2
                                }}
                            // visible={!allBranchesData}
                            >
                            </SkeletonLoader2>
                        </> :  <SkeletonLoader2
                                style={{
                                    marginTop: 20,
                                    maxHeight: Metrics.height * 0.12,
                                    minHeight: 120,
                                    borderRadius: 13,
                                    alignSelf: 'center',
                                    width: '90%',
                                    marginHorizontal: 2
                                }}
                            // visible={!allBranchesData}
                            >
                                <Text style={{position:'absolute',fontFamily: 'Gabarito-VariableFont', fontSize: Metrics.rfv(14)}}>No Quotes are available right now...!</Text>
                            </SkeletonLoader2>}
                    </View>
                )}
                ListFooterComponent={
                    <View>
                        {/* <Text style={{fontFamily: 'Gabarito-VariableFont', fontSize: Metrics.rfv(14)}}>No Quotes are available right now...!</Text> */}
                        <Text></Text>
                    </View>
                }
            />
        </View>
    )
}

export default QuotesScreen

const styles = StyleSheet.create({})