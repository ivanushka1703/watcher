import React, { FC, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { DateTime } from 'luxon';

import Icon from 'components/common/Icon';

import card from 'styles/card';
import colors from 'styles/colors';

import { Site } from 'typings';

interface Props {
  item: Site;
}

const DeploymentItem: FC<Props> = ({ item: { name, branch, updatedAt } }) => {
  const publishDate = useMemo(() => {
    if (!updatedAt) return null;

    return DateTime.fromISO(updatedAt).toLocaleString({
      ...DateTime.DATETIME_MED,
      hour12: false,
    });
  }, [updatedAt]);

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        {!!branch && (
          <Text style={styles.branch}>
            <Icon name='git-branch-outline' width={14} height={14} />
            {branch}
          </Text>
        )}
        {!!updatedAt && (
          <Text style={styles.date}>
            <Icon name='cloud-upload-outline' width={14} height={14} />
            {` ${publishDate}`}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...card,
    marginHorizontal: 12,
    padding: 12,
    borderRadius: 6,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primaryText,
  },
  branch: {
    marginLeft: -2,
    marginTop: 4,
    fontSize: 14,
    color: colors.secondaryText,
  },
  date: {
    marginLeft: -2,
    fontSize: 13,
    marginTop: 4,
    color: colors.secondaryText,
  },
});

export default DeploymentItem;
