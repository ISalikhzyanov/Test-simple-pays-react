import {createContext} from "react";
function noop(){}
export const AuthContext = createContext({
    auth_key: null,
    userId: null,
    login: noop,
    logout:noop,
    isAuthenticated: false
})