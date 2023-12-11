import { Button } from '@components/Button'
import { ConditionTag } from '@components/ConditionTag'
import { Input } from '@components/Input'
import { ProductAd } from '@components/ProductAd'
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxGroup,
  HStack,
  Image,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Pressable,
  ScrollView,
  Switch,
  Text,
  VStack,
  View,
  CheckboxLabel,
  ModalFooter,
} from '@gluestack-ui/themed'
import {
  ArrowRight,
  Check,
  MagnifyingGlass,
  Plus,
  Sliders,
  Tag,
  X,
} from 'phosphor-react-native'
import { useState } from 'react'

export function Home() {
  const [showModal, setShowModal] = useState(false)

  const [isNew, setIsNew] = useState(true)
  const [paymentMethodsSelected, setPaymentMethodsSelected] = useState([])

  return (
    <ScrollView
      bgColor="$gray600"
      px="$6"
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View gap="$8" py={72}>
        <HStack w="$full" justifyContent="space-between" gap="$2">
          <Pressable>
            <HStack flex={1} w={200} gap={10}>
              <View
                w={45}
                h={45}
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
                  source={{ uri: 'https://github.com/arthurrios.png' }}
                  alt="User photo"
                  resizeMode="contain"
                  rounded="$full"
                  size="full"
                />
              </View>
              <VStack>
                <Text color="$gray100">Welcome,</Text>
                <Text fontFamily="$heading">Arthur!</Text>
              </VStack>
            </HStack>
          </Pressable>

          <Button title="Create Ad" icon={Plus} variant="secondary" hasIcon />
        </HStack>

        <VStack gap="$3">
          <Text fontSize="$sm" color="$gray300">
            Your ads
          </Text>
          <HStack
            bgColor="rgba(100, 122, 199, 0.1)"
            px="$5"
            py="$3"
            justifyContent="space-between"
            alignItems="center"
            borderRadius={6}
          >
            <HStack alignItems="center" gap="$4">
              <Tag color="#364D9D" />
              <VStack>
                <Text fontSize="$xl" fontFamily="$heading">
                  4
                </Text>
                <Text fontSize="$sm">active ads</Text>
              </VStack>
            </HStack>

            <Pressable>
              <HStack gap="$2" alignItems="center">
                <Text color="$blue" fontSize="$sm" fontFamily="$heading">
                  My ads
                </Text>
                <ArrowRight size={18} color="#364D9D" />
              </HStack>
            </Pressable>
          </HStack>
        </VStack>

        <VStack gap="$6">
          <VStack gap="$3">
            <Text fontSize="$sm" color="$gray300">
              Buy various products
            </Text>

            <Input placeholder="Search ad">
              <HStack gap="$3" mr="$2" alignItems="center">
                <Pressable>
                  <MagnifyingGlass weight="bold" color="#3E3A40" />
                </Pressable>
                <View h={18} w={1} bgColor="$gray400" />
                <Pressable
                  onPress={() => {
                    setShowModal(true)
                  }}
                >
                  <Sliders weight="bold" color="#3E3A40" />
                </Pressable>
              </HStack>
            </Input>
          </VStack>

          <HStack gap="$6" flexWrap="wrap" justifyContent="space-between">
            <ProductAd />
            <ProductAd />
            <ProductAd />
            <ProductAd />
            <ProductAd />
            <ProductAd />
            <ProductAd />
          </HStack>
        </VStack>

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          closeOnOverlayClick
          position="relative"
        >
          <ModalBackdrop />
          <ModalContent
            h={612}
            w="$full"
            borderRadius="$3xl"
            bgColor="$gray600"
            position="absolute"
            bottom={0}
            px="$2"
            py="$8"
          >
            <ModalHeader position="relative">
              <View
                position="absolute"
                top={-16}
                left={166}
                w={56}
                h={4}
                bgColor="$gray400"
                opacity={0.3}
              />
              <Text fontFamily="$heading" fontSize="$xl">
                Filter ads
              </Text>
              <ModalCloseButton>
                <X color="#9F9BA1" />
              </ModalCloseButton>
            </ModalHeader>

            <ModalBody>
              <VStack gap="$6">
                <VStack gap="$3">
                  <Text fontFamily="$heading" fontSize="$sm">
                    Condition
                  </Text>

                  <HStack gap="$2">
                    <ConditionTag
                      title="new"
                      isActive={isNew}
                      onPress={() => setIsNew(true)}
                    />
                    <ConditionTag
                      title="old"
                      isActive={!isNew}
                      onPress={() => setIsNew(false)}
                    />
                  </HStack>
                </VStack>

                <VStack gap="$3">
                  <Text fontFamily="$heading" fontSize="$sm">
                    Accept trade?
                  </Text>
                  <Switch
                    sx={{
                      _light: {
                        props: {
                          trackColor: {
                            false: '#D9D8DA',
                            true: '#647AC7',
                          },
                          thumbColor: '#F7F7F8',
                        },
                      },
                    }}
                  />
                </VStack>

                <VStack gap="$3">
                  <Text fontFamily="$heading" fontSize="$sm">
                    Payment methods accepted
                  </Text>
                  <CheckboxGroup
                    value={paymentMethodsSelected}
                    onChange={(keys) => {
                      setPaymentMethodsSelected(keys)
                    }}
                  >
                    <VStack space="sm">
                      <Checkbox value="Voucher" aria-label="voucher">
                        <CheckboxIndicator mr="$2">
                          <CheckboxIcon as={Check} />
                        </CheckboxIndicator>
                        <CheckboxLabel color="#3E3A40">Voucher</CheckboxLabel>
                      </Checkbox>
                      <Checkbox value="Pix" aria-label="pix">
                        <CheckboxIndicator mr="$2">
                          <CheckboxIcon as={Check} />
                        </CheckboxIndicator>
                        <CheckboxLabel color="#3E3A40">Pix</CheckboxLabel>
                      </Checkbox>
                      <Checkbox value="Cash" aria-label="cash">
                        <CheckboxIndicator mr="$2">
                          <CheckboxIcon as={Check} />
                        </CheckboxIndicator>
                        <CheckboxLabel color="#3E3A40">Cash</CheckboxLabel>
                      </Checkbox>
                      <Checkbox value="Credit Card" aria-label="credit card">
                        <CheckboxIndicator mr="$2">
                          <CheckboxIcon as={Check} />
                        </CheckboxIndicator>
                        <CheckboxLabel color="#3E3A40">
                          Credit Card
                        </CheckboxLabel>
                      </Checkbox>
                      <Checkbox value="Bank Deposit" aria-label="back deposit">
                        <CheckboxIndicator mr="$2">
                          <CheckboxIcon as={Check} />
                        </CheckboxIndicator>
                        <CheckboxLabel color="#3E3A40">
                          Bank Deposit
                        </CheckboxLabel>
                      </Checkbox>
                    </VStack>
                  </CheckboxGroup>
                </VStack>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <HStack space="md">
                <Button title="Reset filters" variant="tertiary" />
                <Button title="Apply filters" variant="secondary" />
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </View>
    </ScrollView>
  )
}
