import { Box } from '@gluestack-ui/themed'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { AuthRoutes } from '@routes/auth.routes'
import { AppRoutes } from '@routes/app.routes'

export function Routes() {
  const theme = DefaultTheme
  theme.colors.background = '#F7F7F8'

  return (
    <Box flex={1} bg="$gray700">
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  )
}
