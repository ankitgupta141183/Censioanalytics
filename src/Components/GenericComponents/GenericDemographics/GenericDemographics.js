import React, { useState, useEffect } from "react"
import './_GenericDemographics.scss'
import Arrow from '../../../assets/upgrade-images/Arrow.svg'
import { useSelector, useDispatch } from "react-redux"
import ProfileOptions from "../../CommonComponent/StaticData/ProfileOptions";
import ValidRegex from "../../CommonComponent/ValidRegex";
import { userUpdateProfile } from '../../../Actions/ProfileAction'



const GenericDemographics = () => {

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
                profileImage: profileDetail.user_image,
                familyIncome: profileDetail.family_income,
                isParentsGraduate: profileDetail.parents_graduation
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
            year_of_birth: formData.year_of_birth,
            family_income: formData.familyIncome,
            parents_graduation: formData.isParentsGraduate
        };
        var form_data = new FormData();
        for (var key in user) {
            form_data.append(`user[${key}]`, user[key])
        }
        dispatch(userUpdateProfile(form_data, profileDetail.uuid))
    }

    console.log("Demographics formData------", formData)


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
                        <span className="font-rubik font-semibold text-[#1A1919] text-xl md:text-2xl dark:text-[#F5F5F5]">Demographics</span>
                    </div>
                    <div
                        className="bg-white px-4 py-7 rounded-2xl dark:bg-[#212121] transition-all duration-300"
                    >
                        <form
                            onSubmit={(e) => doUserProfileUpdate(e)}
                            className="flex flex-col gap-6"
                            action=""
                            id="settingForm"
                            name="settingForm"
                        // method="post"
                        // enctype="multipart/form-data"
                        >
                            <div
                                className="input_group grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                            >
                                <div className="relative z-0 w-full group">
                                    <label
                                        for="gender"
                                        className="text-[#92929D] text-black dark:text-gray-300 absolute px-1 transition-all duration-300 -top-[16%] left-3 w-auto text-[#00000099] text-sm bg-white dark:bg-[#212121] dark:text-[#F5F5F5]"
                                    >
                                        Gender
                                    </label>
                                    <select
                                        name="gender"
                                        id="gender"

                                        placeholder="Select Gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className="bg-white text-black border py-4 px-3 border-[#0000003B] text-[#92929D] rounded-lg appearance-none block w-full transition-all duration-300 dark:bg-[#212121] dark:border-[#F5F5F5] dark:text-[#FFFFFF] outline-none disabled:bg-[#F5F5F5] disabled:bg-[#F5F5F5]"
                                    >
                                        {ProfileOptions.genderOptions.map((option) => {
                                            return <option className="text-black dark:text-[#FFFFFF]" key={option} value={option === 'Select' ? '' : option}>{option}</option>
                                        })}
                                    </select>
                                    <div className="downArrow absolute top-[30%] right-3">
                                        <img
                                            className="dark:invert"
                                            src={Arrow}
                                            alt="Arrow"
                                        />
                                    </div>
                                </div>

                                <div className="relative z-0 w-full group">
                                    <label
                                        for="yearOfBirth"
                                        className="text-[#92929D] text-black dark:text-gray-300 absolute px-1 transition-all duration-300 -top-[16%] left-3 w-auto text-[#00000099] text-sm bg-white dark:bg-[#212121] dark:text-[#F5F5F5]"
                                    >
                                        Year Of Birth
                                    </label>
                                    <select

                                        className="bg-white text-black border py-4 px-3 border-[#0000003B] text-[#92929D] rounded-lg appearance-none block w-full transition-all duration-300 dark:bg-[#212121] dark:border-[#F5F5F5] dark:text-[#FFFFFF] outline-none disabled:bg-[#F5F5F5] disabled:bg-[#F5F5F5]"
                                        name="year_of_birth"
                                        id="age"
                                        placeholder="Select year"
                                        value={formData.year_of_birth}
                                        onChange={handleInputChange}
                                    >
                                        {/* <option value="">Select</option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option> */}
                                        {/* <option value="2">{profileDetail?.year_of_birth}</option> */}
                                        <option value={""}>Select</option>
                                        {ProfileOptions.Yearofbirthoption.map(year => {
                                            return <option key={year} value={year}>{year}</option>
                                        })}
                                    </select>
                                    <div className="downArrow absolute top-[30%] right-3">
                                        <img
                                            className="dark:invert"
                                            src={Arrow}
                                            alt="Arrow"
                                        />
                                    </div>
                                </div>

                                <div className="relative z-0 w-full group">
                                    <label
                                        for="race"
                                        className="text-[#92929D] text-black dark:text-gray-300 absolute px-1 transition-all duration-300 -top-[16%] left-3 w-auto text-[#00000099] text-sm bg-white dark:bg-[#212121] dark:text-[#F5F5F5]"
                                    >
                                        Race
                                    </label>
                                    <select
                                        name="Race"
                                        id="Race"

                                        placeholder="Select Race"
                                        value={formData.Race}
                                        onChange={handleInputChange}
                                        className="bg-white text-black border py-4 px-3 border-[#0000003B] text-[#92929D] rounded-lg appearance-none block w-full transition-all duration-300 dark:bg-[#212121] dark:border-[#F5F5F5] dark:text-[#FFFFFF] outline-none disabled:bg-[#F5F5F5] disabled:bg-[#F5F5F5]"
                                    >
                                        {/* <option value="">Select</option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option> */}
                                        {/* <option value="2">{profileDetail?.race}</option> */}
                                        {ProfileOptions.raceOptions.map((option) => {
                                            return <option key={option} value={option === 'Select' ? '' : option}>{option}</option>
                                        })}

                                    </select>
                                    <div className="downArrow absolute top-[30%] right-3">
                                        <img
                                            className="dark:invert"
                                            src={Arrow}
                                            alt="Arrow"
                                        />
                                    </div>
                                </div>

                                <div className="relative appearance-none label-floating" >
                                    <input
                                        className="bg-white text-black border py-4 px-3 mt-0 border-[#0000003B] text-[#000000DE] rounded-lg appearance-none block w-full transition-all duration-300 dark:bg-[#212121] dark:border-[#F5F5F5] outline-none disabled:bg-[#F5F5F5] disabled:bg-[#F5F5F5] dark:text-[#F5F5F5]"
                                        placeholder="Zip Code"
                                        onChange={(e) => handleInputChange(e, "onlyNumber")}
                                        value={formData.Zip_Code}
                                        name="Zip_Code"
                                        selection={"true"}
                                    />
                                    <label
                                        className="text-[#92929D] text-black dark:text-gray-300 px-1 bg-transparent absolute transition-all duration-3 00 top-[31%] left-3 w-auto text-[#00000099] bg-white dark:bg-[#212121] dark:text-[#F5F5F5] opacity-0"
                                        for="zipCode"
                                    >
                                        Zip Code
                                    </label>
                                </div>

                                <div className="relative z-0 w-full group">
                                    <label
                                        for="born"
                                        className="text-[#92929D] text-black dark:text-gray-300 absolute px-1 transition-all duration-300 -top-[16%] left-4 w-auto text-[#00000099] text-sm bg-white dark:bg-[#212121] dark:text-[#F5F5F5]"
                                    >
                                        Where you born in the US
                                    </label>
                                    <select
                                        name="born_usa"
                                        id="born_usa" placeholder=""
                                        onChange={handleInputChange}
                                        value={formData.born_usa}


                                        className="bg-white text-black border py-4 px-3 border-[#0000003B] text-[#92929D] rounded-lg appearance-none block w-full transition-all duration-300 dark:bg-[#212121] dark:border-[#F5F5F5] dark:text-[#FFFFFF] outline-none disabled:bg-[#F5F5F5] disabled:bg-[#F5F5F5]"

                                    >
                                        {/* <option value="">Select</option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option> */}
                                        {/* <option value="2">{profileDetail?.born_in_usa}</option> */}
                                        {ProfileOptions.bornOption.map((option) => {
                                            return <option key={option} value={option === 'Select' ? '' : option}>{option}</option>
                                        })}
                                    </select>
                                    <div className="downArrow absolute top-[30%] right-3">
                                        <img
                                            className="dark:invert"
                                            src={Arrow}
                                            alt="Arrow"
                                        />
                                    </div>
                                </div>

                                <div className="relative z-0 w-full group">
                                    <label
                                        for="enrollmentStatus"
                                        className="text-[#92929D] text-black dark:text-gray-300 absolute px-1 transition-all duration-300 -top-[16%] left-3 w-auto text-[#00000099] text-sm bg-white dark:bg-[#212121] dark:text-[#F5F5F5]"
                                    >
                                        Enrollment Status
                                    </label>
                                    <select
                                        name="Enrollment"
                                        id="Enrollment"
                                        placeholder="Select Enrolment"
                                        onChange={handleInputChange}
                                        value={formData.Enrollment}

                                        className="bg-white text-black border py-4 px-3 border-[#0000003B] text-[#92929D] rounded-lg appearance-none block w-full transition-all duration-300 dark:bg-[#212121] dark:border-[#F5F5F5] dark:text-[#FFFFFF] outline-none disabled:bg-[#F5F5F5] disabled:bg-[#F5F5F5]"

                                    >
                                        {/* <option value="">Select</option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option> */}
                                        {/* <option value="2">{profileDetail?.enrollment}</option> */}
                                        {ProfileOptions.enrolmentOptions.map((option) => {
                                            return <option key={option} value={option === 'Select' ? '' : option}>{option}</option>
                                        })}
                                    </select>
                                    <div className="downArrow absolute top-[30%] right-3">
                                        <img
                                            className="dark:invert"
                                            src={Arrow}
                                            alt="Arrow"
                                        />
                                    </div>
                                </div>

                                <div className="relative z-0 w-full group">
                                    <label
                                        for="workStatus"
                                        className="text-[#92929D] text-black dark:text-gray-300 absolute px-1 transition-all duration-300 -top-[16%] left-3 w-auto text-[#00000099] text-sm bg-white dark:bg-[#212121] dark:text-[#F5F5F5]"
                                    >
                                        Work Status
                                    </label>
                                    <select
                                        placeholder='Select Job'
                                        // fluid
                                        // search
                                        onChange={handleInputChange}
                                        value={formData.Job}
                                        name="Job"
                                        selection={"true"}

                                        options={ProfileOptions.jobOptions}

                                        className="bg-white text-black border py-4 px-3 border-[#0000003B] text-[#92929D] rounded-lg appearance-none block w-full transition-all duration-300 dark:bg-[#212121] dark:border-[#F5F5F5] dark:text-[#FFFFFF] outline-none disabled:bg-[#F5F5F5] disabled:bg-[#F5F5F5]"

                                    >
                                        {/* <option value="">Select</option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option> */}
                                        {/* <option value="2">{profileDetail?.enrollment}</option> */}
                                        {/* <option value="2">{1}</option> */}
                                        {ProfileOptions.jobOptions.map((option) => {
                                            return <option key={option} value={option === 'Select' ? '' : option}>{option}</option>
                                        })}
                                    </select>
                                    <div className="downArrow absolute top-[30%] right-3">
                                        <img
                                            className="dark:invert"
                                            src={Arrow}
                                            alt="Arrow"
                                        />
                                    </div>
                                </div>

                                <div className="relative z-0 w-full group">
                                    <label
                                        for="businessOwnership"
                                        className="text-[#92929D] text-black dark:text-gray-300 absolute px-1 transition-all duration-300 -top-[16%] left-3 w-auto text-[#00000099] text-sm bg-white dark:bg-[#212121] dark:text-[#F5F5F5]"
                                    >
                                        Business Ownership
                                    </label>
                                    <select
                                        onChange={handleInputChange}
                                        value={formData.Own_Business}
                                        name="Own_Business"
                                        selection={"true"}

                                        options={ProfileOptions.isBusiness}

                                        className="bg-white text-black border py-4 px-3 border-[#0000003B] text-[#92929D] rounded-lg appearance-none block w-full transition-all duration-300 dark:bg-[#212121] dark:border-[#F5F5F5] dark:text-[#FFFFFF] outline-none disabled:bg-[#F5F5F5] disabled:bg-[#F5F5F5]"

                                    >
                                        {/* <option value="">Select</option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option> */}
                                        {/* <option value="2">{profileDetail?.own_business}</option> */}
                                        {ProfileOptions.isBusiness.map((option) => {
                                            return <option key={option} value={option === 'Select' ? '' : option}>{option}</option>
                                        })}
                                    </select>
                                    <div className="downArrow absolute top-[30%] right-3">
                                        <img
                                            className="dark:invert"
                                            src={Arrow}
                                            alt="Arrow"
                                        />
                                    </div>
                                </div>

                                {/* <div className="relative z-0 w-full group">
                                    <label
                                        for="mother_edu"

                                        className="text-[#92929D] text-black dark:text-gray-300 absolute px-1 transition-all duration-300 -top-[16%] left-3 w-auto text-[#00000099] text-sm bg-white dark:bg-[#212121] dark:text-[#F5F5F5]"
                                    >
                                        Mother Education
                                    </label>
                                    <select
                                        onChange={handleInputChange}
                                        value={formData.Mother_Education_Level}
                                        name="Mother_Education_Level"
                                        selection={"true"}

                                        required
                                        className="bg-white text-black border py-4 px-3 border-[#0000003B] text-[#92929D] rounded-lg appearance-none block w-full transition-all duration-300 dark:bg-[#212121] dark:border-[#F5F5F5] dark:text-white outline-none disabled:bg-[#F5F5F5] disabled:bg-[#F5F5F5]"

                                    >
                                    
                                        {ProfileOptions.eduOptions.map((option) => {
                                            return <option key={option} value={option === 'Select' ? '' : option}>{option}</option>
                                        })}
                                    </select>
                                    <div className="downArrow absolute top-[30%] right-3">
                                        <img
                                            className="dark:invert"
                                            src={Arrow}
                                            alt="Arrow"
                                        />
                                    </div>
                                </div> */}

                                {/* <div className="relative z-0 w-full group">
                                    <label
                                        for="father_edu"
                                        className="text-[#92929D] text-black dark:text-gray-300 absolute px-1 transition-all duration-300 -top-[16%] left-3 w-auto text-[#00000099] text-sm bg-white dark:bg-[#212121] dark:text-[#F5F5F5]"
                                    >
                                        Father Education
                                    </label>
                                    <select
                                        onChange={handleInputChange}
                                        value={formData.Father_Education_Level}
                                        name="Father_Education_Level"
                                        selection={"true"}
                                        options={ProfileOptions.eduOptions}
                                        required
                                        className="bg-white text-black border py-4 px-3 border-[#0000003B] text-[#92929D] rounded-lg appearance-none block w-full transition-all duration-300 dark:bg-[#212121] dark:border-[#F5F5F5] dark:text-white outline-none disabled:bg-[#F5F5F5] disabled:bg-[#F5F5F5]"

                                    >
                                       
                                        {ProfileOptions.eduOptions.map((option) => {
                                            return <option key={option} value={option === 'Select' ? '' : option}>{option}</option>
                                        })}
                                    </select>
                                    <div className="downArrow absolute top-[30%] right-3">
                                        <img
                                            className="dark:invert"
                                            src={Arrow}
                                            alt="Arrow"
                                        />
                                    </div>
                                </div> */}


                                <div className="relative z-0 w-full group">
                                    <label
                                        for="father_edu"
                                        className="text-[#92929D] text-black dark:text-gray-300 absolute px-1 transition-all duration-300 -top-[16%] left-3 w-auto text-[#00000099] text-sm bg-white dark:bg-[#212121] dark:text-[#F5F5F5]"
                                    >
                                        Family Income
                                    </label>
                                    <select
                                        onChange={handleInputChange}
                                        value={formData.familyIncome}
                                        name="familyIncome"
                                        selection={"true"}
                                        options={ProfileOptions.familyOptions}

                                        className="bg-white text-black border py-4 px-3 border-[#0000003B] text-[#92929D] rounded-lg appearance-none block w-full transition-all duration-300 dark:bg-[#212121] dark:border-[#F5F5F5] dark:text-[#FFFFFF] outline-none disabled:bg-[#F5F5F5] disabled:bg-[#F5F5F5]"

                                    >

                                        {ProfileOptions.familyOptions.map((option) => {
                                            return <option key={option} value={option === 'Select' ? '' : option}>{option}</option>
                                        })}
                                    </select>
                                    <div className="downArrow absolute top-[30%] right-3">
                                        <img
                                            className="dark:invert"
                                            src={Arrow}
                                            alt="Arrow"
                                        />
                                    </div>
                                </div>

                                <div className="relative z-0 w-full group">
                                    <label
                                        for="father_edu"
                                        className="text-[#92929D] text-black dark:text-gray-300 absolute px-1 transition-all duration-300 -top-[16%] left-3 w-auto text-[#00000099] text-sm bg-white dark:bg-[#212121] dark:text-[#F5F5F5] whitespace-nowrap"
                                    >
                                        Did either of your parents graduate from college?
                                    </label>
                                    <select
                                        onChange={handleInputChange}
                                        value={formData.isParentsGraduate}
                                        name="isParentsGraduate"
                                        selection={"true"}
                                        options={ProfileOptions.parentsGraduateOptions}

                                        className="bg-white text-black border py-4 px-3 border-[#0000003B] text-[#92929D] rounded-lg appearance-none block w-full transition-all duration-300 dark:bg-[#212121] dark:border-[#F5F5F5] dark:text-[#FFFFFF] outline-none disabled:bg-[#F5F5F5] disabled:bg-[#F5F5F5]"

                                    >

                                        {ProfileOptions.parentsGraduateOptions.map((option) => {
                                            return <option key={option} value={option === 'Select' ? '' : option}>{option}</option>
                                        })}
                                    </select>
                                    <div className="downArrow absolute top-[30%] right-3">
                                        <img
                                            className="dark:invert"
                                            src={Arrow}
                                            alt="Arrow"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div
                                className="form_submit grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                            >
                                <button
                                    type="submit"
                                    className="rounded bg-[#1B75BC] text-[#FFFFFF] py-2"
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

export default GenericDemographics