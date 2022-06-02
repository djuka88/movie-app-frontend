import { useGetMoviesQuery, useMovieReactMutation } from "./queries/movie";
import Movie from "../components/Movie";
import Pagination from "./Pagination";

function Movies({ filters, changeFilters }) {
  const { isLoading, error, data: movies } = useGetMoviesQuery(filters);
  const { mutate: reactOnMovie } = useMovieReactMutation();

  const handlePageChange = (page) => {
    changeFilters({ ...filters, page: page });
  };

  if (isLoading) {
    return (
      <div>
        <h3>Loading movies...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h3>Error occured ...</h3>
      </div>
    );
  }

  const handleLikeClick = (e) => {
    const movie_id = e.target.value;

    reactOnMovie({ id: movie_id, reaction: 1 });
  };

  const handleDislikeClick = (e) => {
    const movie_id = e.target.value;

    reactOnMovie({ id: movie_id, reaction: 0 });
  };

  return (
    <>
      {movies && (
        <div className="container">
          <div className="characters">
            {movies.data.map((movie) => {
              const movieReaction = movie.reactions[0] ? movie.reactions[0] : 0;
              return (
                <Movie
                  key={movie.id}
                  movieData={movie}
                  className="box"
                  likeClicked={handleLikeClick}
                  dislikeClicked={handleDislikeClick}
                  likeActive={movieReaction ? movieReaction.like || 0 : 0}
                  dislikeActive={movieReaction ? !movieReaction.like || 0 : 0}
                />
              );
            })}
          </div>
          <Pagination
            className="pagination-bar"
            currentPage={movies.current_page}
            totalCount={movies.total}
            pageSize={movies.per_page}
            onPageChange={(page) => handlePageChange(page)}
          />
        </div>
      )}
    </>
  );
}

export default Movies;
