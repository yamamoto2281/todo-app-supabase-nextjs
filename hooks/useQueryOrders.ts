import { useQuery } from 'react-query'
import { supabase } from '../utils/supabase'
import { Order } from '../types/types'

export const useQueryOrders = () => {
  const getOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*');

    if (error) {
      throw new Error(error.message)
    }
    return data
  }
  return useQuery<Order[], Error>({
     queryKey: ['orders'],
     queryFn: getOrders,
     staleTime: Infinity,
  })
}