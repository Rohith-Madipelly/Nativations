
import { Alert } from 'react-native';
import AsyncStorage_Calls from './AsyncStorage_Calls';
import { setToken } from '../redux/actions/loginAction';



export const ServerError = (title = "Internal Server Error", message) => {
    Alert.alert(title, message)
}

// ServerError(undefined,`${error.message}`)



export const ServerTokenError_Logout = (title = "Session Expired", message = "Your session has expired due to inactivity or token error. Please log in again to continue.",dispatch) => {
    Alert.alert(title, message,    [
        {
          text: 'ok', onPress: () => {
            try {
              AsyncStorage_Calls.RemoveTokenJWT('Token', (error, success) => {
                if (error) {
                  console.error('Error removing token:', error);
                } else {
                  console.log('Token removed successfully:', success);
                  dispatch(setToken(null));
                  // You can add additional logic here after the token has been successfully removed
                }
              });
            } catch (e) {
              console.log("error", e);
            }
          }
        }],
        { cancelable: false })
}


// const dispatch=useDispatch()
// ServerTokenError_Logout(undefined,undefined,dispatch)