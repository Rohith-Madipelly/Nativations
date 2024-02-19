// import { View, Text,ToastAndroid} from 'react-native'

// export const ToasterSender=({Message})=>{
//     ToastAndroid.showWithGravityAndOffset(
//       Message,
//       ToastAndroid.LONG,
//       ToastAndroid.BOTTOM,
//       25,
//       50,);
//   }


import { View, Text, ToastAndroid, Platform, ToastiOS } from 'react-native';

export const ToasterSender = ({ Message }) => {
  if (Platform.OS === 'android') {
    // For Android
    ToastAndroid.showWithGravityAndOffset(
      Message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  } else if (Platform.OS === 'ios') {
    // For iOS
    ToastiOS.show(Message, ToastiOS.LONG);
  }
};
