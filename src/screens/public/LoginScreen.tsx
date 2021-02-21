import React, { FC } from 'react';
import { useRoute } from '@react-navigation/native';

import AuthForm from 'components/auth/AuthForm';

import { LoginParams } from 'routes/types';

const LoginScreen: FC = () => {
  const { type } = useRoute<LoginParams>().params || {};

  return <AuthForm type={type} />;
};

export default LoginScreen;
