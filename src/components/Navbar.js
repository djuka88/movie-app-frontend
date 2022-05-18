import { useLocation } from "react-router";
import { LOGIN_PAGE, REGISTER_PAGE } from "../constants";
import useAuth from "./hooks/useAuth";
import NavLink from "./NavLink";

function Navbar() {
  const location = useLocation();
  const { logout } = useAuth();

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

      {location.pathname !== REGISTER_PAGE &&
        location.pathname !== LOGIN_PAGE && (
          <NavLink name="Logout" onClick={logout} />
        )}
    </div>
  );
}

export default Navbar;
