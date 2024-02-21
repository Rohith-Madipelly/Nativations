import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import FormData from 'form-data';
import { useSelector } from 'react-redux';
import { UserUpdatedProfilePic } from '../../utils/API_Calls';

const GUEST_URL = 'http://www.satyasadhna.com:8001'; // Your server URL

export default function ProfilePicUpdate() {
  const [profilePic, setProfilePic] = useState(null);

  let tokenn = useSelector((state) => state.token);
  try {
    if (tokenn != null) {
      tokenn = tokenn.replaceAll('"', '');
    }
  }
  catch (err) {
    console.log("Error in token quotes", err)
  }

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  // Function to handle profile picture update
  const handleProfilePicUpdate = async () => {

    try {

      const res=await UserUpdatedProfilePic(profilePic, tokenn)
      console.log(res)
    } catch (error) {
console.log("jdbksj")
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
      <Text>kjsdbk{tokenn}</Text>
      <Button title="Pick an image" onPress={pickImage} />
      <Button title="Update Profile Pic" onPress={handleProfilePicUpdate} />
    </View>
  );
}
