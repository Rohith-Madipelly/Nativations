import axios from 'axios';

import { GUEST_URL, BASE_URL } from '../Enviornment.js'


//Home Page api 
export const HomePageData = async (token) => {
  console.log("api data", token)
  return await axios.get(`${GUEST_URL}/user/home`, {
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

// User Login API Call 
export const UserLoginApi = async (email, password) => {
  const loginData = {
    email: email,
    password: password
  };

  return await axios.post(`${GUEST_URL}/login`, loginData);
};


// User Login API Call 
export const FormDataApi = async (loginData,token) => {
  // console.log("api data", loginData)
  // console.log("api data", token)
console.log(">>>>>>>>>>>>>>>>>")
  const DataPage={
    "from": "Sender's Name",
    "to": "Receiver's Name",
    "date": "2024-02-10",
    "firstName": "John",
    "lastName": "Doe",
    "gender": "male",
    "age": 30,
    "education": "Bachelor's Degree",
    "address": "123 Main Street, City, Country",
    "guardianName": "Jane Doe",
    "martialStatus": "married",
    "motherTongue": "english",
    "mobileNumber": 1234567890,
    "eMail": "example@example.com",
    // "knownPerson": {
    //     "personName": "known Person's Name",
    //     "personRelation": "known to Reference Person"
    // },
    // "familyPerson": {
    //     "courseDone": "yes",
    //     "relation": "Relation to Family Person"
    // },
    // "professionalDetails": {
    //     "designation": "Job Title",
    //     "companyName": "Company Name",
    //     "companyAddress": "456 Business Avenue, City, Country"
    // },
    // "physicalAilment": {
    //     "inPastOne": "yes",
    //     "inPresentOne": "no"
    // },
    // "psyschologicalAilment": {
    //     "inPastTwo": "no",
    //     "inPresentTwo": "yes"
    // },
    // "docFitnessCertificate": {
    //     "medicineName": "Medicine Name",
    //     "medicineDose": "Medicine Dose"
    // },
    "regularMedicine": "yes",
    "referenceFrom": "Friend",
    "brief": "Brief Description Brief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief DescriptionBrief Description"
    // "oldStudent": {
    //     "oldStuName": "Old Student's Name",
    //     "dateFirstCourse": "2020-01-01",
    //     "firstCoursePlace": "First Course Place",
    //     "firstAsstTeacher": "First Assistant Teacher's Name",
    //     "dateLastCourse": "2023-12-31",
    //     "lastCoursePlace": "Last Course Place",
    //     "lastAsstTeacher": "Last Assistant Teacher's Name",
    //     "courseDetails": "10-Days",
    //     "triedAnyPractise": "yes",
    //     "practiseRegularly": "yes",
    //     "dailyHours": "1-2 hours",
    //     "reason": "Reason for Trying the Practice",
    //     "changeInYourSelf": "Changes Experienced"
    // }
}

  return await axios.post(`${GUEST_URL}/user/form`,DataPage, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};


// User Registertion API Call 
export const UserRegisterApi = async (username, email, phone_number, password) => {


  const loginData = {
    phone_number: phone_number,
    email: email,
    username: username,
    password: password
  };
  console.log("loginData", loginData)


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

  const ReqData = {
    email: email,
    userOtp: userOtp
  };
  console.log(ReqData)

  return await axios.post(`${GUEST_URL}/verifyotp`, ReqData);
};



// User Forgot OTP verifyotp API Call 
export const ForgotApiPassRest = async (email, password) => {

  const ReqData = {
    email: email,
    password: password
  };

  return await axios.post(`${GUEST_URL}/forgotpassword`, ReqData);
};


//Profile api 
export const UserGetProfileDetails = async (token) => {
  console.log(token)
  return await axios.get(`${GUEST_URL}/user/profile`, {
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



//Updated Profile Pic api 
export const UserUpdatedProfilePic = async (image, token) => {




  // const ReqData = {
  //   profile_pic: image,
  // };

  // return await axios.post(`${GUEST_URL}/user/updateprofilepicture`
  //   , ReqData, {
  //   headers: {
  //     'Authorization': `Bearer ${token}`
  //   }
  // });

  const formData = new FormData();
  formData.append("profile_pic", image);

  return await axios.post(`${GUEST_URL}/user/updateprofilepicture`, formData, {
    headers: {
      // 'Authorization': `Bearer ${token}`
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTQwYTE3MzJhZmRmY2NkMWIzNWIwOCIsImlhdCI6MTcwNTQ3MTQzMywiZXhwIjoxNzA1NjQ0MjMzfQ.5PN-Tbg6sJXCGLSwG8zqaGpL_dFfGzezwV-JPsK65X0'
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





//Video api  locations based
export const GetVideosDataAPI2 = async (ReqData, page, token) => {

  // const ReqData2 = {
  //   longitude: '78.384433',
  //   latitude: '17.444594',
  // };

  return await axios.post(`${GUEST_URL}/user/locationvideos?page=${page}`,
    ReqData,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }

    });
};


// Put Like on Video
export const PutLikeAPI = async (dateVideoId, token) => {
  return await axios.put(`${GUEST_URL}/user/${dateVideoId}/likes`, {}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }

  });
};



// Repost API Call
export const PostRepostAPI = async (ReqData, token) => {

  return await axios.post(`${GUEST_URL}/user/report`,
    ReqData,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }

    });
};

//Profile rewarded
export const rewardedAPI = async (videoId, tokenn) => {
  const ReqData = {
    videoId: videoId,
  };

  return await axios.post(`${GUEST_URL}/user/wallet`
    , ReqData, {
    headers: {
      'Authorization': `Bearer ${tokenn}`
    }
  });
};

// Get Wallet Amount
export const GetWalletAmountAPI = async (token) => {
  return await axios.get(`${GUEST_URL}/user/walletamount`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }

  });
};



//Put Like Video
export const PutLikeVideoAPI = async (token) => {
  return await axios.get(`${GUEST_URL}/user/walletamount`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }

  });
};