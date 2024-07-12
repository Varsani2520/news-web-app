import { api_key, httpAxios } from "../httpAxios";

export const getQuery = async (q) => {
  const response = await httpAxios.get(
    `/search/v2/articlesearch.json?q=${q}&api-key=${api_key}`
  );
  return response.data.response;
};
