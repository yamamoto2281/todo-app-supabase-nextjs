// lib/db.ts
import { supabase } from './supabase';

export const selectFromTable = async (table: string) => {
  console.log(`Executing SQL: SELECT * FROM ${table}`); // SQLをログに出力
  const { data, error } = await supabase.from(table).select('*');

  if (error) throw new Error(error.message);
  return data;
};
