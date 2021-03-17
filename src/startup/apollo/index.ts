import { ApolloClient, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

import AsyncStorage from '@react-native-async-storage/async-storage';

import base64 from 'react-native-base64';

import { setContext } from '@apollo/client/link/context';

import { ProviderName, storageKeys, endpoints } from 'data/providers';

const getProviderName = (operationName?: string): ProviderName => {
  const providerName = operationName?.match(/^.+_/)?.[0]?.replace('_', '');

  return (providerName || 'netlify') as ProviderName;
};

const setAuthorizationLink = setContext(async ({ operationName }) => {
  const provider = getProviderName(operationName);

  if (provider) {
    const token = await AsyncStorage.getItem(storageKeys[provider]);

    if (token) {
      switch (provider) {
        case 'bitbucket': {
          const username = (await AsyncStorage.getItem(`${storageKeys[provider]}_USERNAME`)) || '';

          return {
            headers: { Authorization: `Basic ${base64.encode(`${username}:${token}`)}` },
          };
        }
        case 'github':
          return { headers: { Authorization: `token ${token}` } };
        default:
          return { headers: { Authorization: `Bearer ${token}` } };
      }
    }
  }

  return undefined;
});

const restLink = new RestLink({
  uri: endpoints.netlify,
  endpoints,
});

const link = setAuthorizationLink.concat(restLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
