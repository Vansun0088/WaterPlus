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
      style={styles.rootGradient}>
      <View style={styles.rootContainer}>
        <View style={styles.roundIconContainer}>
          <View style={styles.waterLine}></View>
          <View style={styles.roundIconInnerContainer}>
            <Text style={styles.dailyGoalText}>{GoalCtx.dailyGoal}</Text>
          </View>
        </View>
        <View style={styles.graphsContainer}>
          <View style={styles.graphContainer}>
            <Text>Calendar</Text>
          </View>
          <View style={styles.graphContainer}>
            <Text>Graph</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootGradient: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    alignItems: 'center',
  },
  roundIconContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 200,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  waterLine: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '85%',
    backgroundColor: '#266ccd',
    alignSelf: 'flex-end',
  },
  roundIconInnerContainer: {
    flex: 1,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dailyGoalText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  graphsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  graphContainer: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    backgroundColor: '#ffffff50',
    borderRadius: 20,
  },
});
