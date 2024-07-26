import React from "react";
import GenericNewReportsGraph from "./GenericNewReportsGraph";

const GamesReportsStatusFive = ({ yourResult ,mainGamesData}) => {


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

                {/* <GamesReportsGraph
                mainGamesData={mainGamesData}
                /> */}
                    <GenericNewReportsGraph
                        mainGamesData={mainGamesData}
                    />

                <div
                    className="resilience_txt p-6 bg-white rounded-2xl flex flex-col gap-4 dark:bg-[#212121] transition duration-300"
                >
                    <span
                        className="text-sm md:text-base text-[#1A1919] dark:text-[#F5F5F5] font-medium"
                    >PERSEVERANCE
                    </span>
                    <p
                        className="text-sm md:text-base text-[#1A1919] dark:text-[#F5F5F5]"
                    >
                        Perseverance refers to our ability to pursue a goal or passion over time, and stick with it if we encounter obstacles or setbacks. It involves the capacity to stay determined, resilient, and focused on a specific objective, even when encountering difficulties or experiencing failures along the way. Perseverance is an important characteristic that contributes to success and achievement in various domains of life, such as education, work, sports, and personal development (Duckworth, 2016).
                    </p>
                    <p
                        className="text-sm md:text-base text-[#1A1919] dark:text-[#F5F5F5]"
                    >
                        Perseverance is a multifaceted construct. It entails effort and practice. It also involves our ability to learn from failure and try again until we succeed (Dweck, 2017). It involves setting meaningful goals, maintaining focus, and aligning actions with long-term aspirations.

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
                          Your actions and interactions during gameplay allowed us to assess your behaviors related to Perseverance. You have a strong work ethic and the ability to persist in the face of obstacles. You consistently put in the necessary effort to achieve your goals, even when faced with setbacks or difficulties. You have the ability to bounce back from failures, and view challenges as opportunities for growth. It is easy for you to maintain a positive outlook, stay focused on long-term objectives, and go the extra mile to accomplish what you set out to do.


                        </p>
                        :
                        yourResult === "MEDIUM" ?
                            <p
                                className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                            >
                               Your actions and interactions during gameplay allowed us to assess your behaviors related to Perseverance. You demonstrate a moderate degree of determination and persistence. You put in effort and show dedication toward your goals but may sometimes struggle to maintain consistency when faced with challenges. While setbacks may momentarily affect your motivation, you quickly regroup and continue your efforts. You will benefit from developing strategies to enhance your resilience and maintain focus during difficult times.


                            </p> :
                            <p
                                className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                            >
                               Your actions and interactions during gameplay allowed us to assess your behaviors related to Perseverance. You put in effort and show dedication toward your goals, but can become discouraged when things are not up to your expectations. Try to maintain effort and persistence even when setbacks occur. Do not lose motivation, stay focused on your long-term objectives. 
                            </p>

                }

            </div>

            <div
                className="strategies p-6 bg-white rounded-2xl flex flex-col gap-4 dark:bg-[#212121] transition duration-300"
            >
                <span
                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base font-medium"
                >Strategies to build Perseverance
                </span>
                <div>

                    <ol className="list-disc list-outside pl-6">
                        <li
                            className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                        >
                            Embrace a growth mindset, which involves believing that abilities and intelligence can be developed through effort and practice. This mindset will enable you to view challenges as opportunities for learning and growth rather than as indicators of failure (Dweck, 2006).

                        </li>
                        <li
                            className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                        >
                            Establish clear, specific, and meaningful goals. Break down these goals into manageable steps or milestones. This approach will help you to maintain focus and increase motivation to persevere in pursuing long-term objectives (Locke & Latham, 2002).


                        </li>
                        <li
                            className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                        >
                            Set priorities, create schedules or routines, and establish productive habits (Duckworth & Gross, 2014).


                        </li>
                        <li
                            className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                        >
                            Surround yourself with supportive individuals who can provide encouragement, guidance, and accountability. Having a support network can provide the necessary emotional and practical support to sustain perseverance (Bandura, 1997).


                        </li>
                        <li
                            className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                        >
                            Engage in positive self-talk, reinforcing beliefs in your abilities and reminding yourself of past successes. Optimistic thinking can enhance motivation, resilience, and perseverance (Seligman, 2006).



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
                >
                    Bandura, A. (1997). Self-efficacy: The exercise of control. W. H. Freeman and Company.


                </p>
                <p
                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                >
                    Duckworth, A. L. (2016). Grit: The power of passion and perseverance. London: Vermilion.


                </p>
                <p
                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                >
                    Duckworth, A. L., & Gross, J. J. (2014). Self-control and grit: Related but separable determinants of success. Current Directions in Psychological Science, 23(5), 319-325. doi:10.1177/0963721414541462


                </p>
                <p
                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                >
                    Dweck, C. S. (2017) Mindset: Changing the way you think to fulfill your potential. Revised edition. London: Robinson.

                </p>
                <p
                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                >
                    Dweck, C. S. (2006). Mindset: The new psychology of success. Ballantine Books.


                </p>
                <p
                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                >
                    Locke, E. A., & Latham, G. P. (2002). Building a practically useful theory of goal setting and task motivation: A 35-year odyssey. American Psychologist, 57(9), 705-717. doi:10.1037/0003-066X.57.9.705


                </p>
                <p
                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                >
                    Seligman, M. E. P. (2006). Learned optimism: How to change your mind and your life. Vintage Books.


                </p>

            </div>
        </>
    )
}

export default GamesReportsStatusFive
