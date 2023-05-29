import { OWNER } from "../constants";

export const checkOwnerRole = (roleName) => {
    console.log(roleName.includes(OWNER))
    if (roleName.includes(OWNER)) return true;
    return false;
};
