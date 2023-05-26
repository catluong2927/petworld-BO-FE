import React, { useEffect , useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { checkOwnerRole } from "../utils/checkOwnerRole";

function OwnerPrivateRoute({ roleName }) {
    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    const role =  currentUser.userDtoResponse.userRoleDtos.map(role => role.roleDtoResponse.name);
    const isOwner = checkOwnerRole(role);
    if (roleName && !isOwner) return <Navigate to="/" />;
    return currentUser ? <Outlet /> : <Navigate to="/center" />;
}

export default OwnerPrivateRoute;
