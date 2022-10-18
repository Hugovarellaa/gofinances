import { TextInputProps } from "react-native";
import { InputContainer } from "./styles";

interface Props extends TextInputProps { }

export function Input({ ...rest }: Props) {
  return (
    <InputContainer {...rest} />
  )
}