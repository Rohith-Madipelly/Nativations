import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import CustomTextInput from '../../../../Components/UI/Inputs/CustomTextInput'

import {
    Entypo,
    Feather,
    AntDesign,
    MaterialIcons,
    Ionicons, FontAwesome,
    MaterialCommunityIcons,
} from "@expo/vector-icons";



const TestScreen = () => {
    const [values, setValues] = useState()
    const [show, setShow] = useState()
    const [error, setError] = useState()


    function onchange(text, field) {
        setValues({ ...values, [field]: text });
    }
    return (
        <View style={{ marginTop: 200 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                //   behavior={Platform.OS === "ios" ? 100:0}
                keyboardVerticalOffset={1000}
            //   style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView>



                        <View style={{ padding: 10, marginTop: 20, backgroundColor: '#f8f8f8', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CustomTextInput
                                placeholder={'Enter First Name '}
                                label={'First Name'}
                                name='first'
                                leftIcon={<FontAwesome name="user" size={20} color="black" />}
                                bgColor='#e1f3f8'
                                // bgColor="#B1B1B0"
                                onChangeHandler={text => onchange(text, 'first')}

                                validate={() => {
                                    if (!values?.first) { setError({ ...error, first: 'Please enter your name' }) }
                                }}
                                outlined
                                borderColor={error?.first ? "red" : ""}
                                errorMessage={error?.first}
                            // errorColor='magenta'
                            />

                            <CustomTextInput
                                placeholder={'Enter Last Name'}
                                label={'Last Name'}
                                name='last'
                                leftIcon={<FontAwesome name="user" size={20} color="black" />}
                                onChangeHandler={text => onchange(text, 'last')}
                                outlined

                                validate={() => {
                                    if (!values?.last) { setError({ ...error, last: 'Please enter your last name' }) }
                                }}
                                errorMessage={error?.last}
                            />

                            <CustomTextInput
                                placeholder={'Enter Email Name'}
                                label={'Email '}
                                name='Email'
                                leftIcon={<Entypo name="mail" size={20} color="black" />}
                                onChangeHandler={text => onchange(text, 'email')}
                                outlined

                                validate={() => {
                                    if (!values?.email) { setError({ ...error, email: 'Please enter your email ' }) }
                                }}
                                errorMessage={error?.email}
                            />


                            <CustomTextInput
                                placeholder={'Enter Password'}
                                label={'Password'}
                                name='Password'
                                leftIcon={<Entypo name="lock" size={20} color="black" />}

                                rightIcon={<Pressable onPress={() => setShow({ ...setShow, password: !show?.password })}>

                                    {!show?.password ? (
                                        <Entypo name="eye" size={20} color="black" />) : (
                                        <Entypo name="eye-with-line" size={20} color="black" />)
                                    }

                                </Pressable>
                                }
                                secure={!show?.password} //default to true
                                onChangeHandler={text => onchange(text, 'password')}
                                validate={() => {
                                    if (!values?.password) { setError({ ...error, password: 'Please enter your Password' }) }
                                }}
                                errorMessage={error?.password}
                                // errorColor='magenta'
                                outlined
                            />

                            <CustomTextInput
                                placeholder={'Enter About here'}
                                label={'About'}
                                name='About'
                                leftIcon={<Entypo name="info" size={20} color="black" />}
                                onChangeHandler={text => onchange(text, 'About')}
                                numLines={3}
                                outlined

                                validate={() => {
                                    if (!values?.About) { setError({ ...error, About: 'Please enter About here ' }) }
                                }}
                                errorMessage={error?.About}
                            />

                            <CustomTextInput
                                placeholder={'Enter Your Hobbies'}
                                label={'Hobbies'}
                                name='Hobbies'
                                leftIcon={<Entypo name="info" size={20} color="black" />}
                                onChangeHandler={text => onchange(text, 'Hobbies')}
                                numLines={5}
                                outlined

                                validate={() => {
                                    if (!values?.Hobbies) { setError({ ...error, Hobbies: 'Please enter Your Hobbies' }) }
                                }}
                                errorMessage={error?.Hobbies}
                            />
                            {/* <Text>First Name: {values?.first}</Text>
            <Text>Last Name: {values?.last}</Text> */}
                        </View>
                    </ScrollView>

                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    )
}

export default TestScreen

const styles = StyleSheet.create({})