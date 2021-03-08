import { Alert, AlertButton } from 'react-native';

interface Confirm {
  title: string;
  message?: string;
  leftText?: string;
  leftStyle?: AlertButton['style'];
  leftValue?: boolean;
  rightText?: string;
  rightStyle?: AlertButton['style'];
  rightValue?: boolean;
  cancelable?: boolean;
}

const confirm = ({
  title,
  message,
  leftText = 'Cancel',
  leftStyle = 'cancel',
  leftValue = false,
  rightText = 'OK',
  rightStyle = 'default',
  rightValue = true,
  cancelable = true,
}: Confirm): Promise<boolean> => {
  return new Promise(resolve => {
    Alert.alert(
      title,
      message,
      [
        {
          text: leftText,
          style: leftStyle,
          onPress: () => resolve(leftValue),
        },
        {
          text: rightText,
          style: rightStyle,
          onPress: () => resolve(rightValue),
        },
      ],
      {
        cancelable,
      },
    );
  });
};

export default confirm;
