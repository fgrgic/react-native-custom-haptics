# react-native-custom-haptics

Custom haptic patterns for React Native. Built on top of `expo-haptics` package.

## Installation

This module uses `expo-haptics` as a peer dependency

### npm

```sh
npm i -s expo expo-haptics
npm i -s react-native-custom-haptics
```

### yarn

```sh
yarn add expo expo-haptics
yarn add react-native-custom-haptics
```

If you're using managed workflow, this is enough. For bare workflow you should also follow these [additional installation instructions](https://github.com/expo/expo/tree/main/packages/expo-haptics).

## Usage

Similar to React Native's Vibrate, `react-native-custom-haptics` uses an array that describes the pattern.

```ts
const SUCCESS_PATTERN = ['light', 300, 'light', 300, 'heavy'];
```

Every even index will be evaluated as a description of the impact, and every odd inded as a pause between the vibrations.

```ts
// App.tsx
import { HapticsProvider } from 'react-native-custom-haptics';

// ...

const App = () => {
  return (
    <HapticsProvider>
      // <RestOfTheApp />
    </HapticsProvider>
  );
};
```

```ts
// Screen.tsx
import { useHaptics } from 'react-native-custom-haptics';

const Screen = () => {
  const { trigger, stop } = useHaptics();

  React.useEffect(() => {
    // stops the haptic pattern on cleanup
    return () => stop();
  }, []);

  return (
    <View>
      <Button title="Press Me" onPress={() => trigger(...SUCCESS_PATTERN)} />
    </View>
  );
};

export default App;
```

## Advanced Usage

Define a set of constants for the haptic feedbacks inside the application:

```ts
// haptics.config.ts
export const SUCCESS = ['light', 300, 'light', 400, 'heavy'];
export const WARNING = ['light', 300, 'heavy', 300, 'light'];
export const ERROR = ['heavy', 300, 400];
```

```ts
// CustomButton.tsx
// ...
import { useHaptics } from 'react-native-custom-haptics';

import * as patterns from '.../haptics.config'

const PrimaryButton = () => {
  const {trigger, stop} => useHaptics();

  React.useEffect(() => () => stop(), [])

  return (
    <Pressable style={...} onPress={() => trigger(...patterns.SUCCESS)}>
      <Text>Press</Text>
    </Pressable>
  )
}

// ...

export default PrimaryButton;
```

## Package Exports

| Name               | description                                            |
| ------------------ | ------------------------------------------------------ |
| `HapticsProvider`  | wrapper for the app                                    |
| `useHaptics`       | set of functions to trigger haptic patterns            |
| `HapticImpactType` | type of haptic impact. Read more [here](#impact-type). |

### `useHaptics`

|                                 |                                                                                      |
| ------------------------------- | ------------------------------------------------------------------------------------ |
| `trigger(...pattern: Impact[])` | triggers a haptics pattern passed as an argument. [Impact Type](#impact-type).       |
| `stop()`                        | stops running the pattern if any exists                                              |
| `isRunning`                     | boolean that is `true` if any haptic pattern is currently running, `false` otherwise |

### Impact Type

Impact can be:

- `"light"`: light impact
- `"medium"`: medium impact
- `"heavy"`: heavy impact
- `"vibrate"`: vibrate for 400ms (default value for Android and the only possible valuse for iOS)
- `number`: set the length of vibration in `ms` on Android, iOS will always vibrate for 400ms.

```ts
type Impact = 'light' | 'medium' | 'heavy' | 'vibrate' | number;
```

## License

MIT
