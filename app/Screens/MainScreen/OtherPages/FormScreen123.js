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


export default function FormScreen123() {

  const [show, setShow] = useState()
  const [gender, setGender] = useState()
  const [errorFormAPI, seterrorFormAPI] = useState("")
  const [spinnerBool, setSpinnerbool] = useState(false)

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
                    <Text>ksjdb{values.FromDate}</Text>



                    <Text>Old Student</Text>

                    <CustomTextInput
                      boxWidth={'80%'}
                      placeholder={'Old Student Name'}
                      label={'Old Student Name'}
                      name='Old Student Name'
                      value={values.oldStuName}
                      leftIcon={<FontAwesome name="user" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"
                      onChangeText={(e) => { handleChange("oldStuName")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("oldStuName")}

                      validate={handleBlur("oldStuName")}
                      outlined
                      borderColor={`${(errors.oldStuName && touched.oldStuName) || (errorFormAPI && errorFormAPI.oldStuNameForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.oldStuName && touched.oldStuName) ? `${errors.oldStuName}` : (errorFormAPI && errorFormAPI.oldStuNameForm) ? `${errorFormAPI.oldStuNameForm}` : ``}`}
                    // errorColor='magenta'
                    />

                    <CustomTextInput
                      boxWidth={'80%'}
                      placeholder={'First Course Place'}
                      label={'First Course Place'}
                      name='First Course Place'
                      value={values.firstCoursePlace}
                      leftIcon={<FontAwesome name="user" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"
                      onChangeText={(e) => { handleChange("firstCoursePlace")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("firstCoursePlace")}

                      validate={handleBlur("firstCoursePlace")}
                      outlined
                      borderColor={`${(errors.firstCoursePlace && touched.firstCoursePlace) || (errorFormAPI && errorFormAPI.firstCoursePlaceForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.firstCoursePlace && touched.firstCoursePlace) ? `${errors.firstCoursePlace}` : (errorFormAPI && errorFormAPI.firstCoursePlaceForm) ? `${errorFormAPI.firstCoursePlaceForm}` : ``}`}
                    // errorColor='magenta'
                    />

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
                        onChangeText={(e) => { handleChange("dateFirstCourse")(e); seterrorFormAPI(); }}
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
                        minimumDate={new Date(1990, 1, 1)}
                        maximumDate={new Date(2100, 10, 20)}
                      />

                    </View>
                    <CustomTextInput
                      boxWidth={'80%'}
                      placeholder={'First Asst Teacher'}
                      label={'First Asst Teacher'}
                      name='First Asst Teacher'
                      value={values.firstAsstTeacher}
                      leftIcon={<FontAwesome name="user" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"
                      onChangeText={(e) => { handleChange("firstAsstTeacher")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("firstAsstTeacher")}

                      validate={handleBlur("firstAsstTeacher")}
                      outlined
                      borderColor={`${(errors.firstAsstTeacher && touched.firstAsstTeacher) || (errorFormAPI && errorFormAPI.firstAsstTeacherForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.firstAsstTeacher && touched.firstAsstTeacher) ? `${errors.firstAsstTeacher}` : (errorFormAPI && errorFormAPI.firstAsstTeacherForm) ? `${errorFormAPI.firstAsstTeacherForm}` : ``}`}
                    // errorColor='magenta'
                    />




                    <CustomTextInput
                      boxWidth={'80%'}
                      placeholder={'last Course Place'}
                      label={'last Course Place'}
                      name='last Course Place'
                      value={values.lastCoursePlace}
                      leftIcon={<FontAwesome name="user" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"
                      onChangeText={(e) => { handleChange("lastCoursePlace")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("lastCoursePlace")}

                      validate={handleBlur("lastCoursePlace")}
                      outlined
                      borderColor={`${(errors.lastCoursePlace && touched.lastCoursePlace) || (errorFormAPI && errorFormAPI.lastCoursePlaceForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.lastCoursePlace && touched.lastCoursePlace) ? `${errors.lastCoursePlace}` : (errorFormAPI && errorFormAPI.lastCoursePlaceForm) ? `${errorFormAPI.lastCoursePlaceForm}` : ``}`}
                    // errorColor='magenta'
                    />

                    <CustomTextInput
                      boxWidth={'80%'}
                      placeholder={'last Asst Teacher'}
                      label={'last Asst Teacher'}
                      name='last Asst Teacher'
                      value={values.lastAsstTeacher}
                      leftIcon={<FontAwesome name="user" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"
                      onChangeText={(e) => { handleChange("lastAsstTeacher")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("lastAsstTeacher")}

                      validate={handleBlur("lastAsstTeacher")}
                      outlined
                      borderColor={`${(errors.lastAsstTeacher && touched.lastAsstTeacher) || (errorFormAPI && errorFormAPI.lastAsstTeacherForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.lastAsstTeacher && touched.lastAsstTeacher) ? `${errors.lastAsstTeacher}` : (errorFormAPI && errorFormAPI.lastAsstTeacherForm) ? `${errorFormAPI.lastAsstTeacherForm}` : ``}`}
                    // errorColor='magenta'
                    />

                    <CustomPicker
                      placeholder={'Enter Course Details'}
                      boxWidth={'80%'}
                      label={'Course Details'}
                      name='Course Details'

                      onChangeText={(e) => { handleChange("courseDetails")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("courseDetails")}

                      validate={handleBlur("courseDetails")}
                      outlined
                      borderColor={`${(errors.courseDetails && touched.courseDetails) || (errorFormAPI && errorFormAPI.courseDetailsForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.courseDetails && touched.courseDetails) ? `${errors.courseDetails}` : (errorFormAPI && errorFormAPI.courseDetailsForm) ? `${errorFormAPI.courseDetailsForm}` : ``}`}
                      // errorColor='magenta'
                      value={values.courseDetails}
                      items={courseDetailsData}
                      onValueChange={(itemValue) => handleChange("courseDetails")(itemValue)}
                      containerStyle={{ width: 200 }}
                      labelStyle={{ color: 'blue' }}
                      // pickerStyle={{ backgroundColor: '#f0f0f0' }}
                      error="Please select a courseDetails"
                    />










                    <CustomTextInput
                      placeholder={'Tried Any Practise'}
                      boxWidth={'80%'}
                      label={'Tried Any Practise'}
                      name='Tried Any Practise'
                      value={values.triedAnyPractise}
                      leftIcon={<FontAwesome name="user" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"
                      onChangeText={(e) => { handleChange("triedAnyPractise")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("triedAnyPractise")}

                      validate={handleBlur("triedAnyPractise")}
                      outlined
                      borderColor={`${(errors.triedAnyPractise && touched.triedAnyPractise) || (errorFormAPI && errorFormAPI.triedAnyPractiseForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.triedAnyPractise && touched.triedAnyPractise) ? `${errors.triedAnyPractise}` : (errorFormAPI && errorFormAPI.triedAnyPractiseForm) ? `${errorFormAPI.triedAnyPractiseForm}` : ``}`}
                    // errorColor='magenta'
                    // numLines={2}
                    />


                    <CustomPicker
                      placeholder={'Practise Regularly'}
                      boxWidth={'80%'}
                      label={'Practise Regularly'}
                      name='Practise Regularly'

                      onChangeText={(e) => { handleChange("practiseRegularly")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("practiseRegularly")}

                      validate={handleBlur("practiseRegularly")}
                      outlined
                      borderColor={`${(errors.practiseRegularly && touched.practiseRegularly) || (errorFormAPI && errorFormAPI.practiseRegularlyForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.practiseRegularly && touched.practiseRegularly) ? `${errors.practiseRegularly}` : (errorFormAPI && errorFormAPI.practiseRegularlyForm) ? `${errorFormAPI.practiseRegularlyForm}` : ``}`}
                      // errorColor='magenta'
                      value={values.practiseRegularly}
                      items={practiseRegularlyData}
                      onValueChange={(itemValue) => handleChange("practiseRegularly")(itemValue)}
                      containerStyle={{ width: 200 }}
                      labelStyle={{ color: 'blue' }}
                      // pickerStyle={{ backgroundColor: '#f0f0f0' }}
                      error="Please select a practiseRegularly"
                    />

                    <CustomTextInput
                      placeholder={'Daily Hours'}
                      boxWidth={'80%'}
                      label={'Daily Hours'}
                      name='Daily Hours'
                      value={values.dailyHours}
                      leftIcon={<FontAwesome name="user" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"
                      onChangeText={(e) => { handleChange("dailyHours")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("dailyHours")}

                      validate={handleBlur("dailyHours")}
                      outlined
                      borderColor={`${(errors.dailyHours && touched.dailyHours) || (errorFormAPI && errorFormAPI.dailyHoursForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.dailyHours && touched.dailyHours) ? `${errors.dailyHours}` : (errorFormAPI && errorFormAPI.dailyHoursForm) ? `${errorFormAPI.dailyHoursForm}` : ``}`}
                    // errorColor='magenta'
                    // numLines={2}
                    />


                    <CustomTextInput
                      placeholder={'Reason'}
                      boxWidth={'80%'}
                      label={'Reason'}
                      name='Reason'
                      value={values.reason}
                      leftIcon={<FontAwesome name="user" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"
                      onChangeText={(e) => { handleChange("reason")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("reason")}

                      validate={handleBlur("reason")}
                      outlined
                      borderColor={`${(errors.reason && touched.reason) || (errorFormAPI && errorFormAPI.reasonForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.reason && touched.reason) ? `${errors.reason}` : (errorFormAPI && errorFormAPI.reasonForm) ? `${errorFormAPI.reasonForm}` : ``}`}
                      // errorColor='magenta'
                      numLines={3}
                    />


                    <CustomTextInput
                      placeholder={'Change In YourSelf'}
                      boxWidth={'80%'}
                      label={'Change In YourSelf'}
                      name='Change In YourSelf'
                      value={values.changeInYourSelf}
                      leftIcon={<FontAwesome name="user" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"
                      onChangeText={(e) => { handleChange("changeInYourSelf")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("changeInYourSelf")}

                      validate={handleBlur("changeInYourSelf")}
                      outlined
                      borderColor={`${(errors.changeInYourSelf && touched.changeInYourSelf) || (errorFormAPI && errorFormAPI.changeInYourSelfForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.changeInYourSelf && touched.changeInYourSelf) ? `${errors.changeInYourSelf}` : (errorFormAPI && errorFormAPI.changeInYourSelfForm) ? `${errorFormAPI.changeInYourSelfForm}` : ``}`}
                      // errorColor='magenta'
                      numLines={4}
                    />
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