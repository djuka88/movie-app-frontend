import { useContext } from "react";
import { useLocation } from "react-router";
import { FilterContext } from "../App";
import {
  LOGIN_PAGE,
  REGISTER_PAGE,
  CREATE_MOVIE_PAGE,
  HOME_PAGE,
} from "../constants";
import useAuth from "./hooks/useAuth";
import NavLink from "./NavLink";

function Navbar() {
  const location = useLocation();
  const { logout } = useAuth();

  const [, setFilters, , setSearchField, , setGenresCheckboxes] =
    useContext(FilterContext);

  const handleHomePage = () => {
    setFilters({});
    setSearchField("");
    setGenresCheckboxes([]);
  };

  return (
    <div
      style={{ display: "block", background: "lightgray", overflow: "hidden" }}
    >
      {location.pathname === LOGIN_PAGE && (
        <NavLink href={REGISTER_PAGE} name="Register" />
      )}

      {location.pathname === REGISTER_PAGE && (
        <NavLink href={LOGIN_PAGE} name="Login" />
      )}

      {location.pathname !== REGISTER_PAGE && location.pathname !== LOGIN_PAGE && (
        <>
          <NavLink name="Logout" onClick={logout} />
          <NavLink
            name="Add movie"
            href={CREATE_MOVIE_PAGE}
            style={{ float: "left" }}
          />
          <NavLink
            name="All movies"
            href={HOME_PAGE}
            style={{ float: "left" }}
            onClick={handleHomePage}
          />
        </>
      )}
    </div>
  );
}

export default Navbar;
