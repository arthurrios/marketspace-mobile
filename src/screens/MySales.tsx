/* eslint-disable react-hooks/exhaustive-deps */
import { Loading } from '@components/Loading'
import { ProductAd } from '@components/ProductAd'
import { ToastError } from '@components/ToastError'
import { ProductDTO } from '@dtos/ProductDTO'
import {
  ChevronDownIcon,
  HStack,
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
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/app.routes'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { Plus } from 'phosphor-react-native'
import { useCallback, useState } from 'react'
import { FlatList } from 'react-native'

export function MySales() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectionFilter, setSelectionFilter] = useState('')

  const [myProducts, setMyProducts] = useState<ProductDTO[]>([])

  const navigation = useNavigation<AppNavigationRoutesProps>()

  function handleOpenProductDetails(productId: string) {
    navigation.navigate('myProduct', { productId })
  }

  function handleCreateAd() {
    navigation.navigate('nestedRoutes', { screen: 'createAd' })
  }

  async function fetchUserProducts() {
    try {
      setIsLoading(true)
      const { data } = await api.get('/users/products')

      setMyProducts(data)
      if (selectionFilter === 'active') {
        const activeProducts = data.filter(
          (item: { is_active: boolean }) => item.is_active === true,
        )
        setMyProducts(activeProducts)
      } else if (selectionFilter === 'inactive') {
        const disabledProducts = data.filter(
          (item: { is_active: boolean }) => item.is_active === false,
        )
        setMyProducts(disabledProducts)
      }
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Error fetching products'

      return <ToastError title={title} />
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchUserProducts()
    }, [selectionFilter]),
  )

  return (
    <VStack bgColor="$gray600" flex={1} py="$20" px="$6">
      <HStack alignItems="center" justifyContent="center" mb="$8">
        <Text fontSize="$xl" fontFamily="$heading" color="$gray100">
          My ads
        </Text>
        <Pressable position="absolute" right={0} onPress={handleCreateAd}>
          <Plus />
        </Pressable>
      </HStack>

      <HStack justifyContent="space-between" alignItems="center">
        <Text fontSize="$sm">{myProducts.length} ads</Text>
        <Select
          position="relative"
          selectedValue={selectionFilter}
          defaultValue="all"
          onValueChange={(value) => setSelectionFilter(value)}
        >
          <SelectTrigger px="$3" py="$2" w={111} borderRadius={6} h={34}>
            <SelectInput
              paddingHorizontal={0}
              placeholder="All"
              fontFamily="$body"
              fontSize="$sm"
              placeholderTextColor="#1A181B"
            />
            <SelectIcon as={ChevronDownIcon} ml="$2" />
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
      <HStack
        mt="$5"
        gap="$6"
        flexWrap="wrap"
        flex={1}
        justifyContent="space-between"
      >
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={myProducts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProductAd
                showUser={false}
                onPress={() => handleOpenProductDetails(item.id)}
                data={item}
              />
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
        )}
      </HStack>
    </VStack>
  )
}
