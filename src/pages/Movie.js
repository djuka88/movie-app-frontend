import { useParams } from "react-router";
import { useGetMovieQuery } from "../components/queries/movie";

function Movie() {
  const { id } = useParams();
  const { isLoading, error, data: movie } = useGetMovieQuery(id);

  const imgStyle = {
    width: "80%",
    height: "80%",
    float: "left",
    marginLeft: "10px",
  };

  const h2Style = {
    float: "left",
    marginLeft: "20px",
    color: "gray",
  };

  const pStyle = {
    float: "left",
    marginLeft: "20px",
    marginTop: "50px",
    color: "black",
    textAlign: "left",
  };

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
          <img src={movie.cover_image} alt="Avatar" style={imgStyle} />
        </div>
        <div className="infoContainer">
          {movie.genres.map((genre, index) => (
            <h2 key={index} style={h2Style}>
              {genre.name}
            </h2>
          ))}
          <p style={pStyle}>{movie.description}</p>
        </div>
      </div>
    </>
  );
}

export default Movie;
