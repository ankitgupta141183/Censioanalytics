import React from "react"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { Container, Icon } from "semantic-ui-react"
const BreadCrumb = () => {
    // { step0, step1, step2, link, step3, step4, step5, tab, step }
    const location = useLocation()
    const {profileReducer , sidebarHoverReducer} = useSelector(state =>  state)

    const  {profileDetail} =  profileReducer
    // console.log(location);

    // console.log("sidebarHoverReducer",)

    return (
        <div id={sidebarHoverReducer.isHover ? "udc-breadcrumb-small" : "udc-breadcrumb"} className={profileDetail?.data?.user?.udc_user  ? "bg-breadcrumb udc" :"bg-breadcrumb"} style={profileDetail?.data?.user.udc_user ? { top : "-56px"}  : {top : "25px"}}>
        <Container className={`${profileDetail?.data?.user?.udc_user && "bg-breadcrumb-container"}`}>
            <div className="ui breadcrumb">
                <Link to={(location.pathname !== "/dashboard") ? "/" : "#"} className="section"><Icon name="home" />Home</Link>
                {
                    location.pathname === "/instructions" &&
                    <>
                        <i className="right angle icon divider"></i>
                        <Link to={"#"} className="section">Instructions</Link>
                    </>
                }
                 {
                    location.pathname === "/instructions" &&
                    <>
                        <i className="right angle icon divider"></i>
                        <Link to={"#"} className="section">Instructions</Link>
                    </>
                }
                {
                    location.pathname === "/welcome" &&
                    <>
                        <i className="right angle icon divider"></i>
                        <Link to={"#"} className="section">Welcome</Link>
                    </>
                }
                {
                    location.pathname.includes("/user-question") && <>
                        <i className="right angle icon divider"></i>
                        <Link to={"/welcome"} className="section">Welcome</Link>
                        <i className="right angle icon divider"></i>
                        <Link to={"#"} className="section">Assessment</Link>
                    </>
                }
                {
                    location.pathname === "/games" &&
                    <>
                        <i className="right angle icon divider"></i>
                        <Link to={"#"} className="section">Games</Link>
                    </>
                }
              
            </div>
        </Container>
        </div>
    )
}

export default BreadCrumb