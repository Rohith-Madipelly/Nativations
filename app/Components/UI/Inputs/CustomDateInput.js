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
  errorMessage,
  errorColor = 'red',
  bgColor = 'white',
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
    <TouchableOpacity style={[{ padding: 0, width: boxWidth }]} onPress={() => showMode("date")}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.container, containerBorder, { borderColor: borderColor }, { backgroundColor: bgColor }]}>
        {leftIcon ? <View style={{ paddingRight: 8 }}>{leftIcon}</View> : null}
        <TextInput
          placeholder={placeholder ? placeholder : label ? `Enter ${label}` : ''}
          value={date ? date.toLocaleDateString() : ''}
          onChange={()=>{console.log("ashvdj")}}
          editable={false}
          onPress={() => showMode("date")} // Use onPress instead of onPressIn for TextInput
          onBlur={onBlur}
          style={{ flex: 4 }}
        />
        {show && (
          <DateTimePicker
            value={date || new Date()} // Pass date or current date if not provided
            mode={mode}
            display={"spinner"}
            is24Hour={true}
            minimumDate={new Date()}
            maximumDate={new Date(2090, 10, 20)}
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
