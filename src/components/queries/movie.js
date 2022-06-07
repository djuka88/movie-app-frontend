import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { HOME_PAGE } from "../../constants";
import movieService from "../../services/MovieService";

const MOVIES_QUERY_KEY = "movies";
const MOVIE_QUERY_KEY = "movie";
const GENRES_QUERY_KEY = "genres";
const COMMENTS_QUERY_KEY = "comments";
const WATCHLIST_QUERY_KEY = "watchlist";
const POPULAR_MOVIES = "popular"

export const useGetAllMoviesQuery = () =>
  useQuery(MOVIES_QUERY_KEY, movieService.getAllMovies);

export const useGetMoviesQuery = (filters) => {
  return useQuery(
    [MOVIES_QUERY_KEY, filters],
    () => movieService.getMovies(filters),
    {
      retry: 0,
    }
  );
};

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
    enabled: false,
  });

export const useMovieReactMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(movieService.reactOnMovie, {
    onSuccess: async () => {
      await queryClient.refetchQueries([MOVIES_QUERY_KEY]);
    },
  });
};

export const useCommentToMovieMutation = () => {
  const queryCLient = useQueryClient();
  return useMutation(movieService.commentToMovie, {
    onSuccess: async () => {
      await queryCLient.refetchQueries([COMMENTS_QUERY_KEY]);
    },
  });
};

export const useGetCommentsQuery = (commentsPage, movieId) => {
  return useQuery([COMMENTS_QUERY_KEY, commentsPage], () =>
    movieService.getComments(commentsPage, movieId)
  );
};

export const useGetWatchListQuery = () => {
  return useQuery(WATCHLIST_QUERY_KEY, () => movieService.getWatchList(), {
    refetchOnMount: "true",
  });
};

export const useWatchedMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(movieService.updateWatchList, {
    onSuccess: async () => {
      await queryClient.refetchQueries([WATCHLIST_QUERY_KEY]);
      navigate(HOME_PAGE);
    },
  });
};

export const useRemoveFromWatchListMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(movieService.removeFromWatchList, {
    onSuccess: async () => {
      await queryClient.refetchQueries([WATCHLIST_QUERY_KEY]);
    },
  });
};

export const useAddToWatchListMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(movieService.addToWatchList, {
    onSuccess: async () => {
      await queryClient.refetchQueries([MOVIES_QUERY_KEY]);
    },
  });
};

export const useGetMostPopularMovies = () => {
  return useQuery(POPULAR_MOVIES, () => movieService.getMostPopularMovies(), {
    refetchOnMount: "true",
  });
};
