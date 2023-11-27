import { Input as GluestackInput, InputField } from '@gluestack-ui/themed'

type InputProps = {
  placeholder: string
}

export function Input({ placeholder }: InputProps) {
  return (
    <GluestackInput
      h={45}
      py="$3"
      px="$1"
      bgColor="$gray700"
      borderWidth={0}
      borderRadius={6}
    >
      <InputField placeholder={placeholder} fontFamily="$body" fontSize="$md" />
    </GluestackInput>
  )
}
