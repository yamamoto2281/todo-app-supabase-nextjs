import React from 'react';
import { FormEvent, VFC } from 'react'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import { useMutateTask } from '../hooks/useMutateTask'

export const TaskForm: VFC = () => {
  const { editedTask } = useStore()
  const update = useStore((state) => state.updateEditedTask)
  const { createTaskMutation, updateTaskMutation } = useMutateTask()
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Submit handler called")
    const { data: { user }, error } = await supabase.auth.getUser();
    //エラーの場合
    if (error) {
        console.error("ユーザー情報の取得に失敗しました:", error);
        return; // エラーがある場合は処理を中断
    }

    // ユーザーが存在しない場合のチェック
    if (!user) {
        console.error("ユーザーが存在しません。");
        return;
    }

    if (editedTask.id === '')
      createTaskMutation.mutate({
        title: editedTask.title,
        user_id: user.id,
      })
    else {
      updateTaskMutation.mutate({
        id: editedTask.id,
        title: editedTask.title,
      })
    }
    console.log(editedTask.title)
  }
  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="my-2 rounded border border-gray-300 px-3 py-2 text-sm  placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
        placeholder="New task ?"
        value={editedTask.title}
        onChange={(e) => update({ ...editedTask, title: e.target.value })}
      />
      <button
        type="submit"
        className="ml-2 rounded bg-indigo-600 px-3 py-2 text-sm font-medium  text-white hover:bg-indigo-700 "
      >
        {editedTask.id ? 'Update' : 'Create'}
      </button>
    </form>
  )
}