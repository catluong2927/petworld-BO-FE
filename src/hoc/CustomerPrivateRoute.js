import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { checkCustomerRole } from "../utils/checkCustomerRole";
import DashboardLayout from '../layouts/dashboard/DashboardLayout';

function CustomerPrivateRoute() {
    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    const role =  currentUser.userDtoResponse.userRoleDtos.map(role => role.roleDtoResponse.name);
    const isCustomer = checkCustomerRole(role);
    // if (role && !isOwner) return <Navigate to="/dashboard/app" />;
    // return currentUser ? <Outlet /> : <Navigate to="/owner" />;

    if(currentUser && role && !isCustomer) {
        return <DashboardLayout />;
    }
    return <Navigate to='/login' />
}

export default CustomerPrivateRoute;
