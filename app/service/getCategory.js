// categoryService.js

import { httpAxios } from "../httpAxios";

export async function getCategoryNews(category) {
  const response = await httpAxios.get(
    `/top-headlines?country=us&apiKey=46978ef3627d42899ec1134f0128ed43&category=${category}`
  );
  return response.data;
}
