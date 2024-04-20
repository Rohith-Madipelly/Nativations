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

import { useEffect, useState } from 'react';
import { useFormik } from "formik";

import { FormDataApi, GetCourseData, GetFormDataSumbited, GetFormReqs, UserLoginApi } from "../../../utils/API_Calls.js";
import Spinner from 'react-native-loading-spinner-overlay';

import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import MainComponent from '../MainComponent.js';

import { FormDataChecker } from '../../../Fomik/schema/FormData copy.js';
import CustomDateInput from '../../../Components/UI/Inputs/CustomDateInput.js';
import CustomPicker from '../../../Components/UI/Inputs/CustomPicker.js';
import { DateConvert } from '../../../utils/DateConvert.js';


export default function FormScreenChecker() {
  const [date123, setDate] = useState(new Date());

  const [errorFormAPI, seterrorFormAPI] = useState("")
  const [spinnerBool, setSpinnerbool] = useState(false)
  const [userReviewsData, setUserReviewsData] = useState()


  const ErrorChecker = () => {
    if (Object.values(errors).length === 0) {
      handleSubmit();
    } else {
      // Display errors in an alert
      // alert(Object.values(errors).join(', '));
      alert("Please fill in the mandatory fields");
    }
  };


  const { handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    values,
    touched,
    errors,
    isValid,
    setValues,
    resetForm,
  } = useFormik({
    initialValues: {
      category: "", courseName: "",
      // firstName: "Rohith", lastName: "Madipelly", gender: "", age: "20", education: "Civil Btech", martialStatus: "", guardianName: "Venu", language: "", mobileNumber: "9951072003", eMail: "madipellyrohith@gmail.com", address: "11-24-140,2nd bank Colony,", medicineName: "", medicineDose: "", regularMedicine: "", brief: "", referenceFrom: "",
      firstName: "", lastName: "", gender: "", age: "", education: "", martialStatus: "", guardianName: "", language: "", mobileNumber: "", eMail: "", address: "", medicineName: "", medicineDose: "", regularMedicine: "", brief: "", referenceFrom: "",
      oldStuName: "", firstCoursePlace: "", dateFirstCourse: "", dateLastCourse: "", firstAsstTeacher: "", lastCoursePlace: "", lastAsstTeacher: "", courseDetails: "", triedAnyPractise: "", practiseRegularly: "", dailyHours: "", reason: "", changeInYourSelf: "",
      personName: "", personRelation: "", courseDone: "", relation: "", designation: "", companyName: "", companyAddress: "", inPastOne: "", inPresentOne: "", FitnessCertificate: "", inPastTwo: "", inPresentTwo: ""
    },

    onSubmit: values => {
      { submitHandler(values) }
    },

    validationSchema: FormDataChecker,

    validate: values => {
      const errors = {};
      return errors;
    },

  });

  const [stratingfrom, setstartingFrom] = useState("")

  const [courseDate, setCourseDate] = useState("")

  const minvalueofstratingfrom = DateConvert(stratingfrom)
  const minvalueofcourseDate = DateConvert(courseDate)

  let tokenn = useSelector((state) => state.token);
  const navigation = useNavigation();



  const [courseData, setCourseData] = useState("")
  const [from, setfrom] = useState()
  const [to, setCourseDataTo] = useState()


  const [toDisplay, setToDisplay] = useState(false)
  const [data, SetData] = useState([])
  const [otherLanguage, setOtherLanguage] = useState('');
  const [otherState, setOtherState] = useState('');

  // Function to handle change in other language input
  const handleOtherLanguageChange = (text) => {
    setOtherLanguage(text);
  };


  // Function to handle change in other language input
  const handleOtherStateChange = (text) => {
    setOtherState(text);
  };


  try {
    if (tokenn != null) {
      tokenn = tokenn.replaceAll('"', '');
    }
  }
  catch (err) {
    console.log("Error in token quotes", err)
  }


  // Shows Alert and Navigates to given page
  const showAlertAndNavigate = (responseData, toNavigate) => {
    Alert.alert(
      'Success',
      responseData,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate(toNavigate),
        },
      ],
      { cancelable: false }
    );
  };


  date = date123.toLocaleDateString()


  const submitHandler = async (user) => {
    console.log("Clear from fomik", user)
    seterrorFormAPI()
    try {
      console.log("Data Set")
      const { category, state, firstName, lastName, gender, age, education, martialStatus, guardianName, language, mobileNumber, eMail, address, medicineName, medicineDose, regularMedicine, brief, referenceFrom,
        oldStuName, firstCoursePlace, dateFirstCourse, dateLastCourse, firstAsstTeacher, lastCoursePlace, lastAsstTeacher, courseDetails, triedAnyPractise, practiseRegularly, dailyHours, reason, changeInYourSelf,
        personName, personRelation, courseDone, FitnessCertificate, relation, designation, companyName, companyAddress, inPastOne, inPresentOne, inPastTwo, inPresentTwo } = user;

      const oldStudent = {
        oldStuName,
        dateFirstCourse,
        firstCoursePlace,
        firstAsstTeacher,
        dateLastCourse,
        lastCoursePlace,
        lastAsstTeacher,
        courseDetails,
        triedAnyPractise,
        practiseRegularly,
        dailyHours,
        reason,
        changeInYourSelf,
      }



      // console.log("dsjbjfjka", oldStudent)
      const knownPerson = {
        personName,
        personRelation
      }
      const familyPerson = {
        courseDone,
        relation: `${courseDone === 'yes' ? relation : ""}`
      }
      const professionalDetails = {
        designation,
        companyName,
        companyAddress
      }
      const physicalAilment = {
        inPastOne,
        inPresentOne
      }
      const psyschologicalAilment = {
        inPastTwo,
        inPresentTwo
      }

      const docFitnessCertificate = {

        medicineName: `${FitnessCertificate === 'yes' ? medicineName : "N/A"}`,
        medicineDose: `${FitnessCertificate === 'yes' ? medicineDose : "N/A"}`,
      }
      const courseId = `${courseData._id}`
      const courseName = `${courseData.courseName}`
      const courseDuration = `${courseData.courseDuration}`




      const dataEngin = { category, courseId, courseName, courseDuration, from, to, date, firstName, lastName, gender, age, education, martialStatus, guardianName, language: `${otherLanguage ? otherLanguage : language}`, state: `${otherState ? otherState : state}`, mobileNumber, eMail, address, regularMedicine, brief, referenceFrom, oldStudent, docFitnessCertificate, psyschologicalAilment, physicalAilment, professionalDetails, familyPerson, knownPerson }
      setSpinnerbool(true)
      console.log(">>>>Tester", dataEngin.language)
      console.log(">>>>Tester", dataEngin.state)
      console.log(">>>>Tester regularMedicine", regularMedicine)
      console.log(">>>>Tester", dataEngin)
      console.log("asdda")
      const res = await FormDataApi(dataEngin, tokenn)

      if (res) {
        const Message = res.data.message
        showAlertAndNavigate(Message, "Home")
        setTimeout(() => {

          setSpinnerbool(false)
        }, 50);
      }

    } catch (error) {
      console.log("fs<><><<><><<>", error.response.data.message)
      if (error.response) {
        if (error.response.status === 400) {
          console.log("Error With 400.")
          showAlertAndNavigate(error.response.data.message, "Home")
        }
        else if (error.response.status === 401) {
          seterrorFormAPI({ PasswordForm: `${error.response.data.message}` })
        }
        else if (error.response.status === 404) {
          seterrorFormAPI({ eMailForm: `${error.response.data.message}` })
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
        console.log(error)
        // message = error.message;
        // seterrorFormAPI(message)
        // "eMail or Password does not match !"
      }
    }
    finally {
      setSpinnerbool(false)
    }
  }


  const FitnessCertificateData = [
    { label: 'Select', value: 'N/A' },
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];
  const inPastTwoData = [
    { label: 'Select', value: 'N/A' },
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'NO' },
  ];

  const inPresentTwoData = [
    { label: 'Select', value: 'N/A' },
    { label: 'true', value: 'Yes' },
    { label: 'false', value: 'No' },
  ];

    ;


  if (spinnerBool) {
    return (
      <Spinner
        visible={spinnerBool}
        color={"#5F2404"}
        animation={'fade'}
      />
    )
  }

  return (
    <>
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


              <>

                <Text style={{ fontWeight: 800, fontSize: 15, marginTop: 5, marginBottom: 5 }}>- Any Psyschological Ailment/Addiction? -</Text>

                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>


                  <CustomPicker
                    boxWidth={'80%'}
                    placeholder={'In past '}
                    label={'In past '}
                    name='Psyschological ailment in past'
                    // value={values.gender}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"
                    onChangeText={(e) => { handleChange("inPastTwo")(e); seterrorFormAPI(); }}

                    onBlur={handleBlur("inPastTwo")}

                    validate={handleBlur("inPastTwo")}

                    outlined
                    borderColor={`${(errors.inPastTwo && touched.inPastTwo) || (errorFormAPI && errorFormAPI.inPastTwoForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.inPastTwo && touched.inPastTwo) ? `${errors.inPastTwo}` : (errorFormAPI && errorFormAPI.inPastTwoForm) ? `${errorFormAPI.inPastTwoForm}` : ``}`}
                    // errorColor='magenta'
                    value={values.inPastTwo}
                    items={inPastTwoData}
                    onValueChange={(itemValue) => handleChange("inPastTwo")(itemValue)}
                    containerStyle={{ width: 200 }}
                    labelStyle={{ color: 'blue' }}
                  // pickerStyle={{ backgroundColor: '#f0f0f0' }}
                  // error="Please select a gender"
                  />

                  <CustomPicker
                    boxWidth={'80%'}
                    placeholder={'In present'}
                    label={'In present '}
                    name='In present '

                    // value={values.gender}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"
                    onChangeText={(e) => { handleChange("inPresentTwo")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("inPresentTwo")}

                    validate={handleBlur("inPresentTwo")}
                    outlined
                    borderColor={`${(errors.inPresentTwo && touched.inPresentTwo) || (errorFormAPI && errorFormAPI.inPresentTwoForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.inPresentTwo && touched.inPresentTwo) ? `${errors.inPresentTwo}` : (errorFormAPI && errorFormAPI.inPresentTwoForm) ? `${errorFormAPI.inPresentTwoForm}` : ``}`}
                    // errorColor='magenta'
                    value={values.inPresentTwo}
                    items={inPresentTwoData}
                    onValueChange={(itemValue) => handleChange("inPresentTwo")(itemValue)}
                    containerStyle={{ width: 200 }}
                    labelStyle={{ color: 'blue' }}
                  // pickerStyle={{ backgroundColor: '#f0f0f0' }}
                  // error="Please select a gender"
                  />




                </View>

                <Text> is present {values.inPresentTwo}</Text> 
                <Text> is inPast {values.inPastTwo}</Text>
                {/* <Text style={{ fontWeight: 800, fontSize: 15, marginTop: 5, marginBottom: 5 }}>------- Fitness Certificate -------</Text> */}
                {values.inPresentTwo === "Yes" || values.inPastTwo === "Yes" ? <CustomPicker
                  placeholder={'If yes, kindly bring a fitness certificate from your doctor'}
                  asterisksymbol={true}
                  boxWidth={'80%'}
                  label={'If yes, kindly bring a fitness certificate from your doctor'}
                  name='Anyfitnesscertificate'
                  // value={values.gender}
                  // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                  // bgColor='#e1f3f8'
                  // bgColor="#B1B1B0"
                  onChangeText={(e) => { handleChange("FitnessCertificate")(e); seterrorFormAPI(); }}
                  onBlur={handleBlur("FitnessCertificate")}

                  validate={handleBlur("FitnessCertificate")}
                  outlined
                  borderColor={`${(errors.FitnessCertificate && touched.FitnessCertificate) || (errorFormAPI && errorFormAPI.regularMedicineForm) ? "red" : "#ccc"}`}
                  errorMessage={`${(errors.FitnessCertificate && touched.FitnessCertificate) ? `${errors.FitnessCertificate}` : (errorFormAPI && errorFormAPI.FitnessCertificateForm) ? `${errorFormAPI.FitnessCertificateForm}` : ``}`}
                  // errorColor='magenta'
                  value={values.FitnessCertificate}
                  items={FitnessCertificateData}
                  onValueChange={(itemValue) => handleChange("FitnessCertificate")(itemValue)}
                  containerStyle={{ width: 200 }}
                  labelStyle={{ color: 'blue' }}
                // pickerStyle={{ backgroundColor: '#f0f0f0' }}
                // error="Please select a gender"
                /> : ""}


                {/* {values.FitnessCertificate === "yes" ?
                  <CustomTextInput
                    boxWidth={'80%'}
                    placeholder={'Name of medicine'}
                    label={'Name of medicine'}
                    name='docFitnessCertificate medicine Name'
                    value={values.medicineName}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"
                    onChangeText={(e) => { handleChange("medicineName")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("medicineName")}

                    validate={handleBlur("medicineName")}
                    outlined
                    borderColor={`${(errors.medicineName && touched.medicineName) || (errorFormAPI && errorFormAPI.medicineNameForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.medicineName && touched.medicineName) ? `${errors.medicineName}` : (errorFormAPI && errorFormAPI.medicineNameForm) ? `${errorFormAPI.medicineNameForm}` : ``}`}
                  // errorColor='magenta'
                  /> : ""}

                {values.FitnessCertificate === "yes" ?
                  <CustomTextInput
                    boxWidth={'80%'}
                    placeholder={'Dose of medicine'}
                    label={'Dose of medicine'}
                    name='docFitnessCertificate medicine Dose'
                    value={values.medicineDose}
                    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"
                    onChangeText={(e) => { handleChange("medicineDose")(e); seterrorFormAPI(); }}
                    onBlur={handleBlur("medicineDose")}

                    validate={handleBlur("medicineDose")}
                    outlined
                    borderColor={`${(errors.medicineDose && touched.medicineDose) || (errorFormAPI && errorFormAPI.medicineDoseForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.medicineDose && touched.medicineDose) ? `${errors.medicineDose}` : (errorFormAPI && errorFormAPI.medicineDoseForm) ? `${errorFormAPI.medicineDoseForm}` : ``}`}
                  // errorColor='magenta'
                  /> : ""} */}

                {/* <Text>Family Person Demo_line</Text>  <Text>Family Person end Demo_line</Text> */}




                {errors && (
                  <Text style={{ color: 'red' }}>
                    {Object.values(errors).join('\n')}
                  </Text>
                )}

                <CustomButton
                  onPress={ErrorChecker}
                  // leftIcon={<Entypo style={styles.icon} name={'Save'} size={18} color={'white'} />}
                  bgColor={`${!isValid ? "rgba(220, 142, 128, 0.9)" : "rgba(242, 142, 128, 1)"}`}

                  style={{ marginTop: 50 }}>
                  Save
                </CustomButton>



                <View style={{ marginBottom: 100 }}>

                </View>
              </>

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