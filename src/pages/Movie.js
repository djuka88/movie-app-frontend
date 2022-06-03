import { useEffect } from "react";
import { useParams } from "react-router";
import { useCommentOnMovieMutation, useGetMovieQuery } from "../components/queries/movie";
import useAuth from "../components/hooks/useAuth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function Movie() {
  const { id } = useParams();
  const { user } = useAuth();
  const { isLoading, error, data: movie, refetch } = useGetMovieQuery(id);
  const { mutate: commentOnMovie, error: commentOnMovieError } = useCommentOnMovieMutation();

  const schema = yup.object({
    text: yup.string().required().max(10),
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
              <div className="comments">
                <p>{user.name}</p>
                <form>
                  <input type="hidden" value={movie.id} name="movie_id" {...register("movie_id")}/>
                  <input type="hidden" value={user.id} name="user_id" {...register("user_id")}/>
                  <textarea
                    placeholder="Post comment..."
                    rows={10}
                    name="text"
                    {...register("text")}
                  ></textarea>
                  <p style={{ color:"red"}}>{errors.text?.message}</p>
                  <button type="submit" onClick={handleSubmit(commentOnMovie)} style={{ marginLeft : "10px" }}>Post comment</button>
                </form>
                {movie.comments.map((comment,index)=>(
                  <p key={index}>{comment.text}</p>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Movie;
