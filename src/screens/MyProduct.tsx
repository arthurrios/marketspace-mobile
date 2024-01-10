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
import { useNavigation, useRoute } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/app.routes'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import {
  ArrowLeft,
  PencilSimpleLine,
  Power,
  TrashSimple,
} from 'phosphor-react-native'
import { useEffect, useState } from 'react'

type RouteParamsProps = {
  productId: string
}

export function MyProduct() {
  const [isLoading, setIsLoading] = useState(true)
  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO)

  const [adIsActive, setAdIsActive] = useState(true)

  const navigation = useNavigation<AppNavigationRoutesProps>()

  const route = useRoute()

  const { productId } = route.params as RouteParamsProps

  function handleGoBack() {
    navigation.navigate('mySales')
  }

  function handleEditProduct() {
    navigation.navigate('editAd')
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

  useEffect(() => {
    fetchProduct()
  }, [productId])

  return (
    <>
      <VStack flex={1} bgColor="$gray600" pt="$16">
        <HStack px="$6" pb="$3" justifyContent="space-between">
          <Pressable onPress={handleGoBack}>
            <ArrowLeft />
          </Pressable>
          <Pressable onPress={handleEditProduct}>
            <PencilSimpleLine />
          </Pressable>
        </HStack>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Carousel
              images={product.product_images.map(
                (image) => `${api.defaults.baseURL}/images/${image.path}`,
              )}
              adIsActive={adIsActive}
            />

            <ScrollView px="$6" py="$5" flex={1}>
              <VStack gap="$6" pb="$2">
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
                    <Text
                      fontFamily="$heading"
                      fontSize="$xl"
                      gap="$3"
                      flex={1}
                    >
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
                        {product.price / 100}
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
                <VStack gap="$2" mb={50} bgColor="$gray600">
                  {!adIsActive ? (
                    <Button
                      title="Reactivate ad"
                      childrenIcon={
                        <Power
                          color="#EDECEE"
                          size={16}
                          style={{ marginRight: 8 }}
                        />
                      }
                    />
                  ) : (
                    <Button
                      variant="secondary"
                      title="Disable ad"
                      childrenIcon={
                        <Power
                          color="#EDECEE"
                          size={16}
                          style={{ marginRight: 8 }}
                        />
                      }
                    />
                  )}
                  <Button
                    variant="tertiary"
                    title="Delete ad"
                    childrenIcon={
                      <TrashSimple
                        color="#3E3A40"
                        size={16}
                        style={{ marginRight: 8 }}
                      />
                    }
                  />
                </VStack>
              </VStack>
            </ScrollView>
          </>
        )}
      </VStack>
    </>
  )
}
