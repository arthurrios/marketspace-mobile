import {
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed'
import { PressableProps } from 'react-native'

type Props = PressableProps & {
  name: string
  price: string
  userImg: string
  isNew: boolean
  isActive: boolean
}

export function ProductAd({
  name,
  price,
  userImg,
  isNew,
  isActive,
  ...props
}: Props) {
  return (
    <Pressable {...props}>
      <VStack>
        <View position="relative" w={154} h={100} rounded="$md">
          <View
            h="$6"
            w="$6"
            top={4}
            left={4}
            zIndex={2}
            borderRadius="$full"
            borderWidth={1}
            borderColor="$gray700"
            position="absolute"
          >
            <Image
              size="full"
              source={{ uri: 'https://github.com/arthurrios.png' }}
              alt="User Image"
              resizeMode="contain"
              rounded="$full"
            />
          </View>

          <Image
            w={154}
            h={100}
            source={{
              uri: 'https://alexander-kay.com/cdn/shop/products/ak_w_dressed_wineredsuede_01_800x.jpg?v=1590234374',
            }}
            alt="Product Photo"
            rounded="$md"
            resizeMode="center"
          />

          <View
            position="absolute"
            top={4}
            right={4}
            px="$2"
            justifyContent="center"
            alignItems="center"
            bgColor={isNew ? '$blue' : '$gray200'}
            flex={1}
            borderRadius="$full"
          >
            <Text
              fontSize="$xs"
              textTransform="uppercase"
              fontFamily="$heading"
              color="$white"
            >
              {isNew ? 'new' : 'used'}
            </Text>
          </View>
        </View>

        <Text fontSize="$sm" color="$gray200" mt="$1">
          Red sneakers
        </Text>

        <HStack gap="$1">
          <Text fontFamily="$heading" fontSize="$sm" color="$gray100">
            $
          </Text>
          <Text fontFamily="$heading" fontSize="$md" color="$gray100">
            26,30
          </Text>
        </HStack>
      </VStack>
    </Pressable>
  )
}
