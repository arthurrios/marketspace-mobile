import {
  ChevronDownIcon,
  HStack,
  Icon,
  Pressable,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { Plus } from 'phosphor-react-native'

export function MySales() {
  return (
    <VStack bgColor="$gray600" flex={1} py="$20" px="$6">
      <HStack alignItems="center" justifyContent="center" mb="$8">
        <Text fontSize="$xl" fontFamily="$heading" color="$gray100">
          My ads
        </Text>
        <Pressable position="absolute" right={0}>
          <Plus />
        </Pressable>
      </HStack>

      <HStack justifyContent="space-between" alignItems="center">
        <Text fontSize="$sm">9 ads</Text>
        <Select position="relative" defaultValue="all">
          <SelectTrigger px="$3" py="$2" w={111} borderRadius={6} h={34}>
            <SelectInput
              paddingHorizontal={0}
              placeholder="All"
              fontFamily="$body"
              fontSize="$sm"
              placeholderTextColor="#1A181B"
            />
            <SelectIcon ml="$2">
              <Icon as={ChevronDownIcon} />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent
              position="absolute"
              right={20}
              top={-520}
              h={220}
              w={120}
              borderTopLeftRadius={6}
              borderTopRightRadius={6}
              borderBottomRightRadius={6}
              borderBottomLeftRadius={6}
              sx={{}}
            >
              <SelectItem label="All" value="all" />
              <SelectItem label="Active" value="active" />
              <SelectItem label="Inactive" value="inactive" />
            </SelectContent>
          </SelectPortal>
        </Select>
      </HStack>
    </VStack>
  )
}
