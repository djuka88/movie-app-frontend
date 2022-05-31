import c from "classnames";

function LikeDislike({likes,dislikes,likeActive,dislikeActive}){
    const handleLike = () => {
        if (dislikeActive) {
            this.setLike();
            this.setDislike();
          }
          this.setLike();
    }

    const handleDislike = () => {

    }

    return(
        <>
        <button
            onClick={handleLike}
            className={c({['active']:likeActive})}
        >
            {likes}
        </button>

        <button
        onClick={handleDislike}
        className={c({['active']:dislikeActive})}
        >
            {dislikes}
        </button>
    </>
    )
}

export default LikeDislike;