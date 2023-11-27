/* eslint-disable react/no-unescaped-entities */
import { Center, ScrollView, Text, VStack } from '@gluestack-ui/themed'
import LogoSvg from '@assets/logo.svg'
import MarketspaceSvg from '@assets/logotype.svg'
import { Input } from '@components/Input'
import { InputPassword } from '@components/InputPassword'
import { Button } from '@components/Button'

export function SignIn() {
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
                  <Input placeholder="Email" />
                  <InputPassword placeholder="Password" />
                </Center>
                <Button title="Sign in" />
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
          <Button title="Create account" variant="tertiary" />
        </VStack>
      </ScrollView>
    </VStack>
  )
}
