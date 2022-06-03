function LikeDislike({ movieData, reactionClicked }) {
  const likeActive = movieData.reaction != undefined ? movieData.reaction : 0;
  const dislikeActive =
    movieData.reaction != undefined ? !movieData.reaction : 0;

  return (
    <>
      <button
        style={{
          marginRight: "5px",
          backgroundColor: likeActive ? "green" : "unset",
        }}
        value={1}
        onClick={reactionClicked}
      >
        Like
      </button>
      <span style={{ marginRight: "10px" }}> {movieData.likes_count}</span>
      <button
        style={{
          marginRight: "5px",
          backgroundColor: dislikeActive ? "red" : "unset",
        }}
        value={0}
        onClick={reactionClicked}
      >
        Dislike
      </button>
      {movieData.dislikes_count}
    </>
  );
}

export default LikeDislike;
