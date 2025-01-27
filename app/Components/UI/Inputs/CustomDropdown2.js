import { Feather, Entypo, FontAwesome } from '@expo/vector-icons';

import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, Platform } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import AddIcon from './InputAssets/AddIcon.js';

const CustomDropdown2 = ({
    label,
    style,
    labelStyle,
    value,
    placeholder = 'Select',
    onChange,
    outlined,
    onBlur,
    asterisksymbol,
    leftIcon,
    rightIcon,
    numLines,
    boxWidth,
    containerStyle,
    borderColor,
    secure,
    validate,
    editable,
    errorMessage,
    errorColor = 'red',
    bgColor,
    maxLength,
    items,
    selectedValue,
    DropDownData,
    DropDownHeigth,
    InputStyle,
    DropDownArrowColor
}) => {



    const backgroundColor = bgColor || 'white';
    const containerBorder = styles.outlined;

    return (
        // <View style={[{ padding: 0, width: boxWidth, }, style, styles.boxHeight]}>
        <View style={[{ padding: 0, width: boxWidth }, style, styles.boxHeight]}>
            {label ? <Text style={[styles.label, labelStyle]}>{label} {asterisksymbol ? <Text style={{ color: 'red' }}>*</Text> : ""}</Text> : ""}

            <View
            // style={[styles.container, containerBorder, containerStyle, { borderColor: borderColor }, { backgroundColor: backgroundColor }]}
            >
                <SelectDropdown
                    data={DropDownData}
                    onSelect={(selectedItem, index) => {
                        onChange(selectedItem)
                    }}

                    renderButton={(selectedItem, isOpened) => {
                        return (
                            <View
                                style={[styles.container, styles.DropContainer, containerBorder, { borderColor: borderColor }, { backgroundColor: backgroundColor }]}
                            >
                                {/* {selectedItem ?
                                selectedItem.images ?
                                    <Image
                                        source={selectedItem.images}
                                        style={{ width: 40, height: 35, resizeMode: 'center' }}
                                    /> : "" :""
                            } */}

                                <Text style={[styles.dropdownButtonTxtStyle, InputStyle, { flex: 1 }]}>
                                    {(selectedItem && selectedItem.name) || placeholder}
                                </Text>

                                {/* <Feather name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} /> */}

                                <FontAwesome name={isOpened ? 'caret-up' : 'caret-down'} style={[styles.dropdownButtonArrowStyle,{color:DropDownArrowColor}]} />

                            </View>
                        );
                    }}


                    renderItem={(item, index, isSelected) => {
                        return (
                            <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: 'rgba(40, 62, 113, 1)' }) }}>
                                {item.images ? <Image source={item.images} style={{ width: 40, height: 35, resizeMode: 'center' }} /> : <View style={{ height: 35 }}></View>}
                                <Text style={[styles.dropdownItemTxtStyle,{ textAlign: 'left',color:isSelected?"white":"black" }]}>{item.name}</Text>
                            </View>
                        );
                    }}
                    // showsVerticalScrollIndicator={false}
                    dropdownStyle={styles.dropdownMenuStyle}
                />
            </View>
            <Text style={{ color: errorColor, marginLeft: 15, fontSize: 12, }}>{errorMessage}</Text>
        </View>
    );
};

export default CustomDropdown2;


const styles = StyleSheet.create({

    label: {
        fontWeight: '400',
        marginBottom: 4,
        textTransform: 'none',
        fontFamily: 'Gilroy-Medium',
        fontSize: 14,
        // lineHeight: 24,
        // marginLeft:5
    },
    container: {
        // padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    DropContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45
    },
    dropdownButtonTxtStyle: {
        fontWeight: '400',
        // marginBottom: 4,
        textTransform: 'none',
        fontFamily: 'Gilroy-Medium',
        fontSize: 14,
        lineHeight: 24,
        // marginLeft:5
    },
    dropdownButtonArrowStyle: {
        fontSize: 14,
        color: 'white',

    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        // justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight:"semibold",
        // color: '#151E26',
        marginHorizontal: 10,
        fontFamily: 'Gilroy-Medium',
        fontSize: 14,
    },
    dropdownMenuStyle: {
        borderRadius: 8,
    },
    boxHeight: {
    },
    outlined: {
        // borderBottomColor: '#48484A',
        borderColor: '#48484A',
        borderWidth: 0.9,
        // borderCurve: 50,
    }
})