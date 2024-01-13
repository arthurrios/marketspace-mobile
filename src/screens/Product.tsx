/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@components/Button'
import { Carousel } from '@components/Carousel'
import { Loading } from '@components/Loading'
import { PaymentTag } from '@components/PaymentTag'
import { ToastError } from '@components/ToastError'
import { UserImage } from '@components/UserImage'
import { ProductDTO } from '@dtos/ProductDTO'
import {
  HStack,
  Pressable,
  VStack,
  View,
  ScrollView,
  Text,
} from '@gluestack-ui/themed'
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { ArrowLeft, WhatsappLogo } from 'phosphor-react-native'
import { useCallback, useState } from 'react'
import { Linking } from 'react-native'

type RouteParamsProps = {
  productId: string
}

export function Product() {
  const [isLoading, setIsLoading] = useState(true)
  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO)

  const navigation = useNavigation()

  const route = useRoute()
  const { productId } = route.params as RouteParamsProps

  function handleGoBack() {
    navigation.goBack()
  }

  async function fetchProduct() {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/products/${productId}`)

      setProduct(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Error fetching product details'

      return <ToastError title={title} />
    } finally {
      setIsLoading(false)
    }
  }

  async function handleContactOwner() {
    try {
      const whatsappUrl = `https://wa.me/${product.user.tel}`

      await Linking.openURL(whatsappUrl)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Error contacting the owner'

      return <ToastError title={title} />
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchProduct()
    }, [productId]),
  )

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} bgColor="$gray600" pt="$16">
          <HStack px="$6" pb="$3">
            <Pressable onPress={handleGoBack}>
              <ArrowLeft />
            </Pressable>
          </HStack>

          <Carousel
            images={product.product_images.map(
              (image) => `${api.defaults.baseURL}/images/${image.path}`,
            )}
          />
          <ScrollView px="$6" py="$5" flex={1}>
            <VStack gap="$6" pb="$16">
              <HStack gap="$2" alignItems="center">
                <UserImage
                  height={24}
                  width={24}
                  uri={`${api.defaults.baseURL}/images/${product.user.avatar}`}
                />
                <Text>{product.user.name}</Text>
              </HStack>
              <VStack gap="$2">
                <HStack>
                  <View
                    bgColor="$gray500"
                    px="$2"
                    rounded="$full"
                    alignItems="center"
                  >
                    <Text
                      fontSize="$2xs"
                      fontFamily="$heading"
                      color="$gray200"
                      textTransform="uppercase"
                    >
                      {product.is_new ? 'new' : 'used'}
                    </Text>
                  </View>
                </HStack>
                <HStack justifyContent="space-between" alignItems="baseline">
                  <Text fontFamily="$heading" fontSize="$xl" gap="$3" flex={1}>
                    {product.name}
                  </Text>
                  <HStack gap={6} alignItems="flex-end">
                    <Text
                      mb={-1}
                      fontSize="$sm"
                      fontFamily="$heading"
                      color="$blueLight"
                    >
                      $
                    </Text>
                    <Text
                      fontSize="$xl"
                      fontFamily="$heading"
                      color="$blueLight"
                    >
                      {(product.price / 100).toFixed(2)}
                    </Text>
                  </HStack>
                </HStack>
                <Text>{product.description}</Text>
              </VStack>
              <VStack gap="$4">
                <HStack gap="$2">
                  <Text fontFamily="$heading">Accept Trade?</Text>
                  <Text>{product.accept_trade ? 'Yes' : 'No'}</Text>
                </HStack>
                <VStack gap="$2">
                  <Text fontFamily="$heading">Payment methods:</Text>

                  {product.payment_methods.map((item, index) => {
                    return <PaymentTag key={index} type={item.key} />
                  })}
                </VStack>
              </VStack>
            </VStack>
          </ScrollView>
          <HStack
            p="$6"
            pb={28}
            pt="$5"
            bgColor="$gray700"
            justifyContent="space-between"
            alignItems="center"
          >
            <HStack gap={6} alignItems="flex-end" flex={1}>
              <Text fontSize="$sm" fontFamily="$heading" color="$blue">
                $
              </Text>
              <Text fontSize="$2xl" fontFamily="$heading" color="$blue">
                {(product.price / 100).toFixed(2)}
              </Text>
            </HStack>
            <Button
              onPress={handleContactOwner}
              childrenIcon={
                <WhatsappLogo
                  size={16}
                  color="#F7F7F8"
                  weight="fill"
                  style={{ marginRight: 8 }}
                />
              }
              title="Message"
            />
          </HStack>
        </VStack>
      )}
    </>
  )
}
