import React, { FC, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import RNBootSplash from 'react-native-bootsplash';

import Router from 'routes/Router';

const App: FC = () => {
  useEffect(() => {
    setTimeout(() => {
      void RNBootSplash.hide({ fade: false });
    }, 0);
  }, []);

  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
};

export default App;
