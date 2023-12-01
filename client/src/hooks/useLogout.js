import { useAuthContext } from "./useAuthContext"
import { useComplaintsContext } from "./useComplaintsContext"

export const useLogout = () => {    
    const { dispatch } = useAuthContext()
    const { dispatch:complaintsDispatch } = useComplaintsContext()
    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
        complaintsDispatch({type: 'SET_WORKOUTS',payload:null})
    }
    return {logout}
}