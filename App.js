import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { useContext, useLayoutEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GoalContext } from './context/goal-context';
import GoalCalc from './screens/GoalCalc';
import GoalContextProvider from './context/goal-context';
import BottomTabMain from './navigators/BottomTabMain';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const App = () => {
  const GoalCtx = useContext(GoalContext);

  useLayoutEffect(() => {
    async function fetchGoal() {
      const storedGoal = await AsyncStorage.getItem('dailyGoal');
      if (storedGoal) {
        GoalCtx.setDailyGoal(storedGoal);
      }
    }
    fetchGoal();
  });

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="rgba(0, 0, 0, 0)"
      />
      <GoalContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: 'black' },
            }}>
            <Stack.Screen name="GoalCalc" component={GoalCalc} />
            <Stack.Screen name="BottomTabMain" component={BottomTabMain} />
          </Stack.Navigator>
        </NavigationContainer>
      </GoalContextProvider>
    </>
  );
};

export default App;
