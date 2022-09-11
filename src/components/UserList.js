import React, {useCallback, useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/AuthContext";

const UserList = ({active}) => {
    const auth = useContext(AuthContext)
    const [user, setUser] = useState();
    console.log(auth.auth_key)
    const getUser = useCallback(async () => {
        if (auth.auth_key !== null || auth.auth_key !== undefined) {
            const response = await fetch("https://api.sitemap-generator.ru/test-api/user", {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    "Authorization": `Bearer ${auth.auth_key}`
                }
            });
            const data = await response.json()
            setUser(data)
            console.log(user)
        }
    }, [auth.auth_key])

    useEffect(() => {
        getUser()
    }, [getUser, active])

    if(!user){
        return (
            <h5 className="center" >Зарегестрированных пользователей не найдено!</h5>
        )
    } else {
return (
    <div className="center" style={{margin:"20px 20% "}}>
        <div className="col s12 m6">
            <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                    <span className="card-title">Текущий пользователь</span>
                    <div><strong>Имя: <span>{user.name}</span></strong></div>
                    <div><strong>Email: <span>{user.email}</span></strong></div>
                    {user.phone
                        ?<div><strong>Номер: <span>{user.phone}</span></strong></div>
                        : ''
                        }
                </div>
            </div>
        </div>
    </div>

)
    }

};

export default UserList;