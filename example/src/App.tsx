import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import Main from './Main';
import { HapticsProvider } from 'react-native-custom-haptics';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();
  return (
    <HapticsProvider>
      <Main />
    </HapticsProvider>
  );
}
