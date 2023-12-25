import { httpAxios } from "../httpAxios";

export async function getPopularity() {
  const response = await httpAxios.get(
    `/top-headlines?country=us&apiKey=34e4f7a09b3b4dde84e27fdc9bec0dd7&pageSize=8&sortBy=popularity`
  );
  return response.data;
}
