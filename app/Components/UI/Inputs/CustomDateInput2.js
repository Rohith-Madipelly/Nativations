import { StyleSheet, Text, TextInput, View, Platform, Modal, TouchableWithoutFeedback, Dimensions, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {  formatToReadableDateDDMMYYYY } from '../../../utils/TimeConverter';
const CustomDateInput2 = ({
    label,
    labelStyle,
    value,
    placeholder,
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
    boxWidth,
    onChangeText,
    borderColor,
    secure,
    validate,
    editable,
    errorMessage,
    errorColor = 'red',
    bgColor,
    maxLength,



    minimumDate,
    maximumDate,
    disabled = false,


}) => {

    const containerBorder = outlined ? styles.outlined : styles.standard;
    const [date, setDate] = useState(value); // Initialize date state with the provided value
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState("date");


    const backgroundColor = bgColor || 'white';
    // const containerBorder = outlined ? styles.outlined : styles.standard;
    const [errorData, setErrorData] = useState()
    const [borderColorDisplay, setBorderColor] = useState(borderColor)

    useEffect(() => {
        setBorderColor(borderColorDisplay)
        if (errorMessage) {
            setBorderColor("red")
        } else {
            setBorderColor(borderColor)
        }

    }, [borderColorDisplay, errorMessage])


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        // setShow(Platform.OS === 'ios');
        if(Platform.OS === 'ios'){

        }else{
            setShow(false)
        }
        setDate(currentDate);
        // console.log("currentDate",formatToReadableDateDDMMYYYY(currentDate))
        // // onChangeText(currentDate.toLocaleDateString()); // Pass the formatted date to onChangeText
        onChangeText(formatToReadableDateDDMMYYYY(currentDate)); // Pass the formatted date to onChangeText
    };

    const showMode = (modeToShow) => {
        // setShow(true);
        setMode(modeToShow);
    };



    const DateForm = (input) => {
        if (!isNaN(Date.parse(input))) {

            console.log(new Date(input).toLocaleDateString());
            return new Date(input).toLocaleDateString()
        } else {
            console.log('none');
            return input
        }


    }


    console.log("date", date)



    return (
        <View style={[{ padding: 0, width: boxWidth }, styles.boxHeight]}>
            {label ? <Text style={[styles.label, labelStyle]}>{label} {asterisksymbol ? <Text style={{ color: 'red' }}>*</Text> : ""}</Text> : ""}


            <TouchableOpacity style={[
                styles.container,
                containerBorder,
                containerStyle,
                { borderColor: borderColorDisplay || borderColorDisplay }, { backgroundColor: backgroundColor, height: `${numLines > 1 ? (55 + 10 * numLines) : 52}`, }
            ]}
            onPress={()=>{setShow(!show)}}
            >
                {leftIcon ? <View style={{ paddingRight: 7 }}>
                    {leftIcon}
                </View> : ""}
                {/* <TextInput
                    placeholder={placeholder ? placeholder : label ? `Enter ${label}` : ''}
                    value={value}
                    // placeholderTextColor={"#444"}
                    secureTextEntry={secure}
                    autoComplete={autoComplete}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    maxLength={maxLength}
                    onChangeText={(e) => {
                        // console.log(e)
                        onChangeText(e); // Pass the formatted text back
                    }}
                    onBlur={onBlur}
                    onEndEditing={validate}

                    ellipsizeMode="tail" // Adds ellipsis at the end
                    multiline={numLines > 1 ? true : false}
                    numberOfLines={numLines}
                    editable={editable}
                    style={{ flex: 1, height: '80%',paddingStart:5 }}

                /> */}
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    {Platform.OS == "ios" ? (
                        <DateTimePicker
                            style={{}}
                            value={date || new Date()} // Pass date or current date if not provided
                            mode={mode}
                            // display={"spinner"}
                            display={"compact"}

                            is24Hour={true}
                            minimumDate={minimumDate}
                            maximumDate={maximumDate}
                            onChange={onChange}
                        />) : <>

                        {show ?
                            <DateTimePicker
                                style={{}}
                                value={date || new Date()} // Pass date or current date if not provided
                                mode={mode}
                                // display={"spinner"}
                                display={"compact"}

                                is24Hour={true}
                                minimumDate={minimumDate}
                                maximumDate={maximumDate}
                                onChange={onChange}
                            /> :    <TextInput
                            placeholder={placeholder ? placeholder : label ? `Enter ${label}` : ''}
                            value={value}
                            onChangeText={(e) => {
                                onChangeText(e); // Pass the formatted text back
                            }}
                            ellipsizeMode="tail" // Adds ellipsis at the end
                            editable={false}
                            style={{ flex: 1, height: '80%',paddingStart:5 }}
        
                        />}
                    </>}
                </View>
                <View style={{ paddingLeft: 5, }}>
                    {rightIcon}
                </View>
            </TouchableOpacity>
            <Text style={{ color: errorColor, marginLeft: 15 }}>{errorMessage || errorData}</Text>
        </View>
    )
}

export default CustomDateInput2

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
        height: 50,
        // height:`${numLines > 1 ? (55+10*numLines) : 55}`,
        // padding: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 7,
    },


    boxHeight: {
        // marginTop:5,
        ...Platform.select({
            ios: {
                // height:80,
                marginVertical: 5,
            },
            android: {
                // height:80
            },
        })
    },
    outlined: {
        // borderBottomColor: 'darkgrey',
        borderColor: '#C6C6C6',
        borderWidth: 1,
    }
})