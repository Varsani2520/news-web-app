// categoryService.js

import { httpAxios } from "../httpAxios";

export async function getCategoryNews(category) {
  const response = await httpAxios.get(
    `/top-headlines?country=us&apiKey=46972e92819248e39b4e1656cb05f77b&category=${category}`
  );
  return response.data;
}
