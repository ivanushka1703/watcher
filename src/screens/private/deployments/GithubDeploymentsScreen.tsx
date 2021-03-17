import React, { FC, useMemo } from 'react';
import { useQuery } from '@apollo/client';

import Loading from 'components/common/Loading';
import DeploymentList from 'components/deployments/DeploymentList';

import formatSites from 'helpers/formatSites';

import GITHUB_REPOSITORIES_QUERY from 'graphql/queries/github/repositories';

const GithubDeploymentsScreen: FC = () => {
  const { data, loading, refetch } = useQuery(GITHUB_REPOSITORIES_QUERY, {
    variables: {
      type: 'all',
      sort: 'updated',
      direction: 'desc',
      per_page: 50,
      page: 0,
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  const sites = useMemo(() => formatSites(data?.github_repositories), [data?.github_repositories]);

  if (!data && loading) return <Loading screen />;

  return <DeploymentList refetch={refetch as any} sites={sites} />;
};

export default GithubDeploymentsScreen;
