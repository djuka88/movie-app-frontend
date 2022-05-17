import { Route, Routes, useNavigate, Navigate } from "react-router";
import { HOME_PAGE, LOGIN_PAGE, REGISTER_PAGE } from "../constants";
//import Login from "./Login";
import Register from "./Register";
//import Home from './Home';
import useAuth from "./hooks/useAuth";
import React, { Suspense, useEffect, useState } from "react";

const Home = React.lazy(()=> import('./Home'));
const Login = React.lazy(()=> import('./Login'));


const AuthProtection = ({ children, isOnlyForAuthUsers, isOnlyForGuests }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    //console.log('useEffects!');
    if (isOnlyForAuthUsers && !user) return navigate(LOGIN_PAGE);
    if (isOnlyForGuests && user) return navigate(HOME_PAGE);
  }, [user, isOnlyForAuthUsers, isOnlyForGuests]);

  return  <>{children}</>;
};

const ProtectedRouteWrapper = ({
  component: Loadable,
  isAuthenticated,
  isGuest,
}) => (
  <Suspense fallback={<>Loading...</>}>
    {/* {console.log(isAuthenticated)} */}
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
        path={HOME_PAGE}
        element={<ProtectedRouteWrapper component={Home} isAuthenticated />}
      />
      <Route
        path={REGISTER_PAGE}
        element={<ProtectedRouteWrapper component={Register} isGuest />}
      />
    </Routes>
  );
};

export default Router;
