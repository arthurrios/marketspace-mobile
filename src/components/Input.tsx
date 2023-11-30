import { Input as GluestackInput, InputField } from '@gluestack-ui/themed'
import { ReactNode } from 'react'

interface InputProps {
  placeholder: string
  children: ReactNode
}

export function Input({ placeholder, children }: InputProps) {
  return (
    <GluestackInput
      h={45}
      py="$3"
      px="$1"
      gap="$3"
      bgColor="$gray700"
      borderWidth={0}
      borderRadius={6}
      alignItems="center"
    >
      <InputField placeholder={placeholder} fontFamily="$body" fontSize="$md" />
      {children}
    </GluestackInput>
  )
}
