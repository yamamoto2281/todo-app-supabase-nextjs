import { FormEvent, VFC } from 'react'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import { useMutateNotice } from '../hooks/useMutateNotice'

export const NoticeForm: VFC = () => {
  const { editedNotice } = useStore()
  const update = useStore((state) => state.updateEditedNotice)
  const { createNoticeMutation, updateNoticeMutation } = useMutateNotice()
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

    if (editedNotice.id === '')
      createNoticeMutation.mutate({
        content: editedNotice.content,
        user_id: user.id,
      })
    else {
      updateNoticeMutation.mutate({
        id: editedNotice.id,
        content: editedNotice.content,
      })
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="my-2 rounded border border-gray-300 px-3  py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
        placeholder="New notice ?"
        value={editedNotice.content}
        onChange={(e) => update({ ...editedNotice, content: e.target.value })}
      />
      <button
        type="submit"
        className="ml-2 rounded bg-indigo-600 px-3 py-2 text-sm font-medium  text-white hover:bg-indigo-700 "
      >
        {editedNotice.id ? 'Update' : 'Create'}
      </button>
    </form>
  )
}