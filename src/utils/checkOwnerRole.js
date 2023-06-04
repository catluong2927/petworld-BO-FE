import { OWNER } from "../constants";

export const checkOwnerRole = (roleName) => {
    if (roleName.includes(OWNER)) return true;
    return false;
};
