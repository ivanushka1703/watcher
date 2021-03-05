import React, { forwardRef, ForwardRefExoticComponent } from 'react';
import { StyleSheet, Text, View, TextInput as RNTextInput, TextInputProps } from 'react-native';
import colors from 'styles/colors';

interface Props extends TextInputProps {
  label?: string;
}

const TextInput: ForwardRefExoticComponent<Props & React.RefAttributes<RNTextInput>> = forwardRef<
  RNTextInput,
  Props
>(({ label, style, ...props }, ref) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNTextInput {...props} ref={ref} style={[style, styles.input]} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  label: {
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    height: 42,
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.gray100,
  },
});

export default TextInput;
