import React from 'react';
import { Platform, Alert, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { GUEST_URL, BASE_URL } from '../Enviornment.js'




export const setToken = () => function (key, value, callBack) {
    console.log(" token ", key, value)

    AsyncStorage.setItem('AdsReel$:' + key, JSON.stringify(value), (err) => {
        if (err)
            callBack('Error setting token', false);
        else
            callBack(null, true);
    });
};






