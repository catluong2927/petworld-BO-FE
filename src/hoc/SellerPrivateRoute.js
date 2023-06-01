import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { checkSellerRole } from "../utils/checkSellerRole";

function SellerPrivateRoute({ roleName }) {
    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    const role =  currentUser.userDtoResponse.userRoleDtos.map(role => role.roleDtoResponse.name);
    const isSeller = checkSellerRole(role);
    if (roleName && !isSeller) return <Navigate to="/" />;
    return currentUser ? <Outlet /> : <Navigate to="/package" />;
}

export default SellerPrivateRoute;
