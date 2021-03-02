import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProviderList from 'components/providers/ProviderList';

import getTimeOfDay from 'helpers/getTimeOfDay';
import colors from 'styles/colors';

const HomeScreen: FC = () => {
  return (
    <SafeAreaView edges={['top', 'left', 'bottom']} style={styles.container}>
      <Text style={styles.title}>{`Good ${getTimeOfDay()}!`}</Text>
      <Text style={styles.subtitle}>
        You don`t have any connected providers. Let`s configure it
      </Text>
      <ProviderList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    paddingHorizontal: 15,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 16,
    paddingHorizontal: 15,
    marginBottom: 20,
    color: colors.secondaryText,
  },
});

export default HomeScreen;
