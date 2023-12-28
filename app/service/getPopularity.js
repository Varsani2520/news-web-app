import { httpAxios } from "../httpAxios";

export async function getPopularity() {
  const response = await httpAxios.get(
    `/top-headlines?country=us&apiKey=77eaf26ea23b40709411f7004b7604d8&pageSize=8&sortBy=popularity`
  );
  return response.data;
}
