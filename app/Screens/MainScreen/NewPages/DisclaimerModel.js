import React, { useState } from 'react';
import { View, Button, StyleSheet, Modal, Text, TouchableOpacity, Linking } from 'react-native';
import { CustomLinking } from '../../../utils/CustomLinking';

const DisclaimerModel = ({modalVisible="false",setModalVisible}) => {
//   const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Disclaimer</Text>
            <Text style={styles.paragraph}>
              We collect your personal and professional details to help you register for our free course and provide personalized wellness guidance.
            </Text>
            <Text style={styles.subtitle}>What We Collect</Text>
            <Text style={styles.bullet}>
              • **Personal Information:** Name, Gender, Age, Education, Address, Contact Details, Marital Status, Language.
            </Text>
            <Text style={styles.bullet}>
              • **Work Details:** Job Title, Company Name, Company Address.
            </Text>
            <Text style={styles.bullet}>
              • **Health Details:** Any physical or psychological conditions or addictions.
            </Text>
            <Text style={styles.bullet}>
              • **Course Feedback:** Previous courses attended, feedback, daily routine, and changes noticed.
            </Text>
            <Text style={styles.paragraph}>
              Your data is stored securely and will only be used for these purposes. By providing this information, you agree to its use as described.
            </Text>

            {/* Privacy Policy Link */}
            <TouchableOpacity onPress={() => CustomLinking('https://satyasadhna.com/privacypolicy')}>
              <Text style={styles.link}>Read our full Privacy Policy here.</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.agreeButton}
              onPress={() => {
                setModalVisible(false);
                // alert('You agreed to the disclaimer!');
              }}
            >
              <Text style={styles.buttonText}>I Agree </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#f5f5f5',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  paragraph: {
    fontSize: 14,
    marginBottom: 10,
    color: '#333',
  },
  bullet: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  link: {
    fontSize: 14,
    color: '#1E90FF',
    textAlign: 'center',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
  agreeButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default DisclaimerModel;
