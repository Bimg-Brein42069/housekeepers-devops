import { useState } from "react";
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isloading, setIsloading] = useState(null)
    const { dispatch } = useAuthContext();

    const signup = async (name,email,roomno,password) => {
        setIsloading(true)
        setError(null)

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name,email,roomno,password})
        })

        const json = await response.json()

        if(!response.ok){
            setIsloading(false)
            setError(json.error)
        }
        if(response.ok){
            //save user to local storage
            localStorage.setItem('user',JSON.stringify(json))

            //update auth-context
            dispatch({type: 'LOGIN' , payload:json})

            setIsloading(false)
        }
    }

    return { signup,isloading,error }
}