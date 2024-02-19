import { View, Text,StyleSheet,ImageBackground } from 'react-native'
import React,{useState} from 'react'
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
    const navigation = useNavigation();
    const [spinnerBool, setSpinnerbool] = useState(true)
    setTimeout(() => {
        setSpinnerbool(false)
        navigation.navigate("Login")
    }, 2000);
  return (
    <View>
        <ImageBackground
        source={require('./../../assets/BgImgs/Bg.png')} // Replace with the actual path to your image
        style={styles.containerImageBackground}
      >
      
      <Spinner
        visible={spinnerBool}
        color={"#5F2404"}
        animation={'fade'}
      />

     
      </ImageBackground>
    </View>
  )
}



const styles = StyleSheet.create({
    containerImageBackground: {
      width: '100%',
      height: '100%'
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: "0",
      margin: "0",
      width: '100%',
      height: '100%'
      // backgroundColor: "white",
  
    },
  
    Heading_1: {
      color: '#0A0240',
      // fontFamily: 'Jost',
      fontSize: 32,
      fontStyle: 'normal',
      fontWeight: '400',
    },
  
    Heading_2: {
      color: '#0A0240',
      // fontFamily: 'Jost',
      fontSize: 24,
      fontStyle: 'normal',
      fontWeight: '400',
  
  
    },
  
  
    inputContainer: {
      marginBottom: 12,
  
    },
    input: {
      width: 300,
      // backgroundColor: "#121212",
      borderWidth: 1,
      borderStyle: "solid",
      padding: 12,
  
      borderRadius: 6,
      marginBottom: 6,
      color: "white",
      height: 45,
  
  
    },
    image: {
      width: 300,
      resizeMode: "contain",
      marginBottom: 6,
    },
    bottomContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    linkText: {
      color: "#3797EF",
      marginLeft: 5.5,
      fontWeight: "600",
    },
    forgotPasswordContainer: {
      alignItems: "flex-end",
      marginVertical: 15,
      paddingHorizontal: 10,
    },
  });
  