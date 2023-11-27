import {
  Input as GluestackInput,
  InputField,
  InputIcon,
  InputSlot,
} from '@gluestack-ui/themed'
import { useState } from 'react'
import { Eye } from 'phosphor-react-native'
import { TextInputProps } from 'react-native'

type InputPasswordProps = TextInputProps & {
  placeholder: string
}

export function InputPassword({ placeholder, ...props }: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false)
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }

  return (
    <GluestackInput
      h={45}
      py="$3"
      px="$1"
      bgColor="$gray700"
      borderWidth={0}
      borderRadius={6}
      {...props}
    >
      <InputField
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        fontFamily="$body"
        fontSize="$md"
      />
      <InputSlot pr={12} onPress={handleState}>
        <InputIcon as={Eye} color="$gray300" size="lg" />
      </InputSlot>
    </GluestackInput>
  )
}
