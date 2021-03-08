import React, { FC, useCallback, useRef, useState } from 'react';
import { StyleSheet, View, Text, TextInput as RNTextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from 'components/common/Button';
import TextInput from 'components/common/TextInput';

import { ProviderName, providerTitle, storageKeys } from 'data/providers';

import login from 'helpers/login';

import colors from 'styles/colors';

interface Props {
  provider: ProviderName;
}

const AuthForm: FC<Props> = ({ provider }) => {
  const passwordInput = useRef<RNTextInput>(null);

  const { goBack } = useNavigation();

  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');

  const handleSubmitUsername = useCallback(() => passwordInput.current?.focus(), []);

  const handleProviderConfig = useCallback(
    async (providerToken?: string, user?: string) => {
      if (providerToken) {
        if (user) await AsyncStorage.setItem(`${storageKeys[provider]}_USERNAME`, user);
        await AsyncStorage.setItem(storageKeys[provider], providerToken);
      } else {
        if (provider === 'bitbucket')
          await AsyncStorage.removeItem(`${storageKeys[provider]}_USERNAME`);
        await AsyncStorage.removeItem(storageKeys[provider]);
      }
    },
    [provider],
  );

  const handleSubmit = useCallback(async () => {
    if (!token) {
      Alert.alert('Personal Token is required');

      return;
    }

    setLoading(true);

    try {
      await handleProviderConfig(token, username);
      const res = await login(provider);

      if (res) goBack();
    } catch (err) {
      setLoading(false);
      void handleProviderConfig();
      Alert.alert('Error', err.message);
    }
  }, [goBack, handleProviderConfig, token, provider, username]);

  return (
    <View style={styles.container}>
      {provider === 'bitbucket' && (
        <TextInput
          autoFocus
          label='Username'
          placeholder='username'
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
          onChangeText={setUsername}
          onSubmitEditing={handleSubmitUsername}
        />
      )}
      <TextInput
        value={token}
        autoFocus={provider !== 'bitbucket'}
        label='Personal Token'
        placeholder='YOUR_PERSONAL_ACCESS_TOKEN'
        autoCapitalize='none'
        autoCompleteType='password'
        clearButtonMode='while-editing'
        enablesReturnKeyAutomatically
        importantForAutofill='auto'
        returnKeyType='done'
        textContentType='password'
        secureTextEntry
        onChangeText={setToken}
        onSubmitEditing={handleSubmit}
      />
      <Text style={styles.hint}>All entered data will only be saved on your device.</Text>
      <Button loading={loading} color='primary' onPress={handleSubmit}>
        {`Login into ${providerTitle[provider]}`}
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
