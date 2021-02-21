import { RouteProp } from '@react-navigation/native';

export type LoginType = 'bitbucket' | 'github' | 'netlify';

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  Login: { type: LoginType };
};

export type LoginParams = RouteProp<RootStackParamList, 'Login'>;
