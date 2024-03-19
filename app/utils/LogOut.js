import AsyncStorage from '@react-native-async-storage/async-storage';

import { setToken } from "../redux/actions/loginAction";
import { useDispatch } from 'react-redux';


export const LogOutHandle123 = async () => {
  console.log("logininninin ")
  // const dispatch=useDispatch();

  try {
   
    await AsyncStorage.removeItem('AdsReel$:' + 'Token');
    // setSpinnerbool(false)
    // setTimeout(() => {
      // dispatch(setToken(null));
    // }, 2000)
    console.log("dbkjasd")
  }
  catch (e) {
    console.log("error", e)
  }
}

