import { db } from "../firebase";
import { httpAxios } from "../httpAxios";
import { addDoc, collection } from "firebase/firestore";
export async function getHeadlines() {
  const response = await httpAxios.get(
    `/top-headlines?country=us&apiKey=50c06e8227e6493ca95655b769a50faf`
  );
//  offline mode 
  if (response.data.articles) {
    try {
      response.data.articles.forEach(async (article) => {
        await addDoc(collection(db, "headlines"), article);
      });
      console.log("Article added to Firestore");
    } catch (error) {
      console.log("error in store db", error);
    }
  }
  return response.data;
}
