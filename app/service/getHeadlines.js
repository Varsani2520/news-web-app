import { httpAxios } from "../httpAxios";

export async function getHeadlines() {
  const response = await httpAxios.get(
    `/top-headlines?country=us&apiKey=77eaf26ea23b40709411f7004b7604d8`
  );
  return response.data;
}
