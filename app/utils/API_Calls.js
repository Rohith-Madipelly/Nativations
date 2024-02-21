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
export const FormDataApi = async (loginData, token) => {

  console.log("loginData >>>>123", loginData, "ngchgc")



  return await axios.post(`${GUEST_URL}/user/form`, loginData, {
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
export const UserUpdatedProfilePic123 = async (image, token) => {
  console.log("sahvbdjad", image)
  const formData = new FormData();
  // Append the image file to the FormData object
  const imageurl = image.uri.split('/').pop();
  formData.append("picture", {
    uri: imageurl,
    name: 'profile_pic.jpg',
    type: 'image/jpeg',
  });
  //  // Configure headers
  //  const headers = {
  //   'Authorization': `Bearer ${token}`,
  //   ...formData.getHeaders()
  // };

  return await axios.post(`${GUEST_URL}/user/uploaddp`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};



import FormData from 'form-data';

// Update with your server URL

export const UserUpdatedProfilePic = async (imageUri, token) => {
  try {
    const formData = new FormData();
    const imageFileName = imageUri.split('/').pop(); // Extract filename from URI
    // formData.append('picture', {
    //   uri: imageUri,
    //   name: imageFileName,
    //   type: 'image/jpeg',
    // });
    formData.append('picture', imageUri);
    console.log("cs", formData)
    const response = await axios.post(`${GUEST_URL}/user/uploaddp`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`
        // ...formData.getHeaders(),
      },
    });

    // console.log('Upload successful:', response.data);
    // return response.data; // Return response data if needed
  } catch (error) {
    console.error('Upload failed:', error);
    throw error; // Rethrow the error for handling in the calling code
  }
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