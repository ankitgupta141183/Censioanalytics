import React from "react";
import './_AssessmentMturkIntroduction.scss'
import { useHistory } from "react-router-dom";

const AssessmentMturkIntroduction = ({ isHeaderManu }) => {
    const history  = useHistory()

    return (
        <>
            <main
                className="talwind-dashboard max-w-xs mx-auto pt-24 pb-20 flex flex-col gap-6 w-full transition-all duration-300 sm:max-w-[420px] md:max-w-[calc(100vw-80px)] md:pl-16"
            >
                <div
                    id="main_section"
                    className={isHeaderManu ? "flex flex-col gap-6 transition-all duration-30 md:w-[72%] lg:w-[79%] xl:w-[84.5%] 2xl:w-[86.5%] 3xl:w-[90%] md:ml-auto md:w-full lg:w-full xl:w-full 2xl:w-full 3xl:w-full"
                        : "flex flex-col gap-6 transition-all duration-30 md:w-[72%] lg:w-[79%] xl:w-[84.5%] 2xl:w-[86.5%] 3xl:w-[90%] md:ml-auto"}
                >
                    <div className="pt-2">
                        <span
                            className="font-rubik font-semibold text-[#1A1919] text-xl md:text-2xl dark:text-[#F5F5F5]"
                        >
                            MTurk Questionnaire
                        </span>
                    </div>
                    <div
                        className="bg-white px-4 py-7 rounded-2xl flex flex-col gap-6 dark:bg-[#212121] transition-all duration-300"
                    >
                        <div
                            className="border-b pb-2 border-[rgba(32, 42, 49, 0.3)] dark:border-[#656575]"
                        >
                            <span className="font-medium dark:text-[#F5F5F5]"
                            >Introduction
                            </span>
                        </div>

                        <div className="border-b pb-2 border-[rgba(32, 42, 49, 0.3)] dark:border-[#656575]">
                            Hello,

                            Censio is conducting research to establish reliability and validity of the games you just completed. <br /> <br />

                            Your responses to the following questions will help us conduct the required research. <br /><br />The questionnaire should take approximately 5 minutes to complete. <br /> <br/>

                            Thank you in advance for your valued input.
                        </div>
                        <button
                            className="rounded bg-[#0198e1] text-[#FFFFFF] py-2 w-[15%]  "
                            onClick={(e) => {history.push('/assessment-demographic-questions')}}
                        >
                            Next
                        </button>

                    </div>
                </div>
            </main>
        </>
    )
}


export default AssessmentMturkIntroduction