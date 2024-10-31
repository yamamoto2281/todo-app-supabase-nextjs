import { NextPage } from 'next'
import { useQueryClient } from 'react-query'
import {
  ArrowRightStartOnRectangleIcon,
  SignalIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/solid'
import { supabase } from '../utils/supabase'
import { Layout } from '../components/Layout'
import { TaskList } from '../components/TaskList'
import { TaskForm } from '../components/TaskForm'
import { NoticeForm } from '../components/NoticeForm'
import { NoticeList } from '../components/NoticeList'
import router from 'next/router'

const Dashboard: NextPage = () => {
  const queryClient = useQueryClient()
  const signOut = () => {
    supabase.auth.signOut()
    queryClient.removeQueries('todos')
    queryClient.removeQueries('notices')
  }

  const handleClick1 = () => {
    router.push('/jointest2');  // クリック時に'/JoinTest'に遷移
  };
  const handleClick2 = () => {
    router.push('/fileUp'); 
  };
  const handleClick3 = () => {
    router.push('/SQL'); 
  };

  const handleClick4 = () => {
    router.push('/SQL2'); 
  };

  const handleClick5 = () => {
    router.push('/joinTest'); 
  };

  const handleClick6 = () => {
    router.push('/groupByTest'); 
  };
 
  return (
    <Layout title="Dashboard">
      <ArrowRightStartOnRectangleIcon
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={signOut}
      />
      <div className="grid grid-cols-2 gap-40">
        <div>
          <div className="my-3 flex justify-center">
            <DocumentTextIcon className=" h-8 w-8 text-blue-500" />
          </div>
          <TaskForm />
          <TaskList />
        </div>
        <div>
          <div className="my-3 flex justify-center ">
            <SignalIcon className=" h-8 w-8 text-blue-500" />
          </div>
          <NoticeForm />
          <NoticeList />
        </div>
      </div>
        {/* ↓追加分 */}
        <div>
          <div className="my-3 flex justify-center ">
          <h1 onClick={handleClick1} style={{ cursor: 'pointer', color: 'blue' }}>
           Click me to go to JoinTest page
          </h1>
          </div>
        </div>
        <div>
          <div className="my-3 flex justify-center ">
          <h1 onClick={handleClick2} style={{ cursor: 'pointer', color: 'blue' }}>
           Click me to go to File Upload page
          </h1>
          </div>
        </div>
        <div>
          <div className="my-3 flex justify-center ">
          <h1 onClick={handleClick3} style={{ cursor: 'pointer', color: 'blue' }}>
           Click me to go to SQL page
          </h1>
          </div>
        </div>
        <div>
          <div className="my-3 flex justify-center ">
          <h1 onClick={handleClick4} style={{ cursor: 'pointer', color: 'blue' }}>
           Click me to go to SQL2 page
          </h1>
          </div>
        </div>
        <div>
          <div className="my-3 flex justify-center ">
          <h1 onClick={handleClick5} style={{ cursor: 'pointer', color: 'blue' }}>
           Click me to go to joinTest page
          </h1>
          </div>
        </div>
        <div>
          <div className="my-3 flex justify-center ">
          <h1 onClick={handleClick6} style={{ cursor: 'pointer', color: 'blue' }}>
           Click me to go to groupByTest page
          </h1>
          </div>
        </div>
    </Layout>
  )
}

export default Dashboard