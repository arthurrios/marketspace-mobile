import { FlatList, HStack, Image, View } from '@gluestack-ui/themed'
import { useRef } from 'react'
import {
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native'

const { width } = Dimensions.get('screen')

export function Carousel({ data }) {
  const scrollX = useRef(new Animated.Value(0)).current
  function handleOnScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
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

  return (
    <View>
      <FlatList
        data={data}
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
        onScroll={handleOnScroll}
        h={280}
      />
      <HStack
        position="absolute"
        style={{ width: width - 12 }}
        w="$full"
        h={6}
        bottom={6}
        left={6}
        gap={6}
      >
        {data.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ]

          const barOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
          })

          return (
            <Animated.View
              key={index.toString()}
              style={{
                flex: 1,
                backgroundColor: '#F7F7F8',
                borderRadius: 999,
                opacity: barOpacity,
              }}
            />
          )
        })}
      </HStack>
    </View>
  )
}
