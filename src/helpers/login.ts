import client from 'startup/apollo';

import NETLIFY_USER_QUERY from 'graphql/netlify/queries/user';

import { ProviderName } from 'data/providers';
import { DocumentNode } from 'graphql';
import GITHUB_USER_QUERY from 'graphql/github/queries/user';

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
      })
      .then(({ data }) => {
        if (data.user) return resolve(data.user);

        return reject(new Error('Someting went wrong'));
      })
      .catch(err => reject(err));
  });
};

export default login;
