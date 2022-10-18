import { TouchableOpacityProps } from "react-native";
import { Category, CategorySelectButtonFormContainer, Icon } from "./styles";

interface Props extends TouchableOpacityProps {
  title: string
  onPress: () => void
}

export function CategorySelectButtonForm({ title, onPress }: Props) {
  return (
    <CategorySelectButtonFormContainer onPress={onPress}>
      <Category>{title}</Category>
      <Icon name='chevron-down' />
    </CategorySelectButtonFormContainer>
  )
}