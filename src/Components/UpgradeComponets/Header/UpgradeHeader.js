import React, { useEffect, useState } from "react";
import manu from '../../../assets/upgrade-images/menu.svg'
import logo from '../../../assets/upgrade-images/logo.svg'
import mobile_logo from '../../../assets/upgrade-images/mobile_logo.svg'
// import searchIcon from '../../../assets/upgrade-images/search-icon.svg'
// import Search_dark from '../../../assets/upgrade-images/Search_dark.svg'
import universityLogo from '../../../assets/upgrade-images/university-logo.svg'
// import notification from '../../../assets/upgrade-images/notification.svg'
// import userIcon from '../../../assets/upgrade-images/user-icon.svg'
// import userImage from '../../../assets/img/NewProfileImage.png';
import userImage from '../../../assets/img/NewProfileImage.png';
import {Image} from 'semantic-ui-react'
import "./_Header.scss"
import UpgradeUserProfileModal from "../UpgradeUserProfileModal/UpgradeUserProfileModal";
import {  useSelector  } from 'react-redux';
// import { getProfileDetail } from '../../../Actions/ProfileAction';
import {useHistory} from 'react-router-dom'


const Header = ({ setIsHeaderManu }) => {

    const [openProfileModal, setOpenProfileModal] = useState(false)
    const profileDetail = useSelector(state => (state.profileReducer.profileDetail));
    // const { profileReducer } = useSelector(state => state)
    const isSessionExpired = useSelector(state => (state.questionListReducer.isSessionExpired))
    const [profileImage, setProfileImage] = useState((profileDetail && profileDetail.avatar) ? profileDetail.avatar : sessionStorage.getItem("profileImage"))
    const history = useHistory()


   
    useEffect(() => {
        if (isSessionExpired === "Signature has expired") {
            sessionStorage.clear()
            history.push("/login")
        }
    }, [isSessionExpired]) /* eslint-disable-line*/

    useEffect(()=>{
        // setProfileImage(profileDetail?.data?.user?.user_image ? profileDetail?.data?.user?.user_image : profileDetail?.data?.user?.avatar)
        setProfileImage((profileDetail && profileDetail.avatar) ? profileDetail.avatar : profileDetail?.data?.user ? profileDetail?.data?.user?.user_image :sessionStorage.getItem("profileImage"))
    },[profileDetail])

    useEffect(()=>{
        // setTimeout(()=>{
        //     dispatch(getProfileDetail())
        // },3000)
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <>
            <header
                className="talwind-header w-full fixed top-0 z-20 h-20 bg-white shadow-md dark:bg-[#212121] transition-all duration-300"
            >
                <div
                    className="max-w-xs mx-auto h-20 flex justify-between items-center sm:max-w-[420px] md:max-w-[calc(100vw-80px)]"
                >
                    <div className="logo flex items-center gap-4">
                        <button
                            id="sidebar-toggle"
                            className="fixed left-5 px-3 py-3.5 rounded-lg border transition-all duration-300"
                            onClick={(e) => { setIsHeaderManu((val) => !val) }}
                        >
                            <img
                                className="w-full dark:invert"
                                src={manu}
                                alt="sidebar toggle"
                            />
                        </button>
                        <a className="pl-14 sm:pl-12 md:pl-16" href="./index.html"
                        ><img className="hidden md:block" src={logo} alt="" />
                            <img className="md:hidden" src={mobile_logo} alt=""
                            /></a>
                    </div>
                    <div className="nav flex gap-8">
                        {/* <div className="mobile-search flex items-center lg:hidden">
                            <div className="search-img" >
                                <img src={searchIcon} alt="" />
                            </div>
                        </div> */}
                        {/* <div
                            className="w-[350px] search-box hidden lg:flex lg:justify-between p-2 gap-1.5 rounded-xl transition-all duration-300 shadow-[0px_3px_27px_rgba(69,69,80,0.1)] border border-transparent dark:border-[#F5F5F5] md:px-4 md:py-3"
                        >
                            <input
                                type="text"
                                placeholder="Search here"
                                className="w-14 font-rubik outline-none bg-transparent dark:text-[#F5F5F5] lg:w-auto"
                            />
                            <img className="dark:hidden" src="assets/search-icon.svg" alt="" />
                            <img
                                className="hidden dark:block"
                                src={Search_dark}
                                alt=""
                            />
                        </div> */}
                        <div className="nav-icons flex items-center md:gap-8">
                            <div>
                                <img
                                    className="hidden dark:invert dark:grayscale transition-all duration-300 md:block"
                                    src={universityLogo}
                                    alt=""
                                />
                            </div>
                            {/* <div><img src={notification} alt="" /></div> */}
                            <div onClick={() => { setOpenProfileModal((val) => !val) }} >
                                    <Image src={profileImage || userImage} className="my-profile-img w-[50px] h-[50px] rounded-full object-cover" />

                                {/* <img className="hidden md:block" src={userIcon} alt="" /> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="input-box hidden max-w-xs mx-auto sm:max-w-[420px] md:max-w-[calc(100vw-200px)] flex items-center mt-2 px-3 py-1 shadow-[0px_3px_27px_rgba(69,69,80,0.1)] h-10 rounded-lg bg-[#F5F5F5]"
                    id="search-block"
                >
                    <input
                        type="text"
                        placeholder="Search here"
                        className="w-full font-rubik outline-none bg-transparent dark:text-[#F5F5F5]"
                    />
                </div>
            </header>
            {
                openProfileModal &&
                <UpgradeUserProfileModal
                    openProfileModal={openProfileModal}
                    setOpenProfileModal={setOpenProfileModal}
                />}
        </>
    )
}


export default Header;