import React, { FC, useMemo } from 'react';
import { useRoute } from '@react-navigation/native';

import useProviders from 'hooks/useProviders';

import { DeploymentsParams } from 'routes/types';

import NetlifyDeployments from 'screens/private/deployments/NetlifyDeploymentsScreen';

const DeploymentsScreen: FC = () => {
  const { provider } = useRoute<DeploymentsParams>().params || {};

  const { providers } = useProviders();

  const user = useMemo(() => providers.find(({ name }) => name === provider)?.user, [
    provider,
    providers,
  ]);

  const Screen = useMemo(() => {
    switch (provider) {
      case 'netlify':
        return NetlifyDeployments;

      default:
        return NetlifyDeployments;
    }
  }, [provider]);

  if (!user) return null;

  return <Screen />;
};

export default DeploymentsScreen;
