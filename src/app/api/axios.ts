import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = axios.create({
   baseURL: baseURL,
   headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_AUTH_KEY}`,
   },
});
