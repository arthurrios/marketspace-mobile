import { Box } from '@gluestack-ui/themed'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { AuthRoutes } from '@routes/auth.routes'

import { useAuth } from '@hooks/Auth'
import { AppRoutes } from './app.routes'
import { Loading } from '@components/Loading'

export function Routes() {
  const theme = DefaultTheme
  const { user, isLoadingUserStorageData } = useAuth()
  theme.colors.background = '#F7F7F8'

  if (isLoadingUserStorageData) {
    return <Loading />
  }

  return (
    <Box flex={1} bg="$gray700">
      <NavigationContainer>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}
