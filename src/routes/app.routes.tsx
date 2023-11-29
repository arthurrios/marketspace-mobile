import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'
import { Home } from '@screens/Home'
import { MySales } from '@screens/MySales'
import { Platform } from 'react-native'
import { House, SignOut, Tag } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'
import { Button, View } from '@gluestack-ui/themed'
import { AuthNavigationRoutesProps } from '@routes/auth.routes'

type AppRoutes = {
  home: undefined
  mySales: undefined
  logOut: undefined
}

export type AppNavigationRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  function LogOut() {}

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
          height: Platform.OS === 'android' ? 'auto' : 96,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: () => <House size={iconSize} />,
        }}
      />
      <Screen
        name="mySales"
        component={MySales}
        options={{
          tabBarIcon: () => <Tag size={iconSize} />,
        }}
      />
      <Screen
        name="logOut"
        component={LogOut}
        options={{
          tabBarIcon: () => <SignOut color="#EE7979" size={iconSize} />,
        }}
      />
    </Navigator>
  )
}
