import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "semantic-ui-css/semantic.min.css";
import { Menu, Image } from 'semantic-ui-react'
import './sidebar.scss';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
// import { ShowGameLink } from "../../Actions/componentActions";
import favLogoIMage from "../../assets/img/censio_favicon.png"
import { sidebarStaticData } from '../../StaticData/AdminStaticData'
import { trueSidebarHoverAction } from "../../Actions/UdcSidebarAction/sidebarHoverAction"

export default function SidebarComponent({ visible, setVisible }) {
    const { profileReducer } = useSelector(state => state)
    const { profileDetail } = profileReducer
    const location = useLocation()
    const dispatch = useDispatch()

    const [activeItem, setActiveItem] = useState(location.pathname)

    useEffect(() => {
        // if (sessionStorage.getItem('isActiveItem')) {
        //     let result = sessionStorage.getItem('isActiveItem')
        //     console.log({ sessionStorageIsactiveItem: result })
        //     setActiveItem(sessionStorage.getItem('isActiveItem'))
        // }
        setActiveItem(location.pathname)
    }, [location])
    const handleItemClick = (type) => {
        setActiveItem(type)
        // sessionStorage.setItem('isActiveItem', type)
        // dispatch(ShowGameLink(""))
    }

    const handleHoverTrue = (type) => {
        if (profileDetail?.data?.user?.udc_user) {
            dispatch(trueSidebarHoverAction(type))
        }
    }

    const handleHoverfalse = (type) => {
        if (profileDetail?.data?.user?.udc_user) {
            dispatch(trueSidebarHoverAction(type))
        }
    }


    // const handleClick = (type) => {
    //     return history.push("/get-user-info")
    // }
    const isAdmin = sessionStorage.getItem("isAdmin") === "true" ? true : false
    return (
        <div className={`${profileDetail?.data?.user?.udc_user && "UDC_Sidebar"}`}>
            <Menu
                secondary
                vertical
                className="sidebar-inner"
                onMouseEnter={() => { handleHoverTrue(true) }}
                onMouseLeave={() => { handleHoverfalse(false) }}
            >


                {
                    profileDetail?.data?.user?.admin ? <>
                        {/* <Menu.Item
                            name='Dashboard'
                            active={activeItem === "/admin"}
                            onClick={() => handleItemClick("/admin")}
                            as={Link}
                            to={isAdmin ? "/admin" : "/newdashboard"}

                            className={` nav-item ${activeItem === "/admin" && "active"}`} title='Home'
                        >
                            <i className="home icon sidebar-menu-icon"></i>Assessments Dashboard

                        </Menu.Item> */}
                        {
                            sidebarStaticData.map((manuItems) => {
                                return (
                                    <Menu.Item
                                        name={manuItems.manuName}
                                        active={activeItem === manuItems.path}
                                        onClick={() => handleItemClick(manuItems.path)}
                                        as={Link}
                                        to={isAdmin ? manuItems.path : "/newdashboard"}

                                        className={` nav-item ${activeItem === manuItems.path && "active"}`} title='Home'
                                    >
                                        <i className={manuItems.iconName}></i>{manuItems.listName}

                                    </Menu.Item>
                                )
                            })
                        }
                        {/* <Menu.Item
                            name='Reporting'
                            active={activeItem === "/reporting/assessment"}
                            onClick={() => handleItemClick("/reporting/assessment")}
                            as={Link}
                            to={"/reporting/assessment"}

                            className={` nav-item ${activeItem === "/reporting/assessment" && "active"}`} title='Reporting'
                        >
                            <i className="file alternate icon sidebar-menu-icon"></i>Assessments Reporting

                        </Menu.Item>
                        <Menu.Item
                            name='Dashboard'
                            active={activeItem === "/admin/game_dashboard"}
                            onClick={() => handleItemClick("/admin/game_dashboard")}
                            as={Link}
                            to={"/admin/game_dashboard"}

                            className={` nav-item ${activeItem === "/admin/game_dashboard" && "active"}`} title='Home'
                        >
                            <i className="game icon sidebar-menu-icon"></i>Games Dashboard

                        </Menu.Item>
                        <Menu.Item
                            name='Dashboard'
                            active={activeItem === '/reporting/games'}
                            onClick={() => handleItemClick("/reporting/games")}
                            as={Link}
                            to={"/reporting/games"}

                            className={` nav-item ${activeItem === '/reporting/games' && "active"}`} title='Home'
                        >
                            <i className="newspaper icon sidebar-menu-icon"></i>Games Reporting

                        </Menu.Item>
                        <Menu.Item
                            name='New Registration'
                            active={activeItem === '/recent_registrations'}
                            onClick={() => handleItemClick("/recent_registrations")}
                            as={Link}
                            to={"/recent_registrations"}

                            className={` nav-item ${activeItem === '/recent_registrations' && "active"}`} title='Home'
                        >
                            <i className="edit icon sidebar-menu-icon"></i>New Registrations

                        </Menu.Item>
                        <Menu.Item
                            name='Researchers'
                            active={activeItem === '/researchers'}
                            onClick={() => handleItemClick("/researchers")}
                            as={Link}
                            to={"/researchers"}

                            className={` nav-item ${activeItem === '/researchers' && "active"}`} title='Home'
                        >
                            <i className="searchengin icon sidebar-menu-icon"></i>Researchers

                        </Menu.Item>
                        <Menu.Item
                            name='SurveyData'
                            active={activeItem === '/survey-data'}
                            onClick={() => handleItemClick("/survey-data")}
                            as={Link}
                            to={"/survey-data"}

                            className={` nav-item ${activeItem === '/survey-data' && "active"}`} title='Home'
                        >
                            <i className="table icon sidebar-menu-icon"></i>Survey Data

                        </Menu.Item>
                        <Menu.Item
                            name='SurveyData'
                            active={activeItem === '/games-data'}
                            onClick={() => handleItemClick("/games-data")}
                            as={Link}
                            to={"/games-data"}

                            className={` nav-item ${activeItem === '/games-data' && "active"}`} title='Home'
                        >
                            <i className="calendar alternate  icon sidebar-menu-icon"></i>
                            Games Data

                        </Menu.Item> */}

                    </>
                        : profileDetail?.data?.user?.udc_user ?
                            <>
                                <div
                                    name='Dashboard'
                                    active={activeItem === '/UDC/dashboard'}
                                    onClick={() => handleItemClick("/UDC/dashboard")}
                                    // as={Link}
                                    to={"/UDC/dashboard"}
                                    className="p-2"
                                // className={`  ${activeItem === '/UDC/dashboard' && "active"}`} title='Home'
                                >
                                    <Image src={favLogoIMage} alt="favImage" style={{ width: '35px', margin: 'auto' }} />
                                    {/* <i className="home icon sidebar-menu-icon"></i> Dashboard */}

                                </div>
                                <div className="pt-5 text-center">
                                    <Menu.Item
                                        name='Dashboard'
                                        active={activeItem === '/UDC/dashboard'}
                                        onClick={() => handleItemClick("/UDC/dashboard")}
                                        as={Link}
                                        to={"/UDC/dashboard"}
                                        className="bg-transparent"
                                        title="Dashboard"
                                    // className={` nav-item ${activeItem === '/UDC/dashboard' && "active"}`} title='Home'
                                    // className={`nav-item ${activeItem === '/UDC/dashboard' && "active"}`} 
                                    >
                                        <i className="home icon sidebar-menu-icon" style={{ float: 'none' }}></i>
                                        <span>Dashboard</span>
                                    </Menu.Item>
                                    <Menu.Item
                                        name='Learning-Programs'
                                        active={activeItem === '/udc-web-assessment'}
                                        onClick={() => handleItemClick("/udc-web-assessment")}
                                        as={Link}
                                        to={"/udc-web-assessment"}
                                        className="bg-transparent"

                                    // className={`nav-item ${activeItem === '/udc-web-assessment' && "active"}`}
                                    >

                                        {/* <i className="student icon sidebar-menu-icon"></i> Web Assessment */}
                                        <i className="student icon sidebar-menu-icon" style={{ float: 'none' }}></i>
                                        <span>Web Assessment</span>
                                    </Menu.Item>
                                </div>
                            </>
                            : <>
                                <Menu.Item
                                    name='Dashboard'
                                    active={activeItem === '/dashboard'}
                                    onClick={() => handleItemClick("/dashboard")}
                                    as={Link}
                                    to={"/dashboard"}

                                    className={` nav-item ${activeItem === '/dashboard' && "active"}`} title='Home'
                                >
                                    <i className="home icon sidebar-menu-icon"></i> Dashboard

                                </Menu.Item>
                                <Menu.Item
                                    name='Learning-Programs'
                                    active={activeItem === 'Learning-Programs'}
                                    onClick={() => handleItemClick("/web-assessment")}
                                    as={Link}
                                    to={"/web-assessment"}
                                    className={`nav-item ${activeItem === '/web-assessment' && "active"}`}
                                >
                                    <i className="student icon sidebar-menu-icon"></i> Web Assessment
                                </Menu.Item>

                                {/* <Menu.Item
                                name='Learning-Programs'
                                active={activeItem === 'Learning-Programs'}
                                onClick={() => handleItemClick("Learning-Programs")}
                                as={Link}
                                to={"#"}
                                className={` nav-item ${activeItem === 'Learning-Programs' && "active"}`}
                                disabled
                            >
                                <i className="student icon sidebar-menu-icon"></i> Learning Programs
                            </Menu.Item>
                            <Menu.Item
                                name='My-Meetings'
                                active={activeItem === 'My-Meetings'}
                                onClick={() => handleItemClick("My-Meetings")}
                                as={Link}
                                to={'#'}
                                className={` nav-item ${activeItem === 'My-Meetings' && "active"}`}
                                disabled
                            >
                                <i className="computer icon sidebar-menu-icon"></i> My Meetings
                            </Menu.Item>
                            <Menu.Item
                                name='Certificates'
                                active={activeItem === 'certificates'}
                                onClick={() => handleItemClick("certificates")}
                                as={Link}
                                to={'#'}
                                className={` nav-item ${activeItem === 'My-Certificates' && "active"}`}
                                disabled
                            >
                                <i className="certificate icon sidebar-menu-icon"></i> My Certificates
                            </Menu.Item>
                            <Menu.Item
                                name='Messages-Documents'
                                active={activeItem === 'Messages-Documents'}
                                onClick={() => handleItemClick("Messages-Documents")}
                                as={Link}
                                to={'#'}
                                disabled
                                className={` nav-item ${activeItem === 'Messages-Documents' && "active"}`}>
                                <i className="facebook messenger icon sidebar-menu-icon"></i> Messages
                            </Menu.Item> */}
                            </>
                }
            </Menu>
        </div>
    );
}
