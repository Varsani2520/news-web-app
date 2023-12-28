// categoryService.js

import { httpAxios } from "../httpAxios";

export async function getCategoryNews(category) {
  const response = await httpAxios.get(
    `/top-headlines?country=us&apiKey=99ca2deb1a844a959c6fd2da347c0f64&category=${category}`
  );
  return response.data;
}
