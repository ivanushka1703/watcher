import React, { FC } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

import Icon, { IconName } from 'components/common/Icon';
import colors from 'styles/colors';

interface Props {
  icon: IconName;
  onPress: () => void;
  iconWidth?: number;
  iconHeight?: number;
  color?: string;
  iconStyles?: StyleProp<ViewStyle>;
  buttonStyles?: StyleProp<ViewStyle>;
  noBackground?: boolean;
}

const IconButton: FC<Props> = ({
  icon,
  onPress,
  iconWidth = 14,
  iconHeight = 14,
  buttonStyles,
  iconStyles,
  color,
  noBackground = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, noBackground && styles.noBackgroundButton, buttonStyles]}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Icon
        name={icon}
        width={noBackground ? 26 : iconWidth}
        height={noBackground ? 26 : iconHeight}
        color={color || colors.primaryText}
        style={[styles.icon, iconStyles]}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    backgroundColor: colors.gray100,
    padding: 6,
  },
  noBackgroundButton: {
    padding: 0,
    backgroundColor: 'transparent',
  },
  icon: {
    opacity: 0.8,
  },
});

export default IconButton;
