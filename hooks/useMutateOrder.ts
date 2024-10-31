import { useQueryClient, useMutation } from 'react-query'
import useStore from '../store'
import { supabase } from '../utils/supabase'
import { Order } from '../types/types'

export const useMutateOrder = () => {
const queryClient = useQueryClient()
const reset = useStore((state) => state.resetOrder)

  //新規作成用
  const createOrderMutation = useMutation<Order[], Error, Order>(
    async (order) => {
      const { data, error } = await supabase.from('orders').insert(order).select()
      //.supabaseの更新で、.selectで更新した内容を明示的に取得しないとnullになるらしい
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        const previousOrders = queryClient.getQueryData<Order[]>(['orders'])
        if (previousOrders) {
          queryClient.setQueryData(['orders'], [...previousOrders, res[0]])
        }
        console.log(res)
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  return { createOrderMutation }
}