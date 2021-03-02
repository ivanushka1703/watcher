import React, { FC, useCallback, useMemo } from 'react';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';

import providers, { logoByType, titleByType } from 'data/providers';
import ItemSeparatorComponent from 'components/common/ItemSeparatorComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProviderItem from './ProviderItem';

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
    <SafeAreaView edges={['left', 'right']} style={styles.container}>
      <FlatList
        data={list}
        renderItem={renderItem}
        style={styles.list}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    paddingVertical: 12,
  },
});

export default ProviderList;
