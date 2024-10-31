import { VFC } from 'react'
import { Order } from '../types/types'

export const OrderItem: VFC<Order> = ({
    order_id,
    user_id,
    product_name,
    quantity,
}) => {

  return (
    <li className="my-3 text-lg font-extrabold">
      <span>order_id = {order_id}</span>
      <span>　user_id = {user_id}</span>
      <span>　product_name = {product_name}</span>
      <span>　quantity = {quantity}</span>
    </li>
  )
}