/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Center,
  Pressable,
  ScrollView,
  Text,
  ToastDescription,
  ToastTitle,
  VStack,
  View,
  useToast,
  Toast,
  Image,
} from '@gluestack-ui/themed'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import LogoSvg from '@assets/logo.svg'
import { PencilSimpleLine, User } from 'phosphor-react-native'
import { Input } from '@components/Input'
import { InputPassword } from '@components/InputPassword'
import { Button } from '@components/Button'
import { useForm, Controller } from 'react-hook-form'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AppError } from '@utils/AppError'
import { api } from '@services/api'
import { AuthNavigationRoutesProps } from '@routes/auth.routes'

type FormDataProps = {
  avatar: string
  name: string
  email: string
  tel: string
  password: string
  confirmPassword: string
}

const signUpSchema = z
  .object({
    name: z.string().min(1, { message: 'Enter a name' }),
    email: z
      .string()
      .min(1, { message: 'Enter an email' })
      .email({ message: 'Invalid email' }),
    tel: z
      .string()
      .min(12, { message: 'Enter a phone number: DDI+DDD+9 digit number' })
      .max(13, { message: 'Enter a phone number: DDI+DDD+9 digit number' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string().min(1, { message: 'Confirm password' }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export function SignUp() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState<ImagePicker.ImagePickerAsset>()
  const toast = useToast()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: zodResolver(signUpSchema),
  })

  const navigation = useNavigation<AuthNavigationRoutesProps>()

  function handleGoBack() {
    navigation.goBack()
  }
  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true)

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (photoSelected.canceled) return

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri,
        )

        if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            placement: 'top',
            render: ({ id }) => {
              const toastId = 'toast-' + id
              return (
                <Toast nativeID={toastId} action="error" variant="solid">
                  <VStack space="xs">
                    <ToastTitle>Image Size</ToastTitle>
                    <ToastDescription>
                      This image is too large. Choose an image up to 5MB.
                    </ToastDescription>
                  </VStack>
                </Toast>
              )
            },
          })
        }

        setUserPhoto(photoSelected.assets[0])
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  async function handleSignUp({ name, email, tel, password }: FormDataProps) {
    try {
      if (userPhoto) {
        const fileExtension = userPhoto.uri.split('.').pop()

        const photoFile = {
          name: `${name.replace(/\s+/g, '')}.${fileExtension}`.toLowerCase(),
          uri: userPhoto.uri,
          type: `${userPhoto.type}/${fileExtension}`,
        } as any
        const userCreatedForm = new FormData()
        userCreatedForm.append('avatar', photoFile)
        userCreatedForm.append('name', name)
        userCreatedForm.append('email', email)
        userCreatedForm.append('tel', tel)
        userCreatedForm.append('password', password)

        await api.post('/users', userCreatedForm, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })

        toast.show({
          placement: 'top',
          render: ({ id }) => {
            const toastId = 'toast-' + id
            return (
              <Toast nativeID={toastId} action="success" variant="outline">
                <VStack space="xs">
                  <ToastTitle>User created succesfully!</ToastTitle>
                </VStack>
              </Toast>
            )
          },
        })

        navigation.navigate('signIn')
      } else {
        return toast.show({
          placement: 'top',
          render: ({ id }) => {
            const toastId = 'toast-' + id
            return (
              <Toast nativeID={toastId} action="warning" variant="outline">
                <VStack space="xs">
                  <ToastTitle>Profile Image Missing</ToastTitle>
                  <ToastDescription>Choose a profile image.</ToastDescription>
                </VStack>
              </Toast>
            )
          },
        })
      }
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Error creating account. Try again later.'

      toast.show({
        placement: 'top',
        render: ({ id }) => {
          const toastId = 'toast-' + id
          return (
            <Toast nativeID={toastId} action="error" variant="outline">
              <VStack space="xs">
                <ToastTitle>{title}</ToastTitle>
              </VStack>
            </Toast>
          )
        },
      })
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      bgColor="$gray600"
    >
      <VStack mt="$8" py="$12" px="$12">
        <Center gap={8}>
          <LogoSvg width={60} />
          <Text fontFamily="$heading" fontSize="$xl">
            Welcome!
          </Text>
          <Text textAlign="center" fontSize="$sm">
            Create your account and use the space to buy miscellaneous items and
            sell your products
          </Text>
          <VStack mt="$8" gap="$4" w="$full" alignItems="center">
            <Pressable onPress={handleUserPhotoSelect}>
              <View
                w={88}
                h={88}
                borderRadius="$full"
                bgColor="$gray500"
                borderColor="$blueLight"
                borderWidth={3}
                position="relative"
                alignItems="center"
                justifyContent="center"
              >
                {userPhoto ? (
                  <Image
                    alt=""
                    source={{ uri: userPhoto.uri }}
                    resizeMode="cover"
                    borderRadius={999}
                  />
                ) : (
                  <User size={44} color="#9F9BA1" weight="bold" />
                )}
                <View
                  position="absolute"
                  w="$8"
                  h="$8"
                  borderRadius="$full"
                  bgColor="$blueLight"
                  right={-4}
                  bottom={-4}
                  alignItems="center"
                  justifyContent="center"
                >
                  <PencilSimpleLine color="#EDECEE" size={16} />
                </View>
              </View>
            </Pressable>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Name"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Email"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                  autoCapitalize="none"
                  style={{ textTransform: 'lowercase' }}
                />
              )}
            />
            <Controller
              control={control}
              name="tel"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Phone"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.tel?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <InputPassword
                  placeholder="Password"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                  secureTextEntry
                />
              )}
            />
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <InputPassword
                  placeholder="Confirm Password"
                  onChangeText={onChange}
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  value={value}
                  errorMessage={errors.confirmPassword?.message}
                  secureTextEntry
                />
              )}
            />
            <Button
              variant="secondary"
              title="Create"
              onPress={handleSubmit(handleSignUp)}
            />
          </VStack>
        </Center>
        <Center mb={16}>
          <Text color="$gray200" mt="$12">
            Already have an account?
          </Text>
        </Center>
        <Button
          title="Go to Log In"
          variant="tertiary"
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  )
}
