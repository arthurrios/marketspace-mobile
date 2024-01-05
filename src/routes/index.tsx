import { Box } from '@gluestack-ui/themed'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { AuthRoutes } from '@routes/auth.routes'
import { AppRoutes } from '@routes/app.routes'
import { useContext } from 'react'
import { AuthContext } from '@contexts/AuthContext'
import { useAuth } from '@hooks/Auth'

export function Routes() {
  const theme = DefaultTheme
  const { user } = useAuth()
  theme.colors.background = '#F7F7F8'

  console.log('USER LOGGED IN =>', user)

  return (
    <Box flex={1} bg="$gray700">
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  )
}
