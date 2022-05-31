import { Route, Routes, useNavigate } from "react-router";
import { HOME_PAGE, LOGIN_PAGE, REGISTER_PAGE, CREATE_MOVIE_PAGE, MOVIE_PAGE } from "../constants";
import useAuth from "./hooks/useAuth";
import React, { Suspense, useEffect } from "react";


const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));
const CreateMovie = React.lazy(()=>import("../pages/AddMovie"));
const Movie = React.lazy(()=>import("../pages/Movie"));

const AuthProtection = ({ children, isOnlyForAuthUsers, isOnlyForGuests }) => {
  const navigate = useNavigate();
  const { user } = useAuth();



  useEffect(() => {
    if (isOnlyForAuthUsers && !user) return navigate(LOGIN_PAGE);
    if (isOnlyForGuests && user) return navigate(HOME_PAGE);
  }, [user, isOnlyForAuthUsers, isOnlyForGuests]);

  return <>{children}</>;
};

const ProtectedRouteWrapper = ({
  component: Loadable,
  isAuthenticated,
  isGuest,
}) => (
  <Suspense fallback={<>Loading...</>}>
    {isAuthenticated && (
      <AuthProtection isOnlyForAuthUsers>
        <Loadable />
      </AuthProtection>
    )}

    {isGuest && (
      <AuthProtection isOnlyForGuests>
        <Loadable />
      </AuthProtection>
    )}

    {!isAuthenticated && !isGuest && <Loadable />}
  </Suspense>
);

export const Router = () => {
  return (
    <Routes>
      <Route
        path={LOGIN_PAGE}
        element={<ProtectedRouteWrapper component={Login} isGuest />}
      />
      <Route
        exact path={MOVIE_PAGE}
        element={<ProtectedRouteWrapper component={Movie} isAuthenticated />}
      />
      <Route
        path={HOME_PAGE}
        element={<ProtectedRouteWrapper component={Home} isAuthenticated />}
      />
      <Route
        path={REGISTER_PAGE}
        element={<ProtectedRouteWrapper component={Register} isGuest />}
      />
      <Route
        path={CREATE_MOVIE_PAGE}
        element={<ProtectedRouteWrapper component={CreateMovie} isAuthenticated />}
      />
    </Routes>
  );
};

export default Router;
