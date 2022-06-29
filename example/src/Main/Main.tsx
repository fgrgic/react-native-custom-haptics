import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { useHaptics } from 'react-native-custom-haptics';

interface IMain {}

const Main = (props: IMain) => {
  const { trigger, stop, isRunning } = useHaptics();
  return (
    <View style={styles.container}>
      <Button
        title="Press me"
        onPress={() => {
          if (isRunning) stop();
          trigger(['select', 300, 'select', 300, 'heavy', 300, 'heavy']);
        }}
      />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
