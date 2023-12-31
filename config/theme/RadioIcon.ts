import { createStyle } from '@gluestack-style/react'

export const RadioIcon = createStyle({
  borderRadius: '$full',
  ':checked': {
    color: '$blueLight',
    ':hover': {
      color: '$primary700',
      ':disabled': {
        color: '$primary600',
      },
    },
  },
  _dark: {
    ':checked': {
      color: '$blueLight',
      ':disabled': {
        color: '$primary500',
      },
      ':hover': {
        ':disabled': {
          color: '$primary500',
        },
        color: '$primary400',
      },
    },
  },
})
