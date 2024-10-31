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
  product_id: number;
  quantity: number;
}

interface Product {
  product_id: number;
  name: string;
  price: string;
}

interface Join {
    name: string;
    email: string;
    product_name?: string;
    quantity: number;
  }

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [joinDatas, setJoinDatas] = useState<Join[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('*');

      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*');

        const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*');

      const { data: joinData, error} = await supabase
      .from('users')
      .select('name,email,orders(quantity,products(name))')

      if (usersError) console.error(usersError);
      if (ordersError) console.error(ordersError);

      if (usersData) setUsers(usersData as User[]);
      if (ordersData) setOrders(ordersData as Order[]);
      if (productsData) setProducts(productsData as Product[]);

      if (joinData) {
        const formattedJoinData: Join[] = joinData.flatMap(user => 
          user.orders.map(order => ({
            name: user.name,
            email: user.email,
            quantity: order.quantity,// 配列をフラットに展開する必要がある
          }))
        );
        setJoinDatas(formattedJoinData);
    }
    };

    fetchData();
  }, []);

  return (
    <><OrderForm /><OrderList />
    <div>
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
            order_id:　{order.order_id},user_id:　{order.user_id},Product:　{order.product_id},Quantity: {order.quantity}
          </li>
        ))}
      </ul>
      <br></br>
      <h1>products</h1>
      <ul>
        {products.map(product => (
          <li>
            product_id:　{product.product_id},  name:　{product.name}, price:　{product.price}
          </li>
        ))}
      </ul>
      <br></br>
      <h1>joinDatas</h1>
      <ul>
        {joinDatas.map(joinDatas => (
          <li>
            name:　{joinDatas.name},　email:　{joinDatas.email},　order_id:　{joinDatas.order_id},　Product:　{joinDatas.product_name},　Quantity:　{joinDatas.quantity}
          </li>
        ))}
      </ul>
      <br></br>
    </div></>
    
  );
};

export default Home;
