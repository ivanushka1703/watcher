import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View, Animated, useWindowDimensions, ActivityIndicator } from 'react-native';

import LottieView from 'lottie-react-native';

import colors from 'styles/colors';

const LoadingScreen: FC = () => {
  const animation = useRef<LottieView>(null);
  const leaveAnimation = useRef(new Animated.Value(0)).current;

  const { height } = useWindowDimensions();

  const leave = useCallback(
    (cb?: Animated.EndCallback) => {
      Animated.timing(leaveAnimation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start(cb);
    },
    [leaveAnimation],
  );

  useEffect(() => {
    if (animation.current) animation.current.play();

    setTimeout(() => leave(), 2000);
  }, [leave]);

  const scale = useMemo(() => {
    return leaveAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 5],
    });
  }, [leaveAnimation]);

  const translateX = useMemo(() => {
    return leaveAnimation.interpolate({
      inputRange: [0.5, 1],
      outputRange: [0, 20],
      extrapolate: 'clamp',
    });
  }, [leaveAnimation]);

  const translateY = useMemo(() => {
    return leaveAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -height / 8],
    });
  }, [height, leaveAnimation]);

  if (__DEV__) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size='large' color={colors.primaryText} />
      </View>
    );
  }

  return (
    <Animated.View
      style={[styles.container, { transform: [{ scale }, { translateY }, { translateX }] }]}
    >
      <View style={styles.content}>
        <LottieView ref={animation} source={require('images/cat-in-box.json')} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  content: {
    flex: 0.4,
    width: '85%',
    marginBottom: 40,
  },
});

export default LoadingScreen;
