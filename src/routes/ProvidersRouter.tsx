import React, { FC } from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import ProvidersScreen from 'screens/public/ProvidersScreen';

import { RootStackParamList } from 'routes/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const ConnectRouter: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Providers'
        component={ProvidersScreen}
        options={{ headerLargeTitle: true }}
      />
    </Stack.Navigator>
  );
};

export default ConnectRouter;
