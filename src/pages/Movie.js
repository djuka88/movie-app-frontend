import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  useAddToWatchListMutation,
  useCommentToMovieMutation,
  useGetCommentsQuery,
  useGetMovieQuery,
} from "../components/queries/movie";
import useAuth from "../components/hooks/useAuth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MOVIE_PAGE } from "../constants";

function Movie() {
  const { id } = useParams();
  const { user } = useAuth();
  const [commentsPageCounter, setCommentsPageCounter] = useState(1);
  const { isLoading, error, data: movie, refetch } = useGetMovieQuery(id);
  const {
    isLoading: isCommentsLoading,
    error: commentsLoadingError,
    data: comments,
  } = useGetCommentsQuery(commentsPageCounter, id);

  const { mutate: commentToMovie, error: commentToMovieError } =
    useCommentToMovieMutation();

  const schema = yup.object({
    text: yup.string().required().max(500),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    refetch();
  }, []);

  const handleShowMoreComments = () => {
    setCommentsPageCounter((prev) => prev + 1);
  };

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
              <h3 style={{ color: "green" }}>
                {(movie.isInWatchList && movie.watched) ? <div>You've watched this!</div> : <></>}
              </h3>
              <img src={movie.cover_image} alt="Avatar" style={imgStyle} />
            </div>
            <div className="infoContainer">
              <div className="details">
                <div>
                  {movie.genres.map((genre, index) => (
                    <h2 key={index} style={h2Style}>
                      {genre.name}
                    </h2>
                  ))}
                  <div style={{ display: "inline-flex" }}>
                    <p style={{ marginRight: "10px", color: "green" }}>
                      Likes: {movie.likes_count}
                    </p>
                    <p style={{ marginRight: "20px", color: "red" }}>
                      Dislikes: {movie.dislikes_count}
                    </p>
                    Total visits: {movie.times_visited}
                  </div>
                </div>
                <p style={pStyle}>{movie.description}</p>
              </div>
              <div className="comments-container">
                <div className="comments-form">
                  <p>{user.name}</p>
                  <form>
                    <input
                      type="hidden"
                      value={movie.id}
                      name="movieId"
                      {...register("movieId")}
                    />
                    <input
                      type="hidden"
                      value={user.id}
                      name="userId"
                      {...register("userId")}
                    />
                    <textarea
                      placeholder="Post comment..."
                      rows={10}
                      name="text"
                      {...register("text")}
                    ></textarea>
                    <p style={{ color: "red" }}>{errors.text?.message}</p>
                    <button
                      type="submit"
                      onClick={handleSubmit(commentToMovie)}
                      style={{ marginLeft: "10px" }}
                    >
                      Post comment
                    </button>
                  </form>
                </div>
                {isCommentsLoading ? (
                  <h3>Loading comments...</h3>
                ) : (
                  <div className="comments">
                    {comments.map((comment, index) => (
                      <p key={index}>{comment.text}</p>
                    ))}
                    <button onClick={handleShowMoreComments}>
                      Show more comments
                    </button>
                  </div>
                )}
                {commentsLoadingError && <h3>Error loading comments...</h3>}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Movie;
