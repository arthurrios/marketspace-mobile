export interface CarouselProps {}

export function Carousel(props: CarouselProps) {
  return (
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
  )
}
