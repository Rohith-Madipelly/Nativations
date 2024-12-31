import AsyncStorage from '@react-native-async-storage/async-storage';

const token = ""
try {
  token = AsyncStorage.getItem('SatyaSadhna:' + 'Token');
  // console.log(token);
} catch (error) {

}

const initialState = {
  list:[],
  token: token || "",
  isLogin: token ? true : false,
};



const loginReducer = (state = initialState, action) => {
  console.log("list", action.list)
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
        isLogin: action.token ? true : false,
      };
    case "SET_DOWNLOADLIST":
      return {
        ...state,
        list: action.list
      };
    default:
      return state;
  }
};

export default loginReducer;








