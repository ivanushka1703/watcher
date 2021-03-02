import React, { FC, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import AuthForm from 'components/auth/AuthForm';

import { logoByType, titleByType } from 'data/providers';

import colors from 'styles/colors';

import { LoginParams } from 'routes/types';
import IconButton from 'components/common/IconButton';

const LoginScreen: FC = () => {
  const { goBack } = useNavigation();
  const { type } = useRoute<LoginParams>().params || {};

  const Logo = useMemo(() => logoByType[type], [type]);
  const title = useMemo(() => titleByType[type], [type]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View />
        <View style={styles.headerContent}>
          <Logo style={styles.logo} width={24} height={24} />
          <Text style={[styles.headerText, { color: colors[type] }]}>{title}</Text>
        </View>
        <IconButton icon='close' onPress={goBack} />
      </View>
      <AuthForm type={type} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginRight: 6,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
});

export default LoginScreen;
