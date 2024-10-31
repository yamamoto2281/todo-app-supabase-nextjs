import { supabase } from '../utils/supabase';
import { useState } from 'react';

const App: React.FC = () => {
  const [salesView, setSalesView] = useState(false);
  const [categorySalesView, setCategorySalesView] = useState(false);
  const [customerSpentView, setCustomerSpentView] = useState(false);
  const [dailySalesView, setDailySalesView] = useState(false);

  const [sales, setsales] = useState<any[]>([]);
  const [categorySales, setCategorySales] = useState<any[]>([]);
  const [customerSpent, setCustomerSpent] = useState<any[]>([]);
  const [dailySales, setDailySales] = useState<any[]>([]);

  const fetchSales = async () => {
    const { data } = await supabase.rpc('sales_select');
    setsales(data || []);
  };

  // 各集計データの取得関数
  const fetchCategorySales = async () => {
    const { data } = await supabase.rpc('get_total_sales_by_category');
    setCategorySales(data || []);
  };

  const fetchCustomerSpent = async () => {
    const { data } = await supabase.rpc('get_total_spent_by_customer');
    setCustomerSpent(data || []);
  };

  const fetchDailySales = async () => {
    const { data } = await supabase.rpc('get_daily_sales_by_category');
    setDailySales(data || []);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* 既存の顧客情報セクション */}
      <div>
        <button onClick={fetchSales}>＜販売情報を取得＞</button>
        {sales.length > 0 && (
          <>
            {/* 顧客情報テーブル */}
            <table border={1} cellPadding="8" style={{ marginTop: '10px' }}>
              <thead>
                <tr>
                  <th>顧客ID</th>
                  <th>商品カテゴリ</th>
                  <th>商品名</th>
                  <th>数量</th>
                  <th>金額</th>
                  <th>日付</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sales, index) => (
                  <tr key={index}>
                    <td>{sales.customer_id }</td>
                    <td>{sales.product_category}</td>
                    <td>{sales.product_name}</td>
                    <td>{sales.quantity}</td>
                    <td>{sales.sale_amount}</td>
                    <td>{sales.sale_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <button onClick={() => setSalesView(!salesView)}>販売JSONを表示</button>
            </div>
            <ul>
              {salesView && sales.map((salesItem, customerIndex) => (
                <li key={customerIndex}>{JSON.stringify(salesItem)}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* カテゴリごとの売上合計 */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={fetchCategorySales}>＜カテゴリごとの売上合計を取得＞</button>
        {categorySales.length > 0 && (
          <>
            <table border={1} cellPadding="8" style={{ marginTop: '10px' }}>
              <thead>
                <tr>
                  <th>カテゴリ</th>
                  <th>合計売上</th>
                </tr>
              </thead>
              <tbody>
                {categorySales.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product_category}</td>
                    <td>{item.total_sales}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <button onClick={() => setCategorySalesView(!categorySalesView)}>売上JSONを表示</button>
            </div>
            <ul>
              {categorySalesView && categorySales.map((item, index) => (
                <li key={index}>{JSON.stringify(item)}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* 顧客ごとの合計購入金額 */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={fetchCustomerSpent}>＜顧客ごとの購入合計を取得＞</button>
        {customerSpent.length > 0 && (
          <>
            <table border={1} cellPadding="8" style={{ marginTop: '10px' }}>
              <thead>
                <tr>
                  <th>顧客ID</th>
                  <th>購入回数</th>
                  <th>合計金額</th>
                </tr>
              </thead>
              <tbody>
                {customerSpent.map((item, index) => (
                  <tr key={index}>
                    <td>{item.customer_id}</td>
                    <td>{item.purchase_count}</td>
                    <td>{item.total_spent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <button onClick={() => setCustomerSpentView(!customerSpentView)}>購入合計JSONを表示</button>
            </div>
            <ul>
              {customerSpentView && customerSpent.map((item, index) => (
                <li key={index}>{JSON.stringify(item)}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* 日付ごとのカテゴリ別売上 */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={fetchDailySales}>＜日付ごとのカテゴリ別売上を取得＞</button>
        {dailySales.length > 0 && (
          <>
            <table border={1} cellPadding="8" style={{ marginTop: '10px' }}>
              <thead>
                <tr>
                  <th>日付</th>
                  <th>カテゴリ</th>
                  <th>売上合計</th>
                </tr>
              </thead>
              <tbody>
                {dailySales.map((item, index) => (
                  <tr key={index}>
                    <td>{item.sale_date}</td>
                    <td>{item.product_category}</td>
                    <td>{item.daily_sales}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <button onClick={() => setDailySalesView(!dailySalesView)}>日付別売上JSONを表示</button>
            </div>
            <ul>
              {dailySalesView && dailySales.map((item, index) => (
                <li key={index}>{JSON.stringify(item)}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
