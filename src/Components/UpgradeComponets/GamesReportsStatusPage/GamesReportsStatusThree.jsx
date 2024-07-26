import React from "react";
import NewReportsGraph from "./NewReportsGraph";

const GamesReportsStatusThree = ({ yourResult, mainGamesData }) => {



    return (
        <>
            <div className="resilience grid xl:grid-cols-2 gap-6">
                {/* <div
                className="resilience_chart py-14 relative flex items-center justify-center bg-white rounded-2xl dark:bg-[#212121] transition duration-300"
            >
                <div className="grid grid-cols-4 max-w-[90%] mx-auto">
                    <div className="border-r border-[#CCCCCC] border-dashed">
                        <ul className="py-4 pr-4 flex flex-col gap-10">
                            <li
                                className="text-[#333333] dark:text-[#F5F5F5] text-xs text-right font-semibold"
                            >
                                RESILIENCE
                            </li>
                            <li
                                className="text-[#333333] dark:text-[#F5F5F5] text-xs text-right"
                            >
                                Perseverance
                            </li>
                            <li
                                className="text-[#333333] dark:text-[#F5F5F5] text-xs text-right"
                            >
                                Active Problem Solving
                            </li>
                            <li
                                className="text-[#333333] dark:text-[#F5F5F5] text-xs text-right"
                            >
                                Explanatory Disposition
                            </li>
                        </ul>
                    </div>
                    <div
                        className="border-r border-[#CCCCCC] border-dashed flex items-end justify-start"
                    >
                        <span
                            className="text-[#333333] dark:text-[#F5F5F5] text-xs -mb-6"
                        >Low</span
                        >
                    </div>
                    <div
                        className="border-r border-[#CCCCCC] border-dashed flex items-end justify-center"
                    >
                        <span
                            className="text-[#333333] dark:text-[#F5F5F5] text-xs -mb-6"
                        >Moderate</span
                        >
                    </div>
                    <div
                        className="border-r border-[#CCCCCC] border-dashed flex items-end justify-end"
                    >
                        <span
                            className="text-[#333333] dark:text-[#F5F5F5] text-xs -mb-6"
                        >High</span
                        >
                    </div>
                </div>

                <ul
                    className="absolute top-[20%] lg:top-[22%] xl:top-[22%] 2xl:top-[30%] 3xl:top-[28%] w-full flex flex-col gap-[44px] pr-4 sm:pr-5 lg:pr-9 xl:pr-[27px] 2xl:pr-7 3xl:pr-24"
                >
                    <li
                        className="h-3 w-[71%] 3xl:w-[65%] ml-auto rounded-full bg-gradient-to-l from-[#1B75BCCC] to-[#ECF7FFCC] relative flex items-center"
                    >
                        <div
                            className="absolute left-[20%] h-5 w-5 bg-[#1B75BC] rounded-full"
                        ></div>
                    </li>
                    <li
                        className="h-3 w-[71%] 3xl:w-[65%] ml-auto relative rounded-full bg-gradient-to-l from-[#1B75BCCC] to-[#ECF7FFCC] flex items-center"
                    >
                        <div
                            className="absolute left-[50%] h-5 w-5 bg-[#1B75BC] rounded-full"
                        ></div>
                    </li>
                    <li
                        className="h-3 w-[71%] 3xl:w-[65%] ml-auto relative rounded-full bg-gradient-to-l from-[#1B75BCCC] to-[#ECF7FFCC] flex items-center"
                    >
                        <div
                            className="absolute left-[30%] h-5 w-5 bg-[#1B75BC] rounded-full"
                        ></div>
                    </li>
                    <li
                        className="h-3 w-[71%] 3xl:w-[65%] ml-auto relative rounded-full bg-gradient-to-l from-[#1B75BCCC] to-[#ECF7FFCC] flex items-center mt-8 lg:mt-1 xl:mt-4 3xl:mt-1"
                    >
                        <div
                            className="absolute left-[80%] h-5 w-5 bg-[#1B75BC] rounded-full"
                        ></div>
                    </li>
                </ul>
            </div> */}


                <NewReportsGraph mainGamesData={mainGamesData} />
                <div
                    className="resilience_txt p-6 bg-white rounded-2xl flex flex-col gap-4 dark:bg-[#212121] transition duration-300"
                >
                    <span
                        className="text-sm md:text-base text-[#1A1919] dark:text-[#F5F5F5] font-medium"
                    >PROACTIVE DISPOSITION
                    </span>
                    <p
                        className="text-sm md:text-base text-[#1A1919] dark:text-[#F5F5F5]"
                    >
                        Proactive disposition refers to an individual’s inclination towards taking initiative, anticipating future challenges by taking a long-term approach, and staying the course even in the face of adversity. Individuals with a proactive disposition have a tendency to take independent action, without being prompted or required to do so. They have the ability to foresee future needs, changes, or challenges and take proactive steps to address them. They are proactive in setting goals, initiating projects, and taking the lead in problem-solving situations. They are willing to delay short-term gain in order to prepare for the future and display persistence in achieving something despite difficulties, failure, or opposition.
                    </p>

                </div>
            </div>

            <div
                className="result p-6 rounded flex flex-col gap-4 bg-[#E5EFF7] rounded-2xl dark:bg-[#B1B1B133] transition-all duration-300"
            >
                <span
                    className="text-sm md:text-base text-[#1A1919] dark:text-[#F5F5F5] font-medium"
                >Your Results
                    {
                        yourResult === "HIGH" ? " (PROFICIENT)" : yourResult === "MEDIUM" ? " (INTERMEDIATE)" : yourResult === "LOW" ? " (DEVELOPING)" : " (DEVELOPING)"
                    }
                </span >

                {
                    yourResult === "HIGH" ?
                        <p
                            className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                        >
                            Your actions and interactions during gameplay allowed us to assess your behaviors related to Proactive Disposition. Based on our analysis, you naturally and consistently exhibit self-starting behaviors, often taking the initiative without needing external prompts. Your outlook might be geared towards the long term, prioritizing enduring success over immediate gains. And your persistence likely shines through as you stay committed to your path, undeterred by obstacles.
                        </p>
                        :
                        yourResult === "MEDIUM" ?
                            <p
                                className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                            >
                                Your actions and interactions during gameplay allowed us to assess your behaviors related to Proactive Disposition. Our findings suggest that you occasionally display self-starting behaviors, stepping up to take the initiative. You may sometimes have a long-term orientation, looking ahead to future prospects. And you likely display persistence, though it may fluctuate based on circumstances. You are likely to benefit from developing proactive behaviors and mindset further to enhance your effectiveness in taking initiative and anticipating opportunities.

                            </p> :
                            <p
                                className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                            >
                                Your actions and interactions during gameplay allowed us to assess your behaviors related to Proactive Disposition. You are likely to respond to crises and issues as they arise. You work very well under pressure. You have excellent problem-solving skills and are often more comfortable with uncertainty and trying different approaches. You don't worry about planning everything out perfectly in advance. You are likely to benefit from thinking more than a step or two ahead. Build proactive behaviors to enhance your effectiveness and contribute more proactively in various contexts.
                            </p>



                }


            </div >

            <div
                className="strategies p-6 bg-white rounded-2xl flex flex-col gap-4 dark:bg-[#212121] transition duration-300"
            >
                <span
                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base font-medium"
                >Strategies to build Proactive Disposition
                </span>
                <div>

                    <ol className="list-disc list-outside pl-6">
                        <li
                            className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                        >
                            Cultivate your self-starting behavior by actively seeking opportunities. Take on new responsibilities. Build your problem-solving skills by proactively identifying and addressing potential problems or challenges. Don't wait for explicit instructions; instead, be proactive in identifying and addressing needs or opportunities (Frese & Fay, 2001). This mindset shift can help you develop a proactive orientation towards tasks and opportunities. (Crant, 2000)
                        </li>
                        <li
                            className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                        >
                            Improve your ability to anticipate future needs, challenges, or changes. Engage in foresight activities, such as trend analysis, scenario planning, or environmental scanning, to gain insights into potential future developments. This will enable you to take proactive steps to prepare and adapt to emerging situations (Bateman & Crant, 1993).

                        </li>
                        <li
                            className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                        >
                            Strengthen your self-management skills to effectively prioritize tasks and manage your time. Use planning tools, such as to-do lists or calendars, to organize your work and stay on top of deadlines. By managing yourself proactively, you can create a conducive environment for proactive behaviors (Frese & Fay, 2001).

                        </li>

                    </ol>
                </div>
            </div>

            <div
                className="reference p-6 bg-white rounded-2xl flex flex-col gap-4 mb-6 dark:bg-[#212121] transition duration-300"
            >
                <span
                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base font-medium"
                >References</span
                >
                <p
                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                >Bateman, T. S., & Crant, J. M. (1993). The proactive component of organizational behavior: A measure and correlates. Journal of Organizational Behavior, 14(2), 103-118. doi:10.1002/job.4030140202

                </p>
                <p
                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                >
                    Crant, J. M. (2000). Proactive behavior in organizations. Journal of Management, 26(3), 435-462. doi:10.1177/014920630002600304

                </p>
                <p
                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                >
                    Frese, M., & Fay, D. (2001). Personal initiative: An active performance concept for work in the 21st century. Research in Organizational Behavior, 23, 133-187. doi:10.1016/S0191-3085(01)23006-8

                </p>

            </div>
        </>
    )
}

export default GamesReportsStatusThree
