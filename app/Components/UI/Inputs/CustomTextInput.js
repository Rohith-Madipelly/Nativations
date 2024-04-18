import { StyleSheet, Text, TextInput, View, Platform } from 'react-native'
import React from 'react'

const CustomTextInput = ({
    label,
    value,
    placeholder,
    autoComplete,
    keyboardType,
    autoCapitalize,
    outlined,
    onBlur,
    asterisksymbol,
    leftIcon,
    rightIcon,
    numLines,
    boxWidth,
    onChangeText,
    borderColor,
    secure,
    validate,
    editable,
    errorMessage,
    errorColor = 'red',
    bgColor,

}) => {

    const backgroundColor = bgColor || 'white';
    const containerBorder = outlined ? styles.outlined : styles.standard;
    return (
        <View style={{ padding: 0,width:boxWidth }}>
            <Text style={styles.label}>{label} {asterisksymbol?<Text style={{color:'red'}}>*</Text>:""}</Text>
            <View style={[styles.container, containerBorder, { borderColor: borderColor }, { backgroundColor: backgroundColor }]}>
                <View style={{ paddingRight: 3 }}>
                    {leftIcon}

                </View>
                <TextInput
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
                    editable={editable}
                    style={{ flex: 4 }}

                />
                <View style={{ paddingLeft: 5 }}>
                    {rightIcon}

                </View>
            </View>
            <Text style={{ color: errorColor, marginLeft: 15 }}>{errorMessage}</Text>
        </View>
    )
}

export default CustomTextInput

const styles = StyleSheet.create({
    label: {
        fontWeight: '500',
        marginBottom: 4,
        textTransform: 'none'
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