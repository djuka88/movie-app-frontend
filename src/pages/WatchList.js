import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useGetWatchListQuery,
  useRemoveFromWatchListMutation,
  useWatchedMutation,
} from "../components/queries/movie";

function WathcList() {
  const { isLoading, error, data: watchList } = useGetWatchListQuery();
  const { mutate: updateWatchList, error: updateWatchListError } =
    useWatchedMutation();

  const { mutate: removeFromWatchList, error: removeFromWatchListError } =
    useRemoveFromWatchListMutation();

  const [checkedMovieIds, setCheckedMovieIds] = useState([]);

  const handleChecked = (movie_id) => {
    if (checkedMovieIds.includes(movie_id)) {
      setCheckedMovieIds((prev) => prev.filter((item) => item !== movie_id));
    } else {
      setCheckedMovieIds((prev) => [...prev, movie_id]);
    }
  };

  const { register, handleSubmit } = useForm();

  if (isLoading) {
    return (
      <div>
        <h3>Loading watch list...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h3>Error occured ...</h3>
      </div>
    );
  }

  return (
    <div>
      <form>
        <table style={{ marginTop: "20px" }}>
          <tbody>
            {watchList.map((info, index) => (
              <tr key={index}>
                <td>{index + 1}.</td>
                <td>
                  <img
                    src={info.movie.cover_image}
                    alt="Avatar"
                    style={{ width: "80px", height: "80px" }}
                  ></img>
                </td>
                <td>{info.movie.title}</td>
                <td>
                  <input
                    type="checkbox"
                    style={{ marginLeft: "30px" }}
                    defaultChecked={info.watched}
                    onClick={() => handleChecked(info.movie.id)}
                    key={info.id}
                  ></input>
                  Watched?
                </td>
                <td>
                  <a
                    href="#"
                    onClick={() => removeFromWatchList(info.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Remove
                  </a>
                </td>
                <td>
                  <input
                    type="hidden"
                    value={info.movie.id}
                    key={info.id}
                    {...register(`movieIds.${index}.movieId`)}
                  ></input>
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <button
                  type="submit"
                  onClick={handleSubmit(() => updateWatchList(checkedMovieIds))}
                >
                  Submit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default WathcList;
