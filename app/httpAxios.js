import axios from "axios";

export const httpAxios = axios.create({ baseURL: "https://newsapi.org/v2" });
