import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { LoginType } from 'routes/types';

interface Props {
  type: LoginType;
}

const primaryColor: { [type: string]: string } = {
  bitbucket: 'rgb(7, 71, 166)',
  github: 'black',
  netlify: 'rgb(7, 71, 166)',
};

const AuthForm: FC<Props> = ({ type }) => {
  return (
    <View style={[styles.container, { backgroundColor: primaryColor[type] }]}>
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
