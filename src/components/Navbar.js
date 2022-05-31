import { useLocation, useNavigate } from "react-router";
import { LOGIN_PAGE, REGISTER_PAGE, CREATE_MOVIE_PAGE, HOME_PAGE } from "../constants";
import useAuth from "./hooks/useAuth";
import NavLink from "./NavLink";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  function reloadHomePage(){
    navigate(HOME_PAGE);
    window.location.reload(true);
  }

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
          <NavLink name="Add movie" href={CREATE_MOVIE_PAGE} style={{float:"left"}}/>
          <NavLink name="All movies" href={HOME_PAGE} style={{float:"left"}} /*onClick={reloadHomePage}*//>
        </>
      )}
    </div>
  );
}

export default Navbar;
