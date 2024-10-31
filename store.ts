import { create } from 'zustand'
import { EditedTask, EditedNotice, Order } from './types/types'

type State = {
  //状態管理したいオブジェクト
  editedTask: EditedTask
  editedNotice: EditedNotice
  order: Order
  //諸々の関数
  updateEditedTask: (payload: EditedTask) => void
  updateEditedNotice: (payload: EditedNotice) => void
  updateOrder: (payload: Order) => void
  resetEditedTask: () => void
  resetEditedNotice: () => void
  resetOrder: () => void
}

//zustandにcreateなるものがある
const useStore = create<State>((set) => ({
  editedTask: { id: '', title: '' },
  editedNotice: { id: '', content: '' },
  order: {order_id: '', user_id: '', product_name: '', quantity: ''},
  updateEditedTask: (payload) =>
    set({
      editedTask: {
        id: payload.id,
        title: payload.title,
      },
    }),
  resetEditedTask: () => set({ editedTask: { id: '', title: '' } }),
  updateEditedNotice: (payload) =>
    set({
      editedNotice: {
        id: payload.id,
        content: payload.content,
      },
    }),
  resetEditedNotice: () => set({ editedNotice: { id: '', content: '' } }),
  updateOrder:(payload) => 
    set({
      order: {
        order_id: payload.order_id,
        user_id: payload.user_id,
        product_name: payload.product_name,
        quantity: payload.quantity
      }
    }),
  resetOrder: () => set({order:{order_id:'',user_id:'',product_name:'',quantity:''}}),
}))
export default useStore