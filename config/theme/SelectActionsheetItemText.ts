import { createStyle } from '@gluestack-style/react'

export const SelectActionsheetItemText = createStyle({
  mx: '$2',
  fontSize: '$sm',
  fontFamily: '$body',
  fontWeight: '$normal',
  lineHeight: '$md',
  color: '$textLight700',
  _dark: {
    color: '$textDark200',
  },
})
