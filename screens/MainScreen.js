import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { GoalContext } from '../context/goal-context';

export default function MainScreen() {
  const GoalCtx = useContext(GoalContext);

  useLayoutEffect(() => {
    async function fetchGoal() {
      const storedGoal = await AsyncStorage.getItem('dailyGoal');
      if (storedGoal) {
        GoalCtx.setDailyGoal(storedGoal);
      }
    }
    fetchGoal();
  }, []);

  return (
    <LinearGradient
      start={{ x: 0, y: 0.25 }}
      end={{ x: 0.5, y: 1 }}
      colors={['#4c669f', '#41bcd2']}
      style={styles.rootContainer}>
      <View style={styles.roundIconContainer}>
        <View style={styles.roundIconInnerContainer}>
          <Text style={styles.dailyGoalText}>{GoalCtx.dailyGoal}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
  },
  roundIconContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 200,
    padding: 0,
  },
  roundIconInnerContainer: {
    flex: 1,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dailyGoalText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
