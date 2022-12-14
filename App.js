import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import GoalCalc from './screens/GoalCalc';
import MainScreen from './screens/MainScreen';
import GoalContextProvider from './context/goal-context';

const Stack = createNativeStackNavigator();

const App = () => {
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
              contentStyle: { backgroundColor: '#000' },
            }}>
            <Stack.Screen name="GoalCalc" component={GoalCalc} />
            <Stack.Screen name="MainScreen" component={MainScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GoalContextProvider>
    </>
  );
};

export default App;
