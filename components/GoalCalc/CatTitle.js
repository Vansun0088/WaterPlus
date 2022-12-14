import { StyleSheet, Text, View } from 'react-native';

export default function CatTitle({ children }) {
  return <Text style={styles.catTitle}>{children}</Text>;
}

const styles = StyleSheet.create({
  catTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    marginVertical: 15,
  },
});
