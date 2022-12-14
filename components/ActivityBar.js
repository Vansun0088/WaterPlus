import { useContext, useLayoutEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GoalContext } from '../context/goal-context';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ActivityBar() {
  const [boxPosition, setBoxPosition] = useState('light');
  const GoalCtx = useContext(GoalContext);

  function toggleBox(level) {
    LayoutAnimation.configureNext({
      duration: 150,
      create: { type: 'easeIn', property: 'opacity' },
      update: { type: 'easeIn', property: 'opacity' },
      delete: { type: 'linear', property: 'opacity' },
    });
    setBoxPosition(level);
    GoalCtx.setActivityLevel(level);
  }

  useLayoutEffect(() => {
    async function fetchLevel() {
      const storedLevel = await AsyncStorage.getItem('activityLevel');
      if (storedLevel) {
        GoalCtx.setActivityLevel(storedLevel);
        setBoxPosition(storedLevel);
      }
    }
    fetchLevel();
  }, []);

  return (
    <View style={styles.activityBar}>
      <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <Animated.View
          style={[
            styles.animView,
            boxPosition === 'moderate'
              ? styles.moveCenter
              : boxPosition === 'high'
              ? styles.moveRight
              : styles.moveLeft,
          ]}
        />
      </View>
      <Pressable
        onPress={() => {
          toggleBox('light');
        }}
        style={styles.pressableContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Light</Text>
          <Text style={styles.text}>(0-2H)</Text>
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          toggleBox('moderate');
        }}
        style={styles.pressableContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Moderate</Text>
          <Text style={styles.text}>(2-4H)</Text>
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          toggleBox('high');
        }}
        style={styles.pressableContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>High</Text>
          <Text style={styles.text}>(4H+)</Text>
        </View>
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
  animView: {
    flex: 1,
    width: '33.33%',
    height: '100%',
    backgroundColor: 'grey',
    borderRadius: 10,
  },
  moveLeft: {
    alignSelf: 'flex-start',
  },
  moveCenter: {
    alignSelf: 'center',
  },
  moveRight: {
    alignSelf: 'flex-end',
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
