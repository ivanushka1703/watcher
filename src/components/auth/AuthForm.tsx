import React, { FC, useCallback, useRef, useState } from 'react';
import { StyleSheet, View, Text, TextInput as RNTextInput } from 'react-native';

import Button from 'components/common/Button';
import TextInput from 'components/common/TextInput';

import { titleByType } from 'data/providers';

import colors from 'styles/colors';

import { LoginType } from 'routes/types';

interface Props {
  type: LoginType;
}

const AuthForm: FC<Props> = ({ type }) => {
  const providerName = titleByType[type];

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

  const handleSubmit = useCallback(() => {
    setLoading(true);
    // eslint-disable-next-line no-console
    console.log(type, username, password);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [password, type, username]);

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
        {`Login into ${providerName}`}
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
