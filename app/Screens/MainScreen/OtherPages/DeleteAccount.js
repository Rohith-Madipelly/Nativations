import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteAccountAPI } from '../../../utils/API_Calls';
import { setToken } from '../../../redux/actions/loginAction';

const DeleteAccount = () => {
    const navigation = useNavigation();
    let tokenn = useSelector((state) => state.token);
    const dispatch = useDispatch();


    try {
        if (tokenn != null) {
            tokenn = tokenn.replaceAll('"', '');
        }
    }
    catch (err) {
        console.log("Error in token quotes", err)
    }

    useEffect(() => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account?",
            //   "",
            [
                {
                    text: "Cancel",
                    onPress: () => navigation.goBack(),
                    style: "cancel"
                },
                { text: "OK", onPress: () => DeleteAccount() }
            ]
        );
    }, []);

    const DeleteAccount = async () => {
      
        try {
       
            const res = await DeleteAccountAPI(tokenn)
            console.log(">>>", res.data.message)
            if (res) {
                Alert.alert("success",res.data.message)
                navigation.goBack()
                setTimeout(() => {
                    dispatch(setToken(null));
                  }, 2000)
            }
            else {
                console.log("No Res")

            }


        } catch (error) {


            // setTimeout(() => {
            //     console.log("Error in fetching", error.response.status)
            // }, 1000);
            // console.log(error)

            // setTimeout(() => {
            //     // setSpinnerbool(false)
            // }, 5000)
        }
        finally {
            dispatch(setToken(null));
        }
    }

    return (
        <View>
            <Text></Text>

        </View>
    )
}

export default DeleteAccount

const styles = StyleSheet.create({})