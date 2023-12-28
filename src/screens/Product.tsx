import { Carousel } from '@components/Carousel'
import { HStack, Pressable, VStack, View, Image } from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeft } from 'phosphor-react-native'
import { useRef } from 'react'
import { Animated, Dimensions } from 'react-native'
// import Carousel from 'react-native-reanimated-carousel'

export function Product() {
  const images = [
    {
      title: 'Item 1',
      illustration:
        'https://cdn.awsli.com.br/600x450/898/898976/produto/179244327/294b1a3557.jpg',
    },
    {
      title: 'Item 2',
      illustration:
        'https://alexander-kay.com/cdn/shop/products/ak_w_dressed_wineredsuede_01_800x.jpg?v=1590234374',
    },
    {
      title: 'Item 3',
      illustration:
        'https://alexander-kay.com/cdn/shop/products/ak_w_dressed_wineredsuede_01_800x.jpg?v=1590234374',
    },
  ]

  const carouselRef = useRef(null)
  const scrollX = useRef(new Animated.Value(0)).current

  const width = Dimensions.get('window').width

  const navigation = useNavigation()

  function handleOnScroll(event: UIEvent<HTMLElement>) {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event)
  }

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
      <Carousel />
    </VStack>
  )
}
