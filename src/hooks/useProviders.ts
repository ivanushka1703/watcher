import { createContext, useContext } from 'react';

import { orderBy } from 'lodash';

import { User } from 'helpers/prepareUser';
import { ProviderName } from 'data/providers';

export interface Provider {
  name: ProviderName;
  user?: User | null;
}

export interface ProvidersState {
  refetch: () => Promise<any>;
  providers: Array<Provider>;
}

const initialProviders: Array<Provider> = [
  {
    name: 'bitbucket',
    user: null,
  },
  {
    name: 'github',
    user: null,
  },
  {
    name: 'netlify',
    user: null,
  },
];

const initialValue: ProvidersState = {
  refetch: () => Promise.resolve(),
  providers: initialProviders,
};

export const ProvidersContext = createContext(initialValue);

const useProviders = (): ProvidersState => {
  const { refetch, providers } = useContext(ProvidersContext);

  return {
    refetch,
    providers: orderBy<Provider>(providers, ['user', 'name']),
  };
};

export default useProviders;
