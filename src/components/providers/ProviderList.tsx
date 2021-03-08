import React, { FC, useCallback, useMemo, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';

import ItemSeparatorComponent from 'components/common/ItemSeparatorComponent';
import ProviderItem from 'components/providers/ProviderItem';

import useProviders from 'hooks/useProviders';

import { providerLogo, providerTitle } from 'data/providers';

interface Props {
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
}

const ProviderList: FC<Props> = ({ ListHeaderComponent }) => {
  const { providers, refetch } = useProviders();

  const list = useMemo(() => {
    return providers.map(({ name, user }) => ({
      name,
      icon: providerLogo[name],
      title: providerTitle[name],
      username: user?.username,
    }));
  }, [providers]);

  const renderItem = useCallback<ListRenderItem<typeof list[number]>>(({ item }) => {
    return <ProviderItem {...item} />;
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  return (
    <FlatList
      data={list}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      keyExtractor={item => item.name}
      renderItem={renderItem}
      style={styles.list}
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingVertical: 12,
  },
});

export default ProviderList;
