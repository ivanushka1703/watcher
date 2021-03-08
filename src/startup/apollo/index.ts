import { ApolloClient, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

import AsyncStorage from '@react-native-async-storage/async-storage';

import base64 from 'react-native-base64';

import { setContext } from '@apollo/client/link/context';

import { ProviderName, storageKeys, endpoints } from 'data/providers';

const setAuthorizationLink = setContext(async ({ operationName, variables }) => {
  const type = operationName?.match(/^.+_/)?.[0]?.replace('_', '') as ProviderName | undefined;

  if (type) {
    const token = await AsyncStorage.getItem(storageKeys[type]);

    if (token) {
      switch (type) {
        case 'bitbucket': {
          const username = variables?.username as string;

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

const restLink = new RestLink({ uri: endpoints.netlify, endpoints });

const link = setAuthorizationLink.concat(restLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
