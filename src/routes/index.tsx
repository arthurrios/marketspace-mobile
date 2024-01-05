import { Box } from '@gluestack-ui/themed'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { AuthRoutes } from '@routes/auth.routes'

import { useAuth } from '@hooks/Auth'
import { AppRoutes } from './app.routes'

export function Routes() {
  const theme = DefaultTheme
  const { user } = useAuth()
  theme.colors.background = '#F7F7F8'

  console.log('USER LOGGED IN =>', user)

  return (
    <Box flex={1} bg="$gray700">
      <NavigationContainer>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}
