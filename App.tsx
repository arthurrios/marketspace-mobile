/* eslint-disable camelcase */
import { StatusBar } from 'react-native'

import { GluestackUIProvider } from '@gluestack-ui/themed'

import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
  Karla_300Light,
} from '@expo-google-fonts/karla'
import { Loading } from '@components/Loading'
import { config } from './config/gluestack-ui.config'
import { Routes } from '@routes/index'
import { AuthContextProvider } from '@contexts/AuthContext'

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_300Light,
    Karla_400Regular,
    Karla_700Bold,
  })

  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </GluestackUIProvider>
  )
}
