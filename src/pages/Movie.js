import { useParams } from "react-router";
import { useGetMovieQuery } from "../components/queries/movie";

function Movie() {
  const { id } = useParams();
  const { isLoading, error, data: movie } = useGetMovieQuery(id);

  if (isLoading) {
    return (
      <div>
        <h3>Loading movie...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h3>Requested movie not found :(</h3>
      </div>
    );
  }

  return (
    <>
      <h1>{movie.title}</h1>
      <div className="movieContainer">
        <div className="imageContainer">
          <img src={movie.cover_image} alt="Avatar" />
        </div>
        <div className="infoContainer">
          {movie.genres.map((genre, index) => (
            <h2 key={index}>
              {genre.name}
            </h2>
          ))}
          <p>{movie.description}</p>
        </div>
      </div>
    </>
  );

  
}

export default Movie;
