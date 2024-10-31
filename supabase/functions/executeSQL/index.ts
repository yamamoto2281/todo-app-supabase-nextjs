import { supabase } from "../../../utils/supabase";

// Edge Functionのエントリポイント
export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const { sql } = await req.json();

  try {
    const { data, error } = await supabase.rpc('execute_sql', { sql });

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 400 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
