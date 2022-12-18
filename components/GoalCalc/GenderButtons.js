import { StyleSheet, Pressable, View, Image, Animated } from 'react-native';
import { useContext, useLayoutEffect, useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GoalContext } from '../../context/goal-context';

export default function GenderButtons() {
  const GoalCtx = useContext(GoalContext);
  const [maleColor, setMaleColor] = useState('white');
  const [femaleColor, setFemaleColor] = useState('black');
  const maleAnim = useRef(new Animated.Value(0)).current;
  const femaleAnim = useRef(new Animated.Value(0)).current;

  const maleAnimHandler = () => {
    setFemaleColor('white');
    setMaleColor('black');
    Animated.timing(femaleAnim, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(maleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
    GoalCtx.setGender('male');
  };

  const femaleAnimHandler = () => {
    setMaleColor('white');
    setFemaleColor('black');
    Animated.timing(maleAnim, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(femaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
    GoalCtx.setGender('female');
  };

  const maleAnimStyle = maleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0, 0, 0, 0)', 'white'],
  });

  const femaleAnimStyle = femaleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0, 0, 0, 0)', 'white'],
  });

  const animatedMale = {
    backgroundColor: maleAnimStyle,
  };

  const animatedFemale = {
    backgroundColor: femaleAnimStyle,
  };

  useLayoutEffect(() => {
    async function fetchGender() {
      const storedMode = await AsyncStorage.getItem('gender');
      if (storedMode) {
        GoalCtx.setGender(storedMode);
        storedMode === 'male' ? maleAnimHandler() : femaleAnimHandler();
      }
    }
    fetchGender();
  }, []);

  return (
    <>
      <View style={styles.genderButtons}>
        <Pressable onPress={maleAnimHandler}>
          <Animated.View style={[styles.imageContainer, animatedMale]}>
            <Image
              source={require('../../images/genderButtons/manSymb.png')}
              style={styles.image}
              tintColor={maleColor}
            />
          </Animated.View>
        </Pressable>
        <Pressable onPress={femaleAnimHandler}>
          <Animated.View style={[styles.imageContainer, animatedFemale]}>
            <Image
              source={require('../../images/genderButtons/femaleSymb.png')}
              style={styles.image}
              tintColor={femaleColor}
            />
          </Animated.View>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  genderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 0,
  },
  imageContainer: {
    width: 75,
    height: 75,
    padding: 12,
    borderRadius: 100,
    borderColor: 'white',
    borderWidth: 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
