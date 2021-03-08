import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProviderList from 'components/providers/ProviderList';

import getTimeOfDay from 'helpers/getTimeOfDay';

import colors from 'styles/colors';

const HomeScreen: FC = () => {
  return (
    <SafeAreaView edges={['top', 'left', 'bottom']} style={styles.container}>
      <ProviderList
        ListHeaderComponent={<Text style={styles.title}>{`Good ${getTimeOfDay()}!`}</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    paddingHorizontal: 15,
    marginTop: 20,
    color: colors.primaryText,
    marginBottom: 20,
  },
});

export default HomeScreen;
