import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

const Marquee = ({ text, duration = 10000 }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const { width: windowWidth } = Dimensions.get('window');

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
    ).start();
  }, [animatedValue, duration]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [windowWidth, -windowWidth],
  });

  return (

    <Animated.Text
    numberOfLines={1}
      style={[
        styles.text,
        {
          transform: [{ translateX }],
        },
      ]}
    >
      {text}
    </Animated.Text>

  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: '100%',
    // Adjust as needed
  },
  text: {
    // fontSize: 24, // Adjust as needed
    // whiteSpace: 'nowrap',
  },
});

export default Marquee;
