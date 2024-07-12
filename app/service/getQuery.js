import { db } from "../firebase";
import { api_key, httpAxios } from "../httpAxios";

export async function getQuery(q) {
  try {
    const response = await httpAxios.get(`/search/v2/articlesearch.json`, {
      params: {
        "api-key": api_key,
        q: q,
      },
    });
    if (response.data && response.data.response && response.data.response.docs) {
      const articles = response.data.response.docs;
      console.log("articles", articles);
      return articles;
    }
  } catch (error) {
    console.error("Error fetching headlines:", error);
  }
  return [];
}
