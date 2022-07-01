import React from 'react';
import { Platform, Vibration } from 'react-native';
import * as Haptics from 'expo-haptics';
import { getHapticImpactEnum, timer } from './utils';
import { HapticsOptions, Impact } from './types';

interface IHapticsContext {
  trigger: (pattern: Impact[], options?: HapticsOptions) => void;
  stop: () => void;
  isRunning: boolean;
}

const initialContext: IHapticsContext = {
  isRunning: false,
  trigger: () => {},
  stop: () => {},
};

const HapticsContext = React.createContext<IHapticsContext>(initialContext);

interface IHapticsProvider {
  children?: React.ReactNode;
}

const HapticsProvider = ({ children }: IHapticsProvider) => {
  const [isRunning, setIsRunning] = React.useState(false);
  const [pattern, setPattern] = React.useState<Impact[]>();
  const [startRunning, setStartRunning] = React.useState(false);
  const [options, setOptions] = React.useState<HapticsOptions | undefined>(
    undefined
  );

  async function hapticImpact(...pattern: Impact[]) {
    setIsRunning(true);
    for (let i = 0; i < pattern.length; ++i) {
      let upToDateIsRunning = true;
      setStartRunning((currentState) => {
        // Do not change the state by getting the updated state
        upToDateIsRunning = currentState;
        return currentState;
      });
      if (!upToDateIsRunning) return;
      const e = pattern[i];
      if (i % 2 === 0) {
        // Vibration length, always 400 for iOS
        if (typeof e === 'number') {
          Vibration.vibrate(e);
          await timer(e);
          // Default
        } else if (e === 'vibrate' || !e) {
          Vibration.vibrate();
          // Use native impact type
        } else {
          await Haptics.impactAsync(getHapticImpactEnum(e));
        }
        // Await for the pause
      } else {
        if (typeof e !== 'number') return;
        await timer(e);
      }
    }
    setIsRunning(false);
    setStartRunning(false);
  }

  React.useEffect(() => {
    if (allowedToRun()) {
      if (startRunning) {
        if (!isRunning) {
          if (pattern) {
            hapticImpact(...pattern);
          }
        }
      }
    }
  }, [startRunning]);

  function trigger(pattern: Impact[], options?: HapticsOptions) {
    setPattern(pattern);
    setStartRunning(true);
    setOptions(options);
  }

  const allowedToRun = (): boolean => {
    let canRun = false;
    if (
      !options?.platforms &&
      (Platform.OS === 'android' || Platform.OS === 'ios')
    )
      canRun = true;
    else if (options && options.platforms) {
      options?.platforms?.forEach((platform) => {
        if (platform === Platform.OS) canRun = true;
      });
    }
    return canRun;
  };

  function stop() {
    setStartRunning(false);
    setIsRunning(false);
    Vibration.cancel();
  }

  return (
    <HapticsContext.Provider value={{ isRunning, trigger, stop }}>
      {children}
    </HapticsContext.Provider>
  );
};

const useHaptics = () => React.useContext(HapticsContext);

export { HapticsProvider, useHaptics };
