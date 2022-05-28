import React from 'react';
import { Button, View } from 'react-native';
// import { HapticsProvider, useHaptics } from 'react-native-custom-haptics';
import HapticsProvider from 'react-native-custom-haptics';

interface IMain {}

const Main = (props: IMain) => {
  return (
    <View>
      <Button title="Press meeee" />
      <HapticsProvider />
    </View>
  );
};

export default Main;
