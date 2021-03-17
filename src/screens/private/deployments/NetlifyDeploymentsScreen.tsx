import React, { FC, useMemo } from 'react';
import { useQuery } from '@apollo/client';

import Loading from 'components/common/Loading';
import DeploymentList from 'components/deployments/DeploymentList';

import formatSites from 'helpers/formatSites';

import NETLIFY_SITES_QUERY from 'graphql/queries/netlify/sites';

const NetlifyDeploymentsScreen: FC = () => {
  const { data, loading, refetch } = useQuery(NETLIFY_SITES_QUERY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      filter: 'all',
      page: 1,
      per_page: 30,
    },
    notifyOnNetworkStatusChange: true,
  });

  const sites = useMemo(() => formatSites(data?.netlify_sites), [data?.netlify_sites]);

  if (!data && loading) return <Loading screen />;

  return <DeploymentList refetch={refetch as any} sites={sites} />;
};

export default NetlifyDeploymentsScreen;
