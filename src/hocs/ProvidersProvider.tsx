import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { LayoutAnimation } from 'react-native';

import { useQuery } from '@apollo/client';

import LoadingScreen from 'screens/public/LoadingScreen';

import { providers as providerNames } from 'data/providers';
import { ProvidersContext } from 'hooks/useProviders';

import BITBUCKET_USER_QUERY from 'graphql/queries/user/bitbucketUser';
import GITHUB_USER_QUERY from 'graphql/queries/user/githubUser';
import NETLIFY_USER_QUERY from 'graphql/queries/user/netlifyUser';

import prepareUser from 'helpers/prepareUser';

const ProvidersProvider: FC = ({ children }) => {
  const { data: bitbucket, loading: bitbucketLoading, refetch: bitbucketRefetch } = useQuery(
    BITBUCKET_USER_QUERY,
    {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
  );

  const { data: github, loading: githubLoading, refetch: githubRefetch } = useQuery(
    GITHUB_USER_QUERY,
    {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
  );

  const { data: netlify, loading: netlifyLoading, refetch: netlifyRefetch } = useQuery(
    NETLIFY_USER_QUERY,
    {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
  );

  const loading = useMemo(() => {
    return [
      bitbucketLoading && !bitbucket,
      githubLoading && !github,
      netlifyLoading && !netlify,
    ].some(Boolean);
  }, [bitbucket, bitbucketLoading, github, githubLoading, netlify, netlifyLoading]);

  const users = useMemo(
    () => ({
      bitbucket: bitbucket?.bitbucket_user,
      github: github?.github_user,
      netlify: netlify?.netlify_user,
    }),
    [bitbucket, github, netlify],
  );

  const providers = useMemo(
    () =>
      providerNames.map(provider => ({
        name: provider,
        user: prepareUser(provider, users[provider]),
      })),
    [users],
  );

  const refetch = useCallback(() => {
    return Promise.all([bitbucketRefetch, githubRefetch, netlifyRefetch]);
  }, [bitbucketRefetch, githubRefetch, netlifyRefetch]);

  useEffect(() => {
    if (!loading) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  }, [loading]);

  return (
    <ProvidersContext.Provider value={{ providers, refetch }}>
      {loading ? <LoadingScreen /> : children}
    </ProvidersContext.Provider>
  );
};

export default ProvidersProvider;
