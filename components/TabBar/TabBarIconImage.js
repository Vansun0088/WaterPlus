import { StyleSheet, Image, View } from 'react-native';

export default function TabBarIconImage(size, color, imageUri) {
  return (
    <View style={{ width: size, height: size }}>
      <Image
        style={{ width: '100%', height: '100%' }}
        source={require('../../images/tabBar/barMain.png')}
        tintColor={color}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
