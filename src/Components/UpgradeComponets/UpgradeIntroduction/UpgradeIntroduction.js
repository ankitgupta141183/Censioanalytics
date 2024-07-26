import React from "react";
import './_UpgradeIntroduction.scss'
import { useHistory } from "react-router-dom";
import { Paths } from "../../routes/routePaths";
const UpgradeIntroduction = ({ isHeaderManu }) => {
    const history = useHistory()
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
                            UDC Student Experiences & Expectations (SX2) Survey
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
                            Dear Students,

                            UDC is conducting a survey to understand your experiences and expectations as a student. <br />Your responses to the following questions will help UDC support its students.<br /> The survey should take approximately 10 minutes to complete. <br /> <br />

                            We recommend you find 10 minutes of uninterrupted time to complete the survey. <br /><br />If you do not complete the survey in one sitting, you can log in again and the survey will resume where you left off. You will not have to repeat any of the questions you have already answered.<br />

                            The information obtained from you and other students will help administrators and faculty at UDC to improve the conditions that contribute to your learning and development and to the quality of experience of those who will come after you.<br /><br />

                            As usual, your responses are confidential. Survey responses will be analyzed in aggregate form and will not contain any personally-identifiable information.<br /><br />

                            Thank you in advance for your valued input.
                        </div>
                        <button
                            className="rounded bg-[#0198e1] text-[#FFFFFF] py-2 w-[15%]  "
                            onClick={(e) => { history.push(Paths.upgradeDemographicsQuestions) }}
                        >
                            Next
                        </button>

                    </div>
                </div>
            </main>
        </>
    )

}

export default UpgradeIntroduction;