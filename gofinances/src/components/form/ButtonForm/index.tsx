import { TouchableOpacityProps } from "react-native";
import { ButtonFormContainer, Title } from "./styles";

interface Props extends TouchableOpacityProps {
  title: string
}

export function ButtonForm({ title, ...rest }: Props) {
  return (
    <ButtonFormContainer {...rest}>
      <Title>{title}</Title>
    </ButtonFormContainer>
  )
}