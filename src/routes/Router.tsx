import React, { FC } from 'react';

import { useColorScheme } from 'react-native';

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

const Router: FC = () => {
  const scheme = useColorScheme();

  return (
    <ProvidersProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
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
