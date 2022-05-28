import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import Main from './Main';
import { HapticsProvider } from 'react-native-custom-haptics';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  // React.useEffect(() => {
  //   multiply(24, 3).then(setResult);
  // }, []);

  return (
    <HapticsProvider>
      <Main />
    </HapticsProvider>
  );
}

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
