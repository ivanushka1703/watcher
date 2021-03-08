import client from 'startup/apollo';

import GITHUB_USER_QUERY from 'graphql/github/queries/user';
import NETLIFY_USER_QUERY from 'graphql/netlify/queries/user';

import { DocumentNode } from 'graphql';
import { ProviderName } from 'data/providers';

const query: { [key in ProviderName]: DocumentNode } = {
  bitbucket: NETLIFY_USER_QUERY,
  github: GITHUB_USER_QUERY,
  netlify: NETLIFY_USER_QUERY,
};

const login = (provider: ProviderName): Promise<any> => {
  return new Promise((resolve, reject) => {
    client
      .query({
        query: query[provider],
        fetchPolicy: 'network-only',
      })
      .then(({ data }) => {
        if (data.user) return resolve(data.user);

        return reject(new Error('No user with the credentials'));
      })
      .catch(err => reject(err));
  });
};

export default login;
