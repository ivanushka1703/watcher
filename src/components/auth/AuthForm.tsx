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
  const passwordInput = useRef<RNTextInput>(null);

  const { goBack } = useNavigation();

  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');

  const handleSubmitUsername = useCallback(() => passwordInput.current?.focus(), []);

  const handleProviderConfig = useCallback(
    async (providerToken?: string) => {
      if (providerToken) {
        await AsyncStorage.setItem(storageKeys[type], providerToken);
      } else {
        await AsyncStorage.removeItem(storageKeys[type]);
      }
    },
    [type],
  );

  const handleSubmit = useCallback(async () => {
    if (!token) {
      Alert.alert('Personal Token is required');

      return;
    }

    setLoading(true);

    try {
      await handleProviderConfig(token);
      const res = await login(type, username);

      if (res) {
        Alert.alert('USER', JSON.stringify(res));
        goBack();
      }
    } catch (err) {
      setLoading(false);
      void handleProviderConfig();
      Alert.alert('Error', err.message);
    }
  }, [goBack, handleProviderConfig, token, type, username]);

  return (
    <View style={styles.container}>
      {type === 'bitbucket' && (
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
        autoFocus={type !== 'bitbucket'}
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
