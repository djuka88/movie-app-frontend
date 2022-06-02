import httpService from "./HttpService";
import { endpoints, HTTP_METHODS } from "../constants";

class MovieService {
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
      url: endpoints.SINGLE_MOVIE.replace(':id',id),
      method: HTTP_METHODS.GET,
    });

    return response;
  };

  reactToMovie = async (data) => {
    const response = await httpService.request({
      url: endpoints.REACTION,
      method: HTTP_METHODS.POST,
      data: data
    })

    return response;
  }
}

const movieService = new MovieService();
export default movieService;
