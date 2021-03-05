import React, { FC, useEffect } from 'react';

import RNBootSplash from 'react-native-bootsplash';

import Router from 'routes/Router';

const App: FC = () => {
  useEffect(() => {
    setTimeout(() => {
      void RNBootSplash.hide({ fade: false });
    }, 0);
  }, []);

  return <Router />;
};

export default App;
