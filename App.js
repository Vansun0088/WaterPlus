import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar, TouchableOpacity, View, Text, Image } from 'react-native';

import GoalCalc from './screens/GoalCalc';
import MainScreen from './screens/MainScreen';
import SettingsScreen from './screens/SettingsScreen';
import GoalContextProvider from './context/goal-context';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabMain() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarIcon: () => {
          return (
            <View style={{ width: 30, height: 30 }}>
              <Image
                style={{ width: '100%', height: '100%' }}
                source={require('./images/femaleSymbBlack.png')}
              />
            </View>
          );
        },
      }}>
      <Tab.Screen name="MainScreen" component={MainScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

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
            <Stack.Screen name="BottomTabMain" component={BottomTabMain} />
          </Stack.Navigator>
        </NavigationContainer>
      </GoalContextProvider>
    </>
  );
};

export default App;
