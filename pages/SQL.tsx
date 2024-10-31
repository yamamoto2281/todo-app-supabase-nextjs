import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabaseクライアントの設定
const supabaseUrl = 'https://ancsbuxsfkptdwusjrht.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuY3NidXhzZmtwdGR3dXNqcmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgwMjQ4MDUsImV4cCI6MjA0MzYwMDgwNX0.70lfSayJRCxCKX5n4P_PgRyGW10rowBJcTuzLKLSUl4';
const supabase = createClient(supabaseUrl, supabaseKey);


const App: React.FC = () => {
  const [selectQuery, setSelectQuery] = useState('');
  const [insertQuery, setInsertQuery] = useState('');
  const [fetchResult, setFetchResult] = useState<any>(null);
  const [selectResult, setSelectResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    setError('');
    try {
      const { data, error: fetchError } = await supabase
        .from('two') // ここにテーブル名を指定
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

  return (
    <div>
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
    </div>
  );
};

export default App;