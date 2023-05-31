import { ADMIN } from "../constants";

export const checkAdminRole = (roleName) => {
  if (roleName === ADMIN) return true;
  return false;
};
