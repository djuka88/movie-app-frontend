import { Link } from "react-router-dom";
import { HOME_PAGE } from "../constants";
import LikeDislike from "./LikeDislike";
import { useAddToWatchListMutation } from "./queries/movie";

function Movie({
  movieData,
  likeClicked,
  dislikeClicked,
  likeActive,
  dislikeActive,
}) {
  const { mutate: addToWatchList, error: addToWatchListError } =
    useAddToWatchListMutation();

  return (
    <div className="card">
      <div>
        <div>visits: {movieData.times_visited}</div>
        {movieData.watched ? (
          <p
            style={{
              textAlign: "left",
              marginRight: "20px",
              color: "green",
              width: "auto",
            }}
          >
            You've watched this!
          </p>
        ) : (
          <div></div>
        )}
      </div>
      <Link to={HOME_PAGE + "/" + movieData.id}>
        <img
          src={movieData.cover_image}
          alt="Avatar"
          style={{ width: "100%" }}
        />
        <div className="text-container">
          <h3 className="title">{movieData.title}</h3>
        </div>
      </Link>
      <LikeDislike
        movie_id={movieData.id}
        likes={movieData.likes_count}
        dislikes={movieData.dislikes_count}
        likeActive={likeActive}
        dislikeActive={dislikeActive}
        likeClicked={likeClicked}
        dislikeClicked={dislikeClicked}
      />
      <br></br>
      {movieData.isInWatchList || (
        <button
          style={{ marginTop: "10px" }}
          onClick={() => addToWatchList(movieData.id)}
        >
          Add to watch list
        </button>
      )}
    </div>
  );
}

export default Movie;
