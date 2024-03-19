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
import { Formik } from "formik";
import { loginSchema } from "../../../Fomik/schema/signIn.js";
import { Picker } from "@react-native-picker/picker";
import { FormDataApi, GetCourseData, GetFormReqs, UserLoginApi } from "../../../utils/API_Calls.js";
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
import { DateConvert } from '../../../utils/DateConvert.js';


export default function FormScreenNew123() {
  const [date123, setDate] = useState(new Date());
  const [errorFormAPI, seterrorFormAPI] = useState("")
  const [spinnerBool, setSpinnerbool] = useState(false)
  const [stratingfrom, setstartingFrom] = useState("")
  const [courseDate, setCourseDate] = useState("")
  const [courseData, setCourseData] = useState("")
  const [courseDataFrom, setCourseDataFrom] = useState()
  const [courseDataTo, setCourseDataTo] = useState()


  const [toDisplay, setToDisplay] = useState(false)




  const minvalueofstratingfrom = DateConvert(stratingfrom)
  const minvalueofcourseDate = DateConvert(courseDate)
  const [selectedType, setSelectedType] = useState(null);
  let tokenn = useSelector((state) => state.token);
  const navigation = useNavigation();

  const [data, SetData] = useState([])
  const [otherLanguage, setOtherLanguage] = useState('');

  // Function to handle change in other language input
  const handleOtherLanguageChange = (text) => {
    setOtherLanguage(text);
    // You can perform additional validations or actions here if needed
  };


  const DataTest = new Date(2055, 10, 20)


  const categoryData = [
    { label: 'Select Category', value: 'N/A' },
    { label: 'For New Students', value: 'For New Students' },
    { label: 'For Old Students', value: 'For Old Students' },
    { label: 'For Children/Teens', value: 'For Children/Teens' },
    { label: 'For Executives', value: 'For Executives' },
  ];
  const LanguageData = [
    { label: 'Select', value: 'N/A' },
    { label: 'Kolkata', value: 'Kolkata' },
    { label: 'Bikaner', value: 'Bikaner' },
    { label: 'Other', value: 'other' },
  ]


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

  const AllcoursesforDrops = [
    { label: 'Select Type', value: 'N/A' },
    ...data.map(course => ({
      label: course.courseName,
      value: course._id
    }))
  ];


  try {
    if (tokenn != null) {
      tokenn = tokenn.replaceAll('"', '');
    }
  }
  catch (err) {
    console.log("Error in token quotes", err)
  }


  const fetchUserData = async (id) => {
    if (id === 'N/A') {
      return
    }
    try {
      const response = await GetCourseData(id, tokenn);

      console.log(">>>>>>", response.data);
      setToDisplay(true)
      setCourseData(response.data) // You can process the API response data here
      setCourseDataFrom(new Date(response.data.from)) // You can process the API response data here
      setCourseDataTo(response.data.to)
      console.log("Timer", courseDataTo) // You can process the API response data here
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const GetData = async () => {


    const res = await GetFormReqs(tokenn)
    try {
      if (res) {
        let hero = res.data.allCourses;
        SetData(hero)
      }
    }
    catch (error) {
      console.log(error)
    }

  }


  useEffect(() => {
    GetData()
  }, [])

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

  date = date123.toLocaleDateString()
  const submitHandler = async (user) => {
    seterrorFormAPI()
    try {
      const { from, to, firstName, lastName, gender, age, education, martialStatus, guardianName, motherTongue, mobileNumber, eMail, address, medicineName, medicineDose, regularMedicine, brief, referenceFrom,
        oldStuName, firstCoursePlace, dateFirstCourse, dateLastCourse, firstAsstTeacher, lastCoursePlace, lastAsstTeacher, courseDetails, triedAnyPractise, practiseRegularly, dailyHours, reason, changeInYourSelf,
        personName, personRelation, courseDone, relation, designation, companyName, companyAddress, inPastOne, inPresentOne, inPastTwo, inPresentTwo } = user;

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
      const knownPerson = {
        personName,
        personRelation
      }
      const familyPerson = {
        courseDone,
        relation
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
        medicineName, medicineDose,
      }



      console.log()
      const dataEngin = { from, to, date, firstName, lastName, gender, age, education, martialStatus, guardianName, motherTongue, mobileNumber, eMail, address, regularMedicine, brief, referenceFrom, oldStudent, docFitnessCertificate, psyschologicalAilment, physicalAilment, professionalDetails, familyPerson, knownPerson }
      setSpinnerbool(true)
      console.log("asdda")
      const res = await FormDataApi(dataEngin, tokenn)

      if (res) {
        const Message = res.data.message
        showAlertAndNavigate(Message)
        setTimeout(() => {

          setSpinnerbool(false)
        }, 50);
      }

    } catch (error) {
      console.log("...", error.response.data.message)
      if (error.response) {
        if (error.response.status === 400) {
          console.log("Error With 400.")
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

      setSpinnerbool(false)

      if (error) {
        console.log(error)

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
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <ScrollView style={{ height: 800 }}>
              <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>
                <Formik
                  // enableReinitialize
                  validateOnMount={true}

                  initialValues={{
                    category: "",
                    // from: "", to: "", firstName: "Rohith", lastName: "madipelly", gender: "male", age: "19", education: "civil En Btech", martialStatus: "married", guardianName: "Jane Doe", motherTongue: "english", mobileNumber: "9951072005", eMail: "madipellyrohith@gmail.com", address: "11-24-140,2nd bankcolony, shanthi nagar", medicineName: "Medicine Name", medicineDose: "Medicine Name", regularMedicine: "yes", brief: "f DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief Des", referenceFrom: "Friend",
                    from: "", to: "", firstName: "", lastName: "", gender: "", age: "", education: "", martialStatus: "", guardianName: "", motherTongue: "", mobileNumber: "", eMail: "", address: "", medicineName: "", medicineDose: "", regularMedicine: "", brief: "", referenceFrom: "",
                    // oldStuName: "Rohith MAdipelly", firstCoursePlace: "warangal", dateFirstCourse: "", dateLastCourse: "", firstAsstTeacher: "DataGuru", lastCoursePlace: "Hyd", lastAsstTeacher: "code hero", courseDetails: "", triedAnyPractise: "yes", practiseRegularly: "yes", dailyHours: "1-2 hours", reason: "good resaon", changeInYourSelf: " Changes Experience change mee",
                    // personName: "krishana", personRelation: "Brother", courseDone: "yes", relation: "Relation to Family Person", designation: "Dev", companyName: "Dev compl", companyAddress: "WOrld", inPastOne: "yes", inPresentOne: "no", inPastTwo: "no", inPresentTwo: "no"
                  }}
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
                        items={AllcoursesforDrops}
                        onValueChange={
                          (itemValue) => {
                            handleChange("CourseType")(itemValue);
                            // fetchUserData(itemValue)
                            fetchUserData(itemValue)
                          }
                        }
                        containerStyle={{ width: 200 }}
                        labelStyle={{ color: 'blue' }}
                        // pickerStyle={{ backgroundColor: '#f0f0f0' }}
                        error="Please select a CourseType"
                      />

                      <Text>Course Information {courseData.from}</Text>

                      {toDisplay ? <>
                        <View style={{ justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                          <CustomDateInput
                            placeholder={'From'}
                            label={'From '}
                            name='From'
                            // value={values.from}
                            // value={new Date(courseData.from)}
                            value={new Date(courseDataFrom)}
                            // value={`${courseData.from || values.courseName}`}

                            // value={courseData.to}
                            leftIcon={<MaterialIcons name="date-range" size={20} color="black" />}
                            // bgColor='#e1f3f8'
                            // bgColor="#B1B1B0"
                            asterisksymbol={true}
                            // onChangeText={onChangeText}
                            // onChangeText={(e) => { handleChange("from")(e); setstartingFrom(e); seterrorFormAPI(); }}
                            onBlur={handleBlur("from")}
                            boxWidth={"40%"}
                            validate={handleBlur("from")}
                            outlined
                            borderColor={`${(errors.from && touched.from) || (errorFormAPI && errorFormAPI.fromForm) ? "red" : "#ccc"}`}
                            errorMessage={`${(errors.from && touched.from) ? `${errors.from}` : (errorFormAPI && errorFormAPI.fromForm) ? `${errorFormAPI.fromForm}` : ``}`}
                            // errorColor='magenta'
                            minimumDate={new Date()}
                            maximumDate={new Date(2090, 10, 20)}
                            disabled={true}
                          />

                          <CustomDateInput
                            placeholder={'To'}
                            label={'To '}
                            name='To'
                            // value={values.to}
                            // value={values.to}
                            value={new Date(courseDataTo)}
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
                            disabled={true}
                          />
                        </View>

                        <CustomTextInput
                          placeholder={'Your course Name'}
                          asterisksymbol={true}
                          boxWidth={'80%'}
                          label={'course Name'}
                          name='courseName'
                          value={`${courseData.courseName || values.courseName}`}
                          // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                          // bgColor='#e1f3f8'
                          // bgColor="#B1B1B0"
                          onChangeText={(e) => { handleChange("courseName")(e); seterrorFormAPI(); }}
                          onBlur={handleBlur("courseName")}

                          validate={handleBlur("courseName")}
                          outlined
                          borderColor={`${(errors.courseName && touched.courseName) || (errorFormAPI && errorFormAPI.courseNameForm) ? "red" : "#ccc"}`}
                          errorMessage={`${(errors.courseName && touched.courseName) ? `${errors.courseName}` : (errorFormAPI && errorFormAPI.courseNameForm) ? `${errorFormAPI.courseNameForm}` : ``}`}
                          // errorColor='magenta'
                          editable={false}
                        />

                        <CustomTextInput
                          placeholder={'Enter Your course Duration'}
                          asterisksymbol={true}
                          boxWidth={'80%'}
                          label={'course Duration'}
                          name='course_Duration'
                          value={`${courseData.courseDuration || values.course_Duration}`}
                          // leftIcon={<FontAwesome name="user" size={20} color="black" />}
                          // bgColor='#e1f3f8'
                          // bgColor="#B1B1B0"
                          onChangeText={(e) => { handleChange("course_Duration")(e); seterrorFormAPI(); }}
                          onBlur={handleBlur("course_Duration")}

                          validate={handleBlur("course_Duration")}
                          outlined
                          borderColor={`${(errors.course_Duration && touched.course_Duration) || (errorFormAPI && errorFormAPI.course_DurationForm) ? "red" : "#ccc"}`}
                          errorMessage={`${(errors.course_Duration && touched.course_Duration) ? `${errors.course_Duration}` : (errorFormAPI && errorFormAPI.course_DurationForm) ? `${errorFormAPI.course_DurationForm}` : ``}`}
                          // errorColor='magenta'
                          editable={false}
                        />

                      </> : ""}

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



                      {/* <Text>{values.CourseType}</Text> */}
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
                     

                      {values.category === "For Old Students" && (
                        <CustomPicker
                          placeholder={'Select Type'}
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
                          onValueChange={(itemValue) => {
                            handleChange("Type")(itemValue);
                            // Make API call here passing the selected item's ID value
                          }}

                          containerStyle={{ width: 200 }}
                          labelStyle={{ color: 'blue' }}
                          // pickerStyle={{ backgroundColor: '#f0f0f0' }}
                          error="Please select a Type"
                        />
                      )}

                      <CustomButton
                        onPress={handleSubmit}
                        // leftIcon={<Entypo style={styles.icon} name={'Save'} size={18} color={'white'} />}
                        bgColor={`${!isValid ? "rgba(220, 142, 128, 0.9)" : "rgba(242, 142, 128, 1)"}`}
                        style={{ marginTop: 50 }}>
                        Save
                      </CustomButton>


                      <View style={{ height: 100, }}>
                        <Text>.</Text>
                      </View>
                    </>

                  )}


                </Formik>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
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