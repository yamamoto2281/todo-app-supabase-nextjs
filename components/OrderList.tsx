import { VFC } from 'react'
import { useQueryOrders } from '../hooks/useQueryOrders'
import { Spinner } from './Spinner'
import { OrderItem } from './OrderItem'

export const OrderList: VFC = () => {
  const { data: orders, status } = useQueryOrders()
  if (status === 'loading') return <Spinner />
  if (status === 'error') return <p>{'Error'}</p>
  return (
    <ul className="my-2">
      {orders?.map((order) => (
        <OrderItem
          key={order.order_id} 
          order_id={order.order_id}
          user_id={order.user_id}
          product_name={order.product_name}
          quantity={order.quantity}
          />
      ))}
    </ul>
  )
}