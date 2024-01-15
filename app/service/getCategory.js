// categoryService.js

import { addDoc, collection } from "firebase/firestore";
import { httpAxios } from "../httpAxios";
import { db } from "../firebase";

export async function getCategoryNews(category) {
  const response = await httpAxios.get(`/article/getArticles`, {
    params: {
      action: "getArticles",
      keyword: category,
      articlesPage: 1,
      articlesCount: 100,
      articlesSortBy: "date",
      articlesSortByAsc: false,
      articlesArticleBodyLen: -1,
      resultType: "articles",
      dataType: ["news", "pr"],
      apiKey: "120ce736-5ef5-4b17-88b9-95c3fa4412f2",
      forceMaxDataTimeWindow: 31,
    },
  });
  //  offline mode
  if (response.data.articles.results) {
    try {
      response.data.articles.results.forEach(async (article) => {
        await addDoc(collection(db, "category"), article);
      });
      console.log("Article added to Firestore");
    } catch (error) {
      console.log("error in store db", error);
    }
  }
  return response.data;
}
