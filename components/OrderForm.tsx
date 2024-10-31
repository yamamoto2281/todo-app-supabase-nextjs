import React from 'react';
import { FormEvent, VFC } from 'react'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import { useMutateOrder } from '../hooks/useMutateOrder'


export const OrderForm: VFC = () => {
  const { order } = useStore()
  const update = useStore((state) => state.updateOrder)
  const { createOrderMutation } = useMutateOrder()
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createOrderMutation.mutate({
        order_id: order.order_id,
        user_id: order.user_id,
        product_name: order.product_name,
        quantity: order.quantity
      })
  }
  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="my-2 rounded border border-gray-300 px-3 py-2 text-sm  placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
        placeholder="order_id ?"
        value={order.order_id}
        onChange={(e) => update({ ...order, order_id: e.target.value })}
      />
      <input
        type="text"
        className="my-2 rounded border border-gray-300 px-3 py-2 text-sm  placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
        placeholder="user_id ?"
        value={order.user_id}
        onChange={(e) => update({ ...order, user_id: e.target.value })}
      />
      <input
        type="text"
        className="my-2 rounded border border-gray-300 px-3 py-2 text-sm  placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
        placeholder="product_name ?"
        value={order.product_name}
        onChange={(e) => update({ ...order, product_name: e.target.value })}
      />
      <input
        type="text"
        className="my-2 rounded border border-gray-300 px-3 py-2 text-sm  placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
        placeholder="quantity ?"
        value={order.quantity}
        onChange={(e) => update({ ...order, quantity: e.target.value })}
      />
      <button
        type="submit"
        className="ml-2 rounded bg-indigo-600 px-3 py-2 text-sm font-medium  text-white hover:bg-indigo-700 "
      >
      </button>
    </form>
  )
}