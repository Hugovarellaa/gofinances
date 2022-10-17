import { TextInputProps } from "react-native";
import { InputFormContainer } from "./styles";

interface Props extends TextInputProps { }

export function InputForm({ ...rest }: Props) {
  return (
    <InputFormContainer {...rest} />
  )
}