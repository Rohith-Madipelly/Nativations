import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Button, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, TextInput } from 'react-native';
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
import { FormDataTest } from '../../../Fomik/schema/FormDataTest.js';
import { useEffect } from 'react';


export default function FormScreen123() {

  const [show, setShow] = useState()
  const [category, setcategory] = useState()
  const [errorFormAPI, seterrorFormAPI] = useState("")
  const [spinnerBool, setSpinnerbool] = useState(false)

  const [courseDate, setCourseDate] = useState("")
  const [stratingfrom, setstartingFrom] = useState("")
  const minvalueofstratingfrom = DateConvert(stratingfrom)
  const minvalueofcourseDate = DateConvert(courseDate)


  const submitHandler = async (user) => {
    console.log(user)
  }

  const genders = [
    { label: 'Select gender', value: 'N/A' },
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  const Types = [
    { label: 'Select Type', value: 'N/A' },
    { label: 'Attend', value: 'Attend' },
    { label: 'Serve', value: 'Serve' },
  ];

  const CourseTypes = [
    { label: 'Select Type', value: 'N/A' },
    { label: 'BackEnd', value: 'N/A' },
  ];

  const LanguageData = [
    { label: 'Select', value: 'N/A' },
    { label: 'Kolkata', value: 'Kolkata' },
    { label: 'Bikaner', value: 'Bikaner' },
    { label: 'Other', value: 'other' },
  ]


  const categoryData = [
    { label: 'Select Category', value: 'N/A' },
    { label: 'For New Students', value: 'For New Students' },
    { label: 'For Old Students', value: 'For Old Students' },
    { label: 'For Children/Teens', value: 'For Children/Teens' },
    { label: 'For Executives', value: 'For Executives' },
  ];


  const [otherLanguage, setOtherLanguage] = useState('');

  // Function to handle change in other language input
  const handleOtherLanguageChange = (text) => {
    setOtherLanguage(text);
    // You can perform additional validations or actions here if needed
  };

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

          <ScrollView style={{ height: 'auto' }}>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 100 }}>
              <Formik
                // enableReinitialize
                validateOnMount={true}
                // initialValues={{ FromDate: "1", toDate: "1", category: "male", userAge: "19", MartialStatus: "Yes"}}
                initialValues={{ category: "", FromDate: "", toDate: "", address: "11-24-140", Language: "d" }}
                onSubmit={submitHandler}
                validator={() => ({})}
                validationSchema={FormDataTest}
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

                    <CustomPicker
                      placeholder={'Enter Your category'}
                      asterisksymbol={true}
                      boxWidth={'80%'}
                      label={'category'}
                      name='category'
                      // value={values.category}
                      // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"
                      onChangeText={(e) => { handleChange("category")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("category")}

                      validate={handleBlur("category")}
                      outlined
                      borderColor={`${(errors.category && touched.category) || (errorFormAPI && errorFormAPI.categoryForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.category && touched.category) ? `${errors.category}` : (errorFormAPI && errorFormAPI.categoryForm) ? `${errorFormAPI.categoryForm}` : ``}`}
                      // errorColor='magenta'
                      value={values.category}
                      items={categoryData}
                      onValueChange={(itemValue) => handleChange("category")(itemValue)}
                      containerStyle={{ width: 200 }}
                      labelStyle={{ color: 'blue' }}
                      // pickerStyle={{ backgroundColor: '#f0f0f0' }}
                      error="Please select a category"
                    />

                    {/* <View style={{ justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                      <CustomDateInput
                        placeholder={'From'}
                        label={'From '}
                        name='From'
                        value={values.from}
                        leftIcon={<MaterialIcons name="date-range" size={20} color="black" />}
                        // bgColor='#e1f3f8'
                        // bgColor="#B1B1B0"
                        asterisksymbol={true}
                        // onChangeText={onChangeText}
                        onChangeText={(e) => { handleChange("from")(e); setstartingFrom(e); seterrorFormAPI(); }}
                        onBlur={handleBlur("from")}
                        boxWidth={"40%"}
                        validate={handleBlur("from")}
                        outlined
                        borderColor={`${(errors.from && touched.from) || (errorFormAPI && errorFormAPI.fromForm) ? "red" : "#ccc"}`}
                        errorMessage={`${(errors.from && touched.from) ? `${errors.from}` : (errorFormAPI && errorFormAPI.fromForm) ? `${errorFormAPI.fromForm}` : ``}`}
                        // errorColor='magenta'
                        minimumDate={new Date()}
                        maximumDate={new Date(2090, 10, 20)}
                      />


                      <CustomDateInput
                        placeholder={'To'}
                        label={'To '}
                        name='To'
                        value={values.to}
                        asterisksymbol={true}
                        leftIcon={<MaterialIcons name="date-range" size={20} color="black" />}
                        // bgColor='#e1f3f8'
                        // bgColor="#B1B1B0"

                        onChangeText={(e) => { handleChange("to")(e); seterrorFormAPI(); }}
                        onBlur={handleBlur("to")}


                        validate={handleBlur("to")}

                        outlined

                        borderColor={`${(errors.to && touched.to) || (errorFormAPI && errorFormAPI.toForm) ? "red" : "#ccc"}`}

                        errorMessage={`${(errors.to && touched.to) ? `${errors.to}` : (errorFormAPI && errorFormAPI.toForm) ? `${errorFormAPI.toForm}` : ``}`}
                        // errorColor='magenta'
                        boxWidth={"40%"}
                        // boxWidth={"auto"}
                        minimumDate={minvalueofstratingfrom}
                        maximumDate={new Date(2090, 10, 20)}
                      />



                    </View> */}

                    <CustomTextInput
                      // placeholder={'State/Province,Country,Regions'}
                      placeholder={'Address'}
                      asterisksymbol={true}
                      boxWidth={'80%'}
                      label={'address'}
                      name='address'
                      value={values.address}
                      // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"
                      onChangeText={(e) => { handleChange("address")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("address")}

                      validate={handleBlur("address")}
                      outlined
                      borderColor={`${(errors.address && touched.address) || (errorFormAPI && errorFormAPI.addressForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.address && touched.address) ? `${errors.address}` : (errorFormAPI && errorFormAPI.addressForm) ? `${errorFormAPI.addressForm}` : ``}`}
                      // errorColor='magenta'
                      numLines={4}
                    />

                    <CustomPicker
                      placeholder={'Enter Your Language '}
                      asterisksymbol={true}
                      boxWidth={'80%'}
                      label={'Language'}
                      name='Language'
                      onChangeText={(e) => { handleChange("Language")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("Language")}
                      validate={handleBlur("Language")}
                      outlined
                      borderColor={`${(errors.Language && touched.Language) || (errorFormAPI && errorFormAPI.LanguageForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.Language && touched.Language) ? `${errors.Language}` : (errorFormAPI && errorFormAPI.LanguageForm) ? `${errorFormAPI.LanguageForm}` : ``}`}
                      value={values.Language}
                      items={LanguageData}
                      onValueChange={(itemValue) => {
                        handleChange("Language")(itemValue);
                        // seterrorFormAPI();
                      }}
                      containerStyle={{ width: 200 }}
                      labelStyle={{ color: 'blue' }}
                    />
                    {/* Input field for other language */}
                    {values.Language === 'other' && (

                      <CustomTextInput
                        boxWidth={'80%'}
                        label={'Other Language'}
                        name='Other Language'
                        // value={values.personName}
                        value={otherLanguage}
                        onChangeText={handleOtherLanguageChange}
                        placeholder="Other Language"
                        onBlur={handleBlur("personName")}
                        validate={handleBlur("personName")}
                        outlined
                        borderColor={`${(errors.personName && touched.personName) || (errorFormAPI && errorFormAPI.personNameForm) ? "red" : "#ccc"}`}
                        errorMessage={`${(errors.personName && touched.personName) ? `${errors.personName}` : (errorFormAPI && errorFormAPI.personNameForm) ? `${errorFormAPI.personNameForm}` : ``}`}
                      // errorColor='magenta'
                      />
                    )}

                    <CustomPicker
                      placeholder={'Enter Your Course Type'}
                      asterisksymbol={true}
                      boxWidth={'80%'}
                      label={'Course Type'}
                      name='CourseType'
                      // value={values.CourseType}
                      // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"
                      onChangeText={(e) => { handleChange("CourseType")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("CourseType")}

                      validate={handleBlur("CourseType")}
                      outlined
                      borderColor={`${(errors.CourseType && touched.CourseType) || (errorFormAPI && errorFormAPI.CourseTypeForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.CourseType && touched.CourseType) ? `${errors.CourseType}` : (errorFormAPI && errorFormAPI.CourseTypeForm) ? `${errorFormAPI.CourseTypeForm}` : ``}`}
                      // errorColor='magenta'
                      value={values.CourseType}
                      items={CourseTypes}
                      onValueChange={(itemValue) => handleChange("CourseType")(itemValue)}
                      containerStyle={{ width: 200 }}
                      labelStyle={{ color: 'blue' }}
                      // pickerStyle={{ backgroundColor: '#f0f0f0' }}
                      error="Please select a CourseType"
                    />
                    <CustomPicker
                      placeholder={'Enter Your gender'}
                      asterisksymbol={true}
                      boxWidth={'80%'}
                      label={'gender'}
                      name='gender'
                      // value={values.gender}
                      // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"
                      onChangeText={(e) => { handleChange("gender")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("gender")}

                      validate={handleBlur("gender")}
                      outlined
                      borderColor={`${(errors.gender && touched.gender) || (errorFormAPI && errorFormAPI.genderForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.gender && touched.gender) ? `${errors.gender}` : (errorFormAPI && errorFormAPI.genderForm) ? `${errorFormAPI.genderForm}` : ``}`}
                      // errorColor='magenta'
                      value={values.gender}
                      items={genders}
                      onValueChange={(itemValue) => handleChange("gender")(itemValue)}
                      containerStyle={{ width: 200 }}
                      labelStyle={{ color: 'blue' }}
                      // pickerStyle={{ backgroundColor: '#f0f0f0' }}
                      error="Please select a gender"
                    />


                    <CustomPicker
                      placeholder={'Enter Your gender'}
                      asterisksymbol={true}
                      boxWidth={'80%'}
                      label={'gender'}
                      name='gender'
                      // value={values.gender}
                      // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"
                      onChangeText={(e) => { handleChange("gender")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("gender")}

                      validate={handleBlur("gender")}
                      outlined
                      borderColor={`${(errors.gender && touched.gender) || (errorFormAPI && errorFormAPI.genderForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.gender && touched.gender) ? `${errors.gender}` : (errorFormAPI && errorFormAPI.genderForm) ? `${errorFormAPI.genderForm}` : ``}`}
                      // errorColor='magenta'
                      value={values.gender}
                      items={genders}
                      onValueChange={(itemValue) => handleChange("gender")(itemValue)}
                      containerStyle={{ width: 200 }}
                      labelStyle={{ color: 'blue' }}
                      // pickerStyle={{ backgroundColor: '#f0f0f0' }}
                      error="Please select a gender"
                    />


                    <CustomPicker
                      placeholder={'Enter Your gender'}
                      asterisksymbol={true}
                      boxWidth={'80%'}
                      label={'gender'}
                      name='gender'
                      // value={values.gender}
                      // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"
                      onChangeText={(e) => { handleChange("gender")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("gender")}

                      validate={handleBlur("gender")}
                      outlined
                      borderColor={`${(errors.gender && touched.gender) || (errorFormAPI && errorFormAPI.genderForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.gender && touched.gender) ? `${errors.gender}` : (errorFormAPI && errorFormAPI.genderForm) ? `${errorFormAPI.genderForm}` : ``}`}
                      // errorColor='magenta'
                      value={values.gender}
                      items={genders}
                      onValueChange={(itemValue) => handleChange("gender")(itemValue)}
                      containerStyle={{ width: 200 }}
                      labelStyle={{ color: 'blue' }}
                      // pickerStyle={{ backgroundColor: '#f0f0f0' }}
                      error="Please select a gender"
                    />


                    <CustomPicker
                      placeholder={'Enter Your gender'}
                      asterisksymbol={true}
                      boxWidth={'80%'}
                      label={'gender'}
                      name='gender'
                      // value={values.gender}
                      // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"
                      onChangeText={(e) => { handleChange("gender")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("gender")}

                      validate={handleBlur("gender")}
                      outlined
                      borderColor={`${(errors.gender && touched.gender) || (errorFormAPI && errorFormAPI.genderForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.gender && touched.gender) ? `${errors.gender}` : (errorFormAPI && errorFormAPI.genderForm) ? `${errorFormAPI.genderForm}` : ``}`}
                      // errorColor='magenta'
                      value={values.gender}
                      items={genders}
                      onValueChange={(itemValue) => handleChange("gender")(itemValue)}
                      containerStyle={{ width: 200 }}
                      labelStyle={{ color: 'blue' }}
                      // pickerStyle={{ backgroundColor: '#f0f0f0' }}
                      error="Please select a gender"
                    />

                    <CustomPicker
                      placeholder={'Enter Your Type'}
                      asterisksymbol={true}
                      boxWidth={'80%'}
                      label={'Type'}
                      name='Type'
                      // value={values.Type}
                      // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"
                      onChangeText={(e) => { handleChange("Type")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("Type")}

                      validate={handleBlur("Type")}
                      outlined
                      borderColor={`${(errors.Type && touched.Type) || (errorFormAPI && errorFormAPI.TypeForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.Type && touched.Type) ? `${errors.Type}` : (errorFormAPI && errorFormAPI.TypeForm) ? `${errorFormAPI.TypeForm}` : ``}`}
                      // errorColor='magenta'
                      value={values.Type}
                      items={Types}
                      onValueChange={(itemValue) => handleChange("Type")(itemValue)}
                      containerStyle={{ width: 200 }}
                      labelStyle={{ color: 'blue' }}
                      // pickerStyle={{ backgroundColor: '#f0f0f0' }}
                      error="Please select a Type"
                    />



                    {values.category === "For New Students" && (
                      <Text>Components for For New Students</Text>
                    )
                    }

                    {values.category === "For Old Students" && (
                      <Text>Components for For Old Students category</Text>
                    )}

                    {values.category === "For Children/Teens" && (
                      <Text>Components for For Children/Teens category</Text>
                    )}

                    {values.category === "For Executives" && (
                      <Text>Components for For Executives category</Text>
                    )}

                    <CustomButton
                      onPress={handleSubmit}
                      // leftIcon={<Entypo style={styles.icon} name={'login'} size={18} color={'white'} />}
                      bgColor={`${!isValid ? "rgba(220, 142, 128, 0.9)" : "rgba(242, 142, 128, 1)"}`}

                      style={{ marginTop: 50 }}>
                      Save
                    </CustomButton>


                    <View style={{ height: 500, width: 700 }}>
                      <Text>.</Text>
                    </View>



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