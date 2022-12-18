import { StyleSheet, View } from 'react-native';

import TabBarIcon from './TabBarIcon';

export default function TabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.rootTabBar}>
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
          <View key={index} style={styles.iconContainer}>
            <TabBarIcon
              onPress={onPress}
              isFocused={isFocused}
              options={options}
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  rootTabBar: {
    height: '2%',
    backgroundColor: '#3a3afd',
    flexDirection: 'row',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
