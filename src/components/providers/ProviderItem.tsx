import React, { FC, useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Haptic from 'react-native-haptic-feedback';

import { SvgProps } from 'react-native-svg';
import { ProviderName } from 'data/providers';

import card from 'styles/card';
import colors from 'styles/colors';
import Icon from 'components/common/Icon';

interface Props {
  name: ProviderName;
  icon: FC<SvgProps>;
  title: string;
  username?: string;
}

const ProviderItem: FC<Props> = ({ name, icon: Logo, title, username }) => {
  const { navigate } = useNavigation();

  const handlePress = useCallback(() => {
    if (username) navigate('Deployments', { provider: name });
    else navigate('Login', { provider: name });
  }, [name, navigate, username]);

  const handleLongPress = useCallback(() => {
    if (!username) return;

    Haptic.trigger('longPress');
    navigate('Login', { provider: name });
  }, [name, navigate, username]);

  return (
    <Pressable
      style={({ pressed }) => [styles.container, { opacity: pressed ? 0.7 : 1 }]}
      onPress={handlePress}
      onLongPress={handleLongPress}
    >
      <Logo width={36} height={36} style={styles.logo} color={colors.primaryText} />
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        {!!username && <Text numberOfLines={1} style={styles.username}>{`@${username}`}</Text>}
      </View>
      {!!username && (
        <View>
          <Icon name='angle-right' width={14} height={14} color={colors.secondaryText} />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    ...card,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  content: {
    flex: 1,
  },
  logo: {
    marginRight: 10,
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
    color: colors.primaryText,
  },
  username: {
    marginTop: 2,
    fontSize: 16,
    color: colors.primary,
  },
});

export default ProviderItem;
