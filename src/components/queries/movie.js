import { useQuery } from "react-query"
import movieService from '../../services/MovieService'

const MOVIES_QUERY_KEY = 'movies'

export const useGetAllMoviesQuery = () =>
    useQuery(
        MOVIES_QUERY_KEY,
        movieService.getAllMovies
    )