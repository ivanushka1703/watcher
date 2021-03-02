import React, { FC, useCallback, useMemo } from 'react';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';

import ItemSeparatorComponent from 'components/common/ItemSeparatorComponent';
import ProviderItem from 'components/providers/ProviderItem';

import providers, { logoByType, titleByType } from 'data/providers';

const ProviderList: FC = () => {
  const list = useMemo(() => {
    return providers.map(provider => ({
      name: provider,
      icon: logoByType[provider],
      title: titleByType[provider],
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
