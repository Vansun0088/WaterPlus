import { useRef } from 'react';
import { StyleSheet, Pressable, Animated } from 'react-native';

export default function TabBarIcon({ options, onPress, isFocused }) {
  const animValue = useRef(new Animated.Value(1)).current;

  const currentColor = isFocused
    ? options.tabBarActiveTintColor
    : options.tabBarInactiveTintColor;

  function tabBarAnimHandler() {
    Animated.timing(animValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }

  function tabBarAnimOutHandler() {
    Animated.timing(animValue, {
      toValue: 1.2,
      duration: 100,
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
    <Pressable
      testID={options.tabBarTestID}
      onPress={() => {
        tabBarAnimHandler();
        onPress();
      }}
      onPressIn={tabBarAnimOutHandler}
      onTouchEnd={tabBarAnimHandler}
      style={{ padding: 5 }}>
      <Animated.View
        style={[
          styles.rootContainer,
          { borderColor: currentColor },
          animStyles,
        ]}>
        {options.tabBarIcon(30, currentColor)}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    padding: 5,
    borderRadius: 30,
    borderWidth: 4,
    marginBottom: 40,
    borderBottomWidth: 0,
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },
});
