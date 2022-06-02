import {
  useAddMovieMutation,
  useGetAllGenresQuery,
} from "../components/queries/movie";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import "./AddMovie.css";

function AddMovie() {
  const { isLoading, error, data: genres } = useGetAllGenresQuery();
  const { mutate: addMovie, error: addMovieError } = useAddMovieMutation();

  const schema = yup.object({
    title: yup.string().required(),
    cover_image: yup.string().required(),
    description: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  if (isLoading) {
    return (
      <div>
        <h3>Loading genres...</h3>
      </div>
    );
  }

  return (
    <div>
      <h1>Add new movie</h1>
      <form className="form">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          placeholder="Title..."
          {...register("title")}
        />
        <p>{errors.title?.message}</p>

        <label htmlFor="cover_image">Url to cover:</label>
        <input
          type="text"
          name="cover_image"
          placeholder="Url to a picture..."
          {...register("cover_image")}
        />
        <p>{errors.cover_image?.message}</p>

        <label htmlFor="description">Description:</label>
        <textarea
          type="text"
          name="description"
          placeholder="Description..."
          rows={8}
          {...register("description")}
        ></textarea>
        <p>{errors.description?.message}</p>

        <fieldset>
          <legend>Genre</legend>
          {genres.map((c) => (
            <label key={c.id}>
              <input
                type="checkbox"
                value={c.id}
                name="genre_ids"
                {...register("genre_ids")}
              />
              {c.name}
            </label>
          ))}
        </fieldset>
        <p>{errors.genre?.message}</p>

        <input type="submit" onClick={handleSubmit(addMovie)} />
      </form>
    </div>
  );
}

export default AddMovie;
