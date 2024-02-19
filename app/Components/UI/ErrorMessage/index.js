import { StyleSheet, Text} from 'react-native'
import React from 'react'
import { theme, typographyStyles } from "../../../Contants";

export default function ErrorMessage({children}){
    return(
        <Text style={[styles.error,
            // typographyStyles.xs
        ]}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    error: {
        color: "red",
        marginTop: 5,
      },
})