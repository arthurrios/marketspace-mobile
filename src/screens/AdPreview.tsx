/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import { Button } from '@components/Button'
import { Carousel } from '@components/Carousel'
import { PaymentTag } from '@components/PaymentTag'
import { UserImage } from '@components/UserImage'
import { HStack, VStack, View, ScrollView, Text } from '@gluestack-ui/themed'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/app.routes'
import { ArrowLeft, Tag } from 'phosphor-react-native'
import { CreateAdFormDataProps } from './CreateAd'
import { useAuth } from '@hooks/Auth'
import { api } from '@services/api'
import { formatPrice } from '@utils/formatPrice'
import { UseFormReset } from 'react-hook-form'
import * as ImagePicker from 'expo-image-picker'
import { ProductImageDTO } from '@dtos/ProductImageDTO'

type RouteParamsProps = {
  formData: CreateAdFormDataProps
  reset: UseFormReset<CreateAdFormDataProps>
  setImages: React.Dispatch<
    React.SetStateAction<ImagePicker.ImagePickerAsset[] | ProductImageDTO[]>
  >
  setPaymentMethodsSelected: React.Dispatch<React.SetStateAction<string[]>>
}

export function AdPreview() {
  const { user } = useAuth()
  const route = useRoute()

  const { formData, reset, setImages, setPaymentMethodsSelected } =
    route.params as RouteParamsProps

  const navigation = useNavigation<AppNavigationRoutesProps>()

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleCreateAd() {
    try {
      const { data } = await api.post('/products', {
        name: formData.adTitle,
        description: formData.description,
        is_new: formData.productState === 'new',
        accept_trade: formData.acceptTrade,
        payment_methods: formData.paymentMethods,
        price: Number((parseFloat(formData.price) * 100).toFixed(0)),
      })

      const productId = data.id

      const productImagesUploadForm = new FormData()

      formData.images.forEach((image, index) => {
        const fileExtension = image.uri.split('.').pop()
        productImagesUploadForm.append('images', {
          name: `${image.fileName}${index}.${fileExtension}`.toLowerCase(),
          uri: image.uri,
          type: `${image.type}/${fileExtension}`,
        } as any)
      })

      productImagesUploadForm.append('product_id', productId)

      await api.post('/products/images', productImagesUploadForm)

      reset()
      setImages([])
      setPaymentMethodsSelected([])

      navigation.navigate('mySales')
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <VStack bgColor="$blueLight" pt="$16" px="$6" pb="$4" alignItems="center">
        <Text fontFamily="$heading" color="$gray700">
          Ad preview
        </Text>
        <Text fontFamily="$body" color="$gray700">
          This is how your product will be displayed!
        </Text>
      </VStack>
      <VStack flex={1} bgColor="$gray600">
        <Carousel images={formData.images.map((image) => image.uri)} />
        <ScrollView px="$6" py="$5" flex={1}>
          <VStack gap="$6" pb="$2">
            <HStack gap="$2" alignItems="center">
              <UserImage
                height={24}
                width={24}
                uri={`${api.defaults.baseURL}/images/${user.avatar}`}
              />
              <Text>{user.name}</Text>
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
                    {formData.productState}
                  </Text>
                </View>
              </HStack>
              <HStack justifyContent="space-between" alignItems="baseline">
                <Text fontFamily="$heading" fontSize="$xl" gap="$3" flex={1}>
                  {formData.adTitle}
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
                  <Text fontSize="$xl" fontFamily="$heading" color="$blueLight">
                    {formatPrice(formData.price)}
                  </Text>
                </HStack>
              </HStack>
              <Text>{formData.description}</Text>
            </VStack>
            <VStack gap="$4">
              <HStack gap="$2">
                <Text fontFamily="$heading">Accept Trade?</Text>
                <Text>{formData.acceptTrade ? 'Yes' : 'No'}</Text>
              </HStack>
              <VStack gap="$2" mb={50}>
                <Text fontFamily="$heading">Payment methods:</Text>

                {formData.paymentMethods.map((item, index) => {
                  return <PaymentTag key={index} type={item} />
                })}
              </VStack>
            </VStack>
          </VStack>
        </ScrollView>
      </VStack>
      <HStack bgColor="$gray700" gap="$3" pt="$5" px="$6" pb={28}>
        <Button
          variant="tertiary"
          title="Go back and edit"
          childrenIcon={<ArrowLeft size={16} style={{ marginRight: 8 }} />}
          onPress={handleGoBack}
        />
        <Button
          title="Publish"
          childrenIcon={
            <Tag size={16} style={{ marginRight: 8 }} color="#EDECEE" />
          }
          onPress={handleCreateAd}
        />
      </HStack>
    </>
  )
}
