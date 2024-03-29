import { addDoc, collection } from "firebase/firestore";
import { httpAxios } from "../httpAxios";
import { db } from "../firebase";

export async function getPopularity() {
  const response = await httpAxios.get(`/article/getArticles`, {
    params: {
      action: "getArticles",
      keyword: "popular",
      articlesPage: 1,
      articlesCount: 100,
      articlesSortBy: "date",
      articlesSortByAsc: false,
      articlesArticleBodyLen: -1,
      resultType: "articles",
      dataType: ["news", "pr"],
      apiKey: "da25390a-9d81-4eb6-9c8e-d0f2dcd34082",
      forceMaxDataTimeWindow: 31,
    },
  });
  //  offline mode
  if (response.data.articles.results) {
    try {
      response.data.articles.results.forEach(async (article) => {
        await addDoc(collection(db, "popular"), article);
      });
      console.log(" popular Article added to Firestore");
    } catch (error) {
      console.log("error in store db", error);
    }
  }
  return response.data;
}
