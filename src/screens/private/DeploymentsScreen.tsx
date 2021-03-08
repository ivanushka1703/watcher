import React, { FC, useEffect, useMemo } from 'react';
import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';

import { ScrollView, StyleSheet, Text } from 'react-native';

import colors from 'styles/colors';

import { DeploymentsParams } from 'routes/types';
import useProviders from 'hooks/useProviders';

const DeploymentsScreen: FC = () => {
  const { dispatch } = useNavigation();
  const { provider } = useRoute<DeploymentsParams>().params || {};

  const { providers } = useProviders();

  const user = useMemo(() => providers.find(({ name }) => name === provider)?.user, [
    provider,
    providers,
  ]);

  useEffect(() => {
    if (!user) {
      dispatch(CommonActions.navigate({ name: 'Home' }));
    }
  }, [dispatch, user]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={{ color: colors.primaryText }}>{provider}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DeploymentsScreen;
