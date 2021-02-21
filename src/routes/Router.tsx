import React, { FC, useCallback, useState } from 'react';
import { enableScreens } from 'react-native-screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from 'screens/public/HomeScreen';
import LoadingScreen from 'screens/public/LoadingScreen';

import SettingsRouter from 'routes/SettingsRouter';

enableScreens();
const Tab = createBottomTabNavigator();

const Router: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadEnd = useCallback(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <LoadingScreen onLoadEnd={handleLoadEnd} />;

  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Icon name='home' color={color} />,
        }}
      />
      <Tab.Screen
        name='Settings'
        component={SettingsRouter}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => <Icon name='settings' color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Router;
