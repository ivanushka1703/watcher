import React, { FC, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Button, StyleSheet, View } from 'react-native';

const WelcomeScreen: FC = () => {
  const { navigate } = useNavigation();

  const loginToBitbucket = useCallback(() => navigate('Login', { type: 'bitbucket' }), [navigate]);
  const loginToGithub = useCallback(() => navigate('Login', { type: 'github' }), [navigate]);
  const loginToNetlify = useCallback(() => navigate('Login', { type: 'netlify' }), [navigate]);

  return (
    <View style={styles.container}>
      <Button title='Bitbucket' onPress={loginToBitbucket} />
      <Button title='GitHub' onPress={loginToGithub} />
      <Button title='Netlify' onPress={loginToNetlify} />
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

export default WelcomeScreen;
