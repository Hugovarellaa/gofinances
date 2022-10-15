import { TouchableOpacityProps } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { ImageContainer, SignInSocialButtonContainer, Text } from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  svg: React.FC<SvgProps>
}

export function SignInSocialButton({ svg: Svg, title, ...rest }: Props) {
  return (
    <SignInSocialButtonContainer {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>
      <Text>
        {title}
      </Text>
    </SignInSocialButtonContainer>
  )
}