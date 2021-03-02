import { SvgProps } from 'react-native-svg';

import BitBucketLogo from 'images/icons/bitbucket-logo.svg';
import GitHubLogo from 'images/icons/github-logo.svg';
import NetlifyLogo from 'images/icons/netlify-logo.svg';

const providers = ['bitbucket', 'github', 'netlify'] as const;

export type ProviderName = typeof providers[number];

export type ProviderLogoByType = {
  [key in ProviderName]: React.FC<SvgProps>;
};

export type ProviderTitleByType = {
  [key in ProviderName]: string;
};

export const logoByType: ProviderLogoByType = {
  bitbucket: BitBucketLogo,
  github: GitHubLogo,
  netlify: NetlifyLogo,
};

export const titleByType: ProviderTitleByType = {
  bitbucket: 'Bitbucket',
  github: 'GitHub',
  netlify: 'Netlify',
};

export default providers;
