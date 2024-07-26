import React from "react"
import './_UpgradeUserProfileModal.scss'
// import usericon from '../../../assets/upgrade-images/user-icon.svg'
import photoCamera from '../../../assets/upgrade-images/photo_camera.svg'
import photoCameraDark from '../../../assets/upgrade-images/photo_camera_dark.svg'
import settings_2 from '../../../assets/upgrade-images/settings_2.svg'
import arrowForwardIos from '../../../assets/upgrade-images/arrow_forward_ios.svg'
import demography from '../../../assets/upgrade-images/demography.svg'
// import arrow from '../../../assets/upgrade-images/Arrow.svg'
import logouArrow from '../../../assets/upgrade-images/LogoutArrow.svg'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import userImage from '../../../assets/img/NewProfileImage.png';
import { useEffect, useRef } from "react"
import { useState } from 'react'
import ProfileOptions from "../../CommonComponent/StaticData/ProfileOptions";
import { userUpdateProfile } from '../../../Actions/ProfileAction'
import { useDispatch } from "react-redux"

const UpgradeUserProfileModal = ({ openProfileModal, setOpenProfileModal }) => {
    const { profileReducer } = useSelector(state => state)
    const profileDetail = profileReducer?.profileDetail?.data?.user
    const [profileImage, setProfileImage] = useState((profileDetail && profileDetail.avatar) ? profileDetail.avatar : sessionStorage.getItem("profileImage"))
    const hiddenFileInput = useRef();
    const [formData, setFormData] = useState(ProfileOptions.FormFieldValue)
    const [isProfilePopUp , setIsProfilePopUp ] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const handleClickLogout = () => {
        sessionStorage.clear();
        setOpenProfileModal(false)
        history.push("/");
    }

   
    useEffect(() => {
        setProfileImage((profileDetail && profileDetail.avatar) ? profileDetail.avatar : profileDetail ? profileDetail?.user_image : sessionStorage.getItem("profileImage"))
    }, [profileDetail])
    

    const handleUploadImage = (event) => {
        setIsProfilePopUp(true)
        // setAvatarPath(event.target.files[0])
        setFormData({
            ...formData,
            avatarPath: event.target.files[0]
        })
        let reader = new FileReader()
        let file = event.target.files[0]
        reader.onloadend = () => {
            setProfileImage(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const doUserUploadImage = async (e) => {
        e.preventDefault();

        let user = {
            first_name: profileDetail?.first_name,
            last_name: profileDetail?.last_name,
            email: profileDetail?.email,
            username: profileDetail?.username,
            gender: profileDetail?.gender,
            avatar: formData.avatarPath || "",
            race: profileDetail?.race,
            enrollment: profileDetail?.enrollment,
            job: profileDetail?.job,
            own_business: profileDetail?.own_business,
            mother_education_level: profileDetail?.mother_education_level,
            father_education_level: profileDetail?.father_education_level,
            zipcode: profileDetail?.zipcode,
            born_in_usa: profileDetail?.born_in_usa,
            year_of_birth: profileDetail?.year_of_birth,
            family_income: profileDetail?.family_income,
            parents_graduation: profileDetail?.parents_graduation
        };
        var form_data = new FormData();
        for (var key in user) {
            form_data.append(`user[${key}]`, user[key])
        }

        try {

            let isProfileUpdated = await dispatch(userUpdateProfile(form_data, profileDetail.uuid))
            if (isProfileUpdated.payload.status === 200) {
                setFormData({
                    ...formData,
                    avatarPath: ""
                })
            }
        }
        catch(error) {
            console.log("error-->",error)
        }
        setIsProfilePopUp(false)
    }



    return (
        <>
            <div
                id="userProfile"
                className={openProfileModal ? "fixed -top-72 right-[7%] md:right-[5.5%] lg:right-[4%] xl:right-[3%] 3xl:right-[2%] z-50 user_profile p-4 rounded-lg bg-[#FFFFFF] transition-all duration-300 opacity-0 shadow-[0px_0px_10px_#21212133] flex flex-col gap-3 w-[86%] md:w-[60%] lg:w-[45%] xl:w-[40%] 2xl:w-[35%] 3xl:w-[27%] dark:bg-[#212121] top-24 opacity-100" :
                    "fixed -top-72 right-[7%] md:right-[5.5%] lg:right-[4%] xl:right-[3%] 3xl:right-[2%] z-50 user_profile p-4 rounded-lg bg-[#FFFFFF] transition-all duration-300 opacity-0 shadow-[0px_0px_10px_#21212133] flex flex-col gap-3 w-[86%] md:w-[60%] lg:w-[45%] xl:w-[40%] 2xl:w-[35%] 3xl:w-[27%] dark:bg-[#212121]"}
            >
                <div
                    className="profile_top px-6 py-3 bg-[#F5F5F5] rounded shadow-[0px_0px_10px_#21212133] flex flex-col gap-3 transition-all duration-300 dark:bg-[#2E2E2E]"
                >
                    <div className="name flex items-center gap-4">
                        <div className="user_img">
                            <img src={profileImage || userImage}  className="my-profile-img w-[40px] h-[40px] rounded-full object-cover" alt="" />
                        </div>
                        <span
                            className="font-semibold text-[#212121] transition-all duration-300 dark:text-[#F5F5F5]"
                        >{profileDetail?.first_name + " " + profileDetail?.last_name}</span
                        >
                    </div>

                    <div
                        className="hr border-b border-[#B1B1B1] transition-all duration-300 dark:border-[#B1B1B1]"
                    ></div>

                    <div className="user_pic flex items-center gap-4 px-4">
                        <div className="icon">
                            <img
                                className="transition-all duration-300 dark:hidden"
                                src={photoCamera}
                                alt="photo_camera"
                            />
                            <img
                                className="transition-all duration-300 hidden dark:block"
                                src={photoCameraDark}
                                alt="photo_camera_dark"
                            />

                            <input
                                type="file"
                                ref={hiddenFileInput}
                                id="file-input"
                                name="avatarPath"
                                accept="image/jpeg,image/jpg"
                                onChange={handleUploadImage}
                                style={{ display: 'none' }}
                            />
                        </div>
                        {
                            !isProfilePopUp?
                                <button type="button" onClick={() => hiddenFileInput.current.click()}
                                    className="text-[#212121] text-sm transition-all duration-300 dark:text-[#1B75BC]">
                                    Upload Profile Photo</button>
                                :
                                <button
                                    onClick={(e) => { doUserUploadImage(e) }}
                                    class="bg-cyan-500 text-white active:bg-cyan-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                                >
                                    Update
                                </button>
                        }

                        {/* <span
                            className="text-[#212121] text-sm transition-all duration-300 dark:text-[#1B75BC]"
                        >Upload Profile Photo</span
                        > */}
                    </div>
                </div>

                <ul className="flex flex-col">
                    <li className="px-8 py-2">
                        <Link to={'/settings'} className="flex items-center justify-between" onClick={() => { setOpenProfileModal(false) }} >
                            <div className="link flex items-center gap-4">
                                <div
                                    className="setting_icon p-2 transition-all duration-300 rounded-full bg-[#F5F5F5] dark:bg-[#2E2E2E]"
                                >
                                    <img
                                        className="transition-all duration-300 dark:invert"
                                        src={settings_2}
                                        alt="settings_2"
                                    />
                                </div>
                                <span
                                    className="text-[#000000] transition-all duration-300 dark:text-[#F5F5F5]"
                                >Settings</span>
                            </div>
                            <div className="arrow_icon">
                                <img
                                    className="transition-all duration-300 dark:invert"
                                    src={arrowForwardIos}
                                    alt="arrow_forward_ios"
                                />
                            </div>

                        </Link>
                    </li>
                    <li className="px-6 py-2">
                        <div className="hr border-b border-[#B1B1B1]"></div>
                    </li>
                    <li className="px-8 py-2">
                        <Link to={'/demographics'} className="flex items-center justify-between" onClick={() => { setOpenProfileModal(false) }} >
                            <div className="link flex items-center gap-4">
                                <div
                                    className="setting_icon p-2 transition-all duration-300 rounded-full bg-[#F5F5F5] dark:bg-[#2E2E2E]"
                                >
                                    <img
                                        className="transition-all duration-300 dark:invert"
                                        src={demography}
                                        alt="demography"
                                    />
                                </div>
                                <span
                                    className="text-[#000000] transition-all duration-300 dark:text-[#F5F5F5]"
                                >Demographics</span
                                >
                            </div>
                            <div className="arrow_icon">
                                <img
                                    className="transition-all duration-300 dark:invert"
                                    src={arrowForwardIos}
                                    alt="arrow_forward_ios"
                                />
                            </div>
                        </Link>
                    </li>
                    <div
                        className="hr border-b border-[#B1B1B1] transition-all duration-300 dark:border-[#B1B1B1]"
                    ></div>

                    <li className="px-8 py-2">
                        {/* <Link to={'/'} className="flex items-center justify-between"  onClick={()=>{setOpenProfileModal(false)}} > */}
                        <div className="flex items-center justify-between" >
                            <div className="link flex items-center gap-4">
                                <div
                                    className="setting_icon p-2 transition-all duration-300 rounded-full bg-[#F5F5F5] dark:bg-[#2E2E2E]"
                                >
                                    <img
                                        className="transition-all duration-300 dark:invert"
                                        src={logouArrow}
                                        alt="demography"
                                    />
                                </div>
                                <span style={{ cursor: 'pointer' }}
                                    onClick={handleClickLogout}
                                    className="text-[#000000] transition-all duration-300 dark:text-[#F5F5F5]"
                                >Logout</span
                                >
                            </div>
                            {/* <div className="arrow_icon">
                                <img
                                    className="transition-all duration-300 dark:invert"
                                    src={arrowForwardIos}
                                    alt="arrow_forward_ios"
                                />
                            </div> */}
                        </div>
                        {/* </Link> */}
                    </li>

                </ul>
            </div>
        </>
    )
}

export default UpgradeUserProfileModal;