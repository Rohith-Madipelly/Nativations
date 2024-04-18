import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CustomPicker = ({
    label = 'Select',
    value,
    placeholder = `Select ${label}`,
    items = [],
    onValueChange,
    containerStyle,
    labelStyle,
    pickerStyle,
    rightIcon,
    borderColor,
    asterisksymbol,
    leftIcon,
    error,
    errorMessage,
    boxWidth,
    errorColor = 'red',
    bgColor = 'white',
    outlined,
}) => {
    const containerBorder = outlined ? styles.outlined : styles.standard;
    return (
        <View style={{ padding: 0, width: boxWidth }}>
            <Text style={styles.label}>{label} {asterisksymbol?<Text style={{color:'red'}}>*</Text>:""}</Text>
            <View style={[styles.container, containerBorder, { borderColor: borderColor }, { backgroundColor: bgColor }]}>
                {leftIcon ? <View style={{ paddingRight: 8 }}>
                    {leftIcon}

                </View> : ""}
                <View style={{ width: '100%', justifyContent: 'center', height: 30 }}>
                    <Picker
                        selectedValue={value}
                        onValueChange={onValueChange}
                        style={[styles.picker, pickerStyle]}
                    >
                        {items.map((item, index) => (
                            <Picker.Item key={index} label={item.label} value={item.value} />
                        ))}
                    </Picker>
                </View>
                {rightIcon?<View style={{ paddingLeft: 8 }}>
                    {rightIcon}

                </View>:""}
                </View>
                {/* {error && <Text style={{ color: errorColor, marginLeft: 15 }}>{error}</Text>} */}
                <Text style={{ color: errorColor, marginLeft: 15 }}>{errorMessage}</Text>
          
        </View>
    );
};

export default CustomPicker;

const styles = StyleSheet.create({
    // container: {
    //     width: '100%',
    //     marginBottom: 20,
    // },
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
        paddingHorizontal: 10,


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
    },
    label: {
        fontWeight: '500',
        marginBottom: 4,
        textTransform: 'none',
    },
    pickerContainer: {
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
    picker: {
        height: 40,
    },
});
