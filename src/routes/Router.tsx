import React, { FC, useCallback, useEffect } from 'react';

import { Linking, Platform, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { enableScreens } from 'react-native-screens';

import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';

import ProvidersProvider from 'hocs/ProvidersProvider';

import IconButton from 'components/common/IconButton';

import HomeScreen from 'screens/public/HomeScreen';
import LoginScreen from 'screens/public/LoginScreen';

import DeploymentsScreen from 'screens/private/DeploymentsScreen';

import { providerLogo } from 'data/providers';

import colors from 'styles/colors';

import { RootStackParamList } from 'routes/types';

enableScreens();

const Stack = createNativeStackNavigator<RootStackParamList>();

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

const Router: FC = () => {
  const scheme = useColorScheme();

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState<any>();

  useEffect(() => {
    const restoreState = async (): Promise<void> => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;

          if (state !== undefined) setInitialState(state);
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) void restoreState();
  }, [isReady]);

  const handleStateChange = useCallback((state: any): void => {
    if (!__DEV__) return;

    void AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state));
  }, []);

  return (
    <ProvidersProvider>
      <NavigationContainer
        theme={scheme === 'dark' ? DarkTheme : DefaultTheme}
        initialState={initialState}
        onStateChange={handleStateChange}
      >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen
            name='Deployments'
            component={DeploymentsScreen}
            options={({
              navigation: { navigate },
              route: {
                params: { provider },
              },
            }) => {
              const Logo = providerLogo[provider];

              return {
                headerShown: true,
                headerCenter: () => <Logo width={28} height={28} color={colors.primaryText} />,
                headerRight: () => (
                  <IconButton
                    icon='cog-outline'
                    noBackground
                    onPress={() => navigate('Login', { provider })}
                  />
                ),
              };
            }}
          />
          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{ stackPresentation: 'formSheet' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ProvidersProvider>
  );
};

export default Router;
