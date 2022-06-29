import { Vibration } from 'react-native';
import { Impact, HapticImpact } from './types';
import * as Haptics from 'expo-haptics';

export async function hapticsPattern(...pattern: Impact[]) {
  for (let i = 0; i < pattern.length; ++i) {
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
        if (e === 'select') {
          await Haptics.selectionAsync();
        } else {
          await Haptics.impactAsync(getHapticImpactEnum(e));
        }
      }
      // Await for the pause
    } else {
      if (typeof e !== 'number') return;
      await timer(e);
    }
  }
}

export const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const getHapticImpactEnum = (impact: HapticImpact) => {
  switch (impact) {
    case 'heavy':
      return Haptics.ImpactFeedbackStyle.Heavy;
    case 'medium':
      return Haptics.ImpactFeedbackStyle.Medium;
    case 'light':
      return Haptics.ImpactFeedbackStyle.Light;
  }
};
