import { StyleSheet, Text, View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { useContext, useLayoutEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GoalContext } from '../../context/goal-context';

export default function SliderWeight() {
  const GoalCtx = useContext(GoalContext);

  useLayoutEffect(() => {
    async function fetchDailyGoal() {
      const storedWeight = await AsyncStorage.getItem('weight');
      if (storedWeight) {
        GoalCtx.setWeight(storedWeight);
      }
    }
    fetchDailyGoal();
  }, []);

  return (
    <Slider
      animateTransitions
      maximumTrackTintColor="#212121ff"
      minimumTrackTintColor="#ffffff71"
      maximumValue={200}
      minimumValue={20}
      onValueChange={GoalCtx.setWeight}
      value={GoalCtx.weight}
      step={1}
      renderThumbComponent={() => {
        return (
          <View style={styles.thumbContainer}>
            <View style={styles.thumbInnerContainer}>
              <Text style={styles.thumbText}>{GoalCtx.weight}</Text>
            </View>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  thumbContainer: {
    padding: 2,
    backgroundColor: '#fff',
    borderRadius: 40,
  },
  thumbInnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    width: 45,
    height: 45,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#000',
  },
  thumbText: {
    fontSize: 19,
    color: '#000',
    fontWeight: 'bold',
  },
});
