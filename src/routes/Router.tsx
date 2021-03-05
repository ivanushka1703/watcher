import React, { FC, useCallback, useState } from 'react';
import { LayoutAnimation, useColorScheme } from 'react-native';
import { enableScreens } from 'react-native-screens';

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import TabsRouter from 'routes/TabsRouter';

import LoginScreen from 'screens/public/LoginScreen';
import LoadingScreen from 'screens/public/LoadingScreen';

import { RootStackParamList } from './types';

enableScreens();

const Stack = createNativeStackNavigator<RootStackParamList>();

const Router: FC = () => {
  const scheme = useColorScheme();

  const [isLoading, setIsLoading] = useState(true);

  const handleLoadEnd = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsLoading(false);
  }, []);

  if (isLoading) return <LoadingScreen onLoadEnd={handleLoadEnd} />;

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={TabsRouter} />
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{ stackPresentation: 'formSheet' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
