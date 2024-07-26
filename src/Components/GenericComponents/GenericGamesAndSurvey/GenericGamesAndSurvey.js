
import React from "react";
import './_GenericGamesAndSurvey.scss'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Paths } from "../../routes/routePaths";
import { getProfileDetail } from '../../../Actions/ProfileAction';
import GameSection from "../../CommonComponent/GameSection";

const GenericGamesAndSurvey = ({ isHeaderManu }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { profileReducer } = useSelector(state => state)
    const profileDetail = profileReducer?.profileDetail?.data?.user

    useEffect(() => {
        dispatch(getProfileDetail())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <main className="talwind-dashboard max-w-xs mx-auto pt-24 pb-20 flex flex-col gap-6 w-full transition-all duration-300 sm:max-w-[420px] md:max-w-[calc(100vw-80px)] md:pl-16" >
                <div id="main_section" className={isHeaderManu ? "flex flex-col gap-6 transition-all duration-30 md:w-[72%] lg:w-[79%] xl:w-[84.5%] 2xl:w-[86.5%] 3xl:w-[90%] md:ml-auto md:w-full lg:w-full xl:w-full 2xl:w-full 3xl:w-full"
                    : "flex flex-col gap-6 transition-all duration-30 md:w-[72%] lg:w-[79%] xl:w-[84.5%] 2xl:w-[86.5%] 3xl:w-[90%] md:ml-auto"} >
                    <div className="pt-2">
                        <span className="font-rubik font-semibold text-xl text-[#1A1919] md:text-2xl dark:text-[#F5F5F5]" >Games & Survey</span>
                    </div>

                    <div className="bg-white p-6 rounded-2xl dark:bg-[#212121] transition-all duration-300 games-survey">
                        <div className="py-2 flex flex-col gap-3">
                            <span className="text-[#1A1919] font-rubik font-medium dark:text-[#F5F5F5]" >Please complete the games and the Student Experience & Expectations Survey listed below.</span >
                            <div
                                className="hr w-full h-0.5 bg-[#202A31] opacity-25 dark:bg-[#CED8DF] transition-all duration-300"
                            ></div>
                        </div>
                        
                        <GameSection />

                        <div className="grid gap-6 grid-cols-1 py-6 md:grid-cols-2 lg:grid-cols-3" >


                            {/* <div
                                className="pt-6 pl-6 h-28 bg-[#E5EFF7] flex flex-col gap-1 rounded-lg dark:bg-[#1B75BC66] transition-all duration-300 md:h-40"  >
                                <span className="text-[#1A1919] font-rubik font-medium dark:text-[#F5F5F5]">Game 1</span>
                                <span className="text-[#656575] font-rubik dark:text-[#B7B7B7]">Lorem Ipsum</span>
                            </div>
                            <div className="pt-6 pl-6 h-28 bg-[#E5EFF7] flex flex-col gap-1 rounded-lg dark:bg-[#1B75BC66] transition-all duration-300 md:h-40">
                                <span className="text-[#1A1919] font-rubik font-medium dark:text-[#F5F5F5]">Game 1</span>
                                <span className="text-[#656575] font-rubik dark:text-[#B7B7B7]">Lorem Ipsum</span>
                            </div>
                            <div
                                className="pt-6 pl-6 h-28 bg-[#E5EFF7] flex flex-col gap-1 rounded-lg dark:bg-[#1B75BC66] transition-all duration-300 md:h-40">
                                <span className="text-[#1A1919] font-rubik font-medium dark:text-[#F5F5F5]" >Game 1</span>
                                <span className="text-[#656575] font-rubik dark:text-[#B7B7B7]">Lorem Ipsum</span>
                            </div>
                            <div
                                className="pt-6 pl-6 h-28 bg-[#E5EFF7] flex flex-col gap-1 rounded-lg dark:bg-[#1B75BC66] transition-all duration-300 md:h-40">
                                <span className="text-[#1A1919] font-rubik font-medium dark:text-[#F5F5F5]">Game 1</span>
                                <span className="text-[#656575] font-rubik dark:text-[#B7B7B7]">Lorem Ipsum</span>
                            </div> */}
                        </div>
                    </div >

                    <div className="pb-10 flex flex-col gap-3">
                        <div className="py-2">
                            <span className="font-medium font-rubik text-[#1A1919] dark:text-[#F5F5F5]" >User Feedback (Please provide your feedback after completing all the games) </span>
                        </div>

                        <div
                            className="py-4 px-6 bg-[#FDFDFD] relative shadow-md rounded-l-sm rounded-r-lg flex flex-col gap-1 dark:bg-[#212121] transition-all duration-300 ">
                            <span className="w-3 h-full absolute bg-[#7D7D7D] rounded-sm left-0 top-0 transition-all duration-300 dark:bg-[#7D7D7D ]"></span>
                            {/* <span className="font-semibold font-rubik text-[#1A1919] dark:text-[#F5F5F5]">Lorem ipsum dolor sit amet</span>
                             <span className="text-[#656575] font-rubik dark:text-[#B1B1B1]">Lorem ipsum dolor sit amet</span>  */}
                            <button
                                className={
                                    profileDetail?.feedback_submitted === true ?
                                        "rounded bg-[#D3D3D3] text-[#FFFFFF] py-2 w-[15%]"
                                        : "rounded bg-[#0198e1] text-[#FFFFFF] py-2 w-[15%]"

                                }
                                onClick={(e) => { history.push(Paths.GenericFeedback) }}
                                disabled={profileDetail?.feedback_submitted === true ? true : false}
                            >
                                {profileDetail?.feedback_submitted === true ? "Feedback submitted" : "Feedback"}
                            </button>

                        </div>
                    </div>

                    <div className="pb-10 flex flex-col gap-3">
                        <div className="py-2">
                            <span className="font-medium font-rubik text-[#1A1919] dark:text-[#F5F5F5]" >Student Experience & Expectations Survey</span>
                        </div>

                        <div
                            className="py-4 px-6 bg-[#FDFDFD] relative shadow-md rounded-l-sm rounded-r-lg flex flex-col gap-1 dark:bg-[#212121] transition-all duration-300">
                            <span className="w-3 h-full absolute bg-[#7D7D7D] rounded-sm left-0 top-0 transition-all duration-300 dark:bg-[#7D7D7D]"></span>
                            {/* <span className="font-semibold font-rubik text-[#1A1919] dark:text-[#F5F5F5]">Lorem ipsum dolor sit amet</span>
                             <span className="text-[#656575] font-rubik dark:text-[#B1B1B1]">Lorem ipsum dolor sit amet</span>  */}
                            <button
                                className={
                                    profileDetail?.survey_submitted === true ?
                                        "rounded bg-[#D3D3D3] text-[#FFFFFF] py-2 w-[15%]"
                                        : "rounded bg-[#0198e1] text-[#FFFFFF] py-2 w-[15%]"

                                }
                                disabled={profileDetail?.survey_submitted === true ? true : false}
                                onClick={(e) => { history.push(Paths.GenericIntroduction) }}
                            >
                                {profileDetail?.survey_submitted === true ? "Questionnaire submitted" : "Take Questionnaire "}
                            </button>
                        </div>
                    </div>

                </div >
            </main >
        </>
    )
}


export default GenericGamesAndSurvey