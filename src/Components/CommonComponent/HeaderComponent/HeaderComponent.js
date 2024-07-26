import React, { useState, useEffect } from "react";
import { useHistory} from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Menu, Grid, Image, Dropdown} from 'semantic-ui-react'
import './header.scss';
import logoImg from '../../../assets/img/censio_logo.png';
import userImage from '../../../assets/img/NewProfileImage.png';
import {  useSelector  } from 'react-redux';
// import { toggleSidebar } from "../../../Actions/componentActions";
// import ProfileModal from "../ProfileModal/ProfileModal";
import usdImage from '../../../assets/img/udc-logo-long.png';

import NewProfileModal from "../../NewProfileModal/index";


export default function HeaderComponent({ visible, setVisible }) {
    const profileDetail = useSelector(state => (state.profileReducer.profileDetail));
    const isAdmin = sessionStorage.getItem("isAdmin") === "true" ? true : false
    // const assessment_started = sessionStorage.getItem("assessment_started") === "true" ? true : false

    const [userName, setUserName] = useState("")
    const history = useHistory()
    const [profileImage, setProfileImage] = useState((profileDetail && profileDetail.avatar) ? profileDetail.avatar : sessionStorage.getItem("profileImage"))
    const [open, setOpen] = useState(false)

    const FirstName = sessionStorage?.getItem("userName")?.split(" ")[0] || ""

    const isToggle = useSelector((state) => state.componentReducer.isToggle)
    const {sidebarHoverReducer} = useSelector(state =>  state)


    const profileUpdate = useSelector(state => state.profileReducer.profileUpdate)
  
    useEffect(() => {
        var testName = (profileDetail && profileDetail.data.user.first_name) ? `${profileDetail.data.user.first_name} ` : FirstName
        
        // var testName = (profileDetail && profileDetail.data.user.first_name) ? `${profileDetail.data.user.first_name} ${profileDetail.data.user.last_name}` : sessionStorage.getItem("userName")
        setUserName(testName)
        setProfileImage((profileDetail && profileDetail.avatar) ? profileDetail.avatar : profileDetail?.data?.user ? profileDetail?.data?.user?.user_image :sessionStorage.getItem("profileImage"))
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (profileUpdate) {
            setOpen(false)
            // dispatch(updateProfileSuccess({ profileUpdate: false, data: profileDetail }))
        
            // dispatch(updateProfileSuccess(profileUpdate)
        }
        // eslint-disable-next-line
    }, [profileDetail])

   

    const handleClickLogout = () => {
        sessionStorage.clear();
        history.push("/");
    }

    const CloseProfileModal = () => {
        setOpen(false)
    }
    return (
        <div>

            <div className={isToggle? "header-sec header-inner-sec" :  `${profileDetail?.data?.user?.udc_user && "UDC_Header"} header-sec`}>
                <div className={`${sidebarHoverReducer.isHover ? "udc-header-small" : "udc-header"  }`} >
                    <Grid>
                        <Grid.Row>

                            <Grid.Column computer={3} tablet={3} mobile={3} className="vt-center">
                                <Image src={logoImg} className="logo-img" onClick={() => history.push(`${isAdmin ? "/admin" : '/newdashboard' }`)} style={{ cursor: "pointer" }} />

                            </Grid.Column>
                            <Grid.Column computer={10} tablet={10} mobile={10} className="vt-center menus-header">
                                {profileDetail?.data?.user?.udc_user && 
                                <Image src={usdImage} className="univerisity-image" style={{ cursor: "pointer" }} />
                                }
                            </Grid.Column>
                            <Grid.Column computer={3} tablet={3} mobile={3}>
                                <Menu text className="menu-header float-right">
                                    <Dropdown text={userName} className="dropdown-header">
                                        <Dropdown.Menu>
                                            {!isAdmin ?
                                                <Dropdown.Item text="My Profile" onClick={() => setOpen(true)}>
                                                </Dropdown.Item>
                                                :
                                                null
                                            }
                                            <Dropdown.Item
                                                text="Logout"
                                                onClick={() => handleClickLogout()}
                                            />
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Image src={profileImage || userImage} width="40" className="my-profile-img" />
                                </Menu>
                                {/* {open &&
                                    <Icon name="triangle down" className="profile-popup-before-icon" />
                                } */}
                              
                                <NewProfileModal  open={open} CloseProfileModal={CloseProfileModal} />
                                {/* <ProfileModal open={open} setOpen={setOpen} setUserName={setUserName} /> */}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </div>
        </div>
    );
}
