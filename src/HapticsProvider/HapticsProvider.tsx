import React from 'react';
import { Vibration } from 'react-native';
import * as Haptics from 'expo-haptics';
import { getHapticImpactEnum, timer } from './utils';
import { Impact } from './types';

interface IHapticsContext {
  trigger: (...pattern: Impact[]) => void;
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
    if (startRunning) {
      if (!isRunning) {
        if (pattern) {
          hapticImpact(...pattern);
        }
      }
    }
  }, [startRunning]);

  function trigger(...pattern: Impact[]) {
    setPattern(pattern);
    setStartRunning(true);
  }

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
