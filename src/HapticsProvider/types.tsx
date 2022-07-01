/** Strength of the impact */
export type HapticImpactStrength = 'light' | 'medium' | 'heavy';

/** Length of the impact (Traditional vibration package is used) */
export type VibrateLength = 'vibrate' | number;

/** Softer impact used for selection */
export type HapticImpactSharpness = 'select';

/** All types of non-traditional vibrations */
export type HapticImpact = HapticImpactStrength | HapticImpactSharpness;

/** Every possible impact value */
export type Impact = HapticImpact | VibrateLength;

/** All the platforms that (usually) have vibration motor */
type Platforms = 'android' | 'ios';

/** Options for modifying trigger function */
export interface HapticsOptions {
  /** Describes on which platforms the impact pattern should run */
  platforms?: Platforms[];
}
