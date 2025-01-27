import { StyleSheet, Text, TextInput, View, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'

const CustomTextInput2 = ({
    boxWidth,

    label,
    labelStyle,
    rightLabelBtn,
    style,
    value,
    placeholder,
    placeholderTextColor,
    autoComplete,
    containerStyle,
    keyboardType,
    autoCapitalize,
    outlined,
    onBlur,
    asterisksymbol,
    leftIcon,
    rightIcon,
    numLines,
    onChangeText,
    borderColor,
    secure,
    validate,
    editable,
    errorMessage,
    errorColor = 'red',
    bgColor,
    maxLength,
    InputStyle,
    leftText
}) => {

    const backgroundColor = bgColor || 'white';
    const containerBorder = outlined ? styles.outlined : styles.standard;
    const [errorData, setErrorData] = useState()



    // "visible-password"
    // "number-pad"
    // "phone-pad"
    return (
        <View style={[{ padding: 0, width: boxWidth }, style, styles.boxHeight]}>
            {label ? <Text style={[styles.label, labelStyle]}>{label} {asterisksymbol ? <Text style={{ color: '#C30909' }}>*</Text> : ""}</Text> : ""}


            <View style={[styles.container, containerBorder, containerStyle, { borderColor: borderColor }, { backgroundColor: backgroundColor }]}>
                <View style={{ paddingRight: 7 }}>
                    {leftIcon}
                </View>
                <TextInput
                    placeholder={placeholder ? placeholder : label ? `Enter ${label}` : ''}
                    placeholderTextColor={placeholderTextColor ? placeholderTextColor : "white"}
                    value={value}
                    secureTextEntry={secure}
                    autoComplete={autoComplete}
                    keyboardType={keyboardType}

                    autoCapitalize={autoCapitalize}

                    onChangeText={(e) => {

                        onChangeText(e); // Pass the formatted text back
                    }}

                    maxLength={maxLength}
                    onBlur={onBlur}
                    onEndEditing={validate}
                    multiline={numLines > 1 ? true : false}
                    numberOfLines={numLines}
                    editable={editable}
                    // style={[{ flex: 4 }, InputStyle]}
                    style={[InputStyle, styles.Inputstyling, { flex: 4, alignSelf: "center" }]}

                />
                <View style={{ paddingLeft: 5 }}>
                    {rightIcon}
                </View>
            </View>
            <Text style={{ color: errorColor, marginLeft: 15 }}>{errorMessage || errorData}</Text>
            {leftText && <Text style={[styles.label, { marginTop: -20, fontSize: 9, color: '#47556980', marginLeft: 10 }]}>{leftText}</Text>}
        </View>
    )
}

export default CustomTextInput2

const styles = StyleSheet.create({
    label: {
        fontWeight: '400',
        marginBottom: 4,
        textTransform: 'none',
        // fontFamily: 'Gilroy-Medium',
        fontSize: 14,
        lineHeight: 24,
        // marginLeft:5
    },
    container: {
        // padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderRadius: 5,
        paddingHorizontal: 10,


        // ...Platform.select({
        //     ios: {
        //         // shadowColor: 'black',
        //         // shadowOffset: { width: 0, height: 2 },
        //         // shadowOpacity: 0.2,
        //         // shadowRadius: 4,
        //     },
        //     android: {
        //         // elevation: 2,
        //     },
        // }),


    },
    Inputstyling: {
        height: 45
    },
    outlined: {
        borderWidth: 1,
    }
})