import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import UniversityAdminHeader from "../UpgradeUniversityAdminComponents/UniversityAdminHeader/UniversityAdminHeader";
import UniversityAdminSidebar from "../UpgradeUniversityAdminComponents/UniversityAdminSidebar/UniversityAdminSidebar";
import { Paths } from "./routePaths";
import { getProfileDetail } from '../../Actions/ProfileAction';
import { useDispatch } from 'react-redux'


const UpgradeUniversityRoute = (props) => {
    const [isHeaderManu, setIsHeaderManu] = useState(false)
    const { component: Component, userlogin, ...rest } = props;
    const userAdminRole = sessionStorage.getItem('userRole')
    let token = sessionStorage.getItem("ssoToken")
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfileDetail())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  

    return (
        <>
            {
                userAdminRole === "udc_admin" &&  token ?
                    <>
                        <UniversityAdminHeader setIsHeaderManu={setIsHeaderManu} />
                        <UniversityAdminSidebar isHeaderManu={isHeaderManu} />
                        <Route {...rest} render={props => {
                            return (
                                <Component {...props} isHeaderManu={isHeaderManu} />
                            )
                        }} />
                    </>
                    : userAdminRole !== "super_admin" && userAdminRole !== "udc_admin" && token ?
                        <Redirect to={Paths.upgradeDashboard} />
                        : userAdminRole !== "super_admin" && userAdminRole !== "udc_admin" && token ?
                            <Redirect to={Paths.upgradeDashboard} />
                            : userAdminRole === "super_admin" && token ?
                                <Redirect to={"/admin"} />
                                : <Redirect to={"/"} />
            }
        </>
    )
}

export default UpgradeUniversityRoute;


