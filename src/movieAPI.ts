import axios from "axios";
const API_KEY = "5892e600c9d8cbd024296d247a1df4c9";
const apiService = axios.create({ baseURL: "https://api.themoviedb.org/3/" });

export const fetchMovies = async () => {
  try {
    const response = await apiService.get("movie/popular", {
      params: { api_key: API_KEY },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies", error);
  }
};
