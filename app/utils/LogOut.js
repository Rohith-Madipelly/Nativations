import AsyncStorage from '@react-native-async-storage/async-storage';
import { setToken } from "../redux/actions/loginAction";
// import { useDispatch } from 'react-redux';

export const LogOutHandle123 = async (dispatch) => {
  console.log("logininninin ");

  try {
    await AsyncStorage.removeItem('AdsReel$:' + 'Token');
    dispatch(setToken(null));
    console.log("dbkjasd");
  } catch (e) {
    console.log("error", e);
  }
}

// Usage:
// Inside your component where you want to call this function, you can do:
// const dispatch = useDispatch();
// LogOutHandle123(dispatch);
