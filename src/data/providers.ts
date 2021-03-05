import { SvgProps } from 'react-native-svg';

import BitBucketLogo from 'images/icons/bitbucket-logo.svg';
import GitHubLogo from 'images/icons/github-logo.svg';
import NetlifyLogo from 'images/icons/netlify-logo.svg';

export const providers = ['bitbucket', 'github', 'netlify'] as const;

export type ProviderName = typeof providers[number];

export type ProviderLogo = {
  [key in ProviderName]: React.FC<SvgProps>;
};

export type ProviderTitle = {
  [key in ProviderName]: string;
};

export type StorageKeys = {
  [key in ProviderName]: {
    username: string;
    token: string;
  };
};

export const endpoints = {
  bitbucket: 'https://bitbucket.org/site/',
  github: 'https://api.github.com/',
  netlify: 'https://api.netlify.com/api/v1/',
};

export const storageKeys: StorageKeys = {
  bitbucket: { username: 'BITBUCKET_USERNAME', token: 'BITBUCKET_TOKEN' },
  github: { username: 'GITHUB_USERNAME', token: 'GITHUB_TOKEN' },
  netlify: { username: 'NETLIFY_USERNAME', token: 'NETLIFY_TOKEN' },
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
