import { StyleSheet, Pressable, View, Image, Animated } from 'react-native';
import { useContext, useLayoutEffect, useState } from 'react';
import { GoalContext } from '../../context/goal-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GenderButtons() {
  const GoalCtx = useContext(GoalContext);
  const [maleImage, setMaleImage] = useState(
    require('../../images/manSymb.png'),
  );
  const [femaleImage, setFemaleImage] = useState(
    require('../../images/femaleSymb.png'),
  );
  const [maleAnim, setMaleAnim] = useState(new Animated.Value(0));
  const [femaleAnim, setFemaleAnim] = useState(new Animated.Value(0));

  const maleAnimHandler = () => {
    setMaleImage(require('../../images/manSymbBlack.png'));
    setFemaleImage(require('../../images/femaleSymb.png'));
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
    setFemaleImage(require('../../images/femaleSymbBlack.png'));
    setMaleImage(require('../../images/manSymb.png'));
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
            <Image source={maleImage} style={styles.image} />
          </Animated.View>
        </Pressable>
        <Pressable onPress={femaleAnimHandler}>
          <Animated.View style={[styles.imageContainer, animatedFemale]}>
            <Image source={femaleImage} style={styles.image} />
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
