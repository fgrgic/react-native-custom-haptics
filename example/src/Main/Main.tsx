import React from 'react';
import { Button, View } from 'react-native';

interface IMain {}

const Main = (props: IMain) => {
  return (
    <View>
      <Button title="Press me" />
    </View>
  );
};

export default Main;
