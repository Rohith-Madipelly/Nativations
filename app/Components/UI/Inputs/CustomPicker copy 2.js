import { StyleSheet, Text, TextInput, View, Platform } from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker';

const CustomPicker = ({

    label,
    value,
    placeholder,
    autoComplete,
    keyboardType,
    autoCapitalize,
    outlined,
    onBlur,

    leftIcon,
    rightIcon,
    numLines,
    boxWidth,
    onChangeText,
    borderColor,
    secure,
    validate,
    errorMessage,
    errorColor = 'red',
    bgColor = 'white',

}) => {
    const containerBorder = outlined ? styles.outlined : styles.standard;
    return (
        <View style={{ padding: 0, width: boxWidth }}>
            <Text style={styles.label}>{label}</Text>

            <View style={[styles.container, containerBorder, { borderColor: borderColor }, { backgroundColor: bgColor }]}>
                {leftIcon?<View style={{ paddingRight: 8 }}>
                    {leftIcon}

                </View>:""}
                <View style={{ width: '100%', justifyContent: 'center',height:30 }}>


                    <Picker
                        // selectedValue={values.userGender}
                        selectedValue={''}
                        onValueChange={(itemValue) => console.log("dsa")}

                        style={{height:2,marginHorizontal:-10}}
                    >
                        <Picker.Item label="Select Gender" value="" />
                        <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" />
                    </Picker>
                </View>
                {/* <TextInput
                    placeholder={placeholder ? placeholder : label ? `Enter ${label}` : ''}
                    value={value}
                    // placeholderTextColor={"#444"}
                    secureTextEntry={secure}
                    autoComplete={autoComplete}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}

                    onChangeText={onChangeText}

                    onBlur={onBlur}

                    onEndEditing={validate}
                    multiline={numLines > 1 ? true : false}
                    numberOfLines={numLines}

                    style={{ flex: 4 }}

                /> */}
                {rightIcon?<View style={{ paddingLeft: 8 }}>
                    {rightIcon}

                </View>:""}
            </View>
            <Text style={{ color: errorColor, marginLeft: 15 }}>{errorMessage}</Text>
        </View>
    )
}

export default CustomPicker

const styles = StyleSheet.create({
    label: {
        fontWeight: '500',
        marginBottom: 4,
        textTransform: 'capitalize'
    },
    container: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 20,


        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            },
            android: {
                elevation: 2,
            },
        }),


    },
    outlined: {
        // borderBottomColor: 'darkgrey',
        // borderColor: 'darkgrey',
        borderWidth: 1,
    }
})