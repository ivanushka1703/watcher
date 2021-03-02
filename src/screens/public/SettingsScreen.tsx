import ProviderList from 'components/providers/ProviderList';
import React, { FC } from 'react';

import { StyleSheet, View } from 'react-native';

const WelcomeScreen: FC = () => {
  return (
    <View style={styles.container}>
      <ProviderList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WelcomeScreen;
