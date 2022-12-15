import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState } from 'react';

export const GoalContext = createContext({
  gender: '',
  setGender: gender => {},
  weight: {},
  setWeight: weight => {},
  dailyGoal: {},
  setDailyGoal: goal => {},
  activityLevel: '',
  setActivityLevel: activityLevel => {},
});

function GoalContextProvider({ children }) {
  const [chosenGender, setChosenGender] = useState();
  const [chosenWeight, setChosenWeight] = useState(30);
  const [chosenActivityLevel, setChosenActivityLevel] = useState('light');
  const [goal, setGoal] = useState();

  function setGender(mode) {
    setChosenGender(mode);
    AsyncStorage.setItem('gender', mode);
  }

  async function setWeight(kg) {
    setChosenWeight(kg);
    AsyncStorage.setItem('weight', kg.toString());
  }

  function setDailyGoal(ml) {
    setGoal(ml);
    AsyncStorage.setItem('dailyGoal', ml.toString());
  }

  function setActivityLevel(level) {
    setChosenActivityLevel(level);
    AsyncStorage.setItem('activityLevel', level);
  }

  const value = {
    gender: chosenGender,
    setGender: setGender,
    weight: chosenWeight,
    setWeight: setWeight,
    dailyGoal: goal,
    setDailyGoal: setDailyGoal,
    activityLevel: chosenActivityLevel,
    setActivityLevel: setActivityLevel,
  };

  return <GoalContext.Provider value={value}>{children}</GoalContext.Provider>;
}

export default GoalContextProvider;
