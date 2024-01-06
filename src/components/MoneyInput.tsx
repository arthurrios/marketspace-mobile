import {
  Text,
  Input as GluestackInput,
  InputField,
  FormControl,
  FormControlError,
  FormControlErrorText,
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

export function MoneyInput({
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
    <FormControl isInvalid={invalid}>
      <GluestackInput
        h={45}
        py="$3"
        px="$1"
        gap="$2"
        bgColor="$gray700"
        borderWidth={0}
        borderRadius={6}
        alignItems="center"
        isInvalid={invalid}
        {...props}
      >
        <Text textAlign="center" pl="$3">
          $
        </Text>
        <InputField
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          fontFamily="$body"
          fontSize="$md"
          keyboardType="numbers-and-punctuation"
          style={{ paddingHorizontal: 0, paddingRight: 12 }}
          {...props}
        />
        {children}
      </GluestackInput>
      <FormControlError>
        <FormControlErrorText>{errorMessage}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}
