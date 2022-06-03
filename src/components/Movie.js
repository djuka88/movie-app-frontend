import { Link } from "react-router-dom";
import { HOME_PAGE } from "../constants";
import LikeDislike from "./LikeDislike";

function Movie({ movieData, reactionClicked }) {
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
      <LikeDislike movieData={movieData} reactionClicked={reactionClicked} />
    </div>
  );
}

export default Movie;
