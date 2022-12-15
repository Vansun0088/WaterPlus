import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar, View, Image } from 'react-native';
import { useContext, useLayoutEffect } from 'react';

import GoalCalc from './screens/GoalCalc';
import MainScreen from './screens/MainScreen';
import SettingsScreen from './screens/SettingsScreen';
import GoalContextProvider from './context/goal-context';
import { GoalContext } from './context/goal-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabBar from './components/TabBar/TabBar';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabMain() {
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          tabBarIcon: () => {
            return (
              <View style={{ width: 30, height: 30 }}>
                <Image
                  style={{ width: '100%', height: '100%' }}
                  source={require('./images/tabBar/barMain.png')}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: () => {
            return (
              <View style={{ width: 30, height: 30 }}>
                <Image
                  style={{ width: '100%', height: '100%' }}
                  source={require('./images/tabBar/barSettings.png')}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

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
            initialRouteName="BottomTabMain"
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
