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

  const handleReaction = (reaction, movie_id) => {
    reactOnMovie({ id: movie_id, reaction: reaction });
  }

  return (
    <>
      {movies && (
        <div className="container">
          <div className="characters">
            {movies.data.map((movie) => {
              return (
                <Movie
                  key={movie.id}
                  movieData={movie}
                  className="box"
                  likeClicked={()=>handleReaction(1,movie.id)}
                  dislikeClicked={()=>handleReaction(0,movie.id)}
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
