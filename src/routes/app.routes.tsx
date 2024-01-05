import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'
import { Home } from '@screens/Home'
import { MySales } from '@screens/MySales'
import { Product } from '@screens/Product'
import { Platform } from 'react-native'
import { House, SignOut, Tag } from 'phosphor-react-native'
import { MyProduct } from '@screens/MyProduct'
import { CreateAd } from '@screens/CreateAd'
import { EditAd } from '@screens/EditAd'
import { AdPreview } from '@screens/AdPreview'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAuth } from '@hooks/Auth'
import { Loading } from '@components/Loading'

export type AppRoutes = {
  home: undefined
  mySales: undefined
  logOut: undefined
  product: undefined
  myProduct: undefined
  nestedRoutes: undefined
  createAd: undefined
  editAd: undefined
  adPreview: undefined
}

export type AppNavigationRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

const Stack = createNativeStackNavigator()

export function NestedRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="createAd" component={CreateAd} />
      <Stack.Screen name="editAd" component={EditAd} />
      <Stack.Screen name="adPreview" component={AdPreview} />
    </Stack.Navigator>
  )
}

export function AppRoutes() {
  const { signOut, isLoadingUserStorageData } = useAuth()

  function LogOut() {
    signOut()

    if (isLoadingUserStorageData) {
      return <Loading />
    }
  }

  const iconSize = 24

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#3E3A40',
        tabBarInactiveTintColor: '#9F9BA1',
        tabBarStyle: {
          backgroundColor: '#F7F7F8',
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 76,
          paddingTop: 20,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <House
              size={iconSize}
              color={focused ? '#3E3A40' : '#9F9BA1'}
              weight={focused ? 'bold' : 'regular'}
            />
          ),
        }}
      />
      <Screen
        name="mySales"
        component={MySales}
        options={{
          tabBarIcon: ({ focused }) => (
            <Tag
              size={iconSize}
              color={focused ? '#3E3A40' : '#9F9BA1'}
              weight={focused ? 'bold' : 'regular'}
            />
          ),
        }}
      />
      <Screen
        name="logOut"
        component={LogOut}
        options={{
          tabBarIcon: () => <SignOut color="#EE7979" size={iconSize} />,
        }}
      />
      <Screen
        name="product"
        component={Product}
        options={{ tabBarButton: () => null, tabBarStyle: { display: 'none' } }}
      />
      <Screen
        name="myProduct"
        component={MyProduct}
        options={{ tabBarButton: () => null, tabBarStyle: { display: 'none' } }}
      />
      <Screen
        name="nestedRoutes"
        component={NestedRoutes}
        options={{ tabBarButton: () => null, tabBarStyle: { display: 'none' } }}
      />
    </Navigator>
  )
}
