import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  offset?: number;
}

const ItemSeparatorComponent: FC<Props> = ({ offset = 5 }) => {
  return <View style={[styles.separator, { marginVertical: offset }]} />;
};

const styles = StyleSheet.create({
  separator: {
    marginVertical: 5,
  },
});

export default ItemSeparatorComponent;
