declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';

  const content: React.FC<SvgProps>;

  export default content;
}

declare module 'color-contrast' {
  const colorContrast: (color: string, color: string) => number;

  export default colorContrast;
}
