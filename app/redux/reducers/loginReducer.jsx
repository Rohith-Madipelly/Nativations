import AsyncStorage from '@react-native-async-storage/async-storage';

const token=""
try {
  token = AsyncStorage.getItem('SatyaSadhna:' + 'Token');
  // console.log(token);
} catch (error) {

}

const initialState = {
  token: token || "",
  isLogin: token ? true : false,
};



const loginReducer = (state = initialState, action) => {

  switch (action.type) {
    case "SET_TOKEN":

      // console.log("logred>>", action.token)
      return {
        ...state,
        token: action.token,
        isLogin: action.token ? true : false,
      };
    default:
      return state;
  }
};

export default loginReducer;








