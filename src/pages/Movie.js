import { useEffect } from "react";
import { useParams } from "react-router";
import { useGetMovieQuery } from "../components/queries/movie";

function Movie() {
  const { id } = useParams();
  const { isLoading, error, data: movie, refetch } = useGetMovieQuery(id);

  useEffect(() => {
    refetch();
  }, []);

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
      {movie && (
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
              <div style={{ display: "inline-flex" }}>
                <p style={{ marginRight: "10px", color:"green"}}>
                  Likes: {movie.likes_count}
                </p>
                <p style={{ marginRight: "20px", color:"red" }}>Dislikes: {movie.dislikes_count}</p>
                Total visits: {movie.times_visited}
              </div>
              <p style={pStyle}>{movie.description}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Movie;
