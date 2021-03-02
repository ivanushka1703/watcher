import React, { FC } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

import Icon, { IconName } from 'components/common/Icon';
import colors from 'styles/colors';

interface Props {
  icon: IconName;
  onPress: () => void;
  iconWidth?: number;
  iconHeight?: number;
  iconStyles?: StyleProp<ViewStyle>;
  buttonStyles?: StyleProp<ViewStyle>;
}

const IconButton: FC<Props> = ({
  icon,
  onPress,
  iconWidth = 14,
  iconHeight = 14,
  buttonStyles,
  iconStyles,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, buttonStyles]}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Icon name={icon} width={iconWidth} height={iconHeight} style={[styles.icon, iconStyles]} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    backgroundColor: colors.gray100,
    padding: 6,
  },
  icon: {
    opacity: 0.8,
  },
});

export default IconButton;
