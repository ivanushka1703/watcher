import React, { FC, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useRoute } from '@react-navigation/native';

import Loading from 'components/common/Loading';
import DeploymentList from 'components/deployments/DeploymentList';

import formatSites from 'helpers/formatSites';
import { repositoriesQueries } from 'data/providers';

import useProviders from 'hooks/useProviders';

import { DeploymentsParams } from 'routes/types';

const DeploymentsScreen: FC = () => {
  const { provider } = useRoute<DeploymentsParams>().params || {};

  const { providers } = useProviders();

  const user = useMemo(() => providers.find(({ name }) => name === provider)?.user, [
    provider,
    providers,
  ]);

  const { query, variables, name } = useMemo(() => repositoriesQueries[provider], [provider]);

  const { data, loading, refetch } = useQuery(query, {
    variables,
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    skip: !user,
  });

  const sites = useMemo(() => formatSites(data?.[name]), [data, name]);

  if (!user) return null;

  if (!data && loading) return <Loading screen />;

  return <DeploymentList refetch={refetch as any} sites={sites} />;
};

export default DeploymentsScreen;
