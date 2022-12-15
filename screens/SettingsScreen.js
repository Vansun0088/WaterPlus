import { StyleSheet, Text, View } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.text}>Добро Пожаловать!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    color: 'black',
    fontSize: 30,
  },
});
