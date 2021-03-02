import React, { FC, useCallback, useState } from 'react';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import TabsRouter from 'routes/TabsRouter';

import LoadingScreen from 'screens/public/LoadingScreen';
import LoginScreen from 'screens/public/LoginScreen';

import { RootStackParamList } from './types';

enableScreens();

const Stack = createNativeStackNavigator<RootStackParamList>();

const Router: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadEnd = useCallback(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <LoadingScreen onLoadEnd={handleLoadEnd} />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={TabsRouter} />
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{ stackPresentation: 'formSheet' }}
      />
    </Stack.Navigator>
  );
};

export default Router;
