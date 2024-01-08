/* eslint-disable react-hooks/rules-of-hooks */
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
  ToastDescription,
  Toast,
  ToastTitle,
  FormControlErrorText,
} from '@gluestack-ui/themed'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/app.routes'
import { ArrowLeft, Check, Plus, X } from 'phosphor-react-native'
import * as ImagePicker from 'expo-image-picker'
import { z } from 'zod'
import { Controller, UseFormReset, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export type CreateAdFormDataProps = {
  images: ImagePicker.ImagePickerAsset[]
  adTitle: string
  description: string
  productState: string
  price: string
  acceptTrade: boolean
  paymentMethods: string[]
  reset: UseFormReset<CreateAdFormDataProps>
  setImages: React.Dispatch<
    React.SetStateAction<ImagePicker.ImagePickerAsset[]>
  >
  setPaymentMethodsSelected: React.Dispatch<React.SetStateAction<never[]>>
}

export const createAdSchema = z.object({
  images: z.array(z.unknown()).refine((value) => value.length > 0, {
    message: 'Select at least one image',
  }),
  adTitle: z.string().min(1, { message: 'Enter a title' }),
  description: z.string().min(1, { message: 'Enter a description' }),
  productState: z
    .string()
    .refine((value) => value === 'new' || value === 'used', {
      message: 'Select your product state',
    }),
  price: z
    .string()
    .min(1, { message: 'Enter a price' })
    .refine((value) => Number(value.replace(',', '')) >= 0, {
      message: 'Price must be a non-negative value',
    }),
  acceptTrade: z.boolean(),
  paymentMethods: z.array(z.string()).refine((value) => value.length > 0, {
    message: 'Select at least one payment method',
  }),
})

export function CreateAd() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([])
  const [paymentMethodsSelected, setPaymentMethodsSelected] = useState([])
  const toast = useToast()

  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<CreateAdFormDataProps>({
    resolver: zodResolver(createAdSchema),
  })

  const navigation = useNavigation<AppNavigationRoutesProps>()

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleGoForward(formData: CreateAdFormDataProps) {
    try {
      navigation.navigate('adPreview', {
        formData,
        reset,
        setImages,
        setPaymentMethodsSelected,
      })
    } catch (error) {
      console.log(error)
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

      const newImagesSelected = photosSelected.assets

      if (images) {
        if (images.length + newImagesSelected.length > 3) {
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

      setImages((prevImages) => {
        const updatedImages = [...prevImages, ...newImagesSelected]
        setValue('images', updatedImages)
        return updatedImages
      })
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  function handleRemoveSelectedImage(indexToRemove: number) {
    if (images) {
      const updatedImages = [...images]
      updatedImages.splice(indexToRemove, 1)
      setImages(updatedImages)
    }
  }

  useEffect(() => {
    setValue('paymentMethods', paymentMethodsSelected)

    if (paymentMethodsSelected.length > 0 && errors.paymentMethods) {
      clearErrors('paymentMethods')
    }
  }, [paymentMethodsSelected, errors.paymentMethods])

  useEffect(() => {
    setValue('images', images)
  }, [images])

  return (
    <>
      <VStack bgColor="#EDECEE" flex={1} px="$6" pt="$16">
        <HStack justifyContent="space-between" alignItems="center">
          <Pressable onPress={handleGoBack}>
            <ArrowLeft />
          </Pressable>
          <Text fontFamily="$heading" fontSize="$xl" color="$gray100">
            Create ad
          </Text>
          <View w="$6" />
        </HStack>
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
                {images &&
                  images.map((image, index) => {
                    return (
                      <View key={index} h={100} w={100} borderRadius={6}>
                        <Image
                          h={100}
                          w={100}
                          alt=""
                          source={image.uri}
                          resizeMode="cover"
                          borderRadius={6}
                        />
                        <Pressable
                          onPress={() => handleRemoveSelectedImage(index)}
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
                {images && images.length < 3 && (
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
                          <CheckboxLabel color="#3E3A40">Voucher</CheckboxLabel>
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
                          <CheckboxLabel color="#3E3A40">Cash</CheckboxLabel>
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
      </VStack>
      <HStack bgColor="$gray700" gap="$3" pt="$5" px="$6" pb={28}>
        <Button
          variant="tertiary"
          title="Cancel"
          onPress={() => navigation.goBack()}
        />
        <Button
          variant="secondary"
          title="Next"
          onPress={handleSubmit(handleGoForward)}
        />
      </HStack>
    </>
  )
}
