import { Center, Spinner } from '@gluestack-ui/themed'

export function Loading() {
  return (
    <Center style={{ flex: 1 }} bgColor="$gray600">
      <Spinner style={{ flex: 1 }} />
    </Center>
  )
}
