import React from 'react';
import { Button, View, Text } from 'react-native';
import { HapticsProvider, useHaptics } from 'react-native-custom-haptics';
// import HapticsProvider from 'react-native-custom-haptics';

interface IMain {}

const Main = (props: IMain) => {
  const { run, stop, isRunning } = useHaptics();
  return (
    <View>
      <Text>ftroafjds</Text>
      <Text>ftroafjds</Text>
      <Text>ftroafjds</Text>
      <Text>ftroafjds</Text>
      <Text>ftroafjds</Text>
      <Button
        title="Press meeee"
        onPress={() => {
          if (isRunning) stop();
          run('light', 300, 'heavy');
        }}
      />
    </View>
  );
};

export default Main;
