import { TouchableOpacityProps } from "react-native";
import { ButtonContainer, Title } from "./styles";

interface Props extends TouchableOpacityProps {
  title: string
}


export function Button({ title, ...props }: Props) {
  return (
    <ButtonContainer {...props}>
      <Title>
        {title}
      </Title>
    </ButtonContainer>
  )
}