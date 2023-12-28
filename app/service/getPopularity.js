import { httpAxios } from "../httpAxios";

export async function getPopularity() {
  const response = await httpAxios.get(
    `/top-headlines?country=us&apiKey=46972e92819248e39b4e1656cb05f77b&pageSize=50&sortBy=popularity`
  );
  return response.data;
}
