import React from "react";
import { Redirect, Route } from "react-router-dom";
import HeaderSidebar from "../CommonComponent/HeaderSidebar";
import { Paths } from "./routePaths";

const AdminRoute = (props) => {

  const { component: Component, userlogin, ...rest } = props;
  const userAdminRole = sessionStorage.getItem('userRole')
  let token = sessionStorage.getItem("ssoToken")
  
  return <>
    {
      userAdminRole === "super_admin"  && token ?
        <>
          <HeaderSidebar />
          <Route  {...rest} render={props => (
            <Component {...props} />
          )} />
        </>
        : userAdminRole !== "super_admin" && userAdminRole !== "udc_admin"  && token ?
          <Redirect to={Paths.upgradeDashboard} />
          : userAdminRole !== "super_admin" && userAdminRole !== "udc_admin" &&  token ?
            <Redirect to={Paths.upgradeDashboard} />
            : userAdminRole === "udc_admin" && token ?
              <Redirect to={"/university-dashboard"} />
              : <Redirect to={"/"} />
    }
  </>
}
export default AdminRoute;
