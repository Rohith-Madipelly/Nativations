
import React from 'react'
import { Alert } from 'react-native';
import { APP_NAME } from '../Enviornment';

export const CustomAlerts_Continue = ( Alert_Title = APP_NAME,Alert_Msg, onOkCallBack) => {
    Alert.alert(Alert_Title, Alert_Msg, [
        {
            text: 'cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        {
            text: 'CONTINUE',
             onPress: () => {
                if (onOkCallBack) {
                    onOkCallBack();  // Safely call the callback if provided
                } else {
                    console.log('OK Pressed');
                }
            }
        },
    ]);

}



export const ServerError = ( Alert_Title = APP_NAME,Alert_Msg, onOkCallBack) => {
    Alert.alert(Alert_Title, Alert_Msg, [
        {
            text: 'cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        {
            text: 'CONTINUE',
             onPress: () => {
                if (onOkCallBack) {
                    onOkCallBack();  // Safely call the callback if provided
                } else {
                    console.log('OK Pressed');
                }
            }
        },
    ]);

}




