import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function Option({ path, image, children }) {
  const navigation = useNavigation();

  function navigateTo() {
    navigation.navigate(path);
  }

  return (
    <Pressable
      onPress={navigateTo}
      style={({ pressed }) => [
        styles.pressableContainer,
        pressed && styles.pressed,
      ]}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <Text style={styles.catText}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  pressableContainer: {
    padding: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#777777ff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  pressed: {
    backgroundColor: '#c9c7c7',
  },
  catText: {
    color: 'black',
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 10,
  },
});
