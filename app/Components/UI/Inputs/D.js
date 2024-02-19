import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker';
const D = () => {
    const [selectedLanguage, setSelectedLanguage] = useState();
    return (
        <View>
            <Text>D</Text>

            <View

            >
                <Picker
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                    }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
            </View>


        </View>

    )
}

export default D

const styles = StyleSheet.create({})