import { useQuery, useMutation, useQueryClient } from 'react-query'
import authService from '../../services/AuthService'
import { useNavigate } from 'react-router-dom';
import { HOME_PAGE, LOGIN_PAGE } from '../../constants';

const AUTH_USER_QUERY_KEY = 'authenticated_user'

export const useGetAuthenticatedUserQuery = (queryOptions) =>
    useQuery(
        AUTH_USER_QUERY_KEY,
        authService.fetchAuthenticatedUser,
        queryOptions
    )

    export const useLoginMutation = () => {
        const queryClient = useQueryClient()
        const navigate = useNavigate()
        return useMutation(authService.login, {
          onSuccess: async () => {
            await queryClient.refetchQueries([AUTH_USER_QUERY_KEY])
            navigate(HOME_PAGE, { replace: true })
          }
        })
      }
      
      export const useRegisterMutation = () => {
        const navigate = useNavigate()
        return useMutation(authService.register, {
          onSuccess: () => navigate(HOME_PAGE, { replace: true })
        })
      }

export const useLogoutMutation = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation(authService.logout, {
        onSuccess: () => {
        queryClient.setQueryData(AUTH_USER_QUERY_KEY, null)
        navigate(LOGIN_PAGE, { replace: true })
        }
    })
}