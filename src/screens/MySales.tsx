import { ProductAd } from '@components/ProductAd'
import {
  ChevronDownIcon,
  FlatList,
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
import { useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/app.routes'
import { Plus } from 'phosphor-react-native'
import { useState } from 'react'

export function MySales() {
  const [myProducts, setMyProducts] = useState([
    'Red Sneakers',
    'Blue Sneakers',
    'Green Sneakers',
    'Purple Sneakers',
    'Orange Sneakers',
    'Black Sneakers',
  ])

  const navigation = useNavigation<AppNavigationRoutesProps>()

  function handleOpenProductDetails() {
    navigation.navigate('myProduct')
  }

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
            >
              <SelectItem label="All" value="all" />
              <SelectItem label="Active" value="active" />
              <SelectItem label="Inactive" value="inactive" />
            </SelectContent>
          </SelectPortal>
        </Select>
      </HStack>
      <HStack mt="$5" gap="$6" flexWrap="wrap" justifyContent="space-between">
        <FlatList
          data={myProducts}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ProductAd showUser={false} onPress={handleOpenProductDetails} />
          )}
          columnWrapperStyle={{
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
          numColumns={2}
          contentContainerStyle={{
            gap: 24,
            flexGrow: 1,
            paddingBottom: 450,
          }}
        />
      </HStack>
    </VStack>
  )
}
