import { Box } from '@gluestack-ui/themed'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { AuthRoutes } from '@routes/auth.routes'
import { AppRoutes } from '@routes/app.routes'
import { useContext } from 'react'
import { AuthContext } from '@contexts/AuthContext'

export function Routes() {
  const theme = DefaultTheme
  theme.colors.background = '#F7F7F8'

  const contextData = useContext(AuthContext)
  console.log('USER LOGGED IN =>', contextData)

  return (
    <Box flex={1} bg="$gray700">
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  )
}
