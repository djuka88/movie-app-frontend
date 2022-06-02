function LikeDislike({
  movieData,
  likeClicked,
  dislikeClicked,
}) {
  const movieReaction = movieData.reactions[0] ? movieData.reactions[0] : 0;
  const likeActive = movieReaction ? movieReaction.like || 0 : 0;
  const dislikeActive = movieReaction ? !movieReaction.like || 0 : 0;

  return (
    <>
      <button
        style={{
          marginRight: "5px",
          backgroundColor: likeActive ? "green" : "unset",
        }}
        onClick={likeClicked}
      >
        Like
      </button>
      <span style={{ marginRight: "10px" }}> {movieData.likes_count}</span>
      <button
        style={{
          marginRight: "5px",
          backgroundColor: dislikeActive ? "red" : "unset",
        }}
        onClick={dislikeClicked}
      >
        Dislike
      </button>
      {movieData.dislikes_count}
    </>
  );
}

export default LikeDislike;
