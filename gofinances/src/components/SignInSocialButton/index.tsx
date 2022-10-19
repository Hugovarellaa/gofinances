import { TouchableOpacityProps } from "react-native";
import { SvgProps } from "react-native-svg";
import { ImageContainer, SignInSocialButtonContainer, Title } from "./styles";

interface Props extends TouchableOpacityProps {
  title: string;
  svg: React.FC<SvgProps>
}

export function SignInSocialButton({ title, svg: Svg , ... rest}: Props) {
  return (
    <SignInSocialButtonContainer {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>
      <Title>{title}</Title>
    </SignInSocialButtonContainer>
  )
}