import { createStyle } from '@gluestack-style/react'

export const Spinner = createStyle({
  props: {
    color: '$blueLight',
  },
  _dark: {
    props: {
      color: '$redLight',
    },
  },
})
