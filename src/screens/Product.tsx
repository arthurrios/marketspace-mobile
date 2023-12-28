import { HStack, Pressable, VStack, View, Image } from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeft } from 'phosphor-react-native'
import { useRef } from 'react'
import { Animated, Dimensions } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

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
      <View flex={1}>
        <Carousel
          ref={carouselRef}
          loop={false}
          width={width}
          height={316}
          data={images}
          renderItem={({ item, index }) => (
            <View h="$full" w="$full">
              <Image
                w="$full"
                flex={1}
                alt=""
                source={{ uri: item.illustration }}
              />
              <HStack
                position="absolute"
                zIndex={20}
                h={6}
                gap={6}
                w="$full"
                bottom={6}
                mx={6}
              >
                {images.map((_, index) => {
                  return (
                    <View
                      key={index}
                      flex={1}
                      borderRadius="$full"
                      backgroundColor="$gray700"
                    ></View>
                  )
                })}
              </HStack>
            </View>
          )}
        />
      </View>
    </VStack>
  )
}
