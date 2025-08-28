import { Pressable, StyleSheet, Text, View } from 'react-native'

const CustomButton = ({ onPress, leftIcon, children ,bgColor,styleData }) => {
 
  return (
    <Pressable style={({ pressed }) => [styles.button,styleData, pressed && styles.pressed]} onPress={onPress}>
      <View style={{marginRight:10}}>{leftIcon}</View>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#030370',
    borderRadius: 20,
    paddingVertical: 15,
    margin: 10,
    width: '78%'
  },
  pressed: {
    opacity: 0.7
  },
  icon: {
    marginRight: 6
  },
  text: {
    color:  '#fff5ee',
    fontSize: 16,
    fontWeight: '400'
  }
})

