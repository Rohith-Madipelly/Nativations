import { View, Text, Linking, Platform } from 'react-native';

// const GOOGLE_PACKAGE_NAME = 'com.myntra.android';
// const APPLE_STORE_ID = '2193813192';

// export const OpenStore = (GOOGLE_PACKAGE_NAME,APPLE_STORE_ID) => {
//   if (Platform.OS !== 'ios') {
//     // If the platform is not iOS, open the Google Play Store
//     Linking.openURL(`market://details?id=${GOOGLE_PACKAGE_NAME}`).catch(err =>
//       alert('Please check for Google Play Store'),
//     );
//   } else {
//     // If the platform is iOS, open the App Store
//     Linking.openURL(`items://itunes.apple.com/in/app/apple-store/${APPLE_STORE_ID}`).catch(err =>
//       alert('Please check for the App Store'),
//     );
//   }
// };

export const OpenStore = (PACKAGE_NAME) => {
  if (Platform.OS !== 'ios') {
    // If the platform is not iOS, open the Google Play Store
    Linking.openURL(`${PACKAGE_NAME}`).catch(err =>
      alert('Please check Google Play Store'),
    );
  } else {
    // If the platform is iOS, open the App Store
    Linking.openURL(`${PACKAGE_NAME}`).catch(err =>
      alert('Please check the App Store'),
    );
  }
};
