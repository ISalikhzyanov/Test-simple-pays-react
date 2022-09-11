import {useCallback, useEffect, useState} from "react";
const storageName = 'userData'
export const useAuth = ()=>{
    const [auth_key,setAuth_key] = useState(null)
    const [userId,setUserId] = useState(null)

    const login = useCallback((token,id)=>{
        setAuth_key(token)
        setUserId(id)
        localStorage.setItem(storageName, JSON.stringify({
            userId:id, auth_key:token}))
    },[])
const logout = useCallback(()=>{
    setAuth_key(null)
    setUserId(null)
    localStorage.removeItem(storageName)
},[])

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem(storageName))

        if(data && data.auth_key){
            login(data.auth_key, data.name)
        }
    },[login])

    return {login, logout,auth_key,userId}
}