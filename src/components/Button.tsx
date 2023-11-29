/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ButtonGroup,
  ButtonIcon,
  ButtonText,
  Button as GluestackButton,
} from '@gluestack-ui/themed'
import { ButtonProps } from 'react-native'

type Props = ButtonProps & {
  title: string
  variant?: 'primary' | 'secondary' | 'tertiary'
  icon?: React.ComponentType<any>
  hasIcon?: boolean
}

export function Button({
  title,
  variant = 'primary',
  icon,
  hasIcon = false,
  ...props
}: Props) {
  return (
    <ButtonGroup flex={1}>
      <GluestackButton
        h={42}
        bgColor={
          variant === 'secondary'
            ? '$gray100'
            : variant === 'primary'
              ? '$blueLight'
              : '$gray500'
        }
        borderRadius={6}
        sx={{ paddingHorizontal: 0 }}
        w="$full"
        alignItems="center"
        {...props}
      >
        {hasIcon ? (
          <ButtonIcon
            as={icon}
            color={variant === 'tertiary' ? '$gray300' : '$gray700'}
            mr={8}
          />
        ) : null}
        <ButtonText
          textAlign="center"
          color={variant === 'tertiary' ? '$gray200' : '$gray700'}
          fontFamily="$heading"
          fontSize="$sm"
        >
          {title}
        </ButtonText>
      </GluestackButton>
    </ButtonGroup>
  )
}
