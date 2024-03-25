// Foo.jsx
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';


export const ErrorResPrinter = (Data) => {
    console.log(Data, ">>")
    Alert.alert(Data)
}