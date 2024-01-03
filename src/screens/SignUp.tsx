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

export function SignUp() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('')
  const toast = useToast()
  const { control, handleSubmit } = useForm()

  const navigation = useNavigation()

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
                <Toast nativeID={toastId} action="attention" variant="solid">
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

        setUserPhoto(photoSelected.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  function handleSignUp(data: any) {
    console.log(data)
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
                    source={{ uri: userPhoto }}
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
