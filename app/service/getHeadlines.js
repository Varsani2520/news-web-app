import { httpAxios } from "../httpAxios";

export async function getHeadlines() {
  const response = await httpAxios.get(
    `/top-headlines?country=us&apiKey=69f2b0c4d53e40099e654bc7119426ac`
  );
  return response.data;
}
