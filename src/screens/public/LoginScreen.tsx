import React, { FC, useMemo } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import IconButton from 'components/common/IconButton';
import AuthForm from 'components/auth/AuthForm';

import { logoByType, titleByType } from 'data/providers';

import colors from 'styles/colors';

import { LoginParams } from 'routes/types';

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
          <Logo style={styles.logo} width={24} height={24} color={colors.primaryText} />
          <Text style={styles.headerText}>{title}</Text>
        </View>
        <IconButton icon='close' onPress={goBack} />
      </View>
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView
          style={styles.content}
          keyboardDismissMode='on-drag'
          keyboardShouldPersistTaps='handled'
        >
          <AuthForm type={type} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
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
    color: colors.primaryText,
  },
});

export default LoginScreen;
