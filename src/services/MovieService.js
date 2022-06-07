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
      url: endpoints.SINGLE_MOVIE.replace(":id", id),
      method: HTTP_METHODS.GET,
    });

    return response;
  };

  reactOnMovie = async (data) => {
    const response = await httpService.request({
      url: endpoints.REACTION,
      method: HTTP_METHODS.POST,
      data: data,
    });

    return response;
  };

  commentToMovie = async (data) => {
    const response = await httpService.request({
      url: endpoints.COMMENTS.replace(":id", data.movieId),
      method: HTTP_METHODS.POST,
      data: data,
    });

    return response;
  };

  getComments = async (commentsPage, movieId) => {
    const response = await httpService.request({
      url: endpoints.COMMENTS.replace(":id", movieId),
      method: HTTP_METHODS.GET,
      params: { page: commentsPage, movieId: movieId },
    });

    return response;
  };

  getWatchList = async () => {
    const response = await httpService.request({
      url: endpoints.WATCHLIST,
      method: HTTP_METHODS.GET,
    });

    return response;
  };

  updateWatchList = async (data) => {
    const response = await httpService.request({
      url: endpoints.WATCHLIST,
      method: HTTP_METHODS.PUT,
      data: { movieIds: data },
    });

    return response;
  };

  removeFromWatchList = async (movieId) => {
    const response = await httpService.request({
      url: endpoints.SINGLE_WATCHLIST.replace(":id",movieId),
      method: HTTP_METHODS.DELETE
    });

    return response;
  }

  addToWatchList = async (movieId) => {
    const response = await httpService.request({
      url: endpoints.WATCHLIST,
      method: HTTP_METHODS.POST,
      data: {movieId:movieId}
    });

    return response;
  }
}

const movieService = new MovieService();
export default movieService;
