import { StyleSheet } from 'react-native';
import Option from '../components/SettingsScreen/Option.js';

export default function SettingsScreen() {
  return (
    <Option
      path={'GoalCalc'}
      image={require('../images/settingsIcons/star.png')}>
      Change Goal
    </Option>
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
