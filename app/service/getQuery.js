import { db } from "../firebase";
import { api_key, httpAxios } from "../httpAxios";

// export async function getQuery(q) {
//   try {
//     const response = await httpAxios.get(`/search/v2/articlesearch.json`, {
//       params: {
//         "api-key": api_key,
//         q: q,
//       },
//     });
//     if (response.data && response.data.response && response.data.response.docs) {
//       const articles = response.data.response.docs;
//       console.log("articles", articles);
//       return articles;
//     }
//   } catch (error) {
//     console.error("Error fetching headlines:", error);
//   }
//   return [];
// }
// service/getQuery.js
export const getQuery = async ({ q }) => {
  try {
    const response = await fetch(
      httpAxios.get(`/search/v2/articlesearch.json?q=${q}&api-key=${api_key}`)
    );
    const data = await response.json();
    return data.response.docs; // Adjust this based on the actual API response structure
  } catch (error) {
    console.error("Error fetching query:", error);
    return [];
  }
};
