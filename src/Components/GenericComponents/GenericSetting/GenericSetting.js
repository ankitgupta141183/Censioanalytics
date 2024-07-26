
import React, { useState, useEffect } from "react"
import './_GenericSetting.scss'
import { useSelector, useDispatch } from "react-redux"
import ProfileOptions from "../../CommonComponent/StaticData/ProfileOptions";
import ValidRegex from "../../CommonComponent/ValidRegex";
// import { userUpdateProfile } from '../../Actions/ProfileAction'
import { userUpdateProfile } from '../../../Actions/ProfileAction'

const GenericSetting = () => {
  const { profileReducer } = useSelector(state => state)
  const profileDetail = profileReducer?.profileDetail?.data?.user
  const [formData, setFormData] = useState(ProfileOptions.FormFieldValue)
  const dispatch = useDispatch()
  useEffect(() => {
    if (profileDetail) {
      const UserDetails = {
        ...formData,
        firstName: formData.firstName || profileDetail.first_name,
        lastName: profileDetail.last_name,
        userName: profileDetail.username ? profileDetail.username : "",
        mobile: profileDetail.mobile,
        city: profileDetail.city,
        state: profileDetail.state,
        Race: profileDetail.race,
        Enrollment: profileDetail.enrollment,
        Job: profileDetail.job,
        Own_Business: profileDetail.own_business,
        Mother_Education_Level: profileDetail.mother_education_level,
        Father_Education_Level: profileDetail.father_education_level,
        Zip_Code: profileDetail.zipcode,
        email: profileDetail.email,
        gender: profileDetail.gender,
        age: profileDetail.age,
        born_usa: profileDetail.born_in_usa,
        year_of_birth: profileDetail.year_of_birth,
        Randomized_ID: profileDetail.random_id,
        profileImage: profileDetail.user_image
      }
      setFormData(UserDetails)
    } else {
      // setOpenedTab("Settings")
    }
    // eslint-disable-next-line
  }, [profileDetail]);
  const handleInputChange = (e, validTextBy) => {
    const { name, value, checked } = e.target;
    const Accept_only_Alphabets = ["firstName", "lastName",]
    const Accept_only_Numbers = ["Randomized_ID", "Zip_Code"]
    if (validTextBy === "onlyAlphabets" && Accept_only_Alphabets.includes(e.target.name)) {
      if (ValidRegex.validateAlphabate.test(value) || value === "") {
        setFormData({
          ...formData,
          [name]: value
        })
      }
    } else if (validTextBy === "onlyNumber" && Accept_only_Numbers.includes(e.target.name)) {
      if (ValidRegex.validdateNumber.test(value) || value === "") {
        setFormData({
          ...formData,
          [name]: value
        })
      }
    } else if (name === "isChecked") {
      setFormData({
        ...formData,
        [name]: checked
      })
    }
    else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const doUserProfileUpdate = (e) => {
    e.preventDefault();

    let user = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      username: formData.userName,
      gender: formData.gender,
      avatar: formData.avatarPath || "",
      race: formData.Race,
      enrollment: formData.Enrollment,
      job: formData.Job,
      own_business: formData.Own_Business,
      mother_education_level: formData.Mother_Education_Level,
      father_education_level: formData.Father_Education_Level,
      zipcode: formData.Zip_Code,
      born_in_usa: formData.born_usa,
      year_of_birth: formData.year_of_birth
    };
    var form_data = new FormData();
    for (var key in user) {
      form_data.append(`user[${key}]`, user[key])
    }
    dispatch(userUpdateProfile(form_data, profileDetail.uuid))
  }


  return (
    <>
      <main
        className="max-w-xs mx-auto pt-24 pb-20 flex flex-col gap-6 w-full transition-all duration-300 sm:max-w-[420px] md:max-w-[calc(100vw-80px)] md:pl-16"
      >
        <div
          id="main_section"
          className="flex flex-col gap-6 transition-all duration-30 md:w-[72%] lg:w-[79%] xl:w-[84.5%] 2xl:w-[86.5%] 3xl:w-[90%] md:ml-auto"
        >
          <div className="pt-2">
            <span className="font-rubik font-semibold text-[#1A1919] text-xl md:text-2xl dark:text-[#F5F5F5]">Settings</span></div>            <div
              className="bg-white px-4 py-7 rounded-2xl dark:bg-[#212121] transition-all duration-300"
            >
            <form
              className="flex flex-col gap-6"
              action=""
              id="settingForm"
              name="settingForm"
              onSubmit={(e) => doUserProfileUpdate(e)}
            // method="post"
            // enctype="multipart/form-data"
            >
              <div
                className="input_group grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                <div className="relative appearance-none label-floating">
                  <input
                    className="bg-white text-base border py-4 px-3 border-[#0000003B] text-[#000000DE] rounded-lg block w-full transition-all duration-300 dark:bg-[#212121] dark:border-[#F5F5F5] outline-none disabled:bg-[#F5F5F5] disabled:bg-[#F5F5F5] dark:text-[#F5F5F5]"
                    // type="text"
                    // name="first_name"
                    // value={profileDetail?.first_name}
                    // id="first_name"
                    // required=""
                    placeholder="First name"
                    maxLength={12}
                    type="text"
                    onChange={(e) => handleInputChange(e, "onlyAlphabets")}
                    value={formData?.firstName}
                    name="firstName"
                    required={true}
                    selection={"true"}

                  />
                  <label
                    for="first_name"
                    className="text-[#92929D] text-base dark:text-gray-300 px-1 bg-transparent absolute transition-all duration-300 top-[31%] left-3 w-auto text-[#00000099] bg-white dark:bg-[#212121] dark:text-[#F5F5F5] opacity-0"
                  >
                    First name
                  </label>
                </div>

                <div className="relative appearance-none label-floating">
                  <input
                    // type="text"
                    // name="last_name"
                    // value={profileDetail?.last_name}
                    // id="last_name"
                    // required=""
                    maxLength={12}
                    name="lastName"
                    onChange={(e) => handleInputChange(e, "onlyAlphabets")}
                    value={formData?.lastName}
                    required={true}
                    selection={"true"}
                    className="bg-white text-base border py-4 px-3 border-[#0000003B] text-[#000000DE] rounded-lg block w-full transition-all duration-300 dark:bg-[#212121] dark:border-[#F5F5F5] outline-none disabled:bg-[#F5F5F5] disabled:bg-[#F5F5F5] dark:text-[#F5F5F5]"
                    placeholder="Last name"
                  />
                  <label
                    for="last_name"
                    className="text-[#92929D] text-base dark:text-gray-300 px-1 bg-transparent absolute transition-all duration-300 top-[31%] left-3 w-auto text-[#00000099] bg-white dark:bg-[#212121] dark:text-[#F5F5F5] opacity-0"
                  >
                    Last name
                  </label>
                </div>

                <div className="relative appearance-none label-floating">
                  <input
                    // type="text"
                    // name="username"
                    // id="username"
                    // value={profileDetail?.username}
                    // required=""
                    type={"text"}
                    placeholder='UserName'
                    defaultValue={formData?.userName}
                    name="userName"
                    // readOnly={true}  
                    disabled={true}
                    required={true}
                    style={{ marginBottom: 0, cursor: "none" }}
                    className="bg-white text-base border py-4 px-3 border-[#0000003B] text-[#000000DE] rounded-lg block w-full transition-all duration-300 dark:bg-[#212121] dark:border-[#F5F5F5] outline-none disabled:bg-[#b9baba] dark:text-[#F5F5F5]"
                  />
                  <label
                    for="username"
                    className="text-[#92929D] text-base dark:text-gray-300 px-1 bg-transparent absolute transition-all duration-300 top-[31%] left-3 w-auto text-[#00000099] bg-white dark:bg-[#212121] dark:text-[#F5F5F5] opacity-0"
                  >
                    Username
                  </label>
                </div>

                <div className="relative appearance-none label-floating">
                  <input
                    // type="email"
                    // name="email"
                    // id="email"
                    // value={profileDetail?.email}
                    // required=""
                    // placeholder="Email"
                    placeholder='Email'
                    type="email"
                    defaultValue={formData?.email}
                    name="email"
                    required={true}
                    // readOnly={true}
                    disabled={true}
                    style={{ marginBottom: 0, cursor: "none" }}
                    className="bg-white text-base border py-4 px-3 border-[#0000003B] text-[#000000DE] rounded-lg block w-full transition-all duration-300 dark:bg-[#212121] dark:border-[#F5F5F5] outline-none disabled:bg-[#b9baba] dark:text-[#F5F5F5]"
                  />
                  <label
                    for="email"
                    className="text-[#92929D] text-base dark:text-gray-300 px-1 bg-transparent absolute transition-all duration-300 top-[31%] left-3 w-auto text-[#00000099] bg-white dark:bg-[#212121] dark:text-[#F5F5F5] opacity-0"
                  >
                    Email
                  </label>
                </div>

                {/* <div className="relative appearance-none label-floating">
                  <input
                    type="text"
                    name="randomized_id"
                    id="randomized_id"
                    className="bg-white text-base border py-4 px-3 border-[#0000003B] text-[#000000DE] rounded-lg block w-full transition-all duration-300 dark:bg-[#212121] dark:border-[#F5F5F5] outline-none disabled:bg-[#F5F5F5] disabled:bg-[#F5F5F5] dark:text-[#F5F5F5]"
                    required=""
                    value={!profileDetail?.random_id === null ? profileDetail?.random_id : 'Randomized id not found'}
                    placeholder="Randomized ID"
                    style={{ marginBottom: 0, backgroundColor: "#e1e0e0", cursor: "none" }}
                  />
                  <label
                    for="randomized_id"
                    className="text-[#92929D] text-base dark:text-gray-300 px-1 bg-transparent absolute transition-all duration-300 top-[31%] left-3 w-auto text-[#00000099] bg-white dark:bg-[#212121] dark:text-[#F5F5F5] opacity-0"
                  >
                    Randomized ID
                  </label>
                </div> */}
              </div>

              <div
                className="form_submit grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                <button
                  type="submit"
                  // disabled={true}
                  className="rounded bg-[#1B75BC] text-[#FFFFFF] py-2"
                // className="rounded bg-[#dddddd] text-[#FFFFFF] py-2"
                >
                  UPDATE
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}

export default GenericSetting;