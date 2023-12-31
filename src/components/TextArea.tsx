import { Textarea, TextareaInput } from '@gluestack-ui/themed'
import { ReactNode } from 'react'

interface InputProps {
  placeholder: string
  children?: ReactNode
}

export function TextArea({ placeholder, children }: InputProps) {
  return (
    <Textarea
      h={160}
      py="$3"
      px="$1"
      gap="$3"
      bgColor="$gray700"
      borderWidth={0}
      borderRadius={6}
      alignItems="center"
    >
      <TextareaInput
        w="$full"
        placeholder={placeholder}
        fontFamily="$body"
        fontSize="$md"
      />
      {children}
    </Textarea>
  )
}
