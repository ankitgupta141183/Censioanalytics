import React, { useEffect, useState } from "react";
import { Redirect, Route , useHistory} from "react-router-dom";
import HeaderSidebar from "../CommonComponent/HeaderSidebar";
import HeaderComponent from "../CommonComponent/HeaderComponent/HeaderComponent";
import { Paths } from "./routePaths";
const PrivateRoute = (props) => {

  // const [isAuthenticated, setIsAuthenticated] = useState(false)
  // const [isAuthenticating, setIsAuthenticating] = useState(true)
  const { component: Component, userlogin,isAssessmentPage ,...rest } = props;
  const [isAssessmentRoute , setIsAssessmentRoute] = useState()
const history = useHistory()
  // let email = localStorage.getItem("email");
  // let isLogin = localStorage.getItem("isLogin");
  // let isAdmin = localStorage.getItem('isAdmin')
  // if (isAdmin === 'true') {
  //   isAdmin = true
  // }
  // else {
  //   isAdmin = false
  // }
  // const RoutingFunction = () => {
  //   try {
  //     if (email && isLogin) {
  //       setIsAuthenticated(true);
  //     }
  //     else {
  //       throw new Error("Something went wrong");
  //     }
  //   }
  //   catch (error) {
  //     // console.log("Error: ", error);
  //   }
  //   setIsAuthenticating(false);

  // }


  // useEffect(() => {
  //   RoutingFunction()
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []) 
  // if (isAuthenticating) {
  //   return null;
  // }

  useEffect(()=>{
    setIsAssessmentRoute(history.location.pathname)
  },[history.location.pathname])
  
  const assessmentRoutes = ['/assessment-dashboard','/assessment-instructions', '/assessment-welcome','/assessment-questions-list' , '/assessment-games']
  let token = sessionStorage.getItem("ssoToken")
  return <>
    {
      !userlogin?.admin && !userlogin?.udc_user && token ?
      <>
      {
        !assessmentRoutes.includes(isAssessmentRoute)  ? <HeaderSidebar /> : <HeaderComponent/>
       }
        
          <Route {...rest} render={props => {
            return (
              userlogin &&
              <Component {...props} isAssessmentPage={isAssessmentPage}/>

            )
          }} />
      
    </>
    : !userlogin?.admin && userlogin?.udc_user && token ?
    <Redirect to={Paths.upgradeDashboard} />
    : userlogin?.admin && !userlogin?.udc_user && token ?
    <Redirect to='/admin' />
    : <Redirect to={"/"} />
        

    }
  </>
}

export default PrivateRoute;
