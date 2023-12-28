import { Carousel } from '@components/Carousel'
import { HStack, Pressable, VStack, View, Image } from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeft } from 'phosphor-react-native'
import { useState } from 'react'

export function Product() {
  const [data, setData] = useState([
    'https://cdn.awsli.com.br/600x450/898/898976/produto/179244327/294b1a3557.jpg',
    'https://m.economictimes.com/thumb/msid-103070960,width-1200,height-1200,resizemode-4,imgsize-18652/classic-sneakers-for-men-under.jpg',
    'https://img.ltwebstatic.com/images3_pi/2023/07/10/16889910373ac9d3cca66caad2bec21a25d7e50095_thumbnail_720x.jpg',
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
    </VStack>
  )
}
