import { Text, HStack } from '@gluestack-ui/themed'
import { Bank, Barcode, CreditCard, Money, QrCode } from 'phosphor-react-native'

interface PaymentTagProps {
  type: string
}

export function PaymentTag({ type }: PaymentTagProps) {
  return (
    <HStack gap="$2" alignItems="center">
      {type === 'voucher' && (
        <>
          <Barcode size={20} color="#1A181B" />
          <Text color="$gray100">Voucher</Text>
        </>
      )}
      {type === 'pix' && (
        <>
          <QrCode size={20} color="#1A181B" />
          <Text color="$gray100">Pix</Text>
        </>
      )}
      {type === 'cash' && (
        <>
          <Money size={20} color="#1A181B" />
          <Text color="$gray100">Cash</Text>
        </>
      )}
      {type === 'creditCard' && (
        <>
          <CreditCard size={20} color="#1A181B" />
          <Text color="$gray100">Credit Card</Text>
        </>
      )}
      {type === 'bankDeposit' && (
        <>
          <Bank size={20} color="#1A181B" />
          <Text color="$gray100">Bank Deposit</Text>
        </>
      )}
    </HStack>
  )
}
