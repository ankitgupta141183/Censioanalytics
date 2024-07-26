import React from "react";
import GamesReportsGraph from "./GamesReportsGraph";

const GamesReportsStatusFour = ({ isHeaderManu, mainGamesData, yourResult }) => {

    // console.log("mainGamesData---", mainGamesData[0].bar_values)
    console.log("--yourResult   4 ", yourResult)

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
                <GamesReportsGraph
                mainGamesData={mainGamesData}
                />

                <div
                    className="resilience_txt p-6 bg-white rounded-2xl flex flex-col gap-4 dark:bg-[#212121] transition duration-300"
                >
                    <span
                        className="text-sm md:text-base text-[#1A1919] dark:text-[#F5F5F5] font-medium"
                    >DIVERGENT THINKING

                    </span>
                    <p
                        className="text-sm md:text-base text-[#1A1919] dark:text-[#F5F5F5]"
                    >
                        Flexible and innovative thinking is necessary to address both the multifaceted and interdisciplinary nature of the challenges we face in the modern world. It involves breaking away from conventional thought patterns and exploring alternative possibilities (Marron & Faust, 2018). People with strong divergent thinking skills demonstrate the ability to generate a multitude of unconventional ideas (fluency), adapt their thinking to different situations (flexibility), produce unique and fresh insights (originality), have the capacity to refine, expand, and build upon initial ideas (elaboration), and are able to consider the unique circumstances, limitations, and needs of a given problem, allowing them to tailor their creative output accordingly (sensitivity).

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
                           Your actions and interactions during gameplay allowed us to assess your behaviors related to Divergent Thinking. You are a creative powerhouse. Your mind brims with endless possibilities and unconventional ideas. When faced with a challenge, you effortlessly generate a multitude of unique solutions and perspectives. Not only are you incredibly imaginative, but you also possess the flexibility to shift perspectives, strategies, and approaches with ease. You constantly explore different angles, embracing diverse viewpoints, and adapting your thoughts to find innovative solutions. Furthermore, you have an innate ability to elaborate on your initial ideas, adding complexity, depth, and intricate connections that enrich your concepts. Embrace your exceptional divergent thinking skills and let your imagination soar.

                        </p>
                        :
                        yourResult === "MEDIUM" ?
                            <p
                                className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                            >
                                Your actions and interactions during gameplay allowed us to assess your behaviors related to Divergent Thinking. You approach problems and tasks with a balanced mix of creativity and practicality. You consistently produce a number of alternative solutions and perspectives. Your flexibility enables you to adapt your thinking when confronted with challenges. You demonstrate a reasonable level of elaboration, expanding and refining your initial ideas to add depth and complexity. Embrace your creativity, as it equips you with the ability to approach challenges with an open mind, consider multiple perspectives, and generate practical and innovative solutions.

                            </p> :
                            <p
                                className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                            >
                              Your actions and interactions during gameplay allowed us to assess your behaviors related to Divergent Thinking. You excel at finding precise and efficient solutions within established parameters. Your ideas are often well-thought-out and practical. Your thinking style may prioritize structure and organization, leading to systematic approaches that yield effective results. You excel at building upon existing ideas and elaborating on them with careful attention to detail. You consider the specific circumstances and requirements of a problem, allowing you to provide tailored solutions that fit the given context. Embrace your unique cognitive strengths, as they offer valuable perspectives and contribute to problem-solving in their own distinct ways.

                            </p>



                }



                {/* <p
                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                >
                    Your actions and interactions during gameplay allowed us to assess your behaviors related to Divergent Thinking. You are a creative powerhouse. Your mind brims with endless possibilities and unconventional ideas. When faced with a challenge, you effortlessly generate a multitude of unique solutions and perspectives. Not only are you incredibly imaginative, but you also possess the flexibility to shift perspectives, strategies, and approaches with ease. You constantly explore different angles, embracing diverse viewpoints, and adapting your thoughts to find innovative solutions. Furthermore, you have an innate ability to elaborate on your initial ideas, adding complexity, depth, and intricate connections that enrich your concepts. Embrace your exceptional divergent thinking skills and let your imagination soar.

                </p> */}

            </div>

            <div
                className="strategies p-6 bg-white rounded-2xl flex flex-col gap-4 dark:bg-[#212121] transition duration-300"
            >
                <span
                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base font-medium"
                >Strategies to build Divergent Thinking

                </span>
                <div>

                    <ol className="list-disc list-outside pl-6">
                        <li
                            className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                        >
                            Engage in brainstorming exercises regularly to enhance your idea generation skills.

                        </li>
                        <li
                            className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                        >
                            Set aside dedicated time for free writing or journaling to encourage a flow of ideas.

                        </li>
                        <li
                            className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                        >
                            Seek out new experiences and engage with unfamiliar subjects or hobbies to broaden your mental horizons.

                        </li>
                        <li
                            className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                        >
                            Collaborate with others and actively listen to their ideas, fostering a more flexible mindset.


                        </li>
                        <li
                            className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                        >
                            Embrace curiosity and question established norms or assumptions to challenge conventional thought patterns.


                        </li>
                        <li
                            className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                        >
                            Practice expanding on your initial ideas by asking "What if?" or "How can I take this further?"



                        </li>
                        <li
                            className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                        >
                            Seek feedback from others and engage in discussions to refine and develop your concepts.



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
                    Marron, T. R., & Faust, M. (2018). Free association, divergent thinking, and creativity: Cognitive and neural perspectives. The Cambridge Handbook of the Neuroscience of Creativity, (May), 261–280. https://doi.org/10.1017/9781316556238.016

                </p>


            </div>
        </>
    )
}

export default GamesReportsStatusFour
