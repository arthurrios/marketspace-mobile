import { Button } from '@components/Button'
import { Carousel } from '@components/Carousel'
import { PaymentTag } from '@components/PaymentTag'
import { UserImage } from '@components/UserImage'
import {
  HStack,
  Pressable,
  VStack,
  View,
  ScrollView,
  Text,
} from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/app.routes'
import {
  ArrowLeft,
  PencilSimpleLine,
  Power,
  TrashSimple,
  WhatsappLogo,
} from 'phosphor-react-native'
import { useState } from 'react'

export function MyProduct() {
  const [images, setImages] = useState([
    'https://cdn.awsli.com.br/600x450/898/898976/produto/179244327/294b1a3557.jpg',
    'https://m.economictimes.com/thumb/msid-103070960,width-1200,height-1200,resizemode-4,imgsize-18652/classic-sneakers-for-men-under.jpg',
    'https://img.ltwebstatic.com/images3_pi/2023/07/10/16889910373ac9d3cca66caad2bec21a25d7e50095_thumbnail_720x.jpg',
  ])
  const [isNew, setIsNew] = useState(false)
  const [acceptTrade, setAcceptTrade] = useState(true)
  const [paymentMethods, setPaymentMethods] = useState([
    'voucher',
    'pix',
    'cash',
    'creditCard',
    'bankDeposit',
  ])

  const [adIsActive, setAdIsActive] = useState(true)

  const navigation = useNavigation<AppNavigationRoutesProps>()

  function handleGoBack() {
    navigation.navigate('mySales')
  }

  return (
    <VStack flex={1} bgColor="$gray600" pt="$16">
      <HStack px="$6" pb="$3" justifyContent="space-between">
        <Pressable onPress={handleGoBack}>
          <ArrowLeft />
        </Pressable>
        <Pressable>
          <PencilSimpleLine />
        </Pressable>
      </HStack>
      <Carousel images={images} adIsActive={adIsActive} />
      <ScrollView px="$6" py="$5" flex={1}>
        <VStack gap="$6" pb="$2">
          <HStack gap="$2" alignItems="center">
            <UserImage
              height={24}
              width={24}
              uri="https://github.com/arthurrios.png"
            />
            <Text>Arthur Rios</Text>
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
                  {isNew ? 'new' : 'used'}
                </Text>
              </View>
            </HStack>
            <HStack justifyContent="space-between" alignItems="baseline">
              <Text fontFamily="$heading" fontSize="$xl" gap="$3" flex={1}>
                Sneakers
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
                  26,30
                </Text>
              </HStack>
            </HStack>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In sequi
              ullam iste fugiat omnis itaque debitis! Velit, voluptatibus
              perspiciatis. Facilis dolor fugiat error rem optio saepe maiores
              id architecto ipsum.
            </Text>
          </VStack>
          <VStack gap="$4">
            <HStack gap="$2">
              <Text fontFamily="$heading">Accept Trade?</Text>
              <Text>{acceptTrade ? 'Yes' : 'No'}</Text>
            </HStack>
            <VStack gap="$2">
              <Text fontFamily="$heading">Payment methods:</Text>

              {paymentMethods.map((item, index) => {
                return <PaymentTag key={index} type={item} />
              })}
            </VStack>
          </VStack>
          <VStack gap="$2" mb={50} bgColor="$gray600">
            {!adIsActive ? (
              <Button
                title="Reactivate ad"
                childrenIcon={
                  <Power color="#EDECEE" size={16} style={{ marginRight: 8 }} />
                }
              />
            ) : (
              <Button
                variant="secondary"
                title="Disable ad"
                childrenIcon={
                  <Power color="#EDECEE" size={16} style={{ marginRight: 8 }} />
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
    </VStack>
  )
}
