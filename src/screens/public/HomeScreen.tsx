import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProviderList from 'components/providers/ProviderList';

import getTimeOfDay from 'helpers/getTimeOfDay';

import colors from 'styles/colors';

const HomeScreen: FC = () => {
  return (
    <SafeAreaView edges={['top', 'left', 'bottom']} style={styles.container}>
      <ProviderList
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>{`Good ${getTimeOfDay()}!`}</Text>
            <Text style={styles.subtitle}>
              You don`t have any connected providers. Let`s configure it.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    paddingHorizontal: 15,
    marginTop: 20,
    color: colors.primaryText,
  },
  subtitle: {
    fontSize: 14,
    paddingHorizontal: 15,
    marginBottom: 30,
    color: colors.secondaryText,
  },
});

export default HomeScreen;
