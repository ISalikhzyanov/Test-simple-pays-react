import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import UpdatePage from "./pages/UpdatePage";

export const useRoutes = isAuthenticated => {
    if(isAuthenticated){
        return(
            <Routes>
                <Route path="/create" element={<CreatePage/>} exact/>
                <Route path="/update" element={<UpdatePage/>} exact/>
                <Route path="*" element={<Navigate to="/create" replace/>}/>
            </Routes>
        )
    } return (
        <Routes>
            <Route path="/create" element={<CreatePage/>} exact/>
            <Route path="*" element={<Navigate to="/create" replace/>}/>
        </Routes>
    )
}