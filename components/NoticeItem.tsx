import { VFC, useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import useStore from '../store'
import { useMutateNotice } from '../hooks/useMutateNotice'
import { Notice } from '../types/types'

export const NoticeItem: VFC<Omit<Notice, 'created_at'>> = ({
  id,
  content,
  user_id,
}) => {
  const [userId, setUserId] = useState<string | undefined>('')
  const update = useStore((state) => state.updateEditedNotice)
  const { deleteNoticeMutation } = useMutateNotice()
  useEffect(() => {
    const fetchUser = async () => {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        // エラーの場合
        if (error) {
            console.error("ユーザー情報の取得に失敗しました:", error);
            return; // エラーがある場合は処理を中断
        }
        
        // ユーザーが存在しない場合のチェック
        if (!user) {
            console.error("ユーザーが存在しません。");
            return;
        }
        
        setUserId(user.id);
    };

    fetchUser();
}, []);
  return (
    <li className="my-3 text-lg font-extrabold">
      <span>{content}</span>
      {userId === user_id && (
        <div className="float-right ml-20 flex">
          <PencilIcon
            className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => {
              update({
                id: id,
                content: content,
              })
            }}
          />
          <TrashIcon
            className="h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => {
              deleteNoticeMutation.mutate(id)
            }}
          />
        </div>
      )}
    </li>
  )
}