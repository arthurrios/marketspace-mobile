import { Image, View } from '@gluestack-ui/themed'

export interface UserImageProps {
  height: number
  width: number
  uri: string
}

export function UserImage({ height, width, uri }: UserImageProps) {
  return (
    <>
      <View
        w={height}
        h={width}
        borderRadius="$full"
        bgColor="$gray500"
        borderColor="$blueLight"
        borderWidth={2}
        position="relative"
        alignItems="center"
        justifyContent="center"
      >
        {/* <User size={22} color="#9F9BA1" weight="bold" /> */}
        <Image
          source={{ uri }}
          alt="User photo"
          resizeMode="contain"
          rounded="$full"
          size="full"
        />
      </View>
    </>
  )
}
