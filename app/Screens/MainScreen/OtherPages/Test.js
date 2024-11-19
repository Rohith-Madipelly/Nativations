import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomDateInput from '../../../Components/UI/Inputs/CustomDateInput';
import { useState } from 'react';

const Test = () => {

    const [values, setValues] = useState()
    return (
        <View>
            <Text>Test</Text>
            <CustomDateInput
                placeholder={'Last course date'}
                label={'Last course date'}
                name='Last course date'
                // value={values.dateLastCourse}
                //   leftIcon={<MaterialIcons name="date-range" size={20} color="black" />}
                // bgColor='#e1f3f8'
                // bgColor="#B1B1B0"

                // onChangeText={onChangeText}
                //   onChangeText={(e) => { handleChange("dateLastCourse")(e); seterrorFormAPI(); }}
                //   onBlur={handleBlur("dateLastCourse")}
                // validate={handleBlur("dateLastCourse")}
                boxWidth={"40%"}
                outlined
                // borderColor={`${(errors.dateLastCourse && touched.dateLastCourse) || (errorFormAPI && errorFormAPI.dateLastCourseForm) ? "red" : "#ccc"}`}
                // errorMessage={`${(errors.dateLastCourse && touched.dateLastCourse) ? `${errors.dateLastCourse}` : (errorFormAPI && errorFormAPI.dateLastCourseForm) ? `${errorFormAPI.dateLastCourseForm}` : ``}`}
                // errorColor='magenta'
                // minimumDate={minvalueofcourseDate}
                maximumDate={new Date(2100, 10, 20)}
            />
        </View>
    )
}

export default Test

const styles = StyleSheet.create({})