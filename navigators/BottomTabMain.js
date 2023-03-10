import { StyleSheet, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabBar from '../components/TabBar/TabBar';
import MainScreen from '../screens/MainScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function BottomTabMain() {
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
                  source={require('../images/tabBar/barMain.png')}
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
                  source={require('../images/tabBar/barSettings.png')}
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

const styles = StyleSheet.create({});
