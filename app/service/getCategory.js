// categoryService.js

import { httpAxios } from "../httpAxios";

export async function getCategoryNews(category) {
  const response = await httpAxios.get(
    `/top-headlines?country=us&apiKey=77eaf26ea23b40709411f7004b7604d8&category=${category}`
  );
  return response.data;
}
