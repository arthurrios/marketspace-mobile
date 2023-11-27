import {
  Center,
  Pressable,
  ScrollView,
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed'
import LogoSvg from '@assets/logo.svg'
import { PencilSimpleLine, User } from 'phosphor-react-native'
import { Input } from '@components/Input'
import { InputPassword } from '@components/InputPassword'
import { Button } from '@components/Button'
import { useNavigation } from '@react-navigation/native'

export function SignUp() {
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      bgColor="$gray600"
    >
      <VStack mt="$8" py="$12" px="$12">
        <Center gap={8}>
          <LogoSvg width={60} />
          <Text fontFamily="$heading" fontSize="$xl">
            Welcome!
          </Text>
          <Text textAlign="center" fontSize="$sm">
            Create your account and use the space to buy miscellaneous items and
            sell your products
          </Text>
          <VStack mt="$8" gap="$4" w="$full" alignItems="center">
            <Pressable>
              <View
                w={88}
                h={88}
                borderRadius="$full"
                bgColor="$gray500"
                borderColor="$blueLight"
                borderWidth={3}
                position="relative"
                alignItems="center"
                justifyContent="center"
              >
                <User size={44} color="#9F9BA1" weight="bold" />
                <View
                  position="absolute"
                  w="$10"
                  h="$10"
                  borderRadius="$full"
                  bgColor="$blueLight"
                  right={-4}
                  bottom={-4}
                  alignItems="center"
                  justifyContent="center"
                >
                  <PencilSimpleLine color="#EDECEE" size={16} />
                </View>
              </View>
            </Pressable>
            <Input placeholder="Name" />
            <Input placeholder="Email" />
            <Input placeholder="Phone" />
            <InputPassword placeholder="Password" />
            <InputPassword placeholder="Confirm Password" />
            <Button variant="secondary" title="Create" />
          </VStack>
        </Center>
        <Center mb={16}>
          <Text color="$gray200" mt="$12">
            Already have an account?
          </Text>
        </Center>
        <Button
          title="Go to Log In"
          variant="tertiary"
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  )
}
