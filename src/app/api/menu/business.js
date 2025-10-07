import { menuItemsByRole } from "./constant";

export const business = ({ xTenant }) => {
  return menuItemsByRole[xTenant.role] || [];
};
