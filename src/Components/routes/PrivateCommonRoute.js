import React from "react";
import { Redirect, Route } from "react-router-dom";
import HeaderSidebar from "../CommonComponent/HeaderSidebar";
const PrivateCommonRoute = (props) => {

    const { component: Component, userlogin, ...rest } = props;
    let token = sessionStorage.getItem("ssoToken")
    
   
    return <>
        {
            !userlogin?.admin && token ?
                <>
                    <HeaderSidebar />
                    <Route {...rest} render={props => {
                        return (
                            userlogin &&
                            <Component {...props} />
                        )
                    }} />

                </>
                : userlogin?.admin && token ?
                    <Redirect to='/admin' />
                    : <Redirect to={"/"} />


        }
    </>
}

export default PrivateCommonRoute;
