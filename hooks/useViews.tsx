import useSWR from 'swr';

const useViews = (key: string, add?:boolean) => {
  const fetcher = (url: string) => fetch(url, {
    method: add ? 'POST' : 'GET',
  }).then((r) => r.json());
  const { data } = useSWR<{ views: string }>(`/api/views/${key}`, fetcher);
  let views;
  if (data) {
    views = data.views;
  }
  return views;
};
useViews.defaultProps = { add: false };
export default useViews;
