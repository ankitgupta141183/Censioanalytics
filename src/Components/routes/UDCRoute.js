import React from "react";
import { Redirect, Route } from "react-router-dom";
import HeaderSidebar from "../CommonComponent/HeaderSidebar";
const UDCRoute = (props) => {
  const { component: Component, userlogin, ...rest } = props;
  console.log({userlogin:userlogin}, "rest");
  let token = sessionStorage.getItem("ssoToken")
  console.log(token, "token");
  return (
    <>
      {
        userlogin && !userlogin?.admin && userlogin?.udc_user && token ?
          <>
            <HeaderSidebar />
            <Route {...rest} render={props => {
                console.log("this is props component",props)
              return (
                userlogin &&
                <Component {...props} />
              )
            }} />
          </>
          :  userlogin && !userlogin?.admin && !userlogin?.udc_user && token ?
            <Redirect to='/dashboard' />
            : userlogin && userlogin?.admin && !userlogin?.udc_user && token ?
              <Redirect to='/admin' />
              : <Redirect to={"/"} />


      }

    </>
  )
}

export default UDCRoute;

// //isAuthenticated && !isAdmin ? (
//     <>
//       <HeaderSidebar />
//       <Route {...rest} render={props => (
//         <Component {...props} />
//       )} />
//       {/* <FooterComponent /> */}
//     </>
//   ) :
//     isAuthenticated && isAdmin ? (
//       <Redirect to='/admin' />
//     ) :
//       (
//         <Redirect to="/" />
//       );
