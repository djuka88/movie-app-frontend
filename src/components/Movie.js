import { Link } from "react-router-dom";
import { HOME_PAGE } from "../constants";
import LikeDislike from "./LikeDislike";

function Movie(props) {
  //const

  return (
    <div className="card">
      <Link to={HOME_PAGE + "/" + props.movieData.id}>
        <img
          src={props.movieData.cover_image}
          alt="Avatar"
          style={{ width: "100%" }}
        />
        <div className="text-container">
          <h3 className="title">{props.movieData.title}</h3>
        </div>
      </Link>
      <LikeDislike
        likes={props.movieData.likes}
        dislikes={props.movieData.dislikes}
        likeActive={props.movieData.isLiked}
        dislikeActive={props.movieData.isDisliked}
      />
    </div>
  );
}

export default Movie;
