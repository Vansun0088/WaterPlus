import { useRef } from 'react';
import { StyleSheet, Pressable, Animated, View } from 'react-native';

export default function TabBarIcon({ options, onPress }) {
  const animValue = useRef(new Animated.Value(1)).current;

  function tabBarAnimHandler() {
    Animated.timing(animValue, {
      toValue: 1.2,
      duration: 200,
      useNativeDriver: false,
    }).start();
    onPress();
  }

  function tabBarAnimOutHandler() {
    Animated.timing(animValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }

  const animStyles = {
    transform: [
      {
        scale: animValue,
      },
    ],
  };

  return (
    <Animated.View style={animStyles}>
      <Pressable
        testID={options.tabBarTestID}
        onPress={tabBarAnimHandler}
        onPressOut={tabBarAnimOutHandler}
        style={{
          padding: 5,
          borderRadius: 30,
          borderWidth: 4,
          borderColor: '#294593',
          marginBottom: 50,
        }}>
        {options.tabBarIcon()}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({});
