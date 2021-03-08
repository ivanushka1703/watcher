import React, { FC } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

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
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: buttonBackground[color], shadowColor: buttonBackground[color] },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={styles.text.color} />
      ) : (
        <Text style={styles.text}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

const buttonColors = ['primary', 'secondary', 'warning', 'danger', 'success'] as const;

const buttonBackground: { [key in ButtonColor]: string } = {
  primary: colors.primary,
  secondary: colors.gray100,
  warning: 'yellow',
  danger: colors.red,
  success: colors.green,
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
    color: colors.white,
    fontWeight: '500',
  },
});

export default Button;
