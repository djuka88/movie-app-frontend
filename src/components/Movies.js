import { useGetAllMoviesQuery } from "./queries/movie";
import Movie from "../components/Movie";

function Movies() {
  const { isLoading, error, data } = useGetAllMoviesQuery();

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
    <div className="characters">
      {data.map((movie) => {
        return <Movie key={movie.id} movieData={movie} className="box"/>;
      })}
    </div>
  );
}

export default Movies;
