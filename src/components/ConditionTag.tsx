import { HStack, Pressable, Text, View } from '@gluestack-ui/themed'
import { XCircle } from 'phosphor-react-native'
import { PressableProps } from 'react-native'

type Props = PressableProps & {
  title: string
  isActive: boolean
}

export function ConditionTag({ title, isActive, ...props }: Props) {
  return (
    <Pressable {...props}>
      <HStack
        alignItems="center"
        flex={1}
        px="$4"
        py={6}
        rounded="$full"
        bgColor={isActive ? '$blueLight' : '$gray500'}
        gap={6}
        pr={isActive ? 10 : null}
      >
        <Text
          textTransform="uppercase"
          fontFamily="$heading"
          fontSize="$xs"
          color={isActive ? '$white' : '$gray300'}
        >
          {title}
        </Text>
        {isActive && (
          <View>
            <XCircle color="#EDECEE" weight="fill" size={16} />
          </View>
        )}
      </HStack>
    </Pressable>
  )
}
