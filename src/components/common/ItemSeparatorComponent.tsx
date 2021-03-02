import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';

const ItemSeparatorComponent: FC = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    marginVertical: 5,
  },
});

export default ItemSeparatorComponent;
