import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View, PlatformColor, Animated, Easing } from 'react-native';

import Logo from 'images/logo-no-title.svg';
import Title from 'images/logo-title.svg';

const LoadingScreen: FC = () => {
  const animation = useRef(new Animated.Value(0));

  const runAnimation = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation.current, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(animation.current, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ]),
    ).start();
  }, []);

  useEffect(() => {
    runAnimation();
  }, [runAnimation]);

  const rotate = useMemo(
    () =>
      animation.current.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      }),
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Logo width={50} height={50} />
        </Animated.View>
        <Title width={120} height={30} style={styles.title} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PlatformColor('systemBackground'),
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 8,
  },
});

export default LoadingScreen;
