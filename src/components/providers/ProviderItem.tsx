import React, { FC, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { SvgProps } from 'react-native-svg';
import { ProviderName } from 'data/providers';

import card from 'styles/card';
import colors from 'styles/colors';

interface Props {
  name: ProviderName;
  icon: FC<SvgProps>;
  title: string;
}

const ProviderItem: FC<Props> = ({ name, icon: Logo, title }) => {
  const { navigate } = useNavigation();

  const handlePress = useCallback(() => {
    navigate('Login', { type: name });
  }, [name, navigate]);

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Logo width={40} height={40} style={styles.logo} />
      <Text style={[styles.title, { color: colors[name] }]}>{title}</Text>
    </TouchableOpacity>
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
  logo: {
    marginRight: 10,
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
  },
});

export default ProviderItem;
