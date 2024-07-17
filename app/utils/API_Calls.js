import axios from 'axios';

import { GUEST_URL } from '../Enviornment.js'
import { Platform } from 'react-native';

// Platform for store link
const getAPIBaseUrl = () => {
  if (Platform.OS === 'ios') {
    return 'user/appStore';
  } else if (Platform.OS === 'android') {
    return 'user/playStore';
  } else {
    throw new Error('Unsupported platform');
  }
};



//Home Page api 
export const HomePageData = async (token) => {
  // console.log("api data", token)
  return await axios.get(`${GUEST_URL}/user/home`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};


// User Form Data API Call 
export const FormDataApi = async (loginData, token) => {

  return await axios.post(`${GUEST_URL}/user/form`, loginData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};


//Video api 
export const VideoPageData = async (token, id) => {
  console.log("api data", token)
  return await axios.get(`${GUEST_URL}/user/post/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

//Live Page api 
export const LivePageData = async (token) => {
  return await axios.get(`${GUEST_URL}/user/live`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};


// User Login API Call 
export const UserLoginApi = async (loginFormData,) => {
  console.log(">>", loginFormData)
  // const loginData = {
  //   email: "madipel",
  //   password: password
  // };
  return await axios.post(`${GUEST_URL}/login`, loginFormData);
};


// User Registertion API Call 
export const UserRegisterApi = async (username, email, phone_number, password) => {
  const loginData = {
    phone_number: phone_number,
    email: email,
    username: username,
    password: password
  };
  return await axios.post(`${GUEST_URL}/register`, loginData);
};


// User Forgot OTP Send API Call 
export const UserForgotOTPApi = async (email) => {
  const loginData = {
    email: email,
  };
  return await axios.post(`${GUEST_URL}/otp`, loginData);
};



// User Forgot OTP verifyotp API Call 
export const UserVerifyOtp = async (email, userOtp) => {

  console.log("otp is ",)
  const ReqData = {
    email: email,
    userOtp: userOtp
  };

  return await axios.post(`${GUEST_URL}/verifyotp`, ReqData);
};



// User Forgot OTP verifyotp API Call 
export const ForgotApiPassRest = async (email, password) => {
console.log(email, password)
  const ReqData = {
    email: email,
    password: password
  };

  return await axios.post(`${GUEST_URL}/forgotpassword`, ReqData);
};


//Profile api 
export const UserGetProfileDetails = async (token) => {

  return await axios.get(`${GUEST_URL}/user/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};


//Updated Profile Pic api 
export const UserUpdatedProfilePic123 = async (formData, token) => {
  // console.log("data vachindhi",formData,token)
  return await axios.post(`${GUEST_URL}/user/uploaddp`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    },
  });
};

//GetPlayStore api 
export const GetPlayStoreAPI = async (token) => {
  const apiUrl = getAPIBaseUrl();
  console.log("><>", apiUrl)
  return await axios.get(`${GUEST_URL}/${apiUrl}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};



//Delete Account api 
export const DeleteAccountAPI = async (token) => {
  return await axios.delete(`${GUEST_URL}/user/deleteuser`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};



//Updated Profile api 
export const UserUpdatedProfileDetails = async (fName, lName, userAge, token) => {
  const loginData = {
    firstname: fName,
    lastname: lName,
    age: userAge,
    // gender: userGender,
  };
  return await axios.post(`${GUEST_URL}/user/updateprofile`, loginData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};





//Profile api 
export const AboutAPI = async (token) => {

  return await axios.get(`${GUEST_URL}/user/about`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};



//PrivacyPolicyAPI
export const PrivacyPolicyAPI = async (token) => {

  return await axios.get(`${GUEST_URL}/user/privacypolicy`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};



//Profile PasswordChange
export const ChangePasswordAPI = async (old_password, New_Password, tokenn) => {
  const ReqData = {
    oldPassword: old_password,
    newPassword: New_Password,
  };

  return await axios.post(`${GUEST_URL}/user/changepassword`
    , ReqData, {
    headers: {
      'Authorization': `Bearer ${tokenn}`
    }
  });
};




//Video api 
export const GetVideosDataAPI = async (token) => {
  return await axios.get(`${GUEST_URL}/user/videos`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }

  });
};


//Form requesties
export const GetFormReqs = async (token) => {

  return await axios.get(`${GUEST_URL}/user/courses`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};


//Form GetFormDataSumbited
export const GetFormDataSumbited = async (token) => {

  return await axios.get(`${GUEST_URL}/user/formdata`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};




//Form GetCourseData
export const GetCourseData = async (id, token) => {

  return await axios.get(`${GUEST_URL}/user/singlecourse/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};
