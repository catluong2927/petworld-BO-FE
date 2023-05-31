import React, { useEffect , useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { checkAdminRole } from "../utils/checkAdminRole";


function AdminPrivateRoute({ roleName }) {
    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    const role = currentUser.userDtoResponse.userRoleDtos[0].roleDtoResponse.name;
    const isAdmin = checkAdminRole(role);
    if (roleName && !isAdmin) return <Navigate to="/dashboard/centers/owner" />;
    return currentUser ? <Outlet /> : <Navigate to="/center" />;
}

export default AdminPrivateRoute;
