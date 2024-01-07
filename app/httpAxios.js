import axios from "axios";

export const httpAxios = axios.create({
  baseURL: "http://eventregistry.org/api/v1",
});
