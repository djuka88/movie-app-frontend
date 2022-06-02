function LikeDislike({
  movie_id,
  likes,
  dislikes,
  likeActive,
  dislikeActive,
  likeClicked,
  dislikeClicked,
}) {
  return (
    <>
      <button
        style={{
          marginRight: "5px",
          backgroundColor: likeActive ? "green" : "unset",
        }}
        onClick={likeClicked}
        value={movie_id}
      >
        Like
      </button>
      <span style={{ marginRight: "10px" }}> {likes}</span>
      <button
        style={{
          marginRight: "5px",
          backgroundColor: dislikeActive ? "red" : "unset",
        }}
        onClick={dislikeClicked}
        value={movie_id}
      >
        Dislike
      </button>
      {dislikes}
    </>
  );
}

export default LikeDislike;
