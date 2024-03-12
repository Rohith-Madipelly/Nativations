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
import { DateConvert } from '../../../utils/DateConvert.js';


export default function FormScreen123() {

  const [show, setShow] = useState()
  const [gender, setGender] = useState()
  const [errorFormAPI, seterrorFormAPI] = useState("")
  const [spinnerBool, setSpinnerbool] = useState(false)


  const [firstCourseDate, setFirstCourseDate] = useState('123');


  const courseDetailsData = [
    // "10-Days", "20-Days", "30-Days", "50-Days", "60-Days", "Self-Course", "Service", "Courses", "N/A"
    { label: 'Select course Details', value: '' },
    { label: '10-Days', value: '10-Days' },
    { label: '20-Days', value: '20-Days' },
    { label: '30-Days', value: '30-Days' },
    { label: '40-Days', value: '40-Days' },
    { label: '50-Days', value: '50-Days' },
    { label: '60-Days', value: '60-Days' },
    { label: 'Self-Course', value: 'Self-Course' },
    { label: 'Service', value: 'Service' },
    { label: 'Courses', value: 'Courses' },
  ];


  const practiseRegularlyData = [
    // "10-Days", "20-Days", "30-Days", "50-Days", "60-Days", "Self-Course", "Service", "Courses", "N/A"
    { label: 'Select course Details', value: '' },

    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
    { label: 'Courses', value: 'Courses' },
  ];
  const submitHandler = async (user) => {

  }


  // const dateString = firstCourseDate;
  // const [month, day, year] = dateString.split('/');
  // const dateObject = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));


  const dateObject=DateConvert(firstCourseDate)



  console.log("sdjhvjah",dateObject)
  
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
                initialValues={{ FromDate: "", toDate: "" }}
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
         


                    <View style={{ justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                      <CustomDateInput
                        placeholder={'First Course date'}
                        label={'First Course date'}
                        name='First Course date'
                        value={values.dateFirstCourse}
                        leftIcon={<MaterialIcons name="date-range" size={20} color="black" />}
                        // bgColor='#e1f3f8'
                        // bgColor="#B1B1B0"

                        // onChangeText={onChangeText}
                        onChangeText={(e) => { handleChange("dateFirstCourse")(e); setFirstCourseDate(e);seterrorFormAPI(); }}
                        onBlur={handleBlur("dateFirstCourse")}
                        boxWidth={"40%"}
                        validate={handleBlur("dateFirstCourse")}
                        outlined
                        borderColor={`${(errors.dateFirstCourse && touched.dateFirstCourse) || (errorFormAPI && errorFormAPI.dateFirstCourseForm) ? "red" : "#ccc"}`}
                        errorMessage={`${(errors.dateFirstCourse && touched.dateFirstCourse) ? `${errors.dateFirstCourse}` : (errorFormAPI && errorFormAPI.dateFirstCourseForm) ? `${errorFormAPI.dateFirstCourseForm}` : ``}`}
                        // errorColor='magenta'
                        minimumDate={new Date(1990, 1, 1)}
                        maximumDate={new Date(2100, 10, 20)}
                      />
       

                      <CustomDateInput
                        placeholder={'Last Course date'}
                        label={'Last Course date'}
                        name='Last Course date'
                        value={values.dateLastCourse}
                        leftIcon={<MaterialIcons name="date-range" size={20} color="black" />}
                        // bgColor='#e1f3f8'
                        // bgColor="#B1B1B0"

                        // onChangeText={onChangeText}
                        onChangeText={(e) => { handleChange("dateLastCourse")(e); seterrorFormAPI(); }}
                        onBlur={handleBlur("dateLastCourse")}
                        boxWidth={"40%"}
                        validate={handleBlur("dateLastCourse")}
                        outlined
                        borderColor={`${(errors.dateLastCourse && touched.dateLastCourse) || (errorFormAPI && errorFormAPI.dateLastCourseForm) ? "red" : "#ccc"}`}
                        errorMessage={`${(errors.dateLastCourse && touched.dateLastCourse) ? `${errors.dateLastCourse}` : (errorFormAPI && errorFormAPI.dateLastCourseForm) ? `${errorFormAPI.dateLastCourseForm}` : ``}`}
                        // errorColor='magenta'
                        // minimumDate={new Date(1990, 1, 1)}
                        minimumDate={dateObject}
                        maximumDate={new Date(2100, 10, 20)}
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