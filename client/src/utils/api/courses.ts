import makeApiCall from ".";
import { useQuery, useInfiniteQuery } from 'react-query'

export async function getCourses() {
  const response = await makeApiCall("/course", "get");
  return response;
}

// export function useAsset(asset_id: string) {
//   const query = useQuery(['asset', asset_id], () => getAsset(asset_id))
//   return query
// }
