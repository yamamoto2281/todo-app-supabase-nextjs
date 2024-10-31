import { supabase } from '../utils/supabase';
import { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  const fetchData2 = async () => {
    const { data, error } =   await supabase.rpc('testorders_select')
    if (error) {
      throw new Error(error.message);
    }
    console.log('data2:', data);
      setData(data || []); 
      return data
    };


  return (
    <div>
      {/* <button onClick={fetchData}>データを取得</button>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul> */}

      <button onClick={fetchData2}>データ2を取得</button>
      <ul>
        {/* <p>{data}</p> */}
        {data.map((item2, index2) => (
          <li key={index2}>{JSON.stringify(item2)}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;