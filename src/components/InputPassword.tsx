import {
  FormControl,
  FormControlErrorText,
  Input as GluestackInput,
  InputField,
  InputIcon,
  InputSlot,
  FormControlError,
} from '@gluestack-ui/themed'
import { useState } from 'react'
import { Eye } from 'phosphor-react-native'
import { TextInputProps } from 'react-native'

type InputPasswordProps = TextInputProps & {
  placeholder: string
  onChangeText?: (value: string) => void
  value?: string
  errorMessage?: string | null
  isInvalid?: boolean
}

export function InputPassword({
  placeholder,
  onChangeText,
  errorMessage = null,
  isInvalid,
  value,
  ...props
}: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false)
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl w="$full" isInvalid={invalid} mb="$1">
      <GluestackInput
        h={45}
        py="$3"
        px="$1"
        w="$full"
        bgColor="$gray700"
        borderWidth={0}
        borderRadius={6}
        isInvalid={invalid}
        {...props}
      >
        <InputField
          type={showPassword ? 'text' : 'password'}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          fontFamily="$body"
          fontSize="$md"
        />
        <InputSlot pr={12} onPress={handleState}>
          <InputIcon as={Eye} color="$gray300" size="lg" />
        </InputSlot>
      </GluestackInput>
      <FormControlError>
        <FormControlErrorText>{errorMessage}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}
