import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker'

const CustomPicker = () => {
    return (
        <View>
            <Text>CustomPicker</Text>
            <Picker
                // selectedValue={values.userGender}
                selectedValue={'male'}
                onValueChange={(itemValue) => console.log("dsa")}
                style={{ height: 50, marginTop: -5, marginLeft: -5 }}
            >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
            </Picker>
        </View>
    )
}

export default CustomPicker

const styles = StyleSheet.create({})