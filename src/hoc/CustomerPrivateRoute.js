import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { checkCustomerRole } from "../utils/checkCustomerRole";
import DashboardLayout from '../layouts/dashboard/DashboardLayout';

function CustomerPrivateRoute() {
    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    const role =  currentUser.userDtoResponse.userRoleDtos.map(role => role.roleDtoResponse.name);
    const isCustomer = checkCustomerRole(role);
    if(currentUser && role && !isCustomer) {
        return <DashboardLayout />;
    }
    return <Navigate to='/login' />
}

export default CustomerPrivateRoute;
