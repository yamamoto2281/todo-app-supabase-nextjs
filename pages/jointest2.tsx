
import { OrderForm } from '../components/OrderForm';
import { OrderList } from '../components/OrderList';
import { supabase } from '../utils/supabase';
import { useEffect, useState } from 'react';

interface User {
  user_id: number;
  name: string;
  email: string;
}

interface Order {
  order_id: number;
  user_id: number;
  product_name: string;
  quantity: number;
}

interface Join {
    name: string;
    email: string;
    product_name: string;
    quantity: number;
  }

interface UserOrder {
  name: string;
  email: string;
  product_name: string;
  quantity: number;
}

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [joinDatas, setJoinDatas] = useState<Join[]>([]);

  const [userOrders, setUserOrders] = useState<UserOrder[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('*');

      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*');

      const { data: joinData, error} = await supabase
      .from('users')
      .select('name,email,orders(product_name,quantity)')

      if (usersError) console.error(usersError);
      if (ordersError) console.error(ordersError);

      if (usersData) setUsers(usersData as User[]);
      if (ordersData) setOrders(ordersData as Order[]);

      if (joinData) {
        const formattedJoinData: Join[] = joinData.flatMap(user => 
          user.orders.map(order => ({
            name: user.name,
            email: user.email,
            // ordersは配列で返されるのでフラットに展開する必要がある
            product_name: order.product_name,
            quantity: order.quantity,
          }))
        );
        setJoinDatas(formattedJoinData);
    }

      if (usersData && ordersData) {
        const combinedData: UserOrder[] = usersData.flatMap(user => 
          ordersData
            .filter(order => order.user_id === user.user_id)
            .map(order => ({
              name: user.name,
              email: user.email,
              product_name: order.product_name,
              quantity: order.quantity,
            }))
        );

        setUserOrders(combinedData);
      }
    };

    fetchData();
  }, []);

///

const [selectQuery, setSelectQuery] = useState('');
  const [insertQuery, setInsertQuery] = useState('');
  const [fetchResult, setFetchResult] = useState<any>(null);
  const [selectResult, setSelectResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    setError('');
    try {
      const { data, error: fetchError } = await supabase
        .from('orders') // ここにテーブル名を指定
        .select('*'); // すべての列を取得する例
      if (fetchError) throw fetchError;
      setFetchResult(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleSelect = async () => {
    setError('');
    try {
      const { data, error: queryError } = await supabase.rpc('execute_sql', { sql: selectQuery });
      if (queryError) throw queryError;
      setSelectResult(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleInsert = async () => {
    setError('');
    try {
      const { data, error: queryError } = await supabase.rpc('execute_sql', { sql: insertQuery });
      if (queryError) throw queryError;
      setSelectResult(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

///

  return (
    <><OrderForm /><OrderList /><div>
      <h1>users</h1>
      <ul>
        {users.map(user => (
          <li>
            user_id:　{user.user_id},name:　{user.name},email:　{user.email}
          </li>
        ))}
      </ul>
      <br></br>
      <h1>orders</h1>
      <ul>
        {orders.map(order => (
          <li>
            order_id:　{order.order_id} user_id:　{order.user_id}, Product:　{order.product_name}, Quantity: {order.quantity}
          </li>
        ))}
      </ul>
      <br></br>
      <h1>joinDatas</h1>
      <ul>
        {joinDatas.map(joinDatas => (
          <li>
            name:　{joinDatas.name},　email:　{joinDatas.email},,　Product:　{joinDatas.product_name},　Quantity:　{joinDatas.quantity}
          </li>
        ))}
      </ul>
      <br></br>
      <h1>User Orders</h1>
        {userOrders.map((userOrder, index) => (
          <tr>
            name:　{userOrder.name},　email:　{userOrder.email},　Product:　{userOrder.product_name},　Quantity:　{userOrder.quantity}
          </tr>
        ))}



<h1>Supabase SQL Executor</h1>
      
      <div>
        <h2>Fetch Data</h2>
        <button onClick={handleFetch}>Fetch Data</button>
        {fetchResult && (
          <div>
            <h3>Fetched Results</h3>
            <pre>{JSON.stringify(fetchResult, null, 2)}</pre>
          </div>
        )}
      </div>

      <div>
        <h2>SELECT</h2>
        <textarea 
          rows={4} 
          value={selectQuery} 
          onChange={(e) => setSelectQuery(e.target.value)} 
          placeholder="Enter your SELECT SQL query"
        />
        <button onClick={handleSelect}>Execute SELECT</button>
      </div>

      <div>
        <h2>INSERT</h2>
        <textarea 
          rows={4} 
          value={insertQuery} 
          onChange={(e) => setInsertQuery(e.target.value)} 
          placeholder="Enter your INSERT SQL query"
        />
        <button onClick={handleInsert}>Execute INSERT</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <h2>Result</h2>
        <pre>{JSON.stringify(selectResult, null, 2)}</pre>
      </div>


    </div></>
    
    




  );



  
};

export default Home;
