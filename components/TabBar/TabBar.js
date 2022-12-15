import { StyleSheet, View, Animated } from 'react-native';

import TabBarIcon from './TabBarIcon';

export default function TabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        height: '3%',
        backgroundColor: '#294593',
        flexDirection: 'row',
      }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Animated.View
            key={index}
            style={[
              {
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
              },
            ]}>
            <TabBarIcon onPress={onPress} options={options} />
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({});
