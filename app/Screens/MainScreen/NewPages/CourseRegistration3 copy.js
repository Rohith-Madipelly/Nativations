import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomStatusBar from '../../../Components/UI/StatusBar/CustomStatusBar';
import Metrics from '../../../utils/ResposivesUtils/Metrics';
import { useSelector } from 'react-redux';
import { FormDataApi, GetFormDataSumbited, GetFormReqs } from '../../../utils/API_Calls';
import { ImageBackground } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { FormData } from '../../../Fomik/schema/FormData';
import CustomTextInput2 from '../../../Components/UI/Inputs/CustomTextInput2';
import CustomDropdown2 from '../../../Components/UI/Inputs/CustomDropdown2';

import CustomDateInput2 from '../../../Components/UI/Inputs/CustomDateInput2';
import { MaterialIcons } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';

const CourseRegistration3 = ({ route }) => {
  const { params } = route;
  const category = params?.category || 'nan';
  const Type = params?.Type || 'nan';
  const Courses = params?.Courses || 'nan'
  const selectedCourseData = params?.selectedCourseData || 'nan'
  console.log("category Type  CourseRegistration3>", category, Type, Courses, "selectedCourseData", selectedCourseData)

  const navigation = useNavigation()
  const tokenn = useSelector((state) => state.token)?.replaceAll('"', '');
  const [userReviewsData, setUserReviewsData] = useState()

  const [errorFormAPI, seterrorFormAPI] = useState("")
  const [spinnerBool, setSpinnerbool] = useState(false)


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
      category: category, Courses: Courses,
      type: Type,

      firstName: "", lastName: "", gender: "", age: "", education: "", martialStatus: "", guardianName: "", language: "", mobileNumber: "", eMail: "", address: "", medicineName: "", medicineDose: "", regularMedicine: "", brief: "", referenceFrom: "",
      oldStuName: "", firstCoursePlace: "", dateFirstCourse: "", dateLastCourse: "", firstAsstTeacher: "", lastCoursePlace: "", lastAsstTeacher: "", courseDetails: "", triedAnyPractise: "", practiseRegularly: "", dailyHours: "", reason: "", changeInYourSelf: "",
      personName: "", personRelation: "", courseDone: "", relation: "", designation: "", companyName: "", companyAddress: "", inPastOne: "", inPresentOne: "", FitnessCertificate: "", inPastTwo: "", inPresentTwo: ""
    },

    onSubmit: values => {
      {
        console.log("JHevdjhe", values)
        // submitHandler(values)
      }
    },

    validationSchema: FormData,

    validate: values => {
      const errors = {};
      return errors;
    },

  });


  console.log(values.Courses, "category", Courses)


  useEffect(() => {
    // Updated Header here
    navigation.setOptions({ title: 'Register' });
  }, [navigation]);




  const genderData = [
    { name: 'Male' },
    { name: 'Female' },
    { name: 'Other' },
  ]


  const stateData = [
    { name: 'Kolkata', value: 'Kolkata' },
    { name: 'Bikaner', value: 'Bikaner' },
    { name: 'Other', value: 'Other' },
  ]


  const martialStatusData = [
    { name: 'Single', },
    { name: 'Married', },
    { name: 'Widower', },
    { name: 'Widow', },
    { name: 'Separated', },
    { name: 'Divorced', },
  ];


  const languageData = [
    { name: 'Hindi' },
    { name: 'English' },
  ]

  const courseDoneDate = [
    { name: 'yes', value: 'yes' },
    { name: 'no', value: 'no' },
  ];

  const inPastTwoData = [
    { name: 'Yes', value: 'Yes' },
    { name: 'No', value: 'No' },
  ];

  const inPresentTwoData = [
    { name: 'Yes', value: 'Yes' },
    { name: 'No', value: 'No' },
  ];

  const FitnessCertificateData = [
    { name: 'Yes', value: 'Yes' },
    { name: 'No', value: 'No' },
  ];

  const regularMedicineData = [
    // { title: 'Select', value: 'N/A' },
    { name: 'Yes', value: 'yes' },
    { name: 'No', value: 'no' },
  ];

  const referenceFromData = [
    // { label: 'Select', value: 'N/A' },
    { name: 'Friend', value: 'Friend' },
    { name: 'News-Paper', value: 'News-Paper' },
    { name: 'TV', value: 'TV' },
    { name: 'Lectures', value: 'Lectures' },
    { name: 'Others', value: 'Others' },
  ];

  const courseDetailsData = [
    // "10-Days", "20-Days", "30-Days", "50-Days", "60-Days", "Self-Course", "Service", "Courses", "N/A"
    // { title: 'Select course details', value: '' },
    { name: '10-Days', value: '10-Days' },
    { name: '20-Days', value: '20-Days' },
    { name: '30-Days', value: '30-Days' },
    { name: '40-Days', value: '40-Days' },
    { name: '50-Days', value: '50-Days' },
    { name: '60-Days', value: '60-Days' },
    { name: 'Self-Course', value: 'Self-Course' },
    { name: 'Service', value: 'Service' },
    { name: 'Courses', value: 'Courses' },
  ];

  const practiseRegularlyData = [
    { name: 'yes', value: 'yes' },
    { name: 'no', value: 'no' },
  ];










  // Previews Data of user 
  const GetFormData = async () => {
    const res = await GetFormDataSumbited(tokenn)
    try {
      if (res) {
        setUserReviewsData(res.data.userExists)
      }
      else {
      }
    }
    catch (error) {
      setSpinnerbool(false)
    }
    finally {
      setSpinnerbool(false)
    }
  }




  useEffect(() => {
    GetFormData()
  }, [])
  const onRefresh = useCallback(() => {
    GetFormData()
  }, []);





  const [TodaysDate, setTodaysDate] = useState("")
  useEffect(() => {
    const date = new Date();

    const formattedDate = date.toISOString().split('T')[0];

    console.log(formattedDate); // Output: 2025-02-01
    setTodaysDate(formattedDate)

  }, [])


  const submitHandler = async (user) => {
    console.log("Hello out formik")
    seterrorFormAPI()
    try {

      const { category, type, state, otherState, firstName, lastName, gender, age, education, martialStatus, guardianName, language, mobileNumber, eMail, address, medicineName, medicineDose, regularMedicine, brief, referenceFrom,
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
        medicineName: `${FitnessCertificate === 'Yes' ? medicineName : "N/A"}`,
        medicineDose: `${FitnessCertificate === 'Yes' ? medicineDose : "N/A"}`,
      }

      const courseId = `${selectedCourseData._id}`
      const courseName = `${selectedCourseData.courseName}`
      const courseDuration = `${selectedCourseData.courseDuration}`


      var DataPage = {
        courseId: courseId,
        category: category,
        type: type || "na",
        from: selectedCourseData.from,
        to: selectedCourseData.to,
        courseName: courseName,
        courseDuration: courseDuration,
        language: language,
        motherTongue: language,
        state: `${otherState ? otherState : state}`,
        date: TodaysDate,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        age: age,
        education: education,
        address: address,
        guardianName: guardianName,
        martialStatus: martialStatus,
        mobileNumber: mobileNumber,
        eMail: eMail,

        knownPerson,

        familyPerson,

        professionalDetails,

        physicalAilment,

        psyschologicalAilment,

        docFitnessCertificate,

        regularMedicine: regularMedicine,
        referenceFrom, referenceFrom,

        brief: brief,

        oldStudent

      }
      setTimeout(() => {
        console.log("dnvch")
      }, 200);

      const res = await FormDataApi(DataPage, tokenn)
      // const res="d"
      if (res) {
        const Message = res.data.message
        console.log("......................suff.......", Message)
        // showAlertAndNavigate(Message, "Home",selectedCourseData)

        navigation.navigate("CourseRegistration4", { selectedCourseData: selectedCourseData||"", category: category||"" })

      }

    } catch (error) {
      console.log("fs<><><<><><<>", error.response.data.message)
      if (error.response) {
        Alert.alert("",`${error.response.data.message}`)
        if (error.response.status === 400) {
          console.log("Error With 400.")

          // showAlertAndNavigate(error.response.data.message, "Home")
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


      if (error) {
        console.log(error)
      }
    }
    finally {
      setTimeout(() => {
        setSpinnerbool(false)
      }, 50);
    }
  }

  const ErrorChecker = () => {
    if (Object.values(errors).length === 0) {
      handleSubmit();
    } else {
      console.log(Object.values(errors).join(', '))
      alert("Please fill in the mandatory fields");
    } 
  };




  useEffect(() => {
    if (userReviewsData && false) {
      const timer = setTimeout(() => {
        setValues({
          ...values,
          firstName: `${userReviewsData.firstName}`,
          lastName: `${userReviewsData.lastName}`,
          eMail: `${userReviewsData.eMail}`,
          mobileNumber: `${userReviewsData.mobileNumber}`,
          education: `${userReviewsData.education}`,
          address: `${userReviewsData.address}`,

          gender: `${userReviewsData.gender}`,
          city: `${userReviewsData.city}`,
          guardianName: `${userReviewsData.guardianName}`,
          age: `${userReviewsData.age}`,
          martialStatus: `${userReviewsData.martialStatus}`,
          language: `${userReviewsData.language}`,
          referenceFrom: `${userReviewsData.referenceFrom}`,
          brief: `${userReviewsData.brief}`,



          oldStuName: `${userReviewsData.oldStudent.oldStuName}`,
          dateFirstCourse: `${userReviewsData.oldStudent.dateFirstCourse}`,
          firstCoursePlace: `${userReviewsData.oldStudent.firstCoursePlace}`,
          firstAsstTeacher: `${userReviewsData.oldStudent.firstAsstTeacher}`,
          dateLastCourse: `${userReviewsData.oldStudent.dateLastCourse}`,
          lastCoursePlace: `${userReviewsData.oldStudent.lastCoursePlace}`,
          lastAsstTeacher: `${userReviewsData.oldStudent.lastAsstTeacher}`,

          courseDetails: `${userReviewsData.oldStudent.courseDetails}`,
          triedAnyPractise: `${userReviewsData.oldStudent.triedAnyPractise}`,
          practiseRegularly: `${userReviewsData.oldStudent.practiseRegularly}`,

          dailyHours: `${userReviewsData.oldStudent.dailyHours}`,
          reason: `${userReviewsData.oldStudent.reason}`,
          changeInYourSelf: `${userReviewsData.oldStudent.changeInYourSelf}`,

          personName: `${userReviewsData.knownPerson.personName}`,
          personRelation: `${userReviewsData.knownPerson.personRelation}`,


          courseDone: `${userReviewsData.familyPerson.courseDone}`,
          relation: `${userReviewsData.familyPerson.relation}`,



          designation: `${userReviewsData.professionalDetails.designation}`,
          companyName: `${userReviewsData.professionalDetails.companyName}`,
          companyAddress: `${userReviewsData.professionalDetails.companyAddress}`,


          // inPastOne: `${userReviewsData.physicalAilment.inPastOne}`,
          // inPresentOne: `${userReviewsData.physicalAilment.inPresentOne}`,

          // inPastTwo: `${userReviewsData.psyschologicalAilment.inPastTwo}`,
          // inPresentTwo: `${userReviewsData.psyschologicalAilment.inPresentTwo}`,


          // medicineName: `${userReviewsData.docFitnessCertificate.medicineName}`,
          // medicineDose: `${userReviewsData.docFitnessCertificate.medicineDose}`,
          // regularMedicine: `${userReviewsData.docFitnessCertificate.regularMedicine}`,




        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [userReviewsData]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <CustomStatusBar barStyle="dark-content" backgroundColor="white" />
      <Spinner
        visible={spinnerBool}
        color={"#5F2404"}
        animation={'fade'}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView style={{ height: Metrics.height }}
        >

          <Text style={[styles.bold, { color: 'rgba(3, 3, 112, 1)', paddingHorizontal: 15, marginTop: 10 }]}>Selected Course Details</Text>
          <View
            style={[styles.courseContainer, { borderWidth: 1, borderColor: 'rgba(3, 3, 112, 1)', }]}
          >
            <ImageBackground
              style={styles.imageBackground}
              source={require('../../../assets/image/Home/Vector2.png')}
            >
              <Text style={styles.courseName}>
                <Text style={styles.bold}>Course name: </Text>
                {selectedCourseData.courseName}
              </Text>
              <View style={styles.courseDetails}>
                <View>
                  <Text style={styles.bold}>From</Text>
                  <Text>{selectedCourseData.from}</Text>
                </View>
                <View>
                  <Text style={styles.bold}>Course duration</Text>
                  <Text>{selectedCourseData.courseDuration}</Text>
                </View>
                <View>
                  <Text style={styles.bold}>To</Text>
                  <Text>{selectedCourseData.to}</Text>
                </View>
              </View>
            </ImageBackground>
          </View>


          <Text style={[styles.bold, { color: 'rgba(3, 3, 112, 1)', paddingHorizontal: 15, marginTop: 10 }]}>
            Enter your details to complete the registration.
          </Text>

          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>

            <CustomTextInput2
              boxWidth={'85%'}
              label={'First name'}
              bgColor={'white'}
              asterisksymbol={true}
              labelStyle={{
                color: '#4C5664'
              }}
              InputStyle={{
                color: '#4C5664'
              }}
              placeholder={'Enter your first name'}
              placeholderTextColor={'#4C5664'}
              name='firstName'
              value={values.firstName}
              onChangeText={(e) => {
                handleChange("firstName")(e);
                seterrorFormAPI();
              }}
              // leftText={'Accomodate 10 members'}
              onBlur={handleBlur("firstName")}
              validate={handleBlur("firstName")}
              outlined

              borderColor={`${(errors.firstName && touched.firstName) || (errorFormAPI && errorFormAPI.firstNameForm) ? "red" : "#ccc"}`}
              errorMessage={`${(errors.firstName && touched.firstName) ? `${errors.firstName}` : (errorFormAPI && errorFormAPI.firstNameForm) ? `${errorFormAPI.firstNameForm}` : ``}`}
            />

            <CustomTextInput2
              boxWidth={'85%'}
              label={'Last name'}
              bgColor={'white'}
              asterisksymbol={true}
              labelStyle={{
                color: '#4C5664'
              }}
              InputStyle={{
                color: '#4C5664'
              }}
              placeholder={'Enter your last name'}
              placeholderTextColor={'#4C5664'}
              name='lastName'
              value={values.lastName}
              onChangeText={(e) => {
                handleChange("lastName")(e);
                seterrorFormAPI();
              }}
              // leftText={'Accomodate 10 members'}
              onBlur={handleBlur("lastName")}
              validate={handleBlur("lastName")}
              outlined

              borderColor={`${(errors.lastName && touched.lastName) || (errorFormAPI && errorFormAPI.lastNameForm) ? "red" : "#ccc"}`}
              errorMessage={`${(errors.lastName && touched.lastName) ? `${errors.lastName}` : (errorFormAPI && errorFormAPI.lastNameForm) ? `${errorFormAPI.lastNameForm}` : ``}`}
            />


            <CustomDropdown2
              boxWidth={'85%'}
              label={"Gender"}
              placeholder={'Select the gender'}
              asterisksymbol
              name='gender'
              labelStyle={{
                color: '#4C5664'
              }}
              InputStyle={{
                color: '#4C5664'
              }}
              bgColor={'transparent'}
              value={values.gender}
              DropDownData={genderData}
              onChange={(e, b, c) => {
                handleChange("gender")(e.name)
                seterrorFormAPI();
              }}
              // containerStyle={{  marginTop: 30 }}
              onBlur={handleBlur("gender")}
              validate={handleBlur("gender")}
              outlined
              borderColor={`${(errors.gender && touched.gender) || (errorFormAPI && errorFormAPI.genderForm) ? "red" : "#ccc"}`}
              errorMessage={`${(errors.gender && touched.gender) ? `${errors.gender}` : (errorFormAPI && errorFormAPI.genderForm) ? `${errorFormAPI.genderForm}` : ``}`}
              DropDownArrowColor="#4C5664"
            />

            <CustomTextInput2
              boxWidth={'85%'}
              label={'Age'}
              bgColor={'white'}
              asterisksymbol={true}
              labelStyle={{
                color: '#4C5664'
              }}
              InputStyle={{
                color: '#4C5664'
              }}
              placeholder={'Enter your age'}
              placeholderTextColor={'#4C5664'}
              name='age'
              value={values.age}
              onChangeText={(e) => {
                handleChange("age")(e);
                seterrorFormAPI();
              }}
              // leftText={'Accomodate 10 members'}
              onBlur={handleBlur("age")}
              validate={handleBlur("age")}
              keyboardType="numeric"
              outlined

              borderColor={`${(errors.age && touched.age) || (errorFormAPI && errorFormAPI.ageForm) ? "red" : "#ccc"}`}
              errorMessage={`${(errors.age && touched.age) ? `${errors.age}` : (errorFormAPI && errorFormAPI.ageForm) ? `${errorFormAPI.ageForm}` : ``}`}
            />

            <CustomTextInput2
              boxWidth={'85%'}
              label={'Education'}
              bgColor={'white'}
              asterisksymbol={true}
              labelStyle={{
                color: '#4C5664'
              }}
              InputStyle={{
                color: '#4C5664'
              }}
              placeholder={'Enter your education'}
              placeholderTextColor={'#4C5664'}
              name='education'
              value={values.education}
              onChangeText={(e) => {
                handleChange("education")(e);
                seterrorFormAPI();
              }}
              // leftText={'Accomodate 10 members'}
              onBlur={handleBlur("education")}
              validate={handleBlur("education")}

              outlined

              borderColor={`${(errors.education && touched.education) || (errorFormAPI && errorFormAPI.educationForm) ? "red" : "#ccc"}`}
              errorMessage={`${(errors.education && touched.education) ? `${errors.education}` : (errorFormAPI && errorFormAPI.educationForm) ? `${errorFormAPI.educationForm}` : ``}`}
            />

            <CustomDropdown2
              boxWidth={'85%'}
              label={'City'}
              placeholder={'Select the city'}
              asterisksymbol={true}
              name='state'
              labelStyle={{
                color: '#4C5664'
              }}
              InputStyle={{
                color: '#4C5664'
              }}
              bgColor={'transparent'}
              value={values.state}
              DropDownData={stateData}
              onChange={(e, b, c) => {
                handleChange("state")(e.name)
                seterrorFormAPI();
              }}
              // containerStyle={{  marginTop: 30 }}
              onBlur={handleBlur("state")}
              validate={handleBlur("state")}
              outlined
              borderColor={`${(errors.state) || (errorFormAPI && errorFormAPI.stateForm) ? "red" : "#ccc"}`}
              errorMessage={`${(errors.state) ? `${errors.state}` : (errorFormAPI && errorFormAPI.stateForm) ? `${errorFormAPI.stateForm}` : ``}`}
              DropDownArrowColor="#4C5664"
            />




            {values.state === 'Other' && (<CustomTextInput2
              boxWidth={'85%'}
              label={'Other city'}
              bgColor={'white'}
              asterisksymbol={true}
              labelStyle={{
                color: '#4C5664'
              }}
              InputStyle={{
                color: '#4C5664'
              }}
              placeholder={'Enter your city'}
              placeholderTextColor={'#4C5664'}
              name='otherState'
              value={values.otherState}
              onChangeText={(e) => {
                handleChange("otherState")(e);
                seterrorFormAPI();
              }}
              // leftText={'Accomodate 10 members'}
              onBlur={handleBlur("otherState")}
              validate={handleBlur("otherState")}
              outlined
              borderColor={`${(errors.otherState || touched.otherState) || (errorFormAPI && errorFormAPI.otherStateForm) ? "red" : "#ccc"}`}
              errorMessage={`${(errors.otherState || touched.otherState) ? `${errors.otherState}` : (errorFormAPI && errorFormAPI.otherStateForm) ? `${errorFormAPI.otherStateForm}` : ``}`}
            />)}

            {console.log("errors.otherState", errors.otherState)}
            <CustomTextInput2
              boxWidth={'85%'}
              label={'Address'}
              bgColor={'white'}
              asterisksymbol={true}
              labelStyle={{
                color: '#4C5664'
              }}
              InputStyle={{
                color: '#4C5664'
              }}
              placeholder={'Enter your address'}
              placeholderTextColor={'#4C5664'}
              name='address'
              value={values.address}
              onChangeText={(e) => {
                handleChange("address")(e);
                seterrorFormAPI();
              }}
              // leftText={'Accomodate 10 members'}
              onBlur={handleBlur("address")}
              validate={handleBlur("address")}

              outlined

              borderColor={`${(errors.address && touched.address) || (errorFormAPI && errorFormAPI.addressForm) ? "red" : "#ccc"}`}
              errorMessage={`${(errors.address && touched.address) ? `${errors.address}` : (errorFormAPI && errorFormAPI.addressForm) ? `${errorFormAPI.addressForm}` : ``}`}
            />




            <CustomTextInput2
              boxWidth={'85%'}
              label={'Father or spouse name'}
              bgColor={'white'}
              asterisksymbol={true}
              labelStyle={{
                color: '#4C5664'
              }}
              InputStyle={{
                color: '#4C5664'
              }}
              placeholder={'Enter your father or spouse name'}
              placeholderTextColor={'#4C5664'}
              name='guardianName'
              value={values.guardianName}
              onChangeText={(e) => {
                handleChange("guardianName")(e);
                seterrorFormAPI();
              }}
              // leftText={'Accomodate 10 members'}
              onBlur={handleBlur("guardianName")}
              validate={handleBlur("guardianName")}

              outlined

              borderColor={`${(errors.guardianName && touched.guardianName) || (errorFormAPI && errorFormAPI.guardianNameForm) ? "red" : "#ccc"}`}
              errorMessage={`${(errors.guardianName && touched.guardianName) ? `${errors.guardianName}` : (errorFormAPI && errorFormAPI.guardianNameForm) ? `${errorFormAPI.guardianNameForm}` : ``}`}
            />


            <CustomDropdown2
              boxWidth={'85%'}
              label={'Marital status'}
              placeholder={'Select the Martial status'}
              name='martialStatus'
              asterisksymbol
              labelStyle={{
                color: '#4C5664'
              }}
              InputStyle={{
                color: '#4C5664'
              }}
              bgColor={'transparent'}
              value={values.martialStatus}
              DropDownData={martialStatusData}
              onChange={(e, b, c) => {
                handleChange("martialStatus")(e.name)
                seterrorFormAPI();
              }}
              // containerStyle={{  marginTop: 30 }}
              onBlur={handleBlur("martialStatus")}
              validate={handleBlur("martialStatus")}
              outlined
              borderColor={`${(errors.martialStatus && touched.martialStatus) || (errorFormAPI && errorFormAPI.martialStatusForm) ? "red" : "#ccc"}`}
              errorMessage={`${(errors.martialStatus && touched.martialStatus) ? `${errors.martialStatus}` : (errorFormAPI && errorFormAPI.martialStatusForm) ? `${errorFormAPI.martialStatusForm}` : ``}`}
              DropDownArrowColor="#4C5664"
            />
            <CustomDropdown2
              boxWidth={'85%'}
              label={'Language'}
              asterisksymbol
              placeholder={'Select the language'}
              name='language'
              labelStyle={{
                color: '#4C5664'
              }}
              InputStyle={{
                color: '#4C5664'
              }}
              bgColor={'transparent'}
              value={values.language}
              DropDownData={languageData}
              onChange={(e, b, c) => {
                handleChange("language")(e.name)
                seterrorFormAPI();
              }}
              // containerStyle={{  marginTop: 30 }}
              onBlur={handleBlur("language")}
              validate={handleBlur("language")}
              outlined
              borderColor={`${(errors.language && touched.language) || (errorFormAPI && errorFormAPI.languageForm) ? "red" : "#ccc"}`}
              errorMessage={`${(errors.language && touched.language) ? `${errors.language}` : (errorFormAPI && errorFormAPI.languageForm) ? `${errorFormAPI.languageForm}` : ``}`}
              DropDownArrowColor="#4C5664"
            />


            <CustomTextInput2
              boxWidth={'85%'}
              label={'Mobile number'}
              bgColor={'white'}
              asterisksymbol={true}
              labelStyle={{
                color: '#4C5664'
              }}
              InputStyle={{
                color: '#4C5664'
              }}
              placeholder={'Enter your mobile number'}
              placeholderTextColor={'#4C5664'}
              name='mobileNumber'
              value={values.mobileNumber}
              onChangeText={(e) => {
                // Ensure only digits are entered
                const input = e.replace(/\D/g, '');
                // Restrict to 10 digits
                const mobileNumber = input.slice(0, 10);
                handleChange("mobileNumber")(mobileNumber);
                seterrorFormAPI();
              }}

              // leftText={'Accomodate 10 members'}
              onBlur={handleBlur("mobileNumber")}
              validate={handleBlur("mobileNumber")}

              outlined

              borderColor={`${(errors.mobileNumber && touched.mobileNumber) || (errorFormAPI && errorFormAPI.mobileNumberForm) ? "red" : "#ccc"}`}
              errorMessage={`${(errors.mobileNumber && touched.mobileNumber) ? `${errors.mobileNumber}` : (errorFormAPI && errorFormAPI.mobileNumberForm) ? `${errorFormAPI.mobileNumberForm}` : ``}`}
              keyboardType="number-pad"
            />

            <CustomTextInput2
              boxWidth={'85%'}
              label={'Email'}
              bgColor={'white'}
              asterisksymbol={true}
              labelStyle={{
                color: '#4C5664'
              }}
              InputStyle={{
                color: '#4C5664'
              }}
              placeholder={'Enter your email'}
              placeholderTextColor={'#4C5664'}
              name='eMail'
              value={values.eMail}
              onChangeText={(e) => { const eToLowerCaseText = e.toLowerCase(); handleChange("eMail")(eToLowerCaseText); seterrorFormAPI(); }}

              // leftText={'Accomodate 10 members'}
              onBlur={handleBlur("eMail")}
              validate={handleBlur("eMail")}

              outlined

              borderColor={`${(errors.eMail && touched.eMail) || (errorFormAPI && errorFormAPI.eMailForm) ? "red" : "#ccc"}`}
              errorMessage={`${(errors.eMail && touched.eMail) ? `${errors.eMail}` : (errorFormAPI && errorFormAPI.eMailForm) ? `${errorFormAPI.eMailForm}` : ``}`}
            />


            <CustomTextInput2
              boxWidth={'85%'}
              label={'Is any known person attending the course'}
              placeholder={'Is any known person attending the course'}
              name='Is any known person attending the course'
              bgColor={'white'}
              // asterisksymbol={true}
              labelStyle={{
                color: '#4C5664'
              }}
              InputStyle={{
                color: '#4C5664'
              }}
              placeholderTextColor={'#4C5664'}
              value={values.personName}
              onChangeText={(e) => {
                handleChange("personName")(e);
                seterrorFormAPI();
              }}
              // leftText={'Accomodate 10 members'}
              onBlur={handleBlur("personName")}
              validate={handleBlur("personName")}

              outlined

              borderColor={`${(errors.personName && touched.personName) || (errorFormAPI && errorFormAPI.personNameForm) ? "red" : "#ccc"}`}
              errorMessage={`${(errors.personName && touched.personName) ? `${errors.personName}` : (errorFormAPI && errorFormAPI.personNameForm) ? `${errorFormAPI.personNameForm}` : ``}`}
            />

           

            <CustomTextInput2
              boxWidth={'85%'}
              label={'Known person relation'}
              bgColor={'white'}
              labelStyle={{
                color: '#4C5664'
              }}
              InputStyle={{
                color: '#4C5664'
              }}
              placeholder={'Known person relation'}
              placeholderTextColor={'#4C5664'}
              name='personRelation'
              value={values.personRelation}
              onChangeText={(e) => {
                handleChange("personRelation")(e);
                seterrorFormAPI();
              }}
              // leftText={'Accomodate 10 members'}
              onBlur={handleBlur("personRelation")}
              validate={handleBlur("personRelation")}

              outlined

              borderColor={`${(errors.personRelation && touched.personRelation) || (errorFormAPI && errorFormAPI.personRelationForm) ? "red" : "#ccc"}`}
              errorMessage={`${(errors.personRelation && touched.personRelation) ? `${errors.personRelation}` : (errorFormAPI && errorFormAPI.personRelationForm) ? `${errorFormAPI.personRelationForm}` : ``}`}
            />

            <CustomDropdown2
              boxWidth={'85%'}
              placeholder={'Select'}
              label={'Has anyone in the family done a course?'}
              name='Family Person course Done'
              labelStyle={{
                color: '#4C5664'
              }}
              InputStyle={{
                color: '#4C5664'
              }}
              bgColor={'transparent'}
              value={values.courseDone}
              DropDownData={courseDoneDate}
              onChange={(e, b, c) => {
                handleChange("courseDone")(e.name)
                seterrorFormAPI();
              }}
              // containerStyle={{  marginTop: 30 }}
              onBlur={handleBlur("courseDone")}
              validate={handleBlur("courseDone")}
              outlined
              borderColor={`${(errors.courseDone && touched.courseDone) || (errorFormAPI && errorFormAPI.courseDoneForm) ? "red" : "#ccc"}`}
              errorMessage={`${(errors.courseDone && touched.courseDone) ? `${errors.courseDone}` : (errorFormAPI && errorFormAPI.courseDoneForm) ? `${errorFormAPI.courseDoneForm}` : ``}`}
              DropDownArrowColor="#4C5664"
            />


            {values.courseDone === "yes" && (<CustomTextInput2
              boxWidth={'85%'}
              label={"Family person's relation"}
              bgColor={'white'}
              asterisksymbol={true}
              labelStyle={{
                color: '#4C5664'
              }}
              InputStyle={{
                color: '#4C5664'
              }}
              placeholder={"Family person's relation"}
              placeholderTextColor={'#4C5664'}
              name='relation'
              value={values.relation}
              onChangeText={(e) => {
                handleChange("relation")(e);
                seterrorFormAPI();
              }}
              // leftText={'Accomodate 10 members'}
              onBlur={handleBlur("relation")}
              validate={handleBlur("relation")}
              outlined
              borderColor={`${(errors.relation && touched.relation) || (errorFormAPI && errorFormAPI.relationForm) ? "red" : "#ccc"}`}
              errorMessage={`${(errors.relation && touched.relation) ? `${errors.relation}` : (errorFormAPI && errorFormAPI.relationForm) ? `${errorFormAPI.relationForm}` : ``}`}
            />)}


            <Text style={{ fontWeight: 800, fontSize: 15 }}>------- Professional Details -------</Text>

            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <CustomTextInput2
                boxWidth={'85%'}
                label={'Designation'}
                bgColor={'white'}
                labelStyle={{
                  color: '#4C5664'
                }}
                InputStyle={{
                  color: '#4C5664'
                }}
                placeholder={'Designation'}
                placeholderTextColor={'#4C5664'}
                name='designation'
                value={values.designation}
                onChangeText={(e) => {
                  handleChange("designation")(e);
                  seterrorFormAPI();
                }}
                onBlur={handleBlur("designation")}
                validate={handleBlur("designation")}
                outlined
                borderColor={`${(errors.designation && touched.designation) || (errorFormAPI && errorFormAPI.designationForm) ? "red" : "#ccc"}`}
                errorMessage={`${(errors.designation && touched.designation) ? `${errors.designation}` : (errorFormAPI && errorFormAPI.designationForm) ? `${errorFormAPI.designationForm}` : ``}`}
              />

              <CustomTextInput2
                boxWidth={'85%'}
                placeholder={'Company name'}
                label={'Company name'}
                bgColor={'white'}
                labelStyle={{
                  color: '#4C5664'
                }}
                InputStyle={{
                  color: '#4C5664'
                }}
                placeholderTextColor={'#4C5664'}
                name='companyName'
                value={values.companyName}
                onChangeText={(e) => {
                  handleChange("companyName")(e);
                  seterrorFormAPI();
                }}
                // leftText={'Accomodate 10 members'}
                onBlur={handleBlur("companyName")}
                validate={handleBlur("companyName")}

                outlined

                borderColor={`${(errors.companyName && touched.companyName) || (errorFormAPI && errorFormAPI.companyNameForm) ? "red" : "#ccc"}`}
                errorMessage={`${(errors.companyName && touched.companyName) ? `${errors.companyName}` : (errorFormAPI && errorFormAPI.companyNameForm) ? `${errorFormAPI.companyNameForm}` : ``}`}
              />

              <CustomTextInput2
                boxWidth={'85%'}
                label={'Company address'}
                bgColor={'white'}
                labelStyle={{
                  color: '#4C5664'
                }}
                InputStyle={{
                  color: '#4C5664'
                }}
                placeholder={'Company address'}
                placeholderTextColor={'#4C5664'}
                name='companyAddress'
                value={values.companyAddress}
                onChangeText={(e) => {
                  handleChange("companyAddress")(e);
                  seterrorFormAPI();
                }}
                // leftText={'Accomodate 10 members'}
                onBlur={handleBlur("companyAddress")}
                validate={handleBlur("companyAddress")}

                outlined

                borderColor={`${(errors.companyAddress && touched.companyAddress) || (errorFormAPI && errorFormAPI.companyAddressForm) ? "red" : "#ccc"}`}
                errorMessage={`${(errors.companyAddress && touched.companyAddress) ? `${errors.companyAddress}` : (errorFormAPI && errorFormAPI.companyAddressForm) ? `${errorFormAPI.companyAddressForm}` : ``}`}
              />
            </View>

            <Text style={{ fontWeight: 800, fontSize: 15, marginBottom: 2 }}>------- Any Physical Ailment? -------</Text>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <CustomTextInput2
                boxWidth={'85%'}
                label={'In past'}
                bgColor={'white'}
    
                labelStyle={{
                  color: '#4C5664'
                }}
                InputStyle={{
                  color: '#4C5664'
                }}
                placeholder={'In past'}
                placeholderTextColor={'#4C5664'}
                name='inPastOne'
                value={values.inPastOne}
                onChangeText={(e) => {
                  handleChange("inPastOne")(e);
                  seterrorFormAPI();
                }}
                // leftText={'Accomodate 10 members'}
                onBlur={handleBlur("inPastOne")}
                validate={handleBlur("inPastOne")}

                outlined

                borderColor={`${(errors.inPastOne && touched.inPastOne) || (errorFormAPI && errorFormAPI.inPastOneForm) ? "red" : "#ccc"}`}
                errorMessage={`${(errors.inPastOne && touched.inPastOne) ? `${errors.inPastOne}` : (errorFormAPI && errorFormAPI.inPastOneForm) ? `${errorFormAPI.inPastOneForm}` : ``}`}
              />

              <CustomTextInput2
                boxWidth={'85%'}
                label={'In present'}
                bgColor={'white'}
                asterisksymbol={true}
                labelStyle={{
                  color: '#4C5664'
                }}
                InputStyle={{
                  color: '#4C5664'
                }}
                placeholder={'In present'}
                placeholderTextColor={'#4C5664'}
                name='inPresentOne'
                value={values.inPresentOne}
                onChangeText={(e) => {
                  handleChange("inPresentOne")(e);
                  seterrorFormAPI();
                }}
                // leftText={'Accomodate 10 members'}
                onBlur={handleBlur("inPresentOne")}
                validate={handleBlur("inPresentOne")}

                outlined

                borderColor={`${(errors.inPresentOne && touched.inPresentOne) || (errorFormAPI && errorFormAPI.inPresentOneForm) ? "red" : "#ccc"}`}
                errorMessage={`${(errors.inPresentOne && touched.inPresentOne) ? `${errors.inPresentOne}` : (errorFormAPI && errorFormAPI.inPresentOneForm) ? `${errorFormAPI.inPresentOneForm}` : ``}`}
              />

            </View>


            <Text style={{ fontWeight: 800, fontSize: 15, marginTop: 5, marginBottom: 5 }}>- Any Psyschological Ailment/Addiction? -</Text>

            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <CustomDropdown2
                boxWidth={'85%'}
                label={'In past '}
                placeholder={'Select'}
                name='inPastTwo'
                labelStyle={{
                  color: '#4C5664'
                }}
                InputStyle={{
                  color: '#4C5664'
                }}
                bgColor={'transparent'}
                value={values.inPastTwo}
                DropDownData={inPastTwoData}
                onChange={(e, b, c) => {
                  handleChange("inPastTwo")(e.name)
                  seterrorFormAPI();
                }}
                // containerStyle={{  marginTop: 30 }}
                onBlur={handleBlur("inPastTwo")}
                validate={handleBlur("inPastTwo")}
                outlined
                borderColor={`${(errors.inPastTwo && touched.inPastTwo) || (errorFormAPI && errorFormAPI.inPastTwoForm) ? "red" : "#ccc"}`}
                errorMessage={`${(errors.inPastTwo && touched.inPastTwo) ? `${errors.inPastTwo}` : (errorFormAPI && errorFormAPI.inPastTwoForm) ? `${errorFormAPI.inPastTwoForm}` : ``}`}
                DropDownArrowColor="#4C5664"
              />


              <CustomDropdown2
                boxWidth={'85%'}
                label={'In present '}
                placeholder={'Select'}
                name='inPresentTwo'
                labelStyle={{
                  color: '#4C5664'
                }}
                InputStyle={{
                  color: '#4C5664'
                }}
                bgColor={'transparent'}
                value={values.inPresentTwo}
                DropDownData={inPresentTwoData}
                onChange={(e, b, c) => {
                  handleChange("inPresentTwo")(e.name)
                  seterrorFormAPI();
                }}
                // containerStyle={{  marginTop: 30 }}
                onBlur={handleBlur("inPresentTwo")}
                validate={handleBlur("inPresentTwo")}
                outlined
                borderColor={`${(errors.inPresentTwo && touched.inPresentTwo) || (errorFormAPI && errorFormAPI.inPresentTwoForm) ? "red" : "#ccc"}`}
                errorMessage={`${(errors.inPresentTwo && touched.inPresentTwo) ? `${errors.inPresentTwo}` : (errorFormAPI && errorFormAPI.inPresentTwoForm) ? `${errorFormAPI.inPresentTwoForm}` : ``}`}
                DropDownArrowColor="#4C5664"
              />



              {values.inPresentTwo === "Yes" || values.inPastTwo === "Yes" ? (<CustomDropdown2
                boxWidth={'85%'}
                label={'If yes, kindly bring a fitness certificate from your doctor'}
                placeholder={'Select'}
                name='FitnessCertificate'

                labelStyle={{
                  color: '#4C5664'
                }}
                InputStyle={{
                  color: '#4C5664'
                }}
                bgColor={'transparent'}
                value={values.FitnessCertificate}
                DropDownData={FitnessCertificateData}
                onChange={(e, b, c) => {
                  handleChange("FitnessCertificate")(e.name)
                  seterrorFormAPI();
                }}
                // containerStyle={{  marginTop: 30 }}
                onBlur={handleBlur("FitnessCertificate")}
                validate={handleBlur("FitnessCertificate")}
                outlined
                borderColor={`${(errors.FitnessCertificate && touched.FitnessCertificate) || (errorFormAPI && errorFormAPI.FitnessCertificateForm) ? "red" : "#ccc"}`}
                errorMessage={`${(errors.FitnessCertificate && touched.FitnessCertificate) ? `${errors.FitnessCertificate}` : (errorFormAPI && errorFormAPI.FitnessCertificateForm) ? `${errorFormAPI.FitnessCertificateForm}` : ``}`}
                DropDownArrowColor="#4C5664"
              />) : ""}

              {values.FitnessCertificate === "Yes" && (
                <CustomTextInput2
                  boxWidth={'85%'}
                  label={'Name of medicine'}
                  bgColor={'white'}
                  asterisksymbol={true}
                  labelStyle={{
                    color: '#4C5664'
                  }}
                  InputStyle={{
                    color: '#4C5664'
                  }}
                  placeholder={'Name of medicine'}
                  placeholderTextColor={'#4C5664'}
                  name='medicineName'
                  value={values.medicineName}
                  onChangeText={(e) => {
                    handleChange("medicineName")(e);
                    seterrorFormAPI();
                  }}
                  // leftText={'Accomodate 10 members'}
                  onBlur={handleBlur("medicineName")}
                  validate={handleBlur("medicineName")}
                  outlined
                  borderColor={`${(errors.medicineName && touched.medicineName) || (errorFormAPI && errorFormAPI.medicineNameForm) ? "red" : "#ccc"}`}
                  errorMessage={`${(errors.medicineName && touched.medicineName) ? `${errors.medicineName}` : (errorFormAPI && errorFormAPI.medicineNameForm) ? `${errorFormAPI.medicineNameForm}` : ``}`}
                />)}

              {values.FitnessCertificate === "Yes" ? (
                <CustomTextInput2
                  boxWidth={'85%'}
                  label={'Dose of medicine'}
                  placeholder={'Dose of medicine'}
                  bgColor={'white'}
                  asterisksymbol={true}
                  labelStyle={{
                    color: '#4C5664'
                  }}
                  InputStyle={{
                    color: '#4C5664'
                  }}
                  placeholderTextColor={'#4C5664'}
                  name='docFitnessCertificate medicine Dose'
                  value={values.medicineDose}
                  onChangeText={(e) => {
                    handleChange("medicineDose")(e);
                    seterrorFormAPI();
                  }}
                  // leftText={'Accomodate 10 members'}
                  onBlur={handleBlur("medicineDose")}
                  validate={handleBlur("medicineDose")}

                  outlined

                  borderColor={`${(errors.medicineDose && touched.medicineDose) || (errorFormAPI && errorFormAPI.medicineDoseForm) ? "red" : "#ccc"}`}
                  errorMessage={`${(errors.medicineDose && touched.medicineDose) ? `${errors.medicineDose}` : (errorFormAPI && errorFormAPI.medicineDoseForm) ? `${errorFormAPI.medicineDoseForm}` : ``}`}
                />
              ) : ""}


              <CustomDropdown2
                boxWidth={'85%'}
                label={'If taking any medicine regularly have you brought it with you?'}
                placeholder={'Select'}
                name='regularMedicine'
                labelStyle={{
                  color: '#4C5664'
                }}
                InputStyle={{
                  color: '#4C5664'
                }}
                bgColor={'transparent'}
                value={values.regularMedicine}
                DropDownData={regularMedicineData}
                onChange={(e, b, c) => {
                  handleChange("regularMedicine")(e.name)
                  seterrorFormAPI();
                }}
                // containerStyle={{  marginTop: 30 }}
                onBlur={handleBlur("regularMedicine")}
                validate={handleBlur("regularMedicine")}
                outlined
                borderColor={`${(errors.regularMedicine && touched.regularMedicine) || (errorFormAPI && errorFormAPI.regularMedicineForm) ? "red" : "#ccc"}`}
                errorMessage={`${(errors.regularMedicine && touched.regularMedicine) ? `${errors.regularMedicine}` : (errorFormAPI && errorFormAPI.regularMedicineForm) ? `${errorFormAPI.regularMedicineForm}` : ``}`}
                DropDownArrowColor="#4C5664"
              />


              <CustomDropdown2
                boxWidth={'85%'}
                label={'How did you learn about this course'}
                placeholder={'Select'}
                name='referenceFrom'
                asterisksymbol
                labelStyle={{
                  color: '#4C5664'
                }}
                InputStyle={{
                  color: '#4C5664'
                }}
                bgColor={'transparent'}
                value={values.referenceFrom}
                DropDownData={referenceFromData}
                onChange={(e, b, c) => {
                  handleChange("referenceFrom")(e.name)
                  seterrorFormAPI();
                }}
                // containerStyle={{  marginTop: 30 }}
                onBlur={handleBlur("referenceFrom")}
                validate={handleBlur("referenceFrom")}
                outlined
                borderColor={`${(errors.referenceFrom && touched.referenceFrom) || (errorFormAPI && errorFormAPI.referenceFromForm) ? "red" : "#ccc"}`}
                errorMessage={`${(errors.referenceFrom && touched.referenceFrom) ? `${errors.referenceFrom}` : (errorFormAPI && errorFormAPI.referenceFromForm) ? `${errorFormAPI.referenceFromForm}` : ``}`}
                DropDownArrowColor="#4C5664"
              />

              <CustomTextInput2
                boxWidth={'85%'}
                label={'Brief personal background aim of joining the course'}
                bgColor={'white'}
                asterisksymbol={true}
                labelStyle={{
                  color: '#4C5664'
                }}
                InputStyle={{
                  color: '#4C5664'
                }}
                placeholder={'Enter more information data'}
                placeholderTextColor={'#4C5664'}
                name='brief'
                value={values.brief}
                onChangeText={(e) => {
                  handleChange("brief")(e);
                  seterrorFormAPI();
                }}
                // leftText={'Accomodate 10 members'}
                onBlur={handleBlur("brief")}
                validate={handleBlur("brief")}

                outlined

                borderColor={`${(errors.brief && touched.brief) || (errorFormAPI && errorFormAPI.briefForm) ? "red" : "#ccc"}`}
                errorMessage={`${(errors.brief && touched.brief) ? `${errors.brief}` : (errorFormAPI && errorFormAPI.briefForm) ? `${errorFormAPI.briefForm}` : ``}`}
              />

              {console.log("errors.brief",errors.brief)}


              <Text style={{ fontWeight: 800, fontSize: 15, marginTop: 5, marginBottom: 5 }}>--- To be filled in only by old student ---</Text>
              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>


                <CustomTextInput2
                  boxWidth={'85%'}
                  placeholder={'Name of old student'}
                  label={'Name of old student'}
                  bgColor={'white'}
                  labelStyle={{
                    color: '#4C5664'
                  }}
                  InputStyle={{
                    color: '#4C5664'
                  }}
                  placeholderTextColor={'#4C5664'}
                  name='oldStuName'
                  value={values.oldStuName}
                  onChangeText={(e) => {
                    handleChange("oldStuName")(e);
                    seterrorFormAPI();
                  }}
                  // leftText={'Accomodate 10 members'}
                  onBlur={handleBlur("oldStuName")}
                  validate={handleBlur("oldStuName")}

                  outlined

                  borderColor={`${(errors.oldStuName && touched.oldStuName) || (errorFormAPI && errorFormAPI.oldStuNameForm) ? "red" : "#ccc"}`}
                  errorMessage={`${(errors.oldStuName && touched.oldStuName) ? `${errors.oldStuName}` : (errorFormAPI && errorFormAPI.oldStuNameForm) ? `${errorFormAPI.oldStuNameForm}` : ``}`}
                />
                <CustomTextInput2
                  boxWidth={'85%'}
                  placeholder={'First course place'}
                  label={'First course place'}

                  bgColor={'white'}
                  labelStyle={{
                    color: '#4C5664'
                  }}
                  InputStyle={{
                    color: '#4C5664'
                  }}
                  placeholderTextColor={'#4C5664'}
                  name='firstCoursePlace'
                  value={values.firstCoursePlace}
                  onChangeText={(e) => {
                    handleChange("firstCoursePlace")(e);
                    seterrorFormAPI();
                  }}
                  // leftText={'Accomodate 10 members'}
                  onBlur={handleBlur("firstCoursePlace")}
                  validate={handleBlur("firstCoursePlace")}

                  outlined

                  borderColor={`${(errors.firstCoursePlace && touched.firstCoursePlace) || (errorFormAPI && errorFormAPI.firstCoursePlaceForm) ? "red" : "#ccc"}`}
                  errorMessage={`${(errors.firstCoursePlace && touched.firstCoursePlace) ? `${errors.firstCoursePlace}` : (errorFormAPI && errorFormAPI.firstCoursePlaceForm) ? `${errorFormAPI.firstCoursePlaceForm}` : ``}`}
                />

                <CustomTextInput2
                  boxWidth={'85%'}
                  placeholder={'First assist teacher'}
                  label={'First assist teacher'}
                  bgColor={'white'}
              
                  labelStyle={{
                    color: '#4C5664'
                  }}
                  InputStyle={{
                    color: '#4C5664'
                  }}
                  placeholderTextColor={'#4C5664'}
                  name='firstAsstTeacher'
                  value={values.firstAsstTeacher}
                  onChangeText={(e) => {
                    handleChange("firstAsstTeacher")(e);
                    seterrorFormAPI();
                  }}
                  // leftText={'Accomodate 10 members'}
                  onBlur={handleBlur("firstAsstTeacher")}
                  validate={handleBlur("firstAsstTeacher")}

                  outlined

                  borderColor={`${(errors.firstAsstTeacher && touched.firstAsstTeacher) || (errorFormAPI && errorFormAPI.firstAsstTeacherForm) ? "red" : "#ccc"}`}
                  errorMessage={`${(errors.firstAsstTeacher && touched.firstAsstTeacher) ? `${errors.firstAsstTeacher}` : (errorFormAPI && errorFormAPI.firstAsstTeacherForm) ? `${errorFormAPI.firstAsstTeacherForm}` : ``}`}
                />


                <View style={{ width: '85%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>










                  <CustomDateInput2
                    boxWidth={'47%'}
                    placeholder={''}
                    label={'First course date'}
                    name='First course date'
                    date='date'
                    value={values.dateFirstCourse || new Date()}
                    labelStyle={{
                      color: '#4C5664'
                    }}
                    InputStyle={{
                      color: '#4C5664'
                    }}
                    rightIcon={<MaterialIcons name="date-range" size={20} color="black" />}
                    onChangeText={(e, b, c) => {
                      handleChange("dateFirstCourse")(e);
                      seterrorFormAPI();
                    }}
                    onBlur={handleBlur("dateFirstCourse")}
                    validate={handleBlur("dateFirstCourse")}
                    outlined
                    backgroundColor={'white'}
                    minimumDate={new Date(1900, 10, 20)}
                    maximumDate={new Date(2100, 10, 20)}
                    borderColor={`${(errors.dateFirstCourse && touched.dateFirstCourse) || (errorFormAPI && errorFormAPI.dateFirstCourseForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.dateFirstCourse && touched.dateFirstCourse) ? `${errors.dateFirstCourse}` : (errorFormAPI && errorFormAPI.dateFirstCourseForm) ? `${errorFormAPI.dateFirstCourseForm}` : ``}`}
                  />



                  <CustomDateInput2
                    boxWidth={'47%'}
                    placeholder={''}
                    label={'Last course date'}
                    name='Last course date'
                    date='date'
                    value={values.dateFirstCourse || new Date()}
                    labelStyle={{
                      color: '#4C5664'
                    }}
                    InputStyle={{
                      color: '#4C5664'
                    }}
                    rightIcon={<MaterialIcons name="date-range" size={20} color="black" />}
                    onChangeText={(e, b, c) => {
                      handleChange("dateLastCourse")(e);
                      seterrorFormAPI();
                    }}
                    onBlur={handleBlur("dateLastCourse")}
                    validate={handleBlur("dateLastCourse")}
                    outlined
                    backgroundColor={'white'}



                    minimumDate={new Date(1900, 10, 20)}
                    maximumDate={new Date(2100, 10, 20)}
                    borderColor={`${(errors.dateLastCourse && touched.dateLastCourse) || (errorFormAPI && errorFormAPI.dateLastCourseForm) ? "red" : "#ccc"}`}
                    errorMessage={`${(errors.dateLastCourse && touched.dateLastCourse) ? `${errors.dateLastCourse}` : (errorFormAPI && errorFormAPI.dateLastCourseForm) ? `${errorFormAPI.dateLastCourseForm}` : ``}`}
                  />
                </View>


                <CustomTextInput2
                  boxWidth={'85%'}
                  placeholder={'Last course place'}
                  label={'Last course place'}
                  bgColor={'white'}
                  labelStyle={{
                    color: '#4C5664'
                  }}
                  InputStyle={{
                    color: '#4C5664'
                  }}

                  placeholderTextColor={'#4C5664'}
                  name='lastCoursePlace'
                  value={values.lastCoursePlace}
                  onChangeText={(e) => {
                    handleChange("lastCoursePlace")(e);
                    seterrorFormAPI();
                  }}
                  // leftText={'Accomodate 10 members'}
                  onBlur={handleBlur("lastCoursePlace")}
                  validate={handleBlur("lastCoursePlace")}

                  outlined

                  borderColor={`${(errors.lastCoursePlace && touched.lastCoursePlace) || (errorFormAPI && errorFormAPI.lastCoursePlaceForm) ? "red" : "#ccc"}`}
                  errorMessage={`${(errors.lastCoursePlace && touched.lastCoursePlace) ? `${errors.lastCoursePlace}` : (errorFormAPI && errorFormAPI.lastCoursePlaceForm) ? `${errorFormAPI.lastCoursePlaceForm}` : ``}`}
                />


                <CustomTextInput2
                  boxWidth={'85%'}
                  placeholder={'Last assist teacher'}
                  label={'Last assist teacher'}
                  bgColor={'white'}
                  labelStyle={{
                    color: '#4C5664'
                  }}
                  InputStyle={{
                    color: '#4C5664'
                  }}
                  placeholderTextColor={'#4C5664'}
                  name='lastAsstTeacher'
                  value={values.lastAsstTeacher}
                  onChangeText={(e) => {
                    handleChange("lastAsstTeacher")(e);
                    seterrorFormAPI();
                  }}
                  // leftText={'Accomodate 10 members'}
                  onBlur={handleBlur("lastAsstTeacher")}
                  validate={handleBlur("lastAsstTeacher")}

                  outlined

                  borderColor={`${(errors.lastAsstTeacher && touched.lastAsstTeacher) || (errorFormAPI && errorFormAPI.lastAsstTeacherForm) ? "red" : "#ccc"}`}
                  errorMessage={`${(errors.lastAsstTeacher && touched.lastAsstTeacher) ? `${errors.lastAsstTeacher}` : (errorFormAPI && errorFormAPI.lastAsstTeacherForm) ? `${errorFormAPI.lastAsstTeacherForm}` : ``}`}
                />


                <CustomDropdown2
                  boxWidth={'85%'}
                  label={'Course details'}
                  placeholder={'Select'}
                  name='courseDetails'
                  labelStyle={{
                    color: '#4C5664'
                  }}
                  InputStyle={{
                    color: '#4C5664'
                  }}
                  bgColor={'transparent'}
                  value={values.courseDetails}
                  DropDownData={courseDetailsData}
                  onChange={(e, b, c) => {
                    handleChange("courseDetails")(e.name)
                    seterrorFormAPI();
                  }}
                  // containerStyle={{  marginTop: 30 }}
                  onBlur={handleBlur("courseDetails")}
                  validate={handleBlur("courseDetails")}
                  outlined
                  borderColor={`${(errors.courseDetails && touched.courseDetails) || (errorFormAPI && errorFormAPI.courseDetailsForm) ? "red" : "#ccc"}`}
                  errorMessage={`${(errors.courseDetails && touched.courseDetails) ? `${errors.courseDetails}` : (errorFormAPI && errorFormAPI.courseDetailsForm) ? `${errorFormAPI.courseDetailsForm}` : ``}`}
                  DropDownArrowColor="#4C5664"
                />


                <CustomTextInput2
                  boxWidth={'85%'}
                  label={'Have you tried any practice since the last course?'}

                  bgColor={'white'}
                  labelStyle={{
                    color: '#4C5664'
                  }}
                  InputStyle={{
                    color: '#4C5664'
                  }}
                  placeholder={' '}
                  placeholderTextColor={'#4C5664'}
                  name='triedAnyPractise'
                  value={values.triedAnyPractise}
                  onChangeText={(e) => {
                    handleChange("triedAnyPractise")(e);
                    seterrorFormAPI();
                  }}
                  // leftText={'Accomodate 10 members'}
                  onBlur={handleBlur("triedAnyPractise")}
                  validate={handleBlur("triedAnyPractise")}

                  outlined

                  borderColor={`${(errors.triedAnyPractise && touched.triedAnyPractise) || (errorFormAPI && errorFormAPI.triedAnyPractiseForm) ? "red" : "#ccc"}`}
                  errorMessage={`${(errors.triedAnyPractise && touched.triedAnyPractise) ? `${errors.triedAnyPractise}` : (errorFormAPI && errorFormAPI.triedAnyPractiseForm) ? `${errorFormAPI.triedAnyPractiseForm}` : ``}`}
                />


                <CustomDropdown2
                  boxWidth={'85%'}


                  label={'Do you practice this technique regularly?'}
                  placeholder={'Select'}
                  name='practiseRegularly'
                  labelStyle={{
                    color: '#4C5664'
                  }}
                  InputStyle={{
                    color: '#4C5664'
                  }}
                  bgColor={'transparent'}
                  value={values.practiseRegularly}
                  DropDownData={practiseRegularlyData}
                  onChange={(e, b, c) => {
                    handleChange("practiseRegularly")(e.name)
                    seterrorFormAPI();
                  }}
                  // containerStyle={{  marginTop: 30 }}
                  onBlur={handleBlur("practiseRegularly")}
                  validate={handleBlur("practiseRegularly")}
                  outlined
                  borderColor={`${(errors.practiseRegularly && touched.practiseRegularly) || (errorFormAPI && errorFormAPI.practiseRegularlyForm) ? "red" : "#ccc"}`}
                  errorMessage={`${(errors.practiseRegularly && touched.practiseRegularly) ? `${errors.practiseRegularly}` : (errorFormAPI && errorFormAPI.practiseRegularlyForm) ? `${errorFormAPI.practiseRegularlyForm}` : ``}`}
                  DropDownArrowColor="#4C5664"
                />

                {/* {values.practiseRegularly === "yes" || values.practiseRegularly === "Courses" ? ( */}
                  <>
                    <CustomTextInput2
                      boxWidth={'85%'}
                      placeholder={'How many hours daily? '}

                      label={'How many hours daily?'}
                      bgColor={'white'}
                      labelStyle={{
                        color: '#4C5664'
                      }}
                      InputStyle={{
                        color: '#4C5664'
                      }}

                      placeholderTextColor={'#4C5664'}
                      name='dailyHours'
                      value={values.dailyHours}
                      onChangeText={(e) => {
                        handleChange("dailyHours")(e);
                        seterrorFormAPI();
                      }}
                      // leftText={'Accomodate 10 members'}
                      onBlur={handleBlur("dailyHours")}
                      validate={handleBlur("dailyHours")}

                      outlined

                      borderColor={`${(errors.dailyHours && touched.dailyHours) || (errorFormAPI && errorFormAPI.dailyHoursForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.dailyHours && touched.dailyHours) ? `${errors.dailyHours}` : (errorFormAPI && errorFormAPI.dailyHoursForm) ? `${errorFormAPI.dailyHoursForm}` : ``}`}
                    />

                    <CustomTextInput2
                      boxWidth={'85%'}

                      bgColor={'white'}
                      labelStyle={{
                        color: '#4C5664'
                      }}
                      InputStyle={{
                        color: '#4C5664'
                      }}
                      placeholder={'If no, What is the reason?'}

                      label={'If no, What is the reason?'}
                      placeholderTextColor={'#4C5664'}
                      name='reason'
                      value={values.reason}
                      onChangeText={(e) => {
                        handleChange("reason")(e);
                        seterrorFormAPI();
                      }}
                      // leftText={'Accomodate 10 members'}
                      onBlur={handleBlur("reason")}
                      validate={handleBlur("reason")}

                      outlined

                      borderColor={`${(errors.reason && touched.reason) || (errorFormAPI && errorFormAPI.reasonForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.reason && touched.reason) ? `${errors.reason}` : (errorFormAPI && errorFormAPI.reasonForm) ? `${errorFormAPI.reasonForm}` : ``}`}
                    />

                    <CustomTextInput2
                      boxWidth={'85%'}
                      placeholder={'What changes have you noticed in yourself by the practice of meditation?'}
                      label={'What changes have you noticed in yourself by the practice of meditation?'}
                      bgColor={'white'}
                      labelStyle={{
                        color: '#4C5664'
                      }}
                      InputStyle={{
                        color: '#4C5664'
                      }}
                      placeholderTextColor={'#4C5664'}
                      name='changeInYourSelf'
                      value={values.changeInYourSelf}
                      onChangeText={(e) => {
                        handleChange("changeInYourSelf")(e);
                        seterrorFormAPI();
                      }}
                      // leftText={'Accomodate 10 members'}
                      onBlur={handleBlur("changeInYourSelf")}
                      validate={handleBlur("changeInYourSelf")}

                      outlined

                      borderColor={`${(errors.changeInYourSelf && touched.changeInYourSelf) || (errorFormAPI && errorFormAPI.changeInYourSelfForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.changeInYourSelf && touched.changeInYourSelf) ? `${errors.changeInYourSelf}` : (errorFormAPI && errorFormAPI.changeInYourSelfForm) ? `${errorFormAPI.changeInYourSelfForm}` : ``}`}
                    />

                  </>
                {/* ) : ""} */}

              </View>


              {errors && (
                  <Text style={{ color: 'red' }}>
                    {Object.values(errors).join('\n')}
                  </Text>
                )}
              <TouchableOpacity style={{
                backgroundColor: '#030370', width: '75%',
                marginTop: 15,
                borderRadius: 15,
                height: Metrics.rfv(50),
                justifyContent: 'center', alignItems: 'center'
              }}
                onPress={() => {
                  // handleSubmit()
                  ErrorChecker()
                }}
              >
                <Text style={{ color: 'white', padding: 10 }}>Register for course</Text>
              </TouchableOpacity>



              <View style={{ height: 70 }}>

              </View>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>


    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 5,
    paddingLeft: 10,
  },
  sortButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  sortButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  sortButtonText: {
    fontWeight: 'bold',
  },
  courseContainer: {
    maxHeight: Metrics.height * 0.19,
    minHeight: 120,
    backgroundColor: 'rgba(168, 168, 255, 0.30)',
    padding: 10,
    borderRadius: 13,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'stretch',
  },
  courseName: {
    color: 'rgba(3, 3, 112, 1)',
    fontWeight: '400',
    fontSize: Metrics.rfv(20),
  },
  bold: {
    fontWeight: '700',
  },
  courseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  emptyList: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});

export default CourseRegistration3;
