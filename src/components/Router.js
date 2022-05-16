import { Route, Routes, useNavigate, Navigate } from "react-router";
import { HOME_PAGE, LOGIN_PAGE, REGISTER_PAGE } from '../constants';
import App from "../App";
import Login from "./Login";
import Register from "./Register";
import Home from './Home';
import useAuth from "./hooks/useAuth";
import { Suspense, useEffect } from "react";

const AuthProtection = ({ children, isOnlyForAuthUsers, isOnlyForGuests }) => {

    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(()=>{
        if(isOnlyForAuthUsers && !user) return navigate(LOGIN_PAGE);
        if(isOnlyForGuests && user) return navigate(HOME_PAGE);
    },[user, isOnlyForAuthUsers, isOnlyForGuests])

    return(
        <>
            {children}
        </>
    )
}

const ProtectedRouteWrapper = ({ 
    component: Loadable, 
    isAuthenticated, 
    isGuest }) => (
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
        )

export const Router = () => {
    return(
        <Routes>
            <Route 
                exact path={HOME_PAGE}
                element={<ProtectedRouteWrapper component={Home} isAuthenticated />}
            />

            <Route
                exact path={LOGIN_PAGE}
                element={<ProtectedRouteWrapper component={Login} isGuest/>}
            />

            <Route
                exact path={REGISTER_PAGE}
                element={<ProtectedRouteWrapper component={Register} isGuest/>}
            />

            <Route path="*" element={<ProtectedRouteWrapper component={Home} isAuthenticated/>} />

        </Routes>
    );
}

export default Router;