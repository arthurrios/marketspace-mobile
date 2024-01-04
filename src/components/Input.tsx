import {
  Input as GluestackInput,
  InputField,
  FormControl,
  FormControlErrorText,
  FormControlError,
} from '@gluestack-ui/themed'
import { ReactNode } from 'react'
import { TextInputProps } from 'react-native'

type InputProps = TextInputProps & {
  placeholder: string
  onChangeText?: (value: string) => void
  children?: ReactNode
  value?: string
  errorMessage?: string | null
  isInvalid?: boolean
}

export function Input({
  errorMessage = null,
  isInvalid,
  placeholder,
  onChangeText,
  value,
  children,
  ...props
}: InputProps) {
  const invalid = !!errorMessage || isInvalid
  return (
    <FormControl w="$full" isInvalid={invalid} mb="$1">
      <GluestackInput
        h={45}
        py="$3"
        px="$1"
        gap="$3"
        bgColor="$gray700"
        borderWidth={0}
        borderRadius={6}
        alignItems="center"
        isInvalid={invalid}
        {...props}
      >
        <InputField
          onChangeText={onChangeText}
          placeholder={placeholder}
          fontFamily="$body"
          fontSize="$md"
          value={value}
          autoCapitalize="none"
        />
        {children}
      </GluestackInput>
      <FormControlError>
        <FormControlErrorText>{errorMessage}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}
