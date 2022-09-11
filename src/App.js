import React from 'react';
import "materialize-css"
import {useRoutes} from "./routes";
import {BrowserRouter} from "react-router-dom";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import NavLinks from "./components/NavLinks";

const App = () => {
    const {auth_key,login, logout, userId} = useAuth()
    const isAuthenticated = !!auth_key
    const routes = useRoutes(isAuthenticated)
    return (
        <AuthContext.Provider value={{
            auth_key, login, logout , userId, isAuthenticated
        }}>
        <BrowserRouter>
            <NavLinks/>
        <div>
            {routes}
        </div>
        </BrowserRouter>
        </AuthContext.Provider>
    );
};

export default App;