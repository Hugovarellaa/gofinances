import { TouchableOpacityProps } from "react-native";
import { Icon, Title, TransactionTypeButtonFormContainer } from "./styles";


interface Props extends TouchableOpacityProps {
  title: string
  type: 'income' | 'outcome'
  isActive: boolean
}

const icon = {
  income: "arrow-up-circle",
  outcome: "arrow-down-circle",
}


export function TransactionTypeButtonForm({ title, type, isActive, ...rest }: Props) {
  return (
    <TransactionTypeButtonFormContainer
      type={type}
      isActive={isActive}
      {...rest}
    >
      <Icon name={icon[type]} type={type} />
      <Title>{title}</Title>
    </TransactionTypeButtonFormContainer>
  )
}