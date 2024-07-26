import React from "react";
import GenericNewReportsGraph from "./GenericNewReportsGraph";

const GamesReportsStatusOne = ({yourResult, mainGamesData , }) => {

   

    return (
        <>
            <div className="resilience grid xl:grid-cols-2 gap-6">
              {/* <GamesReportsGraph mainGamesData={mainGamesData}/> */}
              <GenericNewReportsGraph
              mainGamesData={mainGamesData}
              />
                <div
                    className="resilience_txt p-6 bg-white rounded-2xl flex flex-col gap-4 dark:bg-[#212121] transition duration-300"
                >
                    <span
                        className="text-sm md:text-base text-[#1A1919] dark:text-[#F5F5F5] font-medium"
                    >RESILIENCE</span>
                    <p
                        className="text-sm md:text-base text-[#1A1919] dark:text-[#F5F5F5]"
                    >
                        Resilience, at its core, is about navigating through life's adversities with strength and determination. Imagine that you’re about to give a final presentation on your class project to a panel of instructors and your peers. Although you’ve worked long and hard to develop a compelling presentation, your stomach starts churning as soon as you enter the auditorium. Once in front of the panel and peers, you accidentally tip over a glass of water. Then, a few minutes in, a panel member questions an assumption you have made in your model. Your nervousness causes you to freeze momentarily. This is not how you thought the presentation would go, but stress and anxiety can combine to undercut your performance.
                    </p>
                    <p
                        className="text-sm md:text-base text-[#1A1919] dark:text-[#F5F5F5]"
                    >
                        As you progress through life, one goal is to ensure that you can handle stress, insecurity and uncertainty without becoming overwhelmed. Building long-term resilience starts by working on elements like perseverance, active problem-solving, and your immediate tendencies to view everyday events from a predominantly optimistic or pessimistic perspective. Think of these as the key ingredients that make up the recipe of resilience.


                    </p>

                </div>
            </div >

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
                   yourResult === "HIGH"  ?
                        <>
                            <p
                                className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                            >
                                Your actions and interactions during gameplay allowed us to assess your behaviors related to resilience. You consistently exhibit behaviors associated with resilience. The nuances of these traits, though, are as unique as your fingerprint. It appears you're naturally inclined to persevere, pushing past obstacles without losing momentum. You're also seemingly adept at active problem-solving, demonstrating a knack for finding solutions in challenging circumstances. Additionally, you lean towards optimism, a glass half-full approach, that helps you frame situations in a positive light. Your optimistic attributional style is likely to have a positive impact on your psychological well-being and performance in academic settings.

                            </p>
                            <p
                                className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                            >
                                But remember, even though your behaviors align with being resilient, there's always room for improvement.
                            </p>
                        </> : 
                         yourResult === "MEDIUM" ?
                            <>
                                <p
                                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                                >Your actions and interactions during gameplay allowed us to assess your behaviors related to resilience. Our findings suggest that you exhibit several behaviors related to resilience, but there is room for improvement. It's likely that you showcase perseverance in certain situations, but may give up easily in others. You seem to practice active problem-solving, tackling issues head-on rather than avoiding them. You tend to view the world through the lens of realism, not necessarily seeing a situation as bad, just seeing it as something to be dealt with.


                                </p>
                                <p
                                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                                >
                                    Keep in mind, you can cultivate behaviors consistent with being resilient by persevering when you encounter a challenging situation. Pushing past obstacles will build self-confidence to tackle bigger challenges. Being realistic when assessing a situation is good, but don’t let negative thoughts cloud your ability to take action.
                                </p>
                            </> 
                            :
                            <>
                                <p
                                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                                >Your actions and interactions during gameplay allowed us to assess your behaviors related to resilience. You may have the tendency to doubt your abilities and skills when encountered with a big or little failure. Every failure produces negative emotions such as anxiety, sadness, or anger. These emotions can be daunting, but can be galvanizing too. When a setback occurs or the results of your efforts are contrary to your expectations, don’t step back or try to leave the situation altogether. This tactic may terminate the negative emotions temporarily by removing the situation altogether. But remember, failure and negative emotions associated with it, are the building blocks for success and feeling good (Seligman, 2007). Focusing on the negative is natural in adverse circumstances. But you can train yourself to see the positive when life throws a challenge. Focus on and appreciate your innumerable strengths, abilities, and everything you have achieved in life so far.
                                </p>
                            </>

                }



              
            </div>

            <div
                className="strategies p-6 bg-white rounded-2xl flex flex-col gap-4 dark:bg-[#212121] transition duration-300"
            >
                <span
                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base font-medium"
                >Strategies to build Resilience</span
                >
                <div>
                    <p
                        className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                    >
                        Increasing your resilience takes time and intentionality. Proactively working on the strategies below not only increases aspects of wellbeing, but also decreases psychological distress (Seligman, 2012).
                    </p>
                    <ol className="list-disc list-outside pl-6">
                        <li
                            className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                        >
                            Increasing positive emotions (hope, joy, interest, compassion, gratitude) can undo the harmful effects of negative emotions and promote resilience (Tugade & Fredrickson, 2004). Spend time with people you care about (Kok et al., 2013) or participate in activities that you enjoy (Conner et al., 2018). Practice gratitude by acknowledging things that are going well in your life or recognizing someone’s contribution to your life.
                        </li>
                        <li
                            className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                        >
                            Participate in activities that you really love and excel at. You are more likely to experience ‘flow’, where you lose track of time and experience complete absorption in the task (Csikszentmihalyi & LeFevre, 1989; Bonaiuto et al., 2016). Practice living in the moment, even during daily activities or mundane tasks (Belitz & Lundstrom, 1998).
                        </li>
                        <li
                            className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                        >
                            Connect with people who are empathetic and understanding or join a group that offers you support and a sense of purpose or joy. Trustworthy and compassionate individuals who validate your feelings, will help you build the skill of resilience.
                        </li>
                        <li
                            className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                        >
                            A strong sense of purpose - a reason to get up in the morning- can offer a sense of direction in challenging times. Find meaning in your work, or through extracurricular, volunteer or community activities.
                        </li>
                        <li
                            className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                        >
                            Develop realistic goals and do something regularly to move towards the things you want to accomplish. Ask yourself- “what is one thing I can accomplish today that helps me move in the direction I want to go?”
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
                    Belitz, C., & Lundstrom, M. (1998). The power of flow: Practical ways to transform your life with meaningful coincidence. Harmony.
                </p>
                <p
                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                >
                    Bonaiuto, M., Mao, Y., Roberts, S., Psalti, A., Ariccio, S., Ganucci Cancellieri, U., & Csikszentmihalyi, M. (2016). Optimal experience and personal growth: Flow and the consolidation of place identity. Frontiers in Psychology, 7.
                </p>
                <p
                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                >
                    Conner, T. S., DeYoung, C. G., & Silvia, P. J. (2018). Everyday creative activity as a path to flourishing. Journal of Positive Psychology, 13(2), 181–189.
                </p>
                <p
                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                >
                    Csikszentmihalyi, M., & LeFevre, J. (1989) Optimal experience in work and leisure. Journal of Personality and Social Psychology, 56(5), 815–822.
                </p>
                <p
                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                >
                    Kok, B. E., Coffey, K. A., Cohn, M. A., Catalino, L. I., Vacharkulksemsuk, T., Algoe, S. B., Brantley, M., & Fredrickson, B. L. (2013). How positive emotions build physical health: Perceived social connections account for the upward spiral between positive emotions and vagal tone. Psychological Science, 24(7), 1123–1132.
                </p>
                <p
                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                >
                    Seligman, M.E. (2007). The Optimistic Child. Boston, Mass., Houghton Mifflin.
                </p>
                <p
                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                >
                    Seligman, M. E. (2012). Flourish: A visionary new understanding of happiness and well-being. Atria Paperback.
                </p>
                <p
                    className="text-[#1A1919] dark:text-[#F5F5F5] text-sm md:text-base"
                >
                    Tugade, M., & Fredrickson, B. L. (2004). Resilient individuals use positive emotions to bounce back from negative emotional experiences. Journal of Personality and Social Psychology, 86(2), 320–333.
                </p>
            </div>
        </>
    )
}

export default GamesReportsStatusOne
