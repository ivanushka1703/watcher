import React, { FC } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

interface Props {
  screen?: boolean;
}

const Loading: FC<Props> = ({ screen }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={screen ? 'large' : 'small'} />
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

export default Loading;
