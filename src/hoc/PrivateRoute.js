import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { checkAdminRole } from "../utils/checkAdminRole";
import { checkOwnerRole } from "../utils/checkOwnerRole";
import { checkSellerRole } from "../utils/checkSellerRole";

function PrivateRoute({ roleName }) {
    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    const role = currentUser.userDtoResponse.userRoleDtos.map(role => role.roleDtoResponse.name);
    const isAdmin = checkAdminRole(role);
    const isOwner = checkOwnerRole(role);
    const isSeller = checkSellerRole(role);
    if (roleName && isAdmin) return <Outlet />;
    if (roleName && isOwner) return <Outlet />;
    if (roleName && isSeller) return <Outlet />;
    return <Navigate to="/" />;
}

export default PrivateRoute;
