import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Button, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import AuthComponent from '../../AuthScreen/AuthComponent.js';
// import CustomButton from '../../Components/UI/Button/ButtonC1';
import CustomButton from '../../../Components/UI/Button/ButtonC1.js';
import CustomTextInput from '../../../Components/UI/Inputs/CustomTextInput.js';

import {
  Entypo,
  Feather,
  AntDesign,
  MaterialIcons,
  Ionicons, FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { useState } from 'react';
import { Formik } from "formik";
import { loginSchema } from "../../../Fomik/schema/signIn.js";
import { Picker } from "@react-native-picker/picker";
import { UserLoginApi } from "../../../utils/API_Calls.js";
import Spinner from 'react-native-loading-spinner-overlay';

import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setToken } from '../../../redux/actions/loginAction.jsx'

import ASO from '../../../utils/AsyncStorage_Calls.js'
import { ToasterSender } from '../../../utils/Toaster.js';
import MainComponent from '../MainComponent.js';

// import CustomPicker from '../../../Components/UI/Inputs/CustomPicker.js';
import { FormData } from '../../../Fomik/schema/FormData.js';
import CustomDateInput from '../../../Components/UI/Inputs/CustomDateInput.js';
import CustomPicker from '../../../Components/UI/Inputs/CustomPicker.js';
import { FormData2 } from '../../../Fomik/schema/FormData2.js';


export default function FormScreen() {

  const [show, setShow] = useState()
  const [gender, setGender] = useState()
  const [errorFormAPI, seterrorFormAPI] = useState("")
  const [spinnerBool, setSpinnerbool] = useState(false)


  const submitHandler = async (user) => {

  }


  return (
    <>
      <Spinner
        visible={spinnerBool}
        color={"#5F2404"}
        animation={'fade'}
      />

      <MainComponent NameUnderLogo={"Satya Sadhna"} titleUnder={""} screenName={"Form"}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        // behavior={Platform.OS === "ios" ? 100:0}
        // keyboardVerticalOffset={1000}
        // style={styles.container}
        >
          {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}

          <ScrollView style={{ height: 800 }}>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>
              <Formik
                // enableReinitialize
                validateOnMount={true}
                // initialValues={{ FromDate: "1", toDate: "1", Gender: "male", userAge: "19", MartialStatus: "Yes"}}
                initialValues={{ FromDate: "", toDate: ""}}
                onSubmit={submitHandler}
                validator={() => ({})}
                validationSchema={FormData2}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  values,
                  touched,
                  errors,
                  isValid,
                }) => (
                  <>
                    <Text>ksjdb{values.FromDate}</Text>

                    <View style={{ justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                      <CustomDateInput
                        placeholder={'From'}
                        label={'From'}
                        name='From'
                        value={values.FromDate}
                        leftIcon={<MaterialIcons name="date-range" size={20} color="black" />}
                        // bgColor='#e1f3f8'
                        // bgColor="#B1B1B0"

                        // onChangeText={onChangeText}
                        onChangeText={(e) => { handleChange("FromDate")(e); seterrorFormAPI(); }}
                        onBlur={handleBlur("FromDate")}
                        boxWidth={"40%"}
                        validate={handleBlur("FromDate")}
                        outlined
                        borderColor={`${(errors.FromDate && touched.FromDate) || (errorFormAPI && errorFormAPI.FromDateForm) ? "red" : "#ccc"}`}
                        errorMessage={`${(errors.FromDate && touched.FromDate) ? `${errors.FromDate}` : (errorFormAPI && errorFormAPI.FromDateForm) ? `${errorFormAPI.FromDateForm}` : ``}`}
                      // errorColor='magenta'
                      />


                      <CustomDateInput
                        placeholder={'to'}
                        label={'to'}
                        name='From'
                        value={values.toDate}
                        leftIcon={<MaterialIcons name="date-range" size={20} color="black" />}
                        // bgColor='#e1f3f8'
                        // bgColor="#B1B1B0"

                        onChangeText={(e) => { handleChange("toDate")(e); seterrorFormAPI(); }}
                        onBlur={handleBlur("toDate")}


                        validate={handleBlur("toDate")}

                        outlined

                        borderColor={`${(errors.toDate && touched.toDate) || (errorFormAPI && errorFormAPI.toDateForm) ? "red" : "#ccc"}`}

                        errorMessage={`${(errors.toDate && touched.toDate) ? `${errors.toDate}` : (errorFormAPI && errorFormAPI.toDateForm) ? `${errorFormAPI.toDateForm}` : ``}`}
                        // errorColor='magenta'
                        boxWidth={"40%"}
                      // boxWidth={"auto"}
                      />

                    </View>


 



                    <CustomButton
                      onPress={handleSubmit}
                      // leftIcon={<Entypo style={styles.icon} name={'login'} size={18} color={'white'} />}
                      bgColor={`${!isValid ? "rgba(220, 142, 128, 0.9)" : "rgba(242, 142, 128, 1)"}`}

                      style={{ marginTop: 50 }}>
                      Save
                    </CustomButton>



                  </>

                )}


              </Formik>
            </View>
          </ScrollView>
          {/* </TouchableWithoutFeedback> */}
        </KeyboardAvoidingView>
      </MainComponent>


    </>
  );

}

const styles = StyleSheet.create({


  paragraphy: {
    // fontFamily: 'Jost',
    fontSize: 14,
    fontWeight: '300',
  },
  underline: {
    textDecorationLine: 'underline',
  }

})