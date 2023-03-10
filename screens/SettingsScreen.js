import { StyleSheet, View, Text, Pressable } from 'react-native';
import React, { useCallback, useMemo, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';

import Option from '../components/SettingsScreen/Option.js';

export default function SettingsScreen() {
  const bottomSheetRef = useRef(null);

  const snapPoints = ['100%', '50%'];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Option image={require('../images/settingsIcons/star.png')}>
        Change Goal
      </Option>
      <View style={styles.container}>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}>
          <View style={styles.contentContainer}>
            <Pressable>
              <Text>TEST</Text>
            </Pressable>
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
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
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
