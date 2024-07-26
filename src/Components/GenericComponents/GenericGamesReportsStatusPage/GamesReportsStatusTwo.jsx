import React from "react";
import GenericNewReportsGraph from "./GenericNewReportsGraph";

const GamesReportsStatusTwo = ({ yourResult, mainGamesData }) => {



    return (
        <>
            <div className="resilience grid xl:grid-cols-2 gap-6">

                    <GenericNewReportsGraph
                        mainGamesData={mainGamesData}
                    />

                <div
                    className="resilience_txt p-6 bg-white rounded-2xl flex flex-col gap-4 dark:bg-[#212121] transition duration-300"
                >
                    <span
                        className="text-sm md:text-base text-[#1A1919] dark:text-[#F5F5F5] font-medium"
                    >ACHIEVEMENT ORIENTATION</span>
                    <p
                        className="text-sm md:text-base text-[#1A1919] dark:text-[#F5F5F5]"
                    >
                        Individuals with a high need for achievement enjoy challenging tasks, seek competence feedback, and set performance and mastery goals for themselves (Dweck & Leggett, 1988). Imagine you have an assignment due in a few weeks that is 40% of your grade. Since this is a core course required in your major, you are motivated to do your best and achieve a high grade in this assignment. You break down the big goal (submission before the due date) into smaller actionable steps with a timeline and milestones to track progress. You go to office hours to seek help and feedback from the instructor. Very importantly, you work with high focus to ensure you are on track to achieve the desired outcome (grade of A- or above). Ultimately, your achievement-oriented learning approach will help you to attain the desired outcome of receiving a high grade in the assignment.
                    </p>
                    <p
                        className="text-sm md:text-base text-[#1A1919] dark:text-[#F5F5F5]"
                    >
                        Your personal beliefs and goals towards learning can positively or negatively affect your achievement and persistence (Eppler & Harju, 1997). When you realize how your beliefs shape the ways in which you respond to a challenge, you may be able to adopt more of a goal-oriented approach, seek the appropriate channels for help, attempt new problem-solving strategies, and put in more effort into your academic work and persist in your educational goals (Fong et al., 2018).

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
                        <>
                            <p
                                className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                            >

                                Your actions and interactions during gameplay allowed us to assess your behaviors related to Achievement Orientation. Our analysis indicates that you likely relish challenges and turn them into opportunities for growth. Your goal-setting abilities seem sharp, indicating a focused approach towards your aspirations. Moreover, you might actively seek feedback, a vital tool for learning and improvement.


                            </p>
                            <p
                                className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                            >
                                Yet, it's important to remember that while you consistently exhibit behaviors related to Achievement Orientation, there is room for improvement.


                            </p>
                        </>
                        :
                        yourResult === "MEDIUM" ?
                            <>
                                <p
                                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                                >
                                    Your actions and interactions during gameplay allowed us to assess your behaviors related to Achievement Orientation. You might enjoy a challenging task, you possibly set goals, albeit not consistently, and you likely seek feedback, though maybe not in every situation.



                                </p>
                                <p
                                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                                >
                                    It is important to remember that while you exhibit some behaviors related to Achievement Orientation, there is always room for improvement.



                                </p>
                            </>
                            :
                            <p
                                className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                            >
                                Your actions and interactions during gameplay allowed us to assess your behaviors related to Achievement Orientation. Our findings suggest that when challenging tasks become overwhelming, you are shy to seek help or feedback. Your thought process  - ‘If I’m struggling, how do I tell someone that?’ keeps you from reaching out for support. We encourage you to reach out to your peers and teachers, ask questions, seek feedback, and find support. It will lower your anxiety and build social capital. Make setting goals a habitual practice. Goal setting will enable you to achieve your goals and give you the confidence that it can be done.
                            </p>

                }

                {/* <p
                className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
            >
              Your actions and interactions during gameplay allowed us to assess your behaviors related to Achievement Orientation. Our analysis indicates that you likely relish challenges and turn them into opportunities for growth. Your goal-setting abilities seem sharp, indicating a focused approach towards your aspirations. Moreover, you might actively seek feedback, a vital tool for learning and improvement.
            </p>
            <p
                className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
            >
               Yet, it's important to remember that while you consistently exhibit behaviors related to Achievement Orientation, there is room for improvement.  

            </p> */}
            </div>

            <div
                className="strategies p-6 bg-white rounded-2xl flex flex-col gap-4 dark:bg-[#212121] transition duration-300"
            >
                <span
                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base font-medium"
                >Strategies to build Achievement Orientation</span>
                <div>
                    <p
                        className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                    >
                        To strengthen your achievement orientation further, we suggest these strategies.

                    </p>
                    <ol className="list-disc list-outside pl-6">
                        <li
                            className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                        >
                            Continue embracing challenging tasks but ensure to balance them with moments of rest and reflection. Remember, every expert was once a beginner.

                        </li>
                        <li
                            className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                        >
                            Establish the practice of setting goals, start with small and achievable ones. When setting goals, follow the SMART principle (Specific, Measurable, Achievable, Relevant, Time-bound) to ensure they're realistic and aligned with your overall objectives.

                        </li>
                        <li
                            className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                        >
                            Consider errors as learning opportunities. Continue seeking feedback and be open to constructive criticism, it's the best catalyst for growth.

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
                    Dweck, C. S., & Leggett, E. L. (1988). A social-cognitive approach to motivation and personality. Psychological Review, 95(2), 256–273. https://doi.org/10.1037/0033-295X.95.2.256
                </p>
                <p
                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                >
                    Eppler, M. A., & Harju, B. L. (1997). Achievement motivation goals in relation to academic performance in traditional and nontraditional college students. Research in Higher Education, 38(5), 557–573.

                </p>
                <p
                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                >
                    Fong, C. J., Acee, T. W., & Weinstein, C. E. (2018). A Person-Centered Investigation of Achievement Motivation Goals and Correlates of Community College Student Achievement and Persistence. Journal of College Student Retention: Research, Theory & Practice, 20(3), 369–387. https://doi.org/10.1177/1521025116673374

                </p>

            </div>
        </>
    )
}

export default GamesReportsStatusTwo
