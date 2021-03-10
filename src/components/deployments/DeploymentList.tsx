import React, { FC, useCallback, useMemo, useState } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';

import { groupBy, map, orderBy } from 'lodash';

import ItemSeparatorComponent from 'components/common/ItemSeparatorComponent';
import DeploymentItem from 'components/deployments/DeploymentItem';

import colors from 'styles/colors';

import { Site } from 'typings';
import { Maybe } from 'graphql/jsutils/Maybe';

interface Props {
  sites?: Maybe<Array<Site>>;
  refetch?: () => Promise<void>;
}

const DeploymentList: FC<Props> = ({ refetch, sites }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    if (refetch) {
      setIsRefreshing(true);
      refetch().finally(() => setIsRefreshing(false));
    }
  }, [refetch]);

  const sections = useMemo(() => {
    if (!sites) return [];

    return orderBy(
      map(groupBy(sites, 'account'), (data, title) => {
        return {
          title,
          data: orderBy(data, 'updatedAt', 'desc'),
        };
      }),
      'title',
    );
  }, [sites]);

  const renderSectionHeader = useCallback(({ section: { title } }) => {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
    );
  }, []);

  const renderItem = useCallback(({ item }) => {
    return <DeploymentItem item={item} />;
  }, []);

  return (
    <SectionList
      refreshing={isRefreshing}
      style={styles.container}
      contentContainerStyle={styles.content}
      sections={sections}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      renderSectionHeader={renderSectionHeader}
      ItemSeparatorComponent={ItemSeparatorComponent}
      SectionSeparatorComponent={ItemSeparatorComponent}
      onRefresh={handleRefresh}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 60,
  },
  titleContainer: {
    backgroundColor: colors.background,
    marginBottom: 2,
    paddingTop: 20,
    paddingBottom: 5,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 18,
    color: colors.primaryText,
    fontWeight: 'bold',
  },
});

export default DeploymentList;
