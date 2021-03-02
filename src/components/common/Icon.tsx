import React, { FC } from 'react';
import CloseIcon from 'images/icons/close.svg';

import { SvgProps } from 'react-native-svg';

const allowedIcons = ['close'] as const;

export type IconName = typeof allowedIcons[number];

type Icons = {
  [name in IconName]: FC<SvgProps>;
};

interface Props extends SvgProps {
  name: IconName;
}

const icons: Icons = {
  close: CloseIcon,
};

const Icon: React.FC<Props> = ({ name, ...props }) => {
  const IconByType = icons[name];

  return <IconByType {...props} />;
};

export default Icon;
