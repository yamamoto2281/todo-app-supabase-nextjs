import { supabase } from '../utils/supabase';
import { useState } from 'react';

const App: React.FC = () => {
  const [customerView, setCustomerView] = useState(false);
  const [orderView, setOrderView] = useState(false);
  const [joinedView, setJoinedView] = useState(false);
  const [customers, setCustomers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [joinedData, setJoinedData] = useState<any[]>([]);

  const fetchCustomers = async () => {
    const { data } = await supabase.rpc('customers_select');
    setCustomers(data || []);
  };

  const fetchOrders = async () => {
    const { data } = await supabase.rpc('orders_select');
    setOrders(data || []);
  };

  const fetchJoinedData = async () => {
    const { data } = await supabase.rpc('customer_order_join');
    setJoinedData(data || []);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* 顧客情報セクション */}
      <div>
        <button onClick={fetchCustomers}>顧客情報を取得</button>
        {customers.length > 0 && (
          <>
            <table border={1} cellPadding="8" style={{ marginTop: '10px' }}>
              <thead>
                <tr>
                  <th>顧客ID</th>
                  <th>名前</th>
                  <th>メール</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={index}>
                    <td>{customer.customer_id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <button onClick={() => setCustomerView(!customerView)}>顧客情報JSONを表示</button>
            </div>
            <ul>
              {customerView && customers.map((customerItem, customerIndex) => (
                <li key={customerIndex}>{JSON.stringify(customerItem)}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* 注文情報セクション */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={fetchOrders}>注文情報を取得</button>
        {orders.length > 0 && (
          <>
            <table border={1} cellPadding="8" style={{ marginTop: '10px' }}>
              <thead>
                <tr>
                  <th>注文ID</th>
                  <th>顧客ID</th>
                  <th>商品名</th>
                  <th>数量</th>
                  <th>注文日</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.order_id}</td>
                    <td>{order.customer_id}</td>
                    <td>{order.product_name}</td>
                    <td>{order.quantity}</td>
                    <td>{order.order_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <button onClick={() => setOrderView(!orderView)}>注文情報JSONを表示</button>
            </div>
            <ul>
              {orderView && orders.map((orderItem, orderIndex) => (
                <li key={orderIndex}>{JSON.stringify(orderItem)}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* 結合データセクション */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={fetchJoinedData}>顧客IDをキーに結合して情報を取得</button>
        {joinedData.length > 0 && (
          <>
            <table border={1} cellPadding="8" style={{ marginTop: '10px' }}>
              <thead>
                <tr>
                  <th>顧客名</th>
                  <th>注文ID</th>
                  <th>商品名</th>
                  <th>数量</th>
                  <th>注文日</th>
                </tr>
              </thead>
              <tbody>
                {joinedData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.order_id}</td>
                    <td>{item.product_name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.order_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <button onClick={() => setJoinedView(!joinedView)}>結合データJSONを表示</button>
            </div>
            <ul>
              {joinedView && joinedData.map((joinedItem, joinedIndex) => (
                <li key={joinedIndex}>{JSON.stringify(joinedItem)}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
