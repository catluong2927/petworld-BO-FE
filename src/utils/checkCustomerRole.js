import { CUSTOMER } from "../constants";

export const checkCustomerRole = (roleName) => {
    if (roleName.includes(CUSTOMER)) return true;
    return false;
};
