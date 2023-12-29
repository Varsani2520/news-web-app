import { addDoc, collection } from "firebase/firestore";
import { httpAxios } from "../httpAxios";
import { db } from "../firebase";

export async function getPopularity() {
  const response = await httpAxios.get(
    `/top-headlines?country=us&apiKey=50c06e8227e6493ca95655b769a50faf&pageSize=50&sortBy=popularity`
  );
  //  offline mode
  if (response.data.articles) {
    try {
      response.data.articles.forEach(async (article) => {
        await addDoc(collection(db, "popular"), article);
      });
      console.log(" popular Article added to Firestore");
    } catch (error) {
      console.log("error in store db", error);
    }
  }
  return response.data;
}
