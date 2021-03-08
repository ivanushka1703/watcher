import React, { FC, useCallback } from 'react';
import { useApolloClient } from '@apollo/client';

import { StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native';

import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from 'components/common/Button';

import confirm from 'helpers/confirm';

import colors from 'styles/colors';

import { ProviderName, providerTitle, query, storageKeys, urls } from 'data/providers';
import { User } from 'helpers/prepareUser';

interface Props {
  user: User;
  provider: ProviderName;
}

const Profile: FC<Props> = ({ user: { avatar_url, name, email, username }, provider }) => {
  const client = useApolloClient();

  const handlePressUsername = useCallback(() => {
    const url = `${urls[provider]}${username}`;

    void Linking.canOpenURL(url).then(() => Linking.openURL(url));
  }, [provider, username]);

  const handleLogout = useCallback(async () => {
    if (
      await confirm({
        title: `Logout from ${providerTitle[provider]} account`,
        message: 'Are you sure you want to logout?',
        rightText: 'Logout',
        rightStyle: 'destructive',
      })
    ) {
      const storageKey = storageKeys[provider];

      await AsyncStorage.multiRemove([storageKey, `${storageKey}_USERNAME`]);
      client.writeQuery({
        query: query[provider],
        data: { [`${provider}_user`]: null },
      });
    }
  }, [client, provider]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FastImage source={{ uri: avatar_url }} style={styles.avatar} />
        {username && (
          <TouchableOpacity onPress={handlePressUsername} style={styles.usernameContainer}>
            <Text style={styles.username}>{`@${username}`}</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.hint}>{`Logged as ${name || email || username || 'user'}`}</Text>
      </View>
      <Button onPress={handleLogout} color='danger' style={styles.button}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.gray100,
  },
  usernameContainer: {
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: colors.gray100,
  },
  username: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    color: colors.primary,
  },
  hint: {
    marginTop: 8,
    color: colors.secondaryText,
  },
  button: {
    marginTop: 40,
  },
});

export default Profile;
