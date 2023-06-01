import { SELLER } from "../constants";

export const checkSellerRole = (roleName) => {
    if (roleName.includes(SELLER)) return true;
    return false;
};
