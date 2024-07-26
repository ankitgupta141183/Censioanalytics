import React, { useState, useEffect } from "react";
import Dashboard from '../../../assets/upgrade-images/Dashboard.svg'
import Car from '../../../assets/upgrade-images/Car.svg'
// import assessmentCap from '../../../assets/upgrade-images/assessment_cap.svg'
import Booking from '../../../assets/upgrade-images/Booking.svg'
import Bell from '../../../assets/upgrade-images/Bell.svg'
import Settings from '../../../assets/upgrade-images/Settings.svg'
import menu_vector from '../../../assets/upgrade-images/menu_vector.svg'
import menu_vector_dark from '../../../assets/upgrade-images/menu_vector_dark.svg'
import feedbaclIcon from '../../../assets/upgrade-images/feedback-svgrepo-com.svg'
// import light_mode from '../../../assets/upgrade-images/light_mode.svg'
// import Sun_dark from '../../../assets/upgrade-images/Sun_dark.svg'
// import Moon from '../../../assets/upgrade-images/Moon.svg'
// import moon_dark from '../../../assets/upgrade-images/moon_dark.svg'
// import contactUS from '../../../assets/upgrade-images/icons8-contact-us-50.png'
import { Link } from "react-router-dom"
import './_GenericSideBar.scss'
import { useHistory } from "react-router-dom";
import { Paths } from "../../routes/routePaths";

