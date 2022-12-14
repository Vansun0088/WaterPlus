import { Pressable, StyleSheet, Text } from 'react-native';
import { useContext, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import GenderButtons from '../components/GoalCalc/GenderButtons';
import { GoalContext } from '../context/goal-context';
import ActivityBar from '../components/GoalCalc/ActivityBar';
import SliderWeight from '../components/GoalCalc/SliderWeight';
import CatTitle from '../components/GoalCalc/CatTitle';

export default function GoalCalc({ navigation }) {
  const GoalCtx = useContext(GoalContext);

  function mainScreenNavigate() {
    navigation.navigate('BottomTabMain');
  }

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
      <Text style={styles.title}>Goal Calculator</Text>
      <GenderButtons />
      <CatTitle>GENDER</CatTitle>
      <SliderWeight />
      <CatTitle>WEIGHT</CatTitle>
      <ActivityBar />
      <CatTitle>ACTIVITY LEVEL</CatTitle>
      <Text style={styles.goalText}>Daily Goal:</Text>
      <Text style={styles.goalNumber}>{GoalCtx.dailyGoal}ml</Text>
      <Pressable
        onPress={mainScreenNavigate}
        style={({ pressed }) => [
          styles.buttonContainer,
          pressed && styles.pressed,
        ]}>
        <Text style={styles.buttonText}>Confirm</Text>
      </Pressable>
      <Text style={styles.noteText}>
        Note: You can change it later in the app settings
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 25,
  },
  goalText: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  goalNumber: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    marginTop: 30,
  },
  noteText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 2,
    paddingVertical: 20,
    marginTop: 25,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
  pressed: {
    opacity: 0.5,
    backgroundColor: 'white',
  },
});
