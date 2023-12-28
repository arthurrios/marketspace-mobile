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
  FlatList,
} from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeft, WhatsappLogo } from 'phosphor-react-native'
import { useState } from 'react'

export function Product() {
  const [data, setData] = useState([
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

  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <VStack flex={1} bgColor="$gray600" pt="$16">
      <HStack px="$6" pb="$3">
        <Pressable onPress={handleGoBack}>
          <ArrowLeft />
        </Pressable>
      </HStack>
      <Carousel data={data} />
      <ScrollView px="$6" py="$5" flex={1}>
        <VStack gap="$6" pb="$16">
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
            26,30
          </Text>
        </HStack>
        <Button
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
  )
}
