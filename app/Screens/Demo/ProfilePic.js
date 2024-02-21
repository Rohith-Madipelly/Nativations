import React, { useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useSelector } from 'react-redux';


const GUEST_URL = 'http://www.satyasadhna.com:8001'; // Your server URL
   
export default function ProfilePicUpdate() {
  const [profilePic, setProfilePic] = useState(null);
  const loginSelectorToken = useSelector((state) => state.token);



var tokenn = loginSelectorToken;
tokenn = tokenn.replaceAll('"', '');

  // Function to handle profile picture update
  const handleProfilePicUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('picture', {
        uri: profilePic,
        name: 'profile.jpg',
        type: 'image/jpeg', // Adjust the type according to your image
      });

      const response = await axios.post(`${GUEST_URL}/user/uploaddp`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${tokenn}`,
          // ...formData.getHeaders()
          // Add any additional headers here, such as authorization token
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  };

  // Function to pick an image from device
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setProfilePic(result.assets[0].uri);
    
      }
    } catch (error) {
      console.error('Error picking an image:', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {profilePic && (
        <Image
          source={{ uri: profilePic }}
          style={{ width: 200, height: 200, borderRadius: 100 }}
        />
      )}
      <Button title="Pick an image" onPress={pickImage} />
      <Button title="Update Profile Pic" onPress={handleProfilePicUpdate} />
    </View>
  );
}
