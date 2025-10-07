import { menuItemsByRole } from "./constant";

export const business = ({ xTenant }) => {
  console.log(xTenant.role);
  console.log("xTenant no business", menuItemsByRole[xTenant.role]);
  return menuItemsByRole[xTenant.role] || [];
};