const GenericSideBar = ({ isHeaderManu }) => {
	const history = useHistory()
	const [sidebarActive, setSidebarActive] = useState('/upgrade-dashboard')
	const gamesReportIsActiveRoute = [Paths.GenericReports, '/generic-games-reports/1', '/generic-games-reports/2', '/generic-games-reports/3', '/generic-games-reports/4', '/generic-games-reports/5']
	
	useEffect(() => {
		setSidebarActive(history.location.pathname)
	}, [history.location.pathname])

	// const checkbox = document.querySelector("#checkbox");
	// const html = document.querySelector("html");
	// const toggleDarkMode = function () {
	// 	checkbox.checked ? html.classList.add("dark") : html.classList.remove("dark");
	// 	checkbox.checked ? setIsDarkMode(true) : setIsDarkMode(false)

	// };
	//calling the function directly toggleDarkMode();
	// if (checkbox) {
	// 	checkbox.addEventListener("click", toggleDarkMode);
	// }

	return (
		<>
			<aside
				id="sidebar"
				className={`${isHeaderManu ? "talwind-dashboard fixed left-0 pt-20 pb-8 w-0 bg-white h-full flex flex-col justify-between overflow-x-hidden transition-all duration-300 dark:bg-[#212121] md:w-16 w-64 z-10" : "talwind-dashboard fixed left-0 pt-20 pb-8 w-0 bg-white h-full flex flex-col justify-between overflow-x-hidden transition-all duration-300 dark:bg-[#212121] md:w-64 w-0 z-10"}`}
			>
				<div>
					<ul className="py-4">
						<li className={`${sidebarActive === Paths.GenericDashBoard ? 'reletive bg-[#CCE0F0] font-medium dark:bg-[#B1B1B133] transition-all duration-300' : ''}`}>
							<Link to={Paths.GenericDashBoard} className="flex items-center py-3 gap-3"  >
								{
									sidebarActive === Paths.GenericDashBoard && <div
										className="absolute left-0 rounded-full w-1.5 h-8 bg-[#1B75BC] dark:bg-[#FFFFFF]"
									>	</div>
								}
								<img
									className="pl-5 dark:invert"
									src={Dashboard}
									alt="Dashboard_icon"
								/>
								<span
									className="font-rubik text-[#202A31] dark:text-[#CED8DF] px-1 whitespace-nowrap"
								>
									Dashboard

								</span>
							</Link >
						</li>
						<li className={`${sidebarActive === Paths.GenericGamesAndSurvey ||
							sidebarActive === Paths.GenericAllGames ||
							sidebarActive === Paths.GenericDemographicsQueslist ||
							sidebarActive === Paths.GenericFeedback ||
							sidebarActive === Paths.GenericIntroduction ?
							'reletive bg-[#CCE0F0] font-medium dark:bg-[#B1B1B133] transition-all duration-300' : ''}`}>
							<Link to={Paths.GenericGamesAndSurvey} className="py-3 flex items-center gap-3"  >
								{
									(sidebarActive === Paths.GenericGamesAndSurvey || sidebarActive === Paths.upgradeSurveyQuestions || sidebarActive === Paths.UpgradeFeedbackQuestions || sidebarActive === Paths.upgradeIntroduction) && <div
										className="absolute left-0 rounded-full w-1.5 h-8 bg-[#1B75BC] dark:bg-[#FFFFFF]"
									>	</div>
								}
								<img
									className="pl-5 dark:invert"
									src={Car}
									alt="Advisors Courses icon"
								/>
								<span
									className="font-rubik text-[#202A31] dark:text-[#CED8DF] px-1 whitespace-nowrap"
								>
									Games & Survey

								</span>
							</Link>
						</li>

						<li className={`${sidebarActive === Paths.GenericSchedule ? 'reletive bg-[#CCE0F0] font-medium dark:bg-[#B1B1B133] transition-all duration-300' : ''}`}>
							<Link to={Paths.GenericSchedule} className="py-3 flex items-center gap-3" href="./schedule.html">
								{
									sidebarActive === Paths.GenericSchedule && <div
										className="absolute left-0 rounded-full w-1.5 h-8 bg-[#1B75BC] dark:bg-[#FFFFFF]"
									>	</div>
								}
								<img
									className="pl-5 dark:invert"
									src={Booking}
									alt="Schedule icon"
								/>
								<span
									className="font-rubik text-[#202A31] dark:text-[#CED8DF] px-1 whitespace-nowrap"
								>
									Schedule
								</span>
							</Link>
						</li>
						<li className={`${gamesReportIsActiveRoute.includes(sidebarActive)
							? 'reletive bg-[#CCE0F0] font-medium dark:bg-[#B1B1B133] transition-all duration-300' : ''}`}>
							<Link to={Paths.GenericReports} className="py-3 flex items-center gap-3" href="./reports.html">
								{
									gamesReportIsActiveRoute.includes(sidebarActive) && <div
										className="absolute left-0 rounded-full w-1.5 h-8 bg-[#1B75BC] dark:bg-[#FFFFFF]"
									>	</div>
								}

								<img
									className="pl-5 dark:invert"
									src={Bell}
									alt="Reports icon"
								/>
								<span
									className="font-rubik text-[#202A31] dark:text-[#CED8DF] px-1 whitespace-nowrap"
								>
									Reports
								</span>
							</Link>
						</li>
						<li
							// className="reletive bg-[#CCE0F0] font-medium dark:bg-[#B1B1B133] transition-all duration-300"
							className={`${sidebarActive === Paths.GenericAdvisorsCourses ? 'reletive bg-[#CCE0F0] font-medium dark:bg-[#B1B1B133] transition-all duration-300' : ''}`}
						>
							<Link to={Paths.GenericAdvisorsCourses} className="py-3 flex items-center gap-3" >
								{
									sidebarActive === Paths.GenericAdvisorsCourses && <div
										className="absolute left-0 rounded-full w-1.5 h-8 bg-[#1B75BC] dark:bg-[#FFFFFF]"
									></div>
								}

								<img
									className="pl-5 dark:invert"
									src={Settings}
									alt="Games & Survey icon"
								/>
								<span
									className="font-rubik text-[#000000] dark:text-[#FFFFFF] px-1 whitespace-nowrap"
								>
									Connect with Advisors
								</span>
							</Link>
						</li>
						<li
							// className="reletive bg-[#CCE0F0] font-medium dark:bg-[#B1B1B133] transition-all duration-300"
							className={`${sidebarActive === Paths.GenericContactUs ? 'reletive bg-[#CCE0F0] font-medium dark:bg-[#B1B1B133] transition-all duration-300' : ''}`}
						>
							<Link to={Paths.GenericContactUs} className="py-3 flex items-center gap-3" >
								{
									sidebarActive === Paths.GenericContactUs && <div
										className="absolute left-0 rounded-full w-1.5 h-8 bg-[#1B75BC] dark:bg-[#FFFFFF]"
									></div>
								}

								<img
									className="pl-5 dark:invert"
									src={feedbaclIcon}
									alt="Games & Survey icon"
								/>
								<span
									className="font-rubik text-[#000000] dark:text-[#FFFFFF] px-1 whitespace-nowrap"
								>
									Contact us
								</span>
							</Link>
						</li>

					</ul>
				</div>

				<div className="flex flex-col gap-12">
					<div id="menu_vector" className="w-full transition-all duration-300 px-7">
						<img
							className="transition-all duration-300 dark:hidden"
							src={menu_vector}
							alt="menu_vector"
						/>
						<img
							className="transition-all duration-300 hidden dark:block"
							src={menu_vector_dark}
							alt="menu_vector"
						/>
					</div>

					{/* <div className="flex items-center justify-center">
						<input id="checkbox" type="checkbox"
							checked={isDarkMode}
							onClick={(e) => {toggleDarkMode()}}
							className="hidden" />
						<label for="checkbox" className="flex items-center cursor-pointer">
							<div
								id="light_icon"
								className="w-full transition-all duration-300 mr-3"
							>
								<img
									className="dark:hidden"
									src={light_mode}
									alt="light_mode"
								/>
								<img
									className="hidden dark:block"
									src={Sun_dark}
									alt="light_mode"
								/>
							</div>

							<div className="relative">
								<div
									className="w-10 h-6 bg-[rgba(120, 120, 128, 0.36)] border border-[#AAAAAA] rounded-full shadow-inner dark:bg-[#FFFFFF0A]"
								></div>
								<div
									className="toggle-dot absolute w-5 h-5 bg-white border border-[rgba(0, 0, 0, 0.04)] rounded-full shadow inset-y-0 left-0 m-0.5 dark:bg-[#0D0D0D] dark:border-[#0D0D0D]"
								></div>
							</div>

							<div
								id="dark_icon"
								className="w-full transition-all duration-300 ml-3 text-[#202A31] font-rubik dark:text-[#CED8DF]"
							>
								<img
									className="dark:hidden"
									src={Moon}
									alt="dark_mode"
								/>
								<img
									className="hidden dark:block"
									src={moon_dark}
									alt="dark_mode_moon"
								/>
							</div>
						</label>
					</div> */}
				</div>
			</aside>
		</>
	)
}


export default GenericSideBar