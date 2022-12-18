import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar, View, Image } from 'react-native';
import { useContext, useLayoutEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GoalContext } from './context/goal-context';
import GoalCalc from './screens/GoalCalc';
import MainScreen from './screens/MainScreen';
import SettingsScreen from './screens/SettingsScreen';
import GoalContextProvider from './context/goal-context';
import TabBar from './components/TabBar/TabBar';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabMain() {
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: '#0000ff',
        tabBarInactiveTintColor: '#3a3afd',
        headerStyle: { backgroundColor: '#3a3afd' },
      }}>
      <Tab.Screen
        name="Main"
        component={MainScreen}
        options={{
          headerShown: false,
          tabBarIcon: (size, color) => {
            return (
              <View style={{ width: size, height: size }}>
                <Image
                  style={{ width: '100%', height: '100%' }}
                  source={require('./images/tabBar/barMain.png')}
                  tintColor={color}
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
          tabBarIcon: (size, color) => {
            return (
              <View style={{ width: size, height: size }}>
                <Image
                  style={{ width: '100%', height: '100%' }}
                  source={require('./images/tabBar/barSettings.png')}
                  tintColor={color}
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
