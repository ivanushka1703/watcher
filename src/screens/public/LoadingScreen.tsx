import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View, Animated, useWindowDimensions } from 'react-native';

import { LOGO } from 'images';

interface Props {
  onLoadEnd: () => void;
}

const LoadingScreen: FC<Props> = ({ onLoadEnd }) => {
  const bounceAnimation = useRef(new Animated.Value(0)).current;

  const { height } = useWindowDimensions();

  const bounceOut = useCallback(
    (cb?: Animated.EndCallback) => {
      Animated.spring(bounceAnimation, {
        toValue: 1,
        tension: 2,
        friction: 120,
        useNativeDriver: true,
      }).start(cb);
    },
    [bounceAnimation],
  );

  useEffect(() => {
    setTimeout(() => {
      bounceOut(onLoadEnd);
    }, 1000);
  }, [bounceOut, onLoadEnd]);

  const translateY = useMemo(() => {
    return bounceAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -height / 1.5],
    });
  }, [bounceAnimation, height]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={LOGO}
        resizeMode='contain'
        style={[styles.image, { transform: [{ translateY }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
  },
});

export default LoadingScreen;
