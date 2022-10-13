import { TextInputProps } from "react-native";
import { InputContainer } from "./styles";

type Props = TextInputProps

export function Input({...props }: Props) {
  return (
    <InputContainer {...props} />
  )
}