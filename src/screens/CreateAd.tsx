import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { MoneyInput } from '@components/MoneyInput'
import { RadioCheck } from '@components/RadioCheck'
import { TextArea } from '@components/TextArea'
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
  CheckboxGroup,
  HStack,
  Image,
  Pressable,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  ScrollView,
  Text,
  VStack,
  View,
  Switch,
} from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeft, Check, Plus, X } from 'phosphor-react-native'
import { useState } from 'react'

export function CreateAd() {
  const [images, setImages] = useState([
    'https://cdn.awsli.com.br/600x450/898/898976/produto/179244327/294b1a3557.jpg',
    'https://m.economictimes.com/thumb/msid-103070960,width-1200,height-1200,resizemode-4,imgsize-18652/classic-sneakers-for-men-under.jpg',
  ])
  const [values, setValues] = useState('')
  const [paymentMethodsSelected, setPaymentMethodsSelected] = useState([])

  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <>
      <VStack bgColor="#EDECEE" flex={1} px="$6" pt="$16">
        <HStack justifyContent="space-between" alignItems="center">
          <Pressable onPress={handleGoBack}>
            <ArrowLeft />
          </Pressable>
          <Text fontFamily="$heading" fontSize="$xl" color="$gray100">
            Create ad
          </Text>
          <View w="$6" />
        </HStack>
        <ScrollView mt="$6">
          <VStack gap="$8" pb={25}>
            <VStack gap="$4">
              <VStack gap="$1">
                <Text fontFamily="$heading" color="$gray200">
                  Images
                </Text>
                <Text>
                  Choose up to 3 images to show how amazing your product is!
                </Text>
              </VStack>
              <HStack gap="$4">
                {images.map((image, index) => {
                  return (
                    <View key={index} h={100} w={100} borderRadius={6}>
                      <Image
                        h={100}
                        w={100}
                        alt=""
                        source={image}
                        resizeMode="cover"
                        borderRadius={6}
                      />
                      <Pressable
                        position="absolute"
                        bgColor="$gray200"
                        h="$5"
                        w="$5"
                        top="$1"
                        right="$1"
                        borderRadius="$full"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <X size={14} color="#F7F7F8" />
                      </Pressable>
                    </View>
                  )
                })}
                {images.length < 3 && (
                  <Pressable h={100} w={100}>
                    <View
                      h={100}
                      w={100}
                      bgColor="$gray500"
                      alignItems="center"
                      justifyContent="center"
                      borderRadius={6}
                    >
                      <Plus color="#9F9BA1" />
                    </View>
                  </Pressable>
                )}
              </HStack>
            </VStack>
            <VStack gap="$4">
              <Text fontFamily="$heading" color="$gray200">
                About this product
              </Text>
              <Input placeholder="Ad title" />
              <TextArea placeholder="Product Description" />
              <RadioGroup
                value={values}
                onChange={setValues}
                gap="$5"
                flexDirection="row"
              >
                <Radio value="new">
                  <RadioIndicator>
                    <RadioIcon as={RadioCheck} />
                  </RadioIndicator>
                  <RadioLabel ml="$2">New product</RadioLabel>
                </Radio>
                <Radio value="used">
                  <RadioIndicator>
                    <RadioIcon as={RadioCheck} />
                  </RadioIndicator>
                  <RadioLabel ml="$2">Used product</RadioLabel>
                </Radio>
              </RadioGroup>
            </VStack>
            <VStack gap="$4">
              <Text fontFamily="$heading" color="$gray200">
                Sale
              </Text>
              <MoneyInput placeholder="Product price" />
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
                      <CheckboxLabel color="#3E3A40">Credit Card</CheckboxLabel>
                    </Checkbox>
                    <Checkbox value="Bank Deposit" aria-label="bank deposit">
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
          </VStack>
        </ScrollView>
      </VStack>
      <HStack bgColor="$gray700" gap="$3" pt="$5" px="$6" pb={28}>
        <Button variant="tertiary" title="Cancel" />
        <Button variant="secondary" title="Next" />
      </HStack>
    </>
  )
}
