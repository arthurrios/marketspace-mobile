import { Button } from '@components/Button'
import {
  Center,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed'
import { Plus, User } from 'phosphor-react-native'

export function Home() {
  return (
    <ScrollView bgColor="$gray600" py={72} px="$6">
      <HStack w="$full" justifyContent="space-between" gap="$2">
        <Pressable>
          <HStack flex={1} w={200} gap={10}>
            <View
              w={45}
              h={45}
              borderRadius="$full"
              bgColor="$gray500"
              borderColor="$blueLight"
              borderWidth={2}
              position="relative"
              alignItems="center"
              justifyContent="center"
            >
              {/* <User size={22} color="#9F9BA1" weight="bold" /> */}
              <Image
                source={{ uri: 'https://github.com/arthurrios.png' }}
                alt="User photo"
                resizeMode="contain"
                rounded="$full"
                size="full"
              />
            </View>
            <VStack>
              <Text color="$gray100">Welcome,</Text>
              <Text fontFamily="$heading">Arthur!</Text>
            </VStack>
          </HStack>
        </Pressable>

        <Button title="Create Ad" icon={Plus} variant="secondary" hasIcon />
      </HStack>
    </ScrollView>
  )
}
