import { TouchableOpacityProps } from "react-native";
import { Icon, Title, TransactionTypeButtonContainer } from "./styles";


interface Props extends TouchableOpacityProps {
  type: "up" | "down"
  title: string;
  isActive: boolean;
}

const icon = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
}

export function TransactionTypeButton({ title, type, isActive, ...props }: Props) {
  return (
    <TransactionTypeButtonContainer
      {...props}
      type={type}
      isActive={isActive}
    >
      <Icon name={icon[type]} type={type} />
      <Title>
        {title}
      </Title>
    </TransactionTypeButtonContainer>
  )
}