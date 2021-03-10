import React, { FC } from 'react';
import { useQuery } from '@apollo/client';

import { StyleSheet, Text, View } from 'react-native';

import NETLIFY_SITES_QUERY from 'graphql/queries/netlify/sites';

const NetlifyDeploymentsScreen: FC = () => {
  const { data, loading } = useQuery(NETLIFY_SITES_QUERY, { fetchPolicy: 'cache-and-network' });

  // eslint-disable-next-line no-console
  console.log(data, loading);

  return (
    <View style={styles.container}>
      <Text />
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

export default NetlifyDeploymentsScreen;
