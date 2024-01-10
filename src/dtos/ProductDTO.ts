import { PaymentMethodsDTO } from './PaymentMethodsDTO'
import { ProductImageDTO } from './ProductImageDTO'
import { UserDTO } from './UserDTO'

export type ProductDTO = {
  id: string
  user_id: string
  name: string
  description: string
  is_active: boolean
  is_new: boolean
  accept_trade: boolean
  payment_methods: PaymentMethodsDTO[]
  product_images: ProductImageDTO[]
  price: number
  created_at: Date
  updated_at: Date
  user: UserDTO
}
