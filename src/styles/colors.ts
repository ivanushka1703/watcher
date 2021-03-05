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
  primary: PlatformColor('systemBlue'),
  border: PlatformColor('quaternarySystemFill'),
  shadowColor: PlatformColor('separator'),
  background: PlatformColor('systemGray6'),
  tertiaryBackgronud: PlatformColor('tertiarySystemBackground'),
  primaryText: PlatformColor('label'),
  secondaryText: PlatformColor('secondaryLabel'),
};

export default colors;
