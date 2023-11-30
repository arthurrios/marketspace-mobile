import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { ProductAd } from '@components/ProductAd'
import {
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed'
import {
  ArrowRight,
  MagnifyingGlass,
  Plus,
  Sliders,
  Tag,
} from 'phosphor-react-native'

export function Home() {
  return (
    <ScrollView
      bgColor="$gray600"
      px="$6"
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View gap="$8" py={72}>
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

        <VStack gap="$3">
          <Text fontSize="$sm" color="$gray300">
            Your ads
          </Text>
          <HStack
            bgColor="rgba(100, 122, 199, 0.1)"
            px="$5"
            py="$3"
            justifyContent="space-between"
            alignItems="center"
            borderRadius={6}
          >
            <HStack alignItems="center" gap="$4">
              <Tag color="#364D9D" />
              <VStack>
                <Text fontSize="$xl" fontFamily="$heading">
                  4
                </Text>
                <Text fontSize="$sm">active ads</Text>
              </VStack>
            </HStack>

            <Pressable>
              <HStack gap="$2" alignItems="center">
                <Text color="$blue" fontSize="$sm" fontFamily="$heading">
                  My ads
                </Text>
                <ArrowRight size={18} color="#364D9D" />
              </HStack>
            </Pressable>
          </HStack>
        </VStack>

        <VStack gap="$6">
          <VStack gap="$3">
            <Text fontSize="$sm" color="$gray300">
              Buy various products
            </Text>

            <Input placeholder="Search ad">
              <HStack gap="$3" mr="$2" alignItems="center">
                <Pressable>
                  <MagnifyingGlass weight="bold" color="#3E3A40" />
                </Pressable>
                <View h={18} w={1} bgColor="$gray400" />
                <Pressable>
                  <Sliders weight="bold" color="#3E3A40" />
                </Pressable>
              </HStack>
            </Input>
          </VStack>

          <HStack gap="$6" flexWrap="wrap" justifyContent="space-between">
            <ProductAd />
            <ProductAd />
            <ProductAd />
            <ProductAd />
            <ProductAd />
            <ProductAd />
            <ProductAd />
          </HStack>
        </VStack>
      </View>
    </ScrollView>
  )
}
