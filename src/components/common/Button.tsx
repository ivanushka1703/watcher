import React, { FC, useMemo } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import colorContrast from 'color-contrast';

import card from 'styles/card';
import colors from 'styles/colors';

export type ButtonColor = typeof buttonColors[number];

interface Props {
  loading?: boolean;
  color?: ButtonColor;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const Button: FC<Props> = ({ loading, color = 'secondary', children, onPress, style }) => {
  const buttonStyle = useMemo(() => {
    return StyleSheet.flatten([styles.button, { backgroundColor: buttonBackground[color] }, style]);
  }, [color, style]);

  const textColor = useMemo(() => {
    if (colorContrast(buttonStyle.backgroundColor as string, styles.text.color) > 5) {
      return styles.text.color;
    }

    return colors.white;
  }, [buttonStyle.backgroundColor]);

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor }]}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

const buttonColors = ['primary', 'secondary', 'warning', 'danger', 'success'] as const;

const buttonBackground: { [key in ButtonColor]: string } = {
  primary: colors.primary,
  secondary: colors.gray100,
  warning: 'yellow',
  danger: 'red',
  success: 'green',
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: 48,
    borderRadius: 6,
    ...card,
  },
  text: {
    fontSize: 18,
    letterSpacing: 0.15,
    color: colors.primaryText,
    fontWeight: '500',
  },
});

export default Button;
