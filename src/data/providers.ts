import { DocumentNode } from 'graphql';
import { SvgProps } from 'react-native-svg';

import BitBucketLogo from 'images/icons/bitbucket-logo.svg';
import GitHubLogo from 'images/icons/github-logo.svg';
import NetlifyLogo from 'images/icons/netlify-logo.svg';

import BITBUCKET_USER_QUERY from 'graphql/queries/user/bitbucketUser';
import GITHUB_USER_QUERY from 'graphql/queries/user/githubUser';
import NETLIFY_USER_QUERY from 'graphql/queries/user/netlifyUser';

import BITBUCKET_WORKSPACES_QUERY from 'graphql/queries/bitbucket/workspaces';
import GITHUB_REPOSITORIES_QUERY from 'graphql/queries/github/repositories';
import NETLIFY_SITES_QUERY from 'graphql/queries/netlify/sites';

export const providers = ['bitbucket', 'github', 'netlify'] as const;

export type ProviderName = typeof providers[number];

export const query: { [key in ProviderName]: DocumentNode } = {
  bitbucket: BITBUCKET_USER_QUERY,
  github: GITHUB_USER_QUERY,
  netlify: NETLIFY_USER_QUERY,
};

export type ProviderLogo = {
  [key in ProviderName]: React.FC<SvgProps>;
};

export type ProviderTitle = {
  [key in ProviderName]: string;
};

export type StorageKeys = {
  [key in ProviderName]: string;
};

export const endpoints = {
  bitbucket: 'https://api.bitbucket.org/2.0/',
  github: 'https://api.github.com/',
  netlify: 'https://api.netlify.com/api/v1/',
};

export const urls = {
  bitbucket: 'https://bitbucket.org/',
  github: 'https://github.com/',
  netlify: 'https://app.netlify.com/teams/',
};

export const storageKeys: StorageKeys = {
  bitbucket: 'BITBUCKET_TOKEN',
  github: 'GITHUB_TOKEN',
  netlify: 'NETLIFY_TOKEN',
};

export const providerLogo: ProviderLogo = {
  bitbucket: BitBucketLogo,
  github: GitHubLogo,
  netlify: NetlifyLogo,
};

export const providerTitle: ProviderTitle = {
  bitbucket: 'Bitbucket',
  github: 'GitHub',
  netlify: 'Netlify',
};

export const repositoriesQueries = {
  bitbucket: {
    query: BITBUCKET_WORKSPACES_QUERY,
    variables: {
      sort: 'name',
    },
    name: 'bitbucket_repositories',
  },
  github: {
    query: GITHUB_REPOSITORIES_QUERY,
    variables: {
      type: 'all',
      sort: 'updated',
      direction: 'desc',
      per_page: 50,
      page: 0,
    },
    name: 'github_repositories',
  },
  netlify: {
    query: NETLIFY_SITES_QUERY,
    variables: {
      filter: 'all',
      page: 1,
      per_page: 50,
    },
    name: 'netlify_sites',
  },
};
