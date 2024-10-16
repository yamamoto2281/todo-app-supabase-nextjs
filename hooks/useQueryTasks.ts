import { useQuery } from 'react-query'
import { supabase } from '../utils/supabase'
import { Task } from '../types/types'

//SupabeseからTaskの一覧を取得する
export const useQueryTasks = () => {
  const getTasks = async () => {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }
    return data
  }
  return useQuery<Task[], Error>({
     //Taskはほかのユーザーのものは見れない、下の設定
    queryKey: ['todos'],
    queryFn: getTasks,
    staleTime: Infinity,
  })
}