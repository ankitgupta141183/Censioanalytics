import React from "react";
// import manu from '../../assets/upgrade-images/menu.svg'
import logo from '../../assets/upgrade-images/logo.svg'
import mobile_logo from '../../assets/upgrade-images/mobile_logo.svg'
// import searchIcon from '../../assets/upgrade-images/search-icon.svg'
// import Search_dark from '../../assets/upgrade-images/Search_dark.svg'
// import universityLogo from '../../assets/upgrade-images/university-logo.svg'
// import notification from '../../assets/upgrade-images/notification.svg'
// import userIcon from '../../assets/upgrade-images/user-icon.svg'
// import userImage from '../../../assets/img/NewProfileImage.png';
// import userImage from '../../assets/img/NewProfileImage.png';
import './AssessmentHeader'
// import UpgradeUserProfileModal from "../UpgradeUserProfileModal/UpgradeUserProfileModal";
// import { getProfileDetail } from '../../../../Actions/ProfileAction';


const Header = () => {


    return (
        <>
            <header
                className="talwind-header w-full fixed top-0 z-20 h-20 bg-white shadow-md dark:bg-[#212121] transition-all duration-300"
            >
                <div
                    className="max-w-xs mx-auto h-20 flex justify-between items-center sm:max-w-[420px] md:max-w-[calc(100vw-80px)]"
                >
                    <div className="logo flex items-center gap-4">
                        <a className="pl-14 sm:pl-12 md:pl-16" href="./index.html"
                        ><img className="hidden md:block" src={logo} alt="" />
                            <img className="md:hidden" src={mobile_logo} alt=""
                            /></a>
                    </div>
                    <div className="nav flex gap-8">
                       
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
        </>
    )
}


export default Header;