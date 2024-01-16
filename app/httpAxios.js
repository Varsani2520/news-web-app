import axios from "axios";

export const httpAxios = axios.create({
  baseURL: "https://eventregistry.org/api/v1",
});
