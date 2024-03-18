import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons from Expo package

const CustomDateInput = ({
  label,
  value,
  placeholder,
  outlined,
  onBlur,
  leftIcon,
  onChangeText,
  boxWidth,
  borderColor,
  asterisksymbol,
  minimumDate,
  maximumDate,
  errorMessage,
  errorColor = 'red',
  bgColor = 'white',
  disabled = false,
}) => {
  const containerBorder = outlined ? styles.outlined : styles.standard;
  const [date, setDate] = useState(value); // Initialize date state with the provided value
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    onChangeText(currentDate.toLocaleDateString()); // Pass the formatted date to onChangeText
  };

  const showMode = (modeToShow) => {
    setShow(true);
    setMode(modeToShow);
  };

  return (
    <TouchableOpacity style={[{ padding: 0, width: boxWidth,overflow:'hidden' }]} 
    // onPress={() => showMode("date")}
    onPress={() => !disabled && showMode("date")} // Disable onPress if disabled prop is true
    disabled={disabled}
    
    >
      <Text style={styles.label}>{label} {asterisksymbol?<Text style={{color:'red'}}>*</Text>:""}</Text>
      <View style={[styles.container, containerBorder, { borderColor: borderColor }, { backgroundColor: bgColor }]}>
        {leftIcon ? <View style={{ paddingRight: 0 }}>{leftIcon}</View> : null}
        <TextInput
          placeholder={placeholder ? placeholder : label ? `Enter ${label}` : ''}
          value={date ? date.toLocaleDateString() : ''}
          onChange={()=>{console.log("ashvdj")}}
          editable={false}
          onPress={() => showMode("date")} // Use onPress instead of onPressIn for TextInput
          onBlur={onBlur}
          style={{ flex: 1,color:'black' }}
        />
        {show && (
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
           
          />
  
        )}



      </View>
      <Text style={{ color: errorColor, marginLeft: 15 }}>{errorMessage}</Text>
    </TouchableOpacity>
  );
};

export default CustomDateInput;

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
    paddingHorizontal: 15,
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
    borderWidth: 1,
  }
});
