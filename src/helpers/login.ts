import client from 'startup/apollo';

import BITBUCKET_USER_QUERY from 'graphql/queries/user/bitbucketUser';
import GITHUB_USER_QUERY from 'graphql/queries/user/githubUser';
import NETLIFY_USER_QUERY from 'graphql/queries/user/netlifyUser';

import { DocumentNode } from 'graphql';
import { ProviderName } from 'data/providers';

const query: { [key in ProviderName]: DocumentNode } = {
  bitbucket: BITBUCKET_USER_QUERY,
  github: GITHUB_USER_QUERY,
  netlify: NETLIFY_USER_QUERY,
};

const login = (provider: ProviderName, username?: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    client
      .query({
        query: query[provider],
        fetchPolicy: 'network-only',
        variables: { username },
      })
      .then(({ data }) => {
        if (data.user) return resolve(data.user);

        return reject(new Error('No user with the credentials'));
      })
      .catch(err => reject(err));
  });
};

export default login;
