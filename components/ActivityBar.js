import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GoalContext } from '../context/goal-context';

export default function ActivityBar() {
  const [levelAnim, setLevelAnim] = useState(new Animated.Value(0));
  const [levelFontAnim, setFontLevelAnim] = useState(new Animated.Value(0));
  const [levelActivity, setLevelActivity] = useState(0);

  const GoalCtx = useContext(GoalContext);

  function selectLevel(level) {
    GoalCtx.setActivityLevel(level);
  }

  function levelChangeHandler(level) {
    setLevelActivity(level);
    Animated.timing(levelAnim, {
      toValue: 1,
      duration: 200,
    }).start(() => {
      Animated.timing(levelFontAnim, {
        toValue: 1,
        duration: 0,
      }).start();
    });
  }

  function levelNullHandler(level) {
    Animated.timing(levelAnim, {
      toValue: 0,
      duration: 200,
    }).start(() => {
      Animated.timing(levelFontAnim, {
        toValue: 0,
        duration: 0,
      }).start();
    });
    setLevelActivity(level);
  }

  const levelFontAnimInt = levelFontAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['white', 'black'],
  });

  const levelAnimInt = levelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['black', 'white'],
  });

  const levelFontAnimStyle = {
    color: levelFontAnimInt,
  };

  const levelAnimStyle = {
    backgroundColor: levelAnimInt,
  };

  useLayoutEffect(() => {
    async function fetchLevel() {
      const storedLevel = await AsyncStorage.getItem('activityLevel');
      if (storedLevel) {
        GoalCtx.setActivityLevel(storedLevel);
      }
    }
    fetchLevel();
  }, []);

  return (
    <View style={styles.activityBar}>
      <Pressable
        onPress={async () => {
          await levelNullHandler(1);
          levelChangeHandler(1);
          selectLevel('light');
        }}
        style={styles.pressableContainer}>
        <Animated.View
          style={[styles.textContainer, levelActivity === 1 && levelAnimStyle]}>
          <Animated.Text
            style={[styles.text, levelActivity === 1 && levelFontAnimStyle]}>
            Light
          </Animated.Text>
        </Animated.View>
      </Pressable>
      <Pressable
        onPress={async () => {
          await levelNullHandler(2);
          levelChangeHandler(2);
          selectLevel('moderate');
        }}
        style={styles.pressableContainer}>
        <Animated.View
          style={[styles.textContainer, levelActivity === 2 && levelAnimStyle]}>
          <Animated.Text
            style={[styles.text, levelActivity === 2 && levelFontAnimStyle]}>
            Moderate
          </Animated.Text>
        </Animated.View>
      </Pressable>
      <Pressable
        onPress={async () => {
          levelChangeHandler(3);
          levelNullHandler(3);
          selectLevel('high');
        }}
        style={styles.pressableContainer}>
        <Animated.View
          style={[styles.textContainer, levelActivity === 3 && levelAnimStyle]}>
          <Animated.Text
            style={[styles.text, levelActivity === 3 && levelFontAnimStyle]}>
            High
          </Animated.Text>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  activityBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    flex: 1,
  },
  pressableContainer: {
    flex: 1,
    width: '33.33%',
  },
  textContainer: {
    paddingVertical: 12,
    borderRadius: 8,
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
