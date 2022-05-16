import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router";

function LoginRedirect(){

    const currentUser = useSelector((state) => state.currentUser.value);
    const location = useLocation();

    return(
        <>
            { (currentUser && !location.pathname==='/home') ? 
            (
                <Navigate replace to="/home" />
            ):
            (
                <>
                {!(location.pathname === '/login') ? (<Navigate replace to="/login" />) : (<></>)}
                </>
            )
            }
        </>
    );
}

export default LoginRedirect;