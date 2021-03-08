import React, { FC } from 'react';
import CloseIcon from 'images/icons/close.svg';

import { SvgProps } from 'react-native-svg';

import IonIcon from 'react-native-vector-icons/Ionicons';

const allowedIcons = ['angle-right', 'close'] as const;

export type IconName = typeof allowedIcons[number] | string;

type Icons = {
  [name in IconName]: FC<SvgProps>;
};

interface Props extends SvgProps {
  name: IconName;
}

const icons: Icons = {
  'angle-right': ({ width, color }) => (
    <IonIcon name='chevron-forward-outline' size={width as number} color={color as string} />
  ),
  close: CloseIcon,
};

const Icon: React.FC<Props> = ({ name, ...props }) => {
  const IconByType = icons[name];

  if (!IconByType) {
    return <IonIcon name={name} size={props.width as number} color={props.color as string} />;
  }

  return <IconByType {...props} />;
};

export default Icon;
