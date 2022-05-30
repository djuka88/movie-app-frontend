import { useCallback, useState } from "react";
import useAuth from "../components/hooks/useAuth";
import Movies from "../components/Movies";
import debounce from "lodash.debounce";
import { useGetAllGenresQuery } from "../components/queries/movie";

function Home() {
  const { user } = useAuth();
  const [filters, setFilters] = useState({});
  const { isLoading, error, data: genres } = useGetAllGenresQuery();

  const handleSearch = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: event.target.value,
      page: 1,
    }));
  };

  const debouncedChangeHandler = useCallback(debounce(handleSearch, 750), []);

  const handleGenreFilter = (event) => {
    const selectedGenreId = event.target.value;
    let genreFilter = filters.genres || [];

    if (genreFilter.includes(selectedGenreId)) {
      genreFilter = genreFilter.filter((item) => item !== selectedGenreId);
    } else {
      genreFilter = [...genreFilter, selectedGenreId];
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      genres: genreFilter,
      page: 1,
    }));
  };

  if (isLoading) {
    return (
      <div>
        <h3>Loading genres...</h3>
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
      {user && (
        <>
          <div className="search-container">
            <label htmlFor="search">Search by title</label>
            <input
              name="search"
              type="text"
              onChange={debouncedChangeHandler}
              style={{ width: "400px" }}
            ></input>
          </div>
          <div className="main-container">
            <div className="filter-container">
              <h3>Filters</h3>
              <fieldset>
                <legend>Genre</legend>
                {genres.map((c) => (
                  <label key={c.id}>
                    <input
                      type="checkbox"
                      value={c.id}
                      name="genre_ids"
                      onClick={handleGenreFilter}
                    />
                    {c.name}
                  </label>
                ))}
              </fieldset>
            </div>
            <Movies filters={filters} changeFilters={setFilters} />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
