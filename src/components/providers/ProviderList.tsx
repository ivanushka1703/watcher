import React, { FC, useCallback, useMemo } from 'react';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';

import ItemSeparatorComponent from 'components/common/ItemSeparatorComponent';
import ProviderItem from 'components/providers/ProviderItem';

import { providers, providerLogo, providerTitle } from 'data/providers';

interface Props {
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
}

const ProviderList: FC<Props> = ({ ListHeaderComponent }) => {
  const list = useMemo(() => {
    return providers.map(provider => ({
      name: provider,
      icon: providerLogo[provider],
      title: providerTitle[provider],
    }));
  }, []);

  const renderItem = useCallback<ListRenderItem<typeof list[number]>>(({ item }) => {
    return <ProviderItem {...item} />;
  }, []);

  return (
    <FlatList
      data={list}
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
