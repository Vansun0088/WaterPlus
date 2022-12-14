import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { useContext, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import GenderButtons from '../components/GenderButtons';
import { GoalContext } from '../context/goal-context';
import ActivityBar from '../components/ActivityBar';
import SliderWeight from '../components/SliderWeight';

export default function GoalCalc() {
  const GoalCtx = useContext(GoalContext);

  useEffect(() => {
    if (GoalCtx.gender) {
      let dailyGoal =
        GoalCtx.weight * (GoalCtx.gender === 'male' ? 0.028 : 0.024);
      if (GoalCtx.activityLevel) {
        dailyGoal = (
          (dailyGoal +
            (GoalCtx.activityLevel === 'moderate'
              ? 1
              : GoalCtx.activityLevel === 'high'
              ? 2.1
              : 0)) *
          1000
        ).toFixed(0);
      }
      GoalCtx.setDailyGoal(dailyGoal);
      return;
    }
  }, [GoalCtx]);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <KeyboardAvoidingView style={styles.flexContainer}>
        <ScrollView
          accessibility={false}
          bounces={false}
          style={styles.flexContainer}>
          <Text style={styles.title}>Goal Calculator</Text>
          <GenderButtons />
          <Text style={styles.catTitle}>GENDER</Text>
          <SliderWeight />
          <Text style={styles.catTitle}>WEIGHT</Text>
          <ActivityBar />
          <Text style={styles.catTitle}>ACTIVITY LEVEL</Text>
          <Text style={styles.goalText}>Daily Goal:</Text>
          <Text style={styles.goalText}>{GoalCtx.dailyGoal}ml</Text>
          <Text style={styles.noteText}>
            Note: You can change it later in the app settings
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  flexContainer: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 25,
  },
  catTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    marginVertical: 15,
  },
  goalText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  noteText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginVertical: 20,
  },
});
