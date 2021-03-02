import { ViewStyle } from 'react-native';

import colors from 'styles/colors';

const card: ViewStyle = {
  backgroundColor: colors.white,
  shadowColor: '#999999',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 1.5,
};

export default card;
