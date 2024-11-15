import { useQueryClient, useMutation } from 'react-query'
import useStore from '../store'
import { supabase } from '../utils/supabase'
import { Task, EditedTask } from '../types/types'

export const useMutateTask = () => {
  const queryClient = useQueryClient()
  const reset = useStore((state) => state.resetEditedTask)
//新規作成用
  const createTaskMutation = useMutation(
    async (task: Omit<Task, 'id' | 'created_at'>) => {
      const { data, error } = await supabase.from('todos').insert(task).select()
      //.supabaseの更新で、.selectで更新した内容を明示的に取得しないとnullになるらしい
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        const previousTodos = queryClient.getQueryData<Task[]>(['todos'])
        if (previousTodos) {
          queryClient.setQueryData(['todos'], [...previousTodos, res[0]])
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
  //更新用
  const updateTaskMutation = useMutation(
    async (task: EditedTask) => {
      const { data, error } = await supabase
        .from('todos')
        .update({ title: task.title })
        //idが同じとき
        .eq('id', task.id)
        //.supabaseの更新で、.selectで更新した内容を明示的に取得しないとnullになるらしい
        .select()
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>(['todos'])
        if (previousTodos) {
          queryClient.setQueryData(
            ['todos'],
            previousTodos.map((task) =>
              task.id === variables.id ? res[0] : task
            )
          )
        }
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  const deleteTaskMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase.from('todos').delete().eq('id', id).select()
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (_, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>(['todos'])
        if (previousTodos) {
          queryClient.setQueryData(
            ['todos'],
            previousTodos.filter((task) => task.id !== variables)
          )
        }
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  return { deleteTaskMutation, createTaskMutation, updateTaskMutation }
}
