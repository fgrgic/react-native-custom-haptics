# react-native-custom-haptics

Custom haptic patterns for React Native. Built on top of `expo-haptics` package.

[Updating from previous versions](#updating)

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
      <Button title="Press Me" onPress={() => trigger(SUCCESS_PATTERN)} />
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
    <Pressable style={...} onPress={() => trigger(patterns.SUCCESS)}>
      <Text>Press</Text>
    </Pressable>
  )
}

// ...

export default PrimaryButton;
```

## Package Exports

| name               | description                                                       |
| ------------------ | ----------------------------------------------------------------- |
| `HapticsProvider`  | wrapper for the app                                               |
| `useHaptics`       | set of functions to trigger haptic patterns                       |
| `HapticImpactType` | type of haptic impact. Read more [here](#impact-type).            |
| `HapticsOptions`   | type of additional, optional options. Read more [here](#options). |

### `useHaptics`

| exported value                                         | description                                                                                        |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| `trigger(pattern: Impact[], options?: HapticsOptions)` | triggers a haptics pattern passed as an argument. [Impact Type](#impact-type), [options](#options) |
| `stop()`                                               | stops running the pattern if any exists                                                            |
| `isRunning`                                            | boolean that is `true` if any haptic pattern is currently running, `false` otherwise               |

### Haptic Impact Type

Impact can be:

- `"light"`: light impact
- `"medium"`: medium impact
- `"heavy"`: heavy impact
- `"vibrate"`: vibrate for 400ms (default value for Android and the only possible valuse for iOS)
- `"select"`: select impact (softer)
- `number`: set the length of vibration in `ms` on Android, iOS will always vibrate for 400ms.

```ts
type HapticImpactType =
  | 'light'
  | 'medium'
  | 'heavy'
  | 'vibrate'
  | 'select'
  | number;
```

### Options

`options` is an optional parameter in trigger function. It's an object of `HapticsOptions` type.
| option | description | values |default |
| --- | --- | --- | --- |
|platforms|array containing platforms where the pattern should run|`'ios' \| 'android'[]`| `undefined` (runs on ios and android) |

## Updating

### `1.0.0`

If you were using the pre-release `0.1.0`, update introduces one breaking change to the trigger function:

`trigger(...pattern: HapticImpactType[])` → `trigger(pattern: HapticImpactType[], options?: HapticsOptions)`

## License

[MIT](./LICENSE)
