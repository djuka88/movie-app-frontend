import { useGetMoviesQuery } from "./queries/movie";
import Movie from "../components/Movie";
import Pagination from "./Pagination";

function Movies({ filters, changeFilters }) {
  const { isLoading, error, data: movies } = useGetMoviesQuery(filters);

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

  return (
    <>
      <div className="container">
        <div className="characters">
          {movies.data.map((movie) => {
            return <Movie key={movie.id} movieData={movie} className="box" />;
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
    </>
  );
}

export default Movies;
