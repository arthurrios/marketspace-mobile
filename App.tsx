/* eslint-disable camelcase */
import { StatusBar, Text } from 'react-native'

import { GluestackUIProvider } from '@gluestack-ui/themed'

import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from '@expo-google-fonts/karla'
import { Loading } from '@components/Loading'
import { config } from './config/gluestack-ui.config'

export default function App() {
  const [fontsLoaded] = useFonts({
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
      {fontsLoaded ? (
        <Text style={{ fontFamily: 'Karla_400Regular' }}>Hello World!</Text>
      ) : (
        <Loading />
      )}
    </GluestackUIProvider>
  )
}
