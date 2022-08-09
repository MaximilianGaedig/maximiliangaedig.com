import { createClient } from 'redis';

const setAndGetViews = async (key: string) => {
  const url = process.env.REDIS_HOST_URL;
  let views = '0';
  if (url) {
    try {
      const client = createClient({ url });
      await client.connect();
      await client.incr(key);
      const serverViews = await client.get(key);
      if (serverViews) views = serverViews;
    } catch (e) {
      console.error(e);
    }
  }
  return views;
};

export default setAndGetViews;
