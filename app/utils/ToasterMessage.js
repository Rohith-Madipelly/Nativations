// Foo.jsx
import Toast from 'react-native-toast-message';


export const ToasterMessage=(type,textH1,textH2)=>{
    Toast.show({
      type: type,
      text1: textH1,
      text2: textH2
    });

}


// You Can Call this by 
// ToasterMessage("success", `Success`, `${Message}`)