import { createContext, useContext, useMemo } from "react";
import authService from "../../services/AuthService";
import { useLoginMutation, useLogoutMutation, useRegisterMutation, useGetAuthenticatedUserQuery } from "../queries/auth";

const AuthContext = createContext({});

export function AuthProvider({children}) {

    const token  = authService.getAccessToken();
    const {
        data: user,
        isFetching: loading,
        error,
        isFetchedAfterMount: isUserLoaded
      } = useGetAuthenticatedUserQuery({
        enabled: !!token,
        refetchOnWindowFocus: false
    })

    const { mutate: login, error: loginError } = useLoginMutation();
    const { mutate: register, error: registerError } = useRegisterMutation();
    const { mutate: logout } = useLogoutMutation();

    const memoedValue = useMemo(()=>({
        user,
        loading,
        error,
        login,
        loginError,
        register,
        registerError,
        logout
    }),[user, loading, error, loginError, registerError])

    return(
        <AuthContext.Provider value={memoedValue}>
            {(!token || isUserLoaded) && children}
        </AuthContext.Provider>
    )
}

export default function useAuth(){
    return useContext(AuthContext)
}