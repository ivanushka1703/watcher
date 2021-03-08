import React, { FC, useCallback, useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
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

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  const handleChangeToken = useCallback((value: string) => setToken(value), []);

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
      Alert.alert('');

      return;
    }

    setLoading(true);

    try {
      await handleProviderConfig(token);
      const res = await login(type);

      if (res) {
        Alert.alert('USER', JSON.stringify(res));
        goBack();
      }
    } catch (err) {
      setLoading(false);
      Alert.alert('Error', err.message);
      void handleProviderConfig();
    }
  }, [goBack, handleProviderConfig, token, type]);

  return (
    <View style={styles.container}>
      <TextInput
        value={token}
        autoFocus
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
        onChangeText={handleChangeToken}
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
