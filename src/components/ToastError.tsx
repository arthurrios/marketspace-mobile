import { Toast, ToastTitle, VStack, useToast } from '@gluestack-ui/themed'

type ToastErrorProps = {
  title: string
}

export function ToastError({ title }: ToastErrorProps) {
  const toast = useToast()
  return toast.show({
    placement: 'top',
    render: ({ id }) => {
      const toastId = 'toast-' + id
      return (
        <Toast nativeID={toastId} action="error" variant="outline">
          <VStack space="xs">
            <ToastTitle>{title}</ToastTitle>
          </VStack>
        </Toast>
      )
    },
  })
}
