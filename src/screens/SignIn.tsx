/* eslint-disable react/no-unescaped-entities */
import { Center, ScrollView, Text, VStack } from '@gluestack-ui/themed'
import LogoSvg from '@assets/logo.svg'
import MarketspaceSvg from '@assets/logotype.svg'
import { Input } from '@components/Input'
import { InputPassword } from '@components/InputPassword'
import { Button } from '@components/Button'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigationRoutesProps } from '@routes/auth.routes'
import { useAuth } from '@hooks/Auth'
import { Controller, useForm } from 'react-hook-form'

type FormData = {
  email: string
  password: string
}

export function SignIn() {
  const { signIn } = useAuth()

  const navigation = useNavigation<AuthNavigationRoutesProps>()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  function handleSignIn({ email, password }: FormData) {
    signIn(email, password)
  }

  return (
    <VStack bgColor="$gray700" flex={1}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack bgColor="$gray600" px={48} pb={64} borderRadius={24}>
          <VStack pt={44}>
            <Center mt={65}>
              <LogoSvg />
              <Center mt={20} w="$full">
                <MarketspaceSvg />
                <Text color="$gray300" fontFamily="$light">
                  Your sales space
                </Text>
                <Center gap={16} mb={32}>
                  <Text color="$gray200" mt={77}>
                    Access your account
                  </Text>
                  <Controller
                    control={control}
                    name="email"
                    rules={{ required: 'Enter email' }}
                    render={({ field: { onChange } }) => (
                      <Input
                        placeholder="Email"
                        keyboardType="email-address"
                        onChangeText={onChange}
                        errorMessage={errors.email?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="password"
                    rules={{ required: 'Enter password' }}
                    render={({ field: { onChange } }) => (
                      <InputPassword
                        placeholder="Password"
                        secureTextEntry
                        onChangeText={onChange}
                        errorMessage={errors.password?.message}
                      />
                    )}
                  />
                </Center>
                <Button title="Sign in" onPress={handleSubmit(handleSignIn)} />
              </Center>
            </Center>
          </VStack>
        </VStack>
        <VStack px={48}>
          <Center mb={16}>
            <Text color="$gray200" mt={77}>
              Still doesn't have access?
            </Text>
          </Center>
          <Button
            title="Create account"
            variant="tertiary"
            onPress={handleNewAccount}
          />
        </VStack>
      </ScrollView>
    </VStack>
  )
}
