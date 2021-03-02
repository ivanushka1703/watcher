import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

import ProvidersRouter from 'routes/ProvidersRouter';
import HomeScreen from 'screens/public/HomeScreen';

const Tab = createBottomTabNavigator();

const TabsRouter: FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <Icon name={focused ? 'home' : 'home-outline'} size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Providers'
        component={ProvidersRouter}
        options={{
          tabBarLabel: 'Providers',
          tabBarIcon: ({ focused, color }) => (
            <Icon name={focused ? 'settings' : 'settings-outline'} size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsRouter;
