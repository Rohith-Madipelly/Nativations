import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Button, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Alert } from 'react-native';
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
import { FormDataApi, UserLoginApi } from "../../../utils/API_Calls.js";
import Spinner from 'react-native-loading-spinner-overlay';

import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../../redux/actions/loginAction.jsx'

import ASO from '../../../utils/AsyncStorage_Calls.js'
import { ToasterSender } from '../../../utils/Toaster.js';
import MainComponent from '../MainComponent.js';

// import CustomPicker from '../../../Components/UI/Inputs/CustomPicker.js';
import { FormData } from '../../../Fomik/schema/FormData.js';
import CustomDateInput from '../../../Components/UI/Inputs/CustomDateInput.js';
import CustomPicker from '../../../Components/UI/Inputs/CustomPicker.js';


export default function FormScreen() {

  const [show, setShow] = useState()
  const [gender, setGender] = useState()
  const [errorFormAPI, seterrorFormAPI] = useState("")
  const [spinnerBool, setSpinnerbool] = useState(false)
  let tokenn = useSelector((state) => state.token);
  const navigation = useNavigation();

  try {
    if (tokenn != null) {
      tokenn = tokenn.replaceAll('"', '');
    }
  }
  catch (err) {
    console.log("Error in token quotes", err)
  }


  // >>>
  const genders = [
    { label: 'Select Gender', value: '' },
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  const martialStatus = [
    { label: 'Select', value: '' },
    { label: 'Single', value: 'Single' }, // Changed 'male' to 'single'
    { label: 'Married', value: 'Married' }, // Changed 'female' to 'married'
  ];

  const RegularMedicineData = [
    { label: 'Select', value: '' },
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];


  const ReferenceFromData = [
    { label: 'Select', value: '' },
    { label: 'Friend', value: 'Friend' },
    { label: 'News-Paper', value: 'News-Paper' },
    { label: 'TV', value: 'TV' },
    { label: 'Lectures', value: 'Lectures' },
    { label: 'Others', value: 'Others' },
  ];
  // >>>>
  const dispatch = useDispatch();



  function onchange(text, field) {
    setValues({ ...values, [field]: text });
  }
  const showAlertAndNavigate = (Data) => {
    Alert.alert(
      'Success',
      Data,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'), // Navigate to home page
        },
      ],
      { cancelable: false }
    );
  };

  const submitHandler = async (user) => {

    seterrorFormAPI()
    try {
      const { FromDate, toDate, fName, lName, Gender, userAge, Education, MartialStatus, GuardianName, MotherTongue, Mobile_Number, email, Address, RegularMedicine, briefData, ReferenceFrom } = user;

      const dataEngin = { FromDate, toDate, fName, lName, Gender, userAge, Education, MartialStatus, GuardianName, MotherTongue, Mobile_Number, email, Address, RegularMedicine, briefData, ReferenceFrom }
      setSpinnerbool(true)
      const res = await FormDataApi(dataEngin, tokenn)
      console.log(res)
      if (res) {
        const Message = res.data.message
        console.log("messagee >>", Message)

        showAlertAndNavigate(Message)

        setTimeout(() => {

          setSpinnerbool(false)
        }, 50);


      }

    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          console.log("Error With 400.")
        }
        else if (error.response.status === 401) {
          seterrorFormAPI({ PasswordForm: `${error.response.data.message}` })
        }
        else if (error.response.status === 404) {
          seterrorFormAPI({ EmailForm: `${error.response.data.message}` })
        }

        else if (error.response.status === 500) {
          console.log("Internal Server Error", error.message)
        }
        else {
          console.log("An error occurred response.", error.response.status)
        }
      }
      else if (error.request) {
        console.log("No Response Received From the Server.")
      }
      else {
        console.log("Error in Setting up the Request.")
      }

      //   ToasterSender("Error in Setting up the Request.")
      //   ToasterSender({ Message: error.response.data.message })
      // ToasterSender({ Message: error })

      setSpinnerbool(false)

      if (error) {

        // message = error.message;
        // seterrorFormAPI(message)
        // "Email or Password does not match !"
      }
    }
    finally {
      setSpinnerbool(false)
    }
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
                // initialValues={{ FromDate: "", toDate: "", fName: "", lName: "",Gender:"",userAge:"",Education:"",MartialStatus:"",GuardianName:"",MotherTongue:"",Mobile_Number:"",email:"",Address:"",RegularMedicine:"",briefData:"",ReferenceFrom:"" }}
                // initialValues={{ FromDate: "1", toDate: "1", fName: "1", lName: "1",Gender:"1",userAge:"15",Education:"vfsvsf",MartialStatus:"31",GuardianName:"5165vdsv",MotherTongue:"v dv",Mobile_Number:"9951072005",email:"vv",Address:"vdfsjvbhsuif sg uif syf ys f",RegularMedicine:"yes",briefData:"bjkf",ReferenceFrom:"sgfd" }}
                initialValues={{ FromDate: "", toDate: "", fName: "Rohith", lName: "Madipelly", Gender: "male", userAge: "19", Education: "BTech Civil", MartialStatus: "31", GuardianName: "Venu", MotherTongue: "Telugu", Mobile_Number: "9951072005", email: "madipellyrohith@gmail.com", Address: "11-24-140, 2nd Bank Colony, Shanthi Nagar", RegularMedicine: "Yes", briefData: "bjkf eshj sfvs uia uf uf", ReferenceFrom: "Analogue" }}
                onSubmit={submitHandler}
                validator={() => ({})}
                validationSchema={FormData}
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
                        placeholder={'From'}
                        label={'From '}
                        name='From'
                        value={values.FromDate}
                        leftIcon={<MaterialIcons name="date-range" size={20} color="black" />}
                        // bgColor='#e1f3f8'
                        // bgColor="#B1B1B0"
                        asterisksymbol={true}
                        // onChangeText={onChangeText}
                        onChangeText={(e) => { handleChange("FromDate")(e); seterrorFormAPI(); }}
                        onBlur={handleBlur("FromDate")}
                        boxWidth={"40%"}
                        validate={handleBlur("FromDate")}
                        outlined
                        borderColor={`${(errors.FromDate && touched.FromDate) || (errorFormAPI && errorFormAPI.FromDateForm) ? "red" : "#ccc"}`}
                        errorMessage={`${(errors.FromDate && touched.FromDate) ? `${errors.FromDate}` : (errorFormAPI && errorFormAPI.FromDateForm) ? `${errorFormAPI.FromDateForm}` : ``}`}
                        // errorColor='magenta'
                        minimumDate={new Date()}
                        maximumDate={new Date(2090, 10, 20)}
                      />


                      <CustomDateInput
                        placeholder={'to'}
                        label={'to '}
                        name='From'
                        value={values.toDate}
                        asterisksymbol={true}
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
                        minimumDate={new Date()}
                        maximumDate={new Date(2090, 10, 20)}
                      />

                    </View>

                    <CustomTextInput
                      boxWidth={'80%'}
                      asterisksymbol={true}
                      placeholder={'Enter Your First Name'}
                      label={'First Name '}
                      name='First Name'
                      value={values.fName}
                      leftIcon={<FontAwesome name="user" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"
                      onChangeText={(e) => { handleChange("fName")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("fName")}

                      validate={handleBlur("fName")}
                      outlined
                      borderColor={`${(errors.fName && touched.fName) || (errorFormAPI && errorFormAPI.fNameForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.fName && touched.fName) ? `${errors.fName}` : (errorFormAPI && errorFormAPI.fNameForm) ? `${errorFormAPI.fNameForm}` : ``}`}
                    // errorColor='magenta'
                    />

                    <CustomTextInput
                      boxWidth={'80%'}
                      asterisksymbol={true}
                      placeholder={'Enter Your Last Name'}
                      label={'Last Name'}
                      name='Last Name'
                      value={values.lName}
                      leftIcon={<FontAwesome name="user" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"
                      onChangeText={(e) => { handleChange("lName")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("lName")}

                      validate={handleBlur("lName")}
                      outlined
                      borderColor={`${(errors.lName && touched.lName) || (errorFormAPI && errorFormAPI.lNameForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.lName && touched.lName) ? `${errors.lName}` : (errorFormAPI && errorFormAPI.lNameForm) ? `${errorFormAPI.FNameForm}` : ``}`}
                    // errorColor='magenta'
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>

                      <CustomPicker
                        placeholder={'Enter Your Gender'}
                        asterisksymbol={true}
                        boxWidth={'60%'}
                        label={'Gender'}
                        name='Gender'
                        // value={values.Gender}
                        // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                        // bgColor='#e1f3f8'
                        // bgColor="#B1B1B0"
                        onChangeText={(e) => { handleChange("Gender")(e); seterrorFormAPI(); }}
                        onBlur={handleBlur("Gender")}

                        validate={handleBlur("Gender")}
                        outlined
                        borderColor={`${(errors.Gender && touched.Gender) || (errorFormAPI && errorFormAPI.GenderForm) ? "red" : "#ccc"}`}
                        errorMessage={`${(errors.Gender && touched.Gender) ? `${errors.Gender}` : (errorFormAPI && errorFormAPI.GenderForm) ? `${errorFormAPI.GenderForm}` : ``}`}
                        // errorColor='magenta'
                        value={values.Gender}
                        items={genders}
                        onValueChange={(itemValue) => handleChange("Gender")(itemValue)}
                        containerStyle={{ width: 200 }}
                        labelStyle={{ color: 'blue' }}
                        // pickerStyle={{ backgroundColor: '#f0f0f0' }}
                        error="Please select a gender"
                      />

                      <CustomTextInput
                        boxWidth={'30%'}
                        placeholder={'Age'}
                        asterisksymbol={true}
                        label={'Your Age'}
                        name='Age'
                        value={values.userAge}
                        // leftIcon={<FontAwesome name="phone" size={20} color="black" />}
                        onChangeText={(e) => { handleChange("userAge")(e); seterrorFormAPI(); }}
                        onBlur={handleBlur("userAge")}
                        validate={handleBlur("userAge")}
                        outlined
                        borderColor={`${(errors.userAge && touched.userAge) || (errorFormAPI && errorFormAPI.userAge) ? "red" : "#ccc"}`}
                        errorMessage={`${(errors.userAge && touched.userAge) ? `${errors.userAge}` : (errorFormAPI && errorFormAPI.userAge) ? `${errorFormAPI.userAge}` : ``}`}
                      // errorColor='magenta'
                      />

                    </View>

                    <CustomTextInput
                      placeholder={'Enter Your Education'}
                      asterisksymbol={true}
                      boxWidth={'80%'}
                      label={'Education'}
                      name='Education'
                      value={values.Education}
                      // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"
                      onChangeText={(e) => { handleChange("Education")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("Education")}

                      validate={handleBlur("Education")}
                      outlined
                      borderColor={`${(errors.Education && touched.Education) || (errorFormAPI && errorFormAPI.EducationForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.Education && touched.Education) ? `${errors.Education}` : (errorFormAPI && errorFormAPI.EducationForm) ? `${errorFormAPI.EducationForm}` : ``}`}
                    // errorColor='magenta'
                    />

                    <CustomPicker
                      placeholder={'Martial Status'}
                      asterisksymbol={true}
                      boxWidth={'80%'}
                      label={'Martial Status'}
                      name='MartialStatus'
                      // value={values.Gender}
                      // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"
                      onChangeText={(e) => { handleChange("MartialStatus")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("MartialStatus")}

                      validate={handleBlur("MartialStatus")}
                      outlined
                      borderColor={`${(errors.MartialStatus && touched.MartialStatus) || (errorFormAPI && errorFormAPI.MartialStatusForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.MartialStatus && touched.MartialStatus) ? `${errors.MartialStatus}` : (errorFormAPI && errorFormAPI.MartialStatusForm) ? `${errorFormAPI.GenderForm}` : ``}`}
                      // errorColor='magenta'
                      value={values.MartialStatus}
                      items={martialStatus}
                      // onValueChange={handlemartialStatusChange}
                      onValueChange={(itemValue) => handleChange("MartialStatus")(itemValue)}

                      containerStyle={{ width: 200 }}
                      labelStyle={{ color: 'blue' }}
                      // pickerStyle={{ backgroundColor: '#f0f0f0' }}
                      error="Please select a gender"
                    />
                    <CustomTextInput
                      placeholder={'Enter Your Guardian Name'}
                      asterisksymbol={true}
                      boxWidth={'80%'}
                      label={'Guardian Name'}
                      name='Guardian Name'
                      value={values.GuardianName}
                      // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"
                      onChangeText={(e) => { handleChange("GuardianName")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("GuardianName")}

                      validate={handleBlur("GuardianName")}
                      outlined
                      borderColor={`${(errors.GuardianName && touched.GuardianName) || (errorFormAPI && errorFormAPI.GuardianNameForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.GuardianName && touched.GuardianName) ? `${errors.GuardianName}` : (errorFormAPI && errorFormAPI.GuardianNameForm) ? `${errorFormAPI.GuardianNameForm}` : ``}`}
                    // errorColor='magenta'
                    />
                    <CustomTextInput
                      placeholder={'Enter Your Mother Tongue'}
                      asterisksymbol={true}
                      boxWidth={'80%'}
                      label={'Mother Tongue'}
                      name='MotherTongue'
                      value={values.MotherTongue}
                      // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"
                      onChangeText={(e) => { handleChange("MotherTongue")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("MotherTongue")}

                      validate={handleBlur("MotherTongue")}
                      outlined
                      borderColor={`${(errors.MotherTongue && touched.MotherTongue) || (errorFormAPI && errorFormAPI.MotherTongueForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.MotherTongue && touched.MotherTongue) ? `${errors.MotherTongue}` : (errorFormAPI && errorFormAPI.MotherTongueForm) ? `${errorFormAPI.MotherTongueForm}` : ``}`}
                    // errorColor='magenta'
                    />











                    <CustomTextInput
                      placeholder={'Mobile Number'}
                      asterisksymbol={true}
                      boxWidth={'80%'}
                      label={'Mobile Number'}
                      name='Mobile_Number'
                      value={values.Mobile_Number}
                      leftIcon={<FontAwesome name="phone" size={20} color="black" />}
                      onChangeText={(e) => { handleChange("Mobile_Number")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("Mobile_Number")}
                      validate={handleBlur("Mobile_Number")}
                      outlined
                      borderColor={`${(errors.Mobile_Number && touched.Mobile_Number) || (errorFormAPI && errorFormAPI.Mobile_NumberForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.Mobile_Number && touched.Mobile_Number) ? `${errors.Mobile_Number}` : (errorFormAPI && errorFormAPI.Mobile_NumberForm) ? `${errorFormAPI.Mobile_NumberForm}` : ``}`}
                    // errorColor='magenta'
                    />


                    <CustomTextInput
                      placeholder={'Enter Your Email'}
                      asterisksymbol={true}
                      boxWidth={'80%'}
                      label={'Email'}
                      name='Email'
                      value={values.email}
                      leftIcon={<FontAwesome name="user" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"
                      onChangeText={(e) => { handleChange("email")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("email")}

                      validate={handleBlur("email")}
                      outlined
                      borderColor={`${(errors.email && touched.email) || (errorFormAPI && errorFormAPI.emailForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.email && touched.email) ? `${errors.email}` : (errorFormAPI && errorFormAPI.emailForm) ? `${errorFormAPI.emailForm}` : ``}`}
                    // errorColor='magenta'
                    />



                    <CustomTextInput
                      placeholder={'Enter Your Address'}
                      asterisksymbol={true}
                      boxWidth={'80%'}
                      label={'Address'}
                      name='Address'
                      value={values.Address}
                      leftIcon={<FontAwesome name="user" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"
                      onChangeText={(e) => { handleChange("Address")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("Address")}

                      validate={handleBlur("Address")}
                      outlined
                      borderColor={`${(errors.Address && touched.Address) || (errorFormAPI && errorFormAPI.AddressForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.Address && touched.Address) ? `${errors.Address}` : (errorFormAPI && errorFormAPI.AddressForm) ? `${errorFormAPI.AddressForm}` : ``}`}
                      // errorColor='magenta'
                      numLines={4}
                    />



                    {/* regularMedicine */}
                    <CustomPicker
                      placeholder={'Regular Medicine'}
                      asterisksymbol={true}
                      boxWidth={'80%'}
                      label={'Any Medicine issues'}
                      name='RegularMedicine'
                      // value={values.Gender}
                      // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"
                      onChangeText={(e) => { handleChange("RegularMedicine")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("RegularMedicine")}

                      validate={handleBlur("RegularMedicine")}
                      outlined
                      borderColor={`${(errors.RegularMedicine && touched.RegularMedicine) || (errorFormAPI && errorFormAPI.RegularMedicineForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.RegularMedicine && touched.RegularMedicine) ? `${errors.RegularMedicine}` : (errorFormAPI && errorFormAPI.RegularMedicineForm) ? `${errorFormAPI.RegularMedicineForm}` : ``}`}
                      // errorColor='magenta'
                      value={values.RegularMedicine}
                      items={RegularMedicineData}
                      onValueChange={(itemValue) => handleChange("RegularMedicine")(itemValue)}
                      containerStyle={{ width: 200 }}
                      labelStyle={{ color: 'blue' }}
                    // pickerStyle={{ backgroundColor: '#f0f0f0' }}
                    // error="Please select a gender"
                    />


                    <CustomTextInput
                      placeholder={'Enter More Information Data'}
                      asterisksymbol={true}
                      boxWidth={'80%'}
                      label={'More Information'}
                      name='brief'
                      value={values.briefData}
                      leftIcon={<FontAwesome name="user" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"
                      onChangeText={(e) => { handleChange("briefData")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("briefData")}

                      validate={handleBlur("briefData")}
                      outlined
                      borderColor={`${(errors.briefData && touched.briefData) || (errorFormAPI && errorFormAPI.briefDataForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.briefData && touched.briefData) ? `${errors.briefData}` : (errorFormAPI && errorFormAPI.briefDataForm) ? `${errorFormAPI.briefDataForm}` : ``}`}
                      // errorColor='magenta'
                      numLines={4}
                    />

                    <CustomPicker
                      placeholder={'Refered By'}
                      asterisksymbol={true}
                      boxWidth={'80%'}
                      label={'Refered By'}
                      name='Refered By'

                      onChangeText={(e) => { handleChange("ReferenceFrom")(e); seterrorFormAPI(); }}
                      onBlur={handleBlur("ReferenceFrom")}

                      validate={handleBlur("ReferenceFrom")}
                      outlined
                      borderColor={`${(errors.ReferenceFrom && touched.ReferenceFrom) || (errorFormAPI && errorFormAPI.ReferenceFromForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.ReferenceFrom && touched.ReferenceFrom) ? `${errors.ReferenceFrom}` : (errorFormAPI && errorFormAPI.ReferenceFromForm) ? `${errorFormAPI.ReferenceFromForm}` : ``}`}
                      // errorColor='magenta'
                      value={values.ReferenceFrom}
                      items={ReferenceFromData}
                      onValueChange={(itemValue) => handleChange("ReferenceFrom")(itemValue)}
                      containerStyle={{ width: 200 }}
                      labelStyle={{ color: 'blue' }}
                    // pickerStyle={{ backgroundColor: '#f0f0f0' }}
                    // error="Please select a ReferenceFrom"
                    />

                    <CustomButton
                      onPress={handleSubmit}
                      // leftIcon={<Entypo style={styles.icon} name={'Save'} size={18} color={'white'} />}
                      bgColor={`${!isValid ? "rgba(220, 142, 128, 0.9)" : "rgba(242, 142, 128, 1)"}`}

                      style={{ marginTop: 50 }}>
                      Save
                    </CustomButton>

                    <View style={{}}>
                      <TouchableOpacity onPress={() => { navigation.navigate("ForgotPassword") }}>
                        <Text style={[styles.paragraphy, { color: 'black', marginTop: 20, fontWeight: '400' }]}>Forgot password?</Text>
                      </TouchableOpacity>
                    </View>


                    <View style={{ width: '65%', textAlign: 'center', marginTop: 40 }}>
                      <TouchableOpacity onPress={() => { navigation.navigate("Register") }}>
                        <Text style={[styles.paragraphy, { textAlign: 'center', color: '#7C7C7C', fontWeight: '400' }]}>Don’t have an account?
                          <Text style={[styles.underline, { color: '#006AFF' }]}> Sign Up</Text>
                        </Text>

                      </TouchableOpacity>
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