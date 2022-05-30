import httpService from "./HttpService";
import { endpoints, HTTP_METHODS } from "../constants";

class MovieService {
  getAllMovies = async () => {
    const response = await httpService.request({
      url: endpoints.MOVIES,
      method: HTTP_METHODS.GET,
    });

    return response;
  };

  getMovies = async (filters) => {
    const response = await httpService.request({
      url: endpoints.MOVIES,
      method: HTTP_METHODS.GET,
      params: filters,
    });

    return response;
  };

  getAllGenres = async () => {
    const response = await httpService.request({
      url: endpoints.GENRES,
      method: HTTP_METHODS.GET,
    });

    return response;
  };

  addMovie = async (data) => {
    await httpService.request({
      url: endpoints.MOVIES,
      method: HTTP_METHODS.POST,
      data: data,
    });
  };

  getMovie = async (id) => {
    const response = await httpService.request({
      url: endpoints.MOVIES + `/${id}`,
      method: HTTP_METHODS.GET,
    });

    return response;
  };
}

const movieService = new MovieService();
export default movieService;
