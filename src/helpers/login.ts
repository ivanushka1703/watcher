import client from 'startup/apollo';

import { ProviderName, query } from 'data/providers';

const login = (provider: ProviderName): Promise<any> => {
  return new Promise((resolve, reject) => {
    client
      .query({
        query: query[provider],
        fetchPolicy: 'network-only',
      })
      .then(({ data }) => {
        if (data[`${provider}_user`]) return resolve(data[`${provider}_user`]);

        return reject(new Error('No user with the credentials'));
      })
      .catch(() => reject(new Error('No user with the credentials')));
  });
};

export default login;
