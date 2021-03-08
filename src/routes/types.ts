import { RouteProp } from '@react-navigation/native';
import { ProviderName } from 'data/providers';

export type RootStackParamList = {
  Home: undefined;
  Deployments: { provider: ProviderName };
  Login: { provider: ProviderName };
};

export type LoginParams = RouteProp<RootStackParamList, 'Login'>;
export type DeploymentsParams = RouteProp<RootStackParamList, 'Deployments'>;
