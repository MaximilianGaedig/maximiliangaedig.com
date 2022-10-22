import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from 'redis';
import { getClientIp } from 'request-ip';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  let { location } = req.query;
  if (!(['GET', 'POST'] as (string | undefined)[]).includes(method)) {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }
  if (typeof location === 'undefined') {
    res.status(400).json({ error: 'Missing location' });
    return;
  }
  if (typeof location !== 'string') {
    location = location.join('/');
  }
  const client = createClient({ url: process.env.REDIS_HOST_URL });
  await client.connect();
  if (method === 'POST') {
    // Limit to 1 view per IP per day
    const ip = getClientIp(req);
    const ipKey = `${location}-${ip}`;
    if (!(await client.exists(ipKey))) {
      console.log(`View ${ipKey}`);
      await client.set(ipKey, '', {
        EX: 60 * 60 * 24,
      });
      await client.incr(location);
    } else {
      console.log(`Duplicate view ${ipKey}`);
    }
  }
  const views = await client.get(location);
  res.status(200).json({ views });
};
