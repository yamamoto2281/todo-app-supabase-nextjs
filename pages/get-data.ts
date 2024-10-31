// pages/api/get-data.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { selectFromTable } from '../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { table } = req.query;

  if (typeof table !== 'string') {
    return res.status(400).json({ error: 'Table name is required' });
  }

  try {
    const data = await selectFromTable(table);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default handler;
