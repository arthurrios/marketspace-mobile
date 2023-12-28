import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'
import { Home } from '@screens/Home'
import { MySales } from '@screens/MySales'
import { Product } from '@screens/Product'
import { Platform } from 'react-native'
import { House, SignOut, Tag } from 'phosphor-react-native'
import { View } from '@gluestack-ui/themed'

type AppRoutes = {
  home: undefined
  mySales: undefined
  logOut: undefined
  product: undefined
}

export type AppNavigationRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  function LogOut() {
    function handleLogOut() {
      console.log('logOut')
    }

    return <View />
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
    </Navigator>
  )
}
