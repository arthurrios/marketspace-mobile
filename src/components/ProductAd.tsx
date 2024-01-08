import { ProductDTO } from '@dtos/ProductDTO'
import {
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed'
import { useAuth } from '@hooks/Auth'
import { api } from '@services/api'
import { PressableProps } from 'react-native'

type Props = PressableProps & {
  showUser?: boolean
  data: ProductDTO
}

export function ProductAd({ showUser = true, data, ...props }: Props) {
  const { user } = useAuth()
  if (data) {
    return (
      <Pressable {...props}>
        <VStack>
          <View position="relative" w={154} rounded="$md">
            <View
              h="$6"
              w="$6"
              top={4}
              left={4}
              zIndex={2}
              position="absolute"
              style={
                showUser && {
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: '$gray700',
                }
              }
            >
              {showUser && (
                <Image
                  size="full"
                  source={{ uri: user.avatar }}
                  alt="User Image"
                  resizeMode="contain"
                  rounded="$full"
                />
              )}
            </View>

            {!data.is_active && (
              <>
                <View
                  position="absolute"
                  zIndex={20}
                  h="$full"
                  w="$full"
                  bgColor="$gray100"
                  opacity={0.45}
                  rounded="$md"
                />
                <Text
                  position="absolute"
                  bottom={6}
                  left={8}
                  zIndex={30}
                  color="$gray700"
                  fontFamily="$heading"
                  fontSize="$sm"
                  textTransform="uppercase"
                >
                  ad disabled
                </Text>
              </>
            )}
            <Image
              w={154}
              h={100}
              source={{
                uri: `${api.defaults.baseURL}/images/${data.product_images[0].path}`,
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
              bgColor={data.is_new ? '$blue' : '$gray200'}
              flex={1}
              borderRadius="$full"
            >
              <Text
                fontSize="$xs"
                textTransform="uppercase"
                fontFamily="$heading"
                color="$white"
              >
                {data.is_new ? 'new' : 'used'}
              </Text>
            </View>
          </View>

          <Text
            fontSize="$sm"
            color={data.is_active ? '$gray200' : '$gray400'}
            mt="$1"
          >
            {data.name}
          </Text>

          <HStack gap="$1" alignItems="flex-end">
            <Text
              fontFamily={data.is_active ? '$heading' : '$body'}
              fontSize="$xs"
              mb={-1}
              color={data.is_active ? '$gray100' : '$gray400'}
            >
              $
            </Text>
            <Text
              fontFamily={data.is_active ? '$heading' : '$body'}
              fontSize="$md"
              color={data.is_active ? '$gray100' : '$gray400'}
            >
              {(data.price / 100).toFixed(2)}
            </Text>
          </HStack>
        </VStack>
      </Pressable>
    )
  }
}
