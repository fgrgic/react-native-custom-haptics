import { PlatformOSType } from 'react-native';

export type HapticImpactStrength = 'light' | 'medium' | 'heavy';

export type VibrateLength = 'vibrate' | number;

export type HapticImpactSharpness = null;

export type HapticImpact = HapticImpactStrength | HapticImpactSharpness;

export type Impact = HapticImpact | VibrateLength;

export interface HapticsOptions {
  platforms?: 'android' | 'ios';
}
