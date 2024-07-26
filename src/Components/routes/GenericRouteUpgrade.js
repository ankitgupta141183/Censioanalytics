import React, { useState, useEffect } from "react";
import GenericHeader from "../GenericComponents/GenericHeader/GenericHeader";
import GenericSidebar from '../GenericComponents/GenericSideBar/GenericSideBar'
import { Redirect, Route } from "react-router-dom";
import { getProfileDetail } from '../../Actions/ProfileAction';
import { useDispatch } from 'react-redux'
import { Paths } from "./routePaths";
const GenericRouteUpgrade = (props) => {
    const { component: Component, userlogin, ...rest } = props;
    let token = sessionStorage.getItem("ssoToken")
    const [isHeaderManu, setIsHeaderManu] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)
    const assessmentUser = sessionStorage.getItem('assessmentUserId')
    const isPublicUser = JSON.parse(sessionStorage.getItem('isPublicUser'))
    const isGenericUser = JSON.parse(sessionStorage.getItem('isGenericUser'))
    const userAdminRole = sessionStorage.getItem('userRole')
    const dispatch = useDispatch()
    useEffect(() => {
        // dispatch(getProfileDetail())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
         token && assessmentUser == null && !isPublicUser && isGenericUser && userAdminRole !== "super_admin" && userAdminRole !== "udc_admin" ?
            <>
                <GenericHeader setIsHeaderManu={setIsHeaderManu} />
                <GenericSidebar isHeaderManu={isHeaderManu} setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />

                <Route {...rest} render={props => {
                    return (
                        <Component {...props} isHeaderManu={isHeaderManu} isDarkMode={isDarkMode} />
                    )
                }} />
            </> :  token && assessmentUser == null && !isPublicUser && !isGenericUser && userAdminRole !== "super_admin" && userAdminRole !== "udc_admin" ?
                <Redirect to={Paths.upgradeDashboard} /> :
                 token && assessmentUser && isPublicUser && !isGenericUser && userAdminRole !== "super_admin" && userAdminRole !== "udc_admin" ?
                    <Redirect to='/assessment-dashboard' />
                    : userAdminRole === "super_admin" && token && isGenericUser ?
                        <Redirect to='/admin' />
                        : userAdminRole === "udc_admin" && token && !isGenericUser ?
                            <Redirect to={"/university-dashboard"} />
                            : <Redirect to={"/"} />

    )
}


export default GenericRouteUpgrade

