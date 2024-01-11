/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { MoneyInput } from '@components/MoneyInput'
import { RadioCheck } from '@components/RadioCheck'
import { TextArea } from '@components/TextArea'
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
  CheckboxGroup,
  HStack,
  Image,
  Pressable,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  ScrollView,
  Text,
  VStack,
  View,
  Switch,
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
  FormControlErrorText,
} from '@gluestack-ui/themed'
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/app.routes'
import { ArrowLeft, Check, Plus, X } from 'phosphor-react-native'
import { useCallback, useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { createAdSchema } from './CreateAd'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProductDTO } from '@dtos/ProductDTO'
import { ToastError } from '@components/ToastError'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { Loading } from '@components/Loading'
import { transformProductImageToAsset } from '@utils/transformProductImageToAsset'

type RouteParamsProps = {
  productId: string
}

export type EditAdFormDataProps = {
  imagesUri: string[]
  images: ImagePicker.ImagePickerAsset[]
  adTitle: string
  description: string
  productState: string
  price: string
  acceptTrade: boolean
  paymentMethods: string[]
}

export function EditAd() {
  const [isLoading, setIsLoading] = useState(true)
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO)
  const [imagesUri, setImagesUri] = useState<string[]>([])
  const [imagesToDeleteIds, setImagesToDeleteIds] = useState<string[]>([])
  const [paymentMethodsSelected, setPaymentMethodsSelected] = useState<
    string[]
  >([])

  const toast = useToast()

  const navigation = useNavigation<AppNavigationRoutesProps>()

  const route = useRoute()
  const { productId } = route.params as RouteParamsProps

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<EditAdFormDataProps>({
    resolver: zodResolver(createAdSchema),
  })

  function handleGoBack() {
    navigation.navigate('myProduct', { productId })
  }

  async function handleEditAd(formData: EditAdFormDataProps) {
    try {
      const existingImageIds = product.product_images.map((image) => image.id)

      // Filter out images with common IDs
      const imagesToDelete = imagesToDeleteIds.filter((id) =>
        existingImageIds.includes(id),
      )

      if (imagesToDelete.length > 0) {
        // Delete the common images from the server
        await api.delete('/products/images', {
          data: {
            productImagesIds: imagesToDelete,
          },
        })
      }
      await api.put(`/products/${productId}`, {
        name: formData.adTitle,
        description: formData.description,
        is_new: formData.productState === 'new',
        accept_trade: formData.acceptTrade,
        payment_methods: formData.paymentMethods,
        price: Number(parseFloat(formData.price) * 100),
      })

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
      setImagesUri([])
      setPaymentMethodsSelected([])
      setImagesToDeleteIds([])

      navigation.navigate('myProduct', { productId })
    } catch (error) {
      throw error
    }
  }

  async function handleUploadProductPictures() {
    setPhotoIsLoading(true)
    try {
      const photosSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsMultipleSelection: true,
        selectionLimit: 3,
      })

      if (photosSelected.canceled) return

      const newSelectedImages = photosSelected.assets

      const newImagesSelectedUri = newSelectedImages.map((image) => image.uri)

      if (imagesUri) {
        if (imagesUri.length + newImagesSelectedUri.length > 3) {
          return toast.show({
            placement: 'top',
            render: ({ id }) => {
              const toastId = 'toast-' + id
              return (
                <Toast nativeID={toastId} action="attention" variant="solid">
                  <VStack space="xs">
                    <ToastTitle>Image Limit</ToastTitle>
                    <ToastDescription>
                      You can select up to 3 images.
                    </ToastDescription>
                  </VStack>
                </Toast>
              )
            },
          })
        }
        if (errors.images) {
          clearErrors('images')
        }
      }

      setImagesUri((prevImages) => {
        const updatedImagesUri = [...prevImages, ...newImagesSelectedUri]
        return updatedImagesUri
      })

      setValue('images', newSelectedImages)
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  function renderImageMethod(uri: string) {
    if (uri.startsWith('file')) {
      return uri
    } else {
      const baseURL = api.defaults.baseURL
      return `${baseURL}/images/${uri}`
    }
  }

  function handleRemoveSelectedImage(indexToRemove: number) {
    if (imagesUri) {
      const updatedImagesUri = [...imagesUri]
      const removedImageUri = updatedImagesUri.splice(indexToRemove, 1)[0]

      const removedImage = product.product_images.find(
        (image) => image.path === removedImageUri,
      )

      if (removedImage && !imagesToDeleteIds.includes(removedImage.id)) {
        setImagesToDeleteIds((prevImagesToDeleteIds) => [
          ...prevImagesToDeleteIds,
          removedImage.id,
        ])
      }
      setImagesUri(updatedImagesUri)

      const currentImages = getValues('images')

      const updatedImages = currentImages.filter((_, i) => i !== indexToRemove)

      setValue('images', updatedImages)
    }
  }

  async function fetchProduct() {
    try {
      setIsLoading(true)
      const { data } = await api.get<ProductDTO>(`/products/${productId}`)

      setProduct(data)
      setImagesUri(data.product_images.map((image) => image.path))
      setValue(
        'images',
        data.product_images.map((image) => transformProductImageToAsset(image)),
      )
      setValue('adTitle', data.name)
      setValue('description', data.description)
      setValue('productState', data.is_new ? 'new' : 'used')
      setValue('price', (data.price / 100).toString())
      setValue('acceptTrade', data.accept_trade)
      setPaymentMethodsSelected(
        data.payment_methods.map((method) => method.key),
      )
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
    setValue('paymentMethods', paymentMethodsSelected)

    if (paymentMethodsSelected.length > 0 && errors.paymentMethods) {
      clearErrors('paymentMethods')
    }
  }, [paymentMethodsSelected, errors.paymentMethods, product])

  useFocusEffect(
    useCallback(() => {
      fetchProduct()
    }, [productId]),
  )

  if (isLoading) {
    return <Loading />
  } else {
    return (
      <>
        <VStack bgColor="#EDECEE" flex={1} px="$6" pt="$16">
          <HStack justifyContent="space-between" alignItems="center">
            <Pressable onPress={handleGoBack}>
              <ArrowLeft />
            </Pressable>
            <Text fontFamily="$heading" fontSize="$xl" color="$gray100">
              Edit ad
            </Text>
            <View w="$6" />
          </HStack>
          {isLoading ? (
            <Loading />
          ) : (
            <ScrollView mt="$6">
              <VStack gap="$8" pb={25}>
                <VStack gap="$4">
                  <VStack gap="$1">
                    <Text fontFamily="$heading" color="$gray200">
                      Images
                    </Text>
                    <Text>
                      Choose up to 3 images to show how amazing your product is!
                    </Text>
                  </VStack>
                  <HStack gap="$4">
                    {photoIsLoading ? (
                      <Loading />
                    ) : (
                      <>
                        {imagesUri &&
                          imagesUri.map((image, index) => {
                            return (
                              <View
                                key={index}
                                h={100}
                                w={100}
                                borderRadius={6}
                              >
                                <Image
                                  h={100}
                                  w={100}
                                  alt=""
                                  source={renderImageMethod(image)}
                                  resizeMode="cover"
                                  borderRadius={6}
                                />
                                <Pressable
                                  onPress={() =>
                                    handleRemoveSelectedImage(index)
                                  }
                                  position="absolute"
                                  bgColor="$gray200"
                                  h="$5"
                                  w="$5"
                                  top="$1"
                                  right="$1"
                                  borderRadius="$full"
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <X size={14} color="#F7F7F8" />
                                </Pressable>
                              </View>
                            )
                          })}
                      </>
                    )}
                    {imagesUri && imagesUri.length < 3 && (
                      <Pressable
                        h={100}
                        w={100}
                        onPress={handleUploadProductPictures}
                      >
                        <View
                          h={100}
                          w={100}
                          bgColor="$gray500"
                          alignItems="center"
                          justifyContent="center"
                          borderRadius={6}
                        >
                          <Plus color="#9F9BA1" />
                        </View>
                      </Pressable>
                    )}
                  </HStack>
                  {errors.images && (
                    <FormControlErrorText fontSize={14}>
                      {errors.images.message}
                    </FormControlErrorText>
                  )}
                </VStack>
                <VStack gap="$4">
                  <Text fontFamily="$heading" color="$gray200">
                    About this product
                  </Text>
                  <Controller
                    control={control}
                    name="adTitle"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        placeholder="Ad title"
                        onChangeText={onChange}
                        value={value}
                        errorMessage={errors.adTitle?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, value } }) => (
                      <TextArea
                        onChangeText={onChange}
                        value={value}
                        placeholder="Product Description"
                        errorMessage={errors.description?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="productState"
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <RadioGroup
                        value={value}
                        onChange={onChange}
                        gap="$5"
                        flexDirection="row"
                      >
                        <Radio value="new">
                          <RadioIndicator>
                            <RadioIcon as={RadioCheck} />
                          </RadioIndicator>
                          <RadioLabel ml="$2">New product</RadioLabel>
                        </Radio>
                        <Radio value="used">
                          <RadioIndicator>
                            <RadioIcon as={RadioCheck} />
                          </RadioIndicator>
                          <RadioLabel ml="$2">Used product</RadioLabel>
                        </Radio>
                      </RadioGroup>
                    )}
                  />
                  {errors.productState && (
                    <FormControlErrorText fontSize={14}>
                      {errors.productState.message}
                    </FormControlErrorText>
                  )}
                </VStack>
                <VStack gap="$4">
                  <Text fontFamily="$heading" color="$gray200">
                    Sale
                  </Text>
                  <Controller
                    control={control}
                    name="price"
                    render={({ field: { onChange, value } }) => (
                      <MoneyInput
                        placeholder="Product price"
                        onChangeText={onChange}
                        value={value}
                        errorMessage={errors.price?.message}
                      />
                    )}
                  />
                  <VStack gap="$3">
                    <Text fontFamily="$heading" fontSize="$sm">
                      Accept trade?
                    </Text>
                    <Controller
                      control={control}
                      name="acceptTrade"
                      defaultValue={false}
                      render={({ field: { onChange, value } }) => (
                        <Switch
                          onToggle={onChange}
                          value={value}
                          sx={{
                            _light: {
                              props: {
                                trackColor: {
                                  false: '#D9D8DA',
                                  true: '#647AC7',
                                },
                                thumbColor: '#F7F7F8',
                              },
                            },
                          }}
                        />
                      )}
                    />
                  </VStack>

                  <Controller
                    control={control}
                    name="paymentMethods"
                    render={({ field }) => (
                      <VStack gap="$3">
                        <Text fontFamily="$heading" fontSize="$sm">
                          Payment methods accepted
                        </Text>
                        <CheckboxGroup
                          {...field}
                          value={paymentMethodsSelected}
                          onChange={(keys) => {
                            setPaymentMethodsSelected(keys)
                          }}
                        >
                          <VStack space="sm">
                            <Checkbox value="voucher" aria-label="voucher">
                              <CheckboxIndicator mr="$2">
                                <CheckboxIcon as={Check} />
                              </CheckboxIndicator>
                              <CheckboxLabel color="#3E3A40">
                                Voucher
                              </CheckboxLabel>
                            </Checkbox>
                            <Checkbox value="pix" aria-label="pix">
                              <CheckboxIndicator mr="$2">
                                <CheckboxIcon as={Check} />
                              </CheckboxIndicator>
                              <CheckboxLabel color="#3E3A40">Pix</CheckboxLabel>
                            </Checkbox>
                            <Checkbox value="cash" aria-label="cash">
                              <CheckboxIndicator mr="$2">
                                <CheckboxIcon as={Check} />
                              </CheckboxIndicator>
                              <CheckboxLabel color="#3E3A40">
                                Cash
                              </CheckboxLabel>
                            </Checkbox>
                            <Checkbox value="card" aria-label="credit card">
                              <CheckboxIndicator mr="$2">
                                <CheckboxIcon as={Check} />
                              </CheckboxIndicator>
                              <CheckboxLabel color="#3E3A40">
                                Credit Card
                              </CheckboxLabel>
                            </Checkbox>
                            <Checkbox value="deposit" aria-label="bank deposit">
                              <CheckboxIndicator mr="$2">
                                <CheckboxIcon as={Check} />
                              </CheckboxIndicator>
                              <CheckboxLabel color="#3E3A40">
                                Bank Deposit
                              </CheckboxLabel>
                            </Checkbox>
                          </VStack>
                        </CheckboxGroup>
                        {errors.paymentMethods && (
                          <FormControlErrorText fontSize={14}>
                            {errors.paymentMethods.message}
                          </FormControlErrorText>
                        )}
                      </VStack>
                    )}
                  />
                </VStack>
              </VStack>
            </ScrollView>
          )}
        </VStack>
        <HStack bgColor="$gray700" gap="$3" pt="$5" px="$6" pb={28}>
          <Button variant="tertiary" title="Cancel" onPress={handleGoBack} />
          <Button
            variant="secondary"
            title="Next"
            onPress={handleSubmit(handleEditAd)}
          />
        </HStack>
      </>
    )
  }
}
