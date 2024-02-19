import {
    TouchableOpacity,
    Text,
    StyleSheet,
    TouchableOpacityProps,
    ViewStyle,
  } from "react-native";
  import { theme, typographyStyles } from "../../../Contants";
  import React, { ReactNode } from "react";



  export default function Button({
    children,
    bgColor = "",
    btnStyle,
    ...otherProps
  }) {
    bgColor = bgColor ? bgColor : theme.colors.primaryBlue;
    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: bgColor }, btnStyle]}
        activeOpacity={0.5}
        {...otherProps}
      >
        <Text style={[styles.buttonText, typographyStyles.md]}>{children}</Text>
      </TouchableOpacity>
    );
  }
  
  const styles = StyleSheet.create({
    button: {
      paddingVertical: 4,
      paddingHorizontal: 10,
      height: 45,
      width: 300,
      borderRadius: 6,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      fontWeight: "600",
      color: "white",
      fontSize: 16,
    },
  });
  