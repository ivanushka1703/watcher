import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { LoginType } from 'routes/types';

interface Props {
  type: LoginType;
}

const AuthForm: FC<Props> = ({ type }) => {
  return (
    <View style={styles.container}>
      <Text>{type}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthForm;
