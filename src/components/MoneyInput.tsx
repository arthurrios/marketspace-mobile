import { Text, Input as GluestackInput, InputField } from '@gluestack-ui/themed'
import { ReactNode } from 'react'

interface InputProps {
  placeholder: string
  children?: ReactNode
}

export function MoneyInput({ placeholder, children }: InputProps) {
  return (
    <GluestackInput
      h={45}
      py="$3"
      px="$1"
      gap="$2"
      bgColor="$gray700"
      borderWidth={0}
      borderRadius={6}
      alignItems="center"
    >
      <Text textAlign="center" pl="$3">
        $
      </Text>
      <InputField
        placeholder={placeholder}
        fontFamily="$body"
        fontSize="$md"
        keyboardType="numbers-and-punctuation"
        style={{ paddingHorizontal: 0, paddingRight: 12 }}
      />
      {children}
    </GluestackInput>
  )
}
