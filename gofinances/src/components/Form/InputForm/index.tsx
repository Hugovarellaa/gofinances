import { Control, Controller } from 'react-hook-form'
import { TextInputProps } from 'react-native'
import { Input } from '../Input'
import { Error, InputFormContainer } from './styles'

interface Props extends TextInputProps {
  control: Control
  name: string
  error?: string
}

export function InputForm({ control, name, error, ...props }: Props) {
  return (
    <InputFormContainer >
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            {...props}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {error && <Error>{error}</Error>}
    </InputFormContainer>
  )
}