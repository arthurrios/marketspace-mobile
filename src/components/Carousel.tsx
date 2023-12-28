import { FlatList, Image, View } from '@gluestack-ui/themed'
import { useState } from 'react'
import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('screen')

export function Carousel() {
  const [images, setImages] = useState([
    'https://cdn.awsli.com.br/600x450/898/898976/produto/179244327/294b1a3557.jpg',
    'https://alexander-kay.com/cdn/shop/products/ak_w_dressed_wineredsuede_01_800x.jpg?v=1590234374',
    'https://img.ltwebstatic.com/images3_pi/2023/07/10/16889910373ac9d3cca66caad2bec21a25d7e50095_thumbnail_720x.jpg',
  ])

  return (
    <View>
      <FlatList
        data={images}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            alt=""
            h={280}
            w="$full"
            style={{ width }}
          />
        )}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        h={280}
      />
      <View
        position="absolute"
        style={{ width: width - 12 }}
        h={6}
        bottom={6}
        left={6}
      >
        {images.map((_, index) => {
          return <View key={index}></View>
        })}
      </View>
    </View>
  )
}

// <Carousel
//   ref={carouselRef}
//   loop={false}
//   width={width}
//   height={316}
//   data={images}
//   renderItem={({ item, index }) => (
//     <View h="$full" w="$full">
//       <Image
//         w="$full"
//         flex={1}
//         alt=""
//         source={{ uri: item.illustration }}
//       />
//       <HStack
//         position="absolute"
//         zIndex={20}
//         h={6}
//         gap={6}
//         w="$full"
//         bottom={6}
//         mx={6}
//       >
//         {images.map((_, index) => {
//           return (
//             <View
//               key={index}
//               flex={1}
//               borderRadius="$full"
//               backgroundColor="$gray700"
//             ></View>
//           )
//         })}
//       </HStack>
//     </View>
//   )}
// />
