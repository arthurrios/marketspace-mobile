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

type RouteParamsProps = {
  formData: CreateAdFormDataProps
}

export function AdPreview() {
  const { user } = useAuth()

  const route = useRoute()

  const { formData } = route.params as RouteParamsProps

  const navigation = useNavigation<AppNavigationRoutesProps>()

  function handleGoBack() {
    navigation.goBack()
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
                    {formData.price}
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
        />
      </HStack>
    </>
  )
}
