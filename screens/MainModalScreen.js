import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function MainModalScreen() {
  return (
    <GestureHandlerRootView>
      <View>
        <Text>MainModalScreen</Text>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
