import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { HOME_PAGE } from "../../constants";
import movieService from "../../services/MovieService";

const MOVIES_QUERY_KEY = "movies";
const MOVIE_QUERY_KEY = "movie";
const GENRES_QUERY_KEY = "genres";

export const useGetAllMoviesQuery = () =>
  useQuery(MOVIES_QUERY_KEY, movieService.getAllMovies);

export const useGetMoviesQuery = (filters) => {
    return useQuery([MOVIES_QUERY_KEY,filters], () => movieService.getMovies(filters), {
    retry: 0,
  })};

export const useAddMovieMutation = () => {
  const navigate = useNavigate();

  return useMutation(movieService.addMovie, {
    onSuccess: () => navigate(HOME_PAGE, { replace: true }),
  });
};

export const useGetAllGenresQuery = () =>
  useQuery(GENRES_QUERY_KEY, movieService.getAllGenres);

export const useGetMovieQuery = (id) =>
  useQuery(MOVIE_QUERY_KEY, () => movieService.getMovie(id), {
    retry: 0,
    enabled:false
  });

export const useMovieReactMutation = () => {
  const queryClient = useQueryClient();
   return useMutation(movieService.reactOnMovie,{
     onSuccess: async () =>{
      await queryClient.refetchQueries([MOVIES_QUERY_KEY]);
     }
   });
}

export const useCommentOnMovieMutation = () => {
  return useMutation(movieService.commentOnMovie); 
}
