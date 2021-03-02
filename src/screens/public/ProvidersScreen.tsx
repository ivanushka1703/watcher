import React, { FC } from 'react';

import { StyleSheet } from 'react-native';
import ProviderList from 'components/providers/ProviderList';

import { SafeAreaView } from 'react-native-safe-area-context';

const ProvidersScreen: FC = () => {
  return (
    <SafeAreaView edges={['left', 'right']} style={styles.container}>
      <ProviderList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProvidersScreen;
