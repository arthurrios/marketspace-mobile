import {
  FormControlError,
  FormControlErrorText,
  FormControl,
  Textarea,
  TextareaInput,
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

export function TextArea({
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
      <Textarea
        h={160}
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
        <TextareaInput
          onChangeText={onChangeText}
          value={value}
          w="$full"
          placeholder={placeholder}
          fontFamily="$body"
          fontSize="$md"
          {...props}
        />
        {children}
      </Textarea>
      <FormControlError>
        <FormControlErrorText>{errorMessage}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}
