import React, { FC, useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';

import RNBootSplash from 'react-native-bootsplash';

import Router from 'routes/Router';

import client from 'startup/apollo';

const App: FC = () => {
  useEffect(() => {
    setTimeout(() => {
      void RNBootSplash.hide({ fade: false });
    }, 0);
  }, []);

  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  );
};

export default App;
