import { TouchableOpacityProps } from "react-native";
import { ButtonContainer, Title } from "./styles";

interface Props extends TouchableOpacityProps {
  title: string
  onPress: () => void
}


export function Button({ title, onPress, ...props }: Props) {
  return (
    <ButtonContainer onPress={onPress} {...props}>
      <Title>
        {title}
      </Title>
    </ButtonContainer>
  )
}