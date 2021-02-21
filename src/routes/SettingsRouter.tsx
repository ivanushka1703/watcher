import React, { FC } from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import LoginScreen from 'screens/public/LoginScreen';
import SettingsScreen from 'screens/public/SettingsScreen';

import { RootStackParamList } from 'routes/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const ConnectRouter: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Settings' component={SettingsScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{ stackPresentation: 'formSheet' }}
      />
    </Stack.Navigator>
  );
};

export default ConnectRouter;
