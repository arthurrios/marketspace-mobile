import { PhotoFileDTO } from '@dtos/PhotoFileDTO'
import { ProductDTO } from '@dtos/ProductDTO'
import {
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed'
import { api } from '@services/api'
import { useState } from 'react'
import { PressableProps } from 'react-native'

type Props = PressableProps & {
  name: string
  price: string
  userImg?: string
  isNew: boolean
  isActive?: boolean
  showUser?: boolean
  data: ProductDTO
}

export function ProductAd({
  userImg,
  isNew,
  isActive = true,
  showUser = true,
  data,
  ...props
}: Props) {
  const [productImages, setProductImages] = useState<PhotoFileDTO[]>([])

  // const productId = data.id

  // async function fetchProductData() {
  //   try {
  //     const productImages = await api.get(`/products/${productId}`)
  //     setProductImages(productImages)
  //   } catch (error) {
  //     throw error
  //   }
  // }
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
                source={{ uri: userImg }}
                alt="User Image"
                resizeMode="contain"
                rounded="$full"
              />
            )}
          </View>

          {!isActive && (
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
              uri: '',
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

        <Text fontSize="$sm" color={isActive ? '$gray200' : '$gray400'} mt="$1">
          Red sneakers
        </Text>

        <HStack gap="$1" alignItems="flex-end">
          <Text
            fontFamily={isActive ? '$heading' : '$body'}
            fontSize="$xs"
            mb={-1}
            color={isActive ? '$gray100' : '$gray400'}
          >
            $
          </Text>
          <Text
            fontFamily={isActive ? '$heading' : '$body'}
            fontSize="$md"
            color={isActive ? '$gray100' : '$gray400'}
          >
            26,30
          </Text>
        </HStack>
      </VStack>
    </Pressable>
  )
}
