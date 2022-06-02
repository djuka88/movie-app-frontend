
import { Link } from "react-router-dom";
import { HOME_PAGE } from "../constants";
import LikeDislike from "./LikeDislike";

function Movie({ movieData, likeClicked, dislikeClicked,likeActive,dislikeActive}) {
  return (
    <div className="card">
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
        movie_id = {movieData.id}
        likes={movieData.likes_count}
        dislikes={movieData.dislikes_count}
        likeActive={likeActive}
        dislikeActive={dislikeActive}
        likeClicked = {likeClicked}
        dislikeClicked = {dislikeClicked}
      />
    </div>
  );
}

export default Movie;
