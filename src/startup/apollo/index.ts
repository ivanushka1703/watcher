import { ApolloClient, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ProviderName, storageKeys, endpoints } from 'data/providers';

const setAuthorizationLink = setContext(async ({ operationName }) => {
  const type = operationName?.match(/^.+_/)?.[0]?.replace('_', '') as ProviderName | undefined;

  if (type) {
    const token = await AsyncStorage.getItem(storageKeys[type]);

    if (token) {
      return { headers: { Authorization: `${token === 'github' ? 'token' : 'Bearer'} ${token}` } };
    }
  }

  return undefined;
});

const restLink = new RestLink({ uri: endpoints.netlify, endpoints });

const link = setAuthorizationLink.concat(restLink);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default client;
