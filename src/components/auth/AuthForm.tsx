import React, { FC, useCallback, useRef, useState } from 'react';
import { StyleSheet, View, Text, TextInput as RNTextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from 'components/common/Button';
import TextInput from 'components/common/TextInput';

import { providerTitle, storageKeys } from 'data/providers';

import login from 'helpers/login';

import colors from 'styles/colors';

import { LoginType } from 'routes/types';

interface Props {
  type: LoginType;
}

const AuthForm: FC<Props> = ({ type }) => {
  const { goBack } = useNavigation();

  const passwordInput = useRef<RNTextInput>(null);

  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeUsername = useCallback((initialValue: string) => {
    const value = initialValue.replace('@', '');

    setUsername(value ? `@${value}` : value);
  }, []);
  const handleChangePassword = useCallback((value: string) => setPassword(value), []);

  const handleSubmitUsername = useCallback(() => passwordInput.current?.focus(), []);

  const handleProviderConfig = useCallback(
    async ({ name, token }: { name?: string; token?: string } = {}) => {
      if (name && token) {
        await AsyncStorage.multiSet([
          [storageKeys[type].username, name],
          [storageKeys[type].token, token],
        ]);
      } else {
        await AsyncStorage.multiRemove(Object.values(storageKeys[type]));
      }
    },
    [type],
  );

  const handleSubmit = useCallback(async () => {
    if (!username || !password) {
      Alert.alert('All fields are required!');

      return;
    }

    setLoading(true);

    try {
      await handleProviderConfig({ name: username, token: password });
      const res = await login(type);

      if (res) {
        Alert.alert('USER', JSON.stringify(res));
        goBack();
      }
    } catch (err) {
      Alert.alert('Error', err.message);
      void handleProviderConfig();
    } finally {
      setLoading(false);
    }
  }, [goBack, handleProviderConfig, password, type, username]);

  return (
    <View style={styles.container}>
      <TextInput
        autoFocus
        label='Username'
        placeholder='@username'
        autoCapitalize='none'
        autoCompleteType='username'
        blurOnSubmit={false}
        clearButtonMode='while-editing'
        enablesReturnKeyAutomatically
        importantForAutofill='auto'
        keyboardType='email-address'
        maxLength={30}
        returnKeyType='next'
        textContentType='username'
        value={username}
        onChangeText={handleChangeUsername}
        onSubmitEditing={handleSubmitUsername}
      />
      <TextInput
        ref={passwordInput}
        value={password}
        label='Password'
        placeholder='YOUR_PERSONAL_ACCESS_TOKEN'
        autoCapitalize='none'
        autoCompleteType='password'
        clearButtonMode='while-editing'
        enablesReturnKeyAutomatically
        importantForAutofill='auto'
        returnKeyType='done'
        textContentType='password'
        secureTextEntry
        onChangeText={handleChangePassword}
        onSubmitEditing={handleSubmit}
      />
      <Text style={styles.hint}>All entered data will only be saved on your device.</Text>
      <Button loading={loading} color='primary' onPress={handleSubmit}>
        {`Login into ${providerTitle[type]}`}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hint: {
    textAlign: 'center',
    color: colors.secondaryText,
    opacity: 0.7,
    marginBottom: 40,
  },
});

export default AuthForm;
