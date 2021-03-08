import { PlatformColor as RNPlatformColor } from 'react-native';

const PlatformColor = (...colors: string[]): string => {
  return (RNPlatformColor(...colors) as any) as string;
};

const colors = {
  white: '#ffffff',
  gray100: PlatformColor('systemGray5'),
  bitbucket: '#0052cc',
  github: '#161614',
  netlify: '#25c7b7',
  black: '#000000',
  green: PlatformColor('systemGreen'),
  red: PlatformColor('systemRed'),
  primary: PlatformColor('systemBlue'),
  border: PlatformColor('quaternarySystemFill'),
  shadow: PlatformColor('separator'),
  background: PlatformColor('systemGray6'),
  tertiaryBackground: PlatformColor('tertiarySystemBackground'),
  primaryText: PlatformColor('label'),
  secondaryText: PlatformColor('secondaryLabel'),
};

export default colors;
