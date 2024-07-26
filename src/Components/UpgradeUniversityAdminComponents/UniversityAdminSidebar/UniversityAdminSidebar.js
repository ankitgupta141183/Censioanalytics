import React, { useEffect, useState } from "react";
import './UniversityAdminSidebar'
// import light_mode from '../../../assets/upgrade-images/light_mode.svg'
// import Sun_dark from '../../../assets/upgrade-images/Sun_dark.svg'
// import Moon from '../../../assets/upgrade-images/Moon.svg'
// import moon_dark from '../../../assets/upgrade-images/moon_dark.svg'
import UnivercityDashboard from '../../../assets/upgrade-images/university_admin_dashboard.svg'
import UniversityBadge from '../../../assets/upgrade-images/university_admin_badge.svg'
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom";
// import { Paths } from "../../routes/routePaths";

const UniversityAdminSidebar = ({ isHeaderManu }) => {

  const history = useHistory()
  const [sidebarActive, setSidebarActive] = useState('/upgrade-dashboard')
  useEffect(() => {
    setSidebarActive(history.location.pathname)
  }, [history.location.pathname])


  const checkbox = document.querySelector("#checkbox");
	const html = document.querySelector("html");
	const toggleDarkMode = function () {
		checkbox.checked ? html.classList.add("dark") : html.classList.remove("dark");
		// checkbox.checked ? setIsDarkMode(true) : setIsDarkMode(false)

	};
	//calling the function directly toggleDarkMode();
	if (checkbox) {
		checkbox.addEventListener("click", toggleDarkMode);
	}

  return (
    <aside id="sidebar"
      className={`${isHeaderManu ? "talwind-dashboard fixed left-0 pt-20 pb-8 w-0 bg-white h-full flex flex-col justify-between overflow-x-hidden transition-all duration-300 dark:bg-[#212121] md:w-16 w-64 z-10" : "talwind-dashboard fixed left-0 pt-20 pb-8 w-0 bg-white h-full flex flex-col justify-between overflow-x-hidden transition-all duration-300 dark:bg-[#212121] md:w-64 w-0 z-10"}`}
    >
      <div>
        <ul className="py-4">
          <li
            // className="reletive bg-[#CCE0F0] font-medium dark:bg-[#B1B1B133] transition-all duration-300"
            className={`${sidebarActive === '/university-dashboard' ? 'reletive bg-[#CCE0F0] font-medium dark:bg-[#B1B1B133] transition-all duration-300' : ''}`}
          >
            <Link className="flex items-center py-3 gap-6" to={"/university-dashboard"} >
              {
                sidebarActive === '/university-dashboard' && <div
                  className="absolute left-0 rounded-full w-1.5 h-8 bg-[#1B75BC] dark:bg-[#FFFFFF] transition-all duration-300"
                >	</div>
              }

              <img className="pl-6 dark:invert dark:grayscale" src={UnivercityDashboard} alt="Dashboard_icon" />
              <span className="font-rubik text-[#114E7D] dark:text-[#FFFFFF] px-2 whitespace-nowrap">Dashboard</span>
            </Link>
          </li>
          <li
            className={`${sidebarActive === '/university-student-score' ? 'reletive bg-[#CCE0F0] font-medium dark:bg-[#B1B1B133] transition-all duration-300' : ''}`}
          >
            <Link className="opacity-75 py-3 flex items-center gap-6" to={"/university-student-score"} >
              <img className="pl-6 dark:invert" src={UniversityBadge} alt="badge" />
              {
                sidebarActive === '/university-student-score' && <div
                  className="absolute left-0 rounded-full w-1.5 h-8 bg-[#1B75BC] dark:bg-[#FFFFFF] transition-all duration-300"
                >	</div>
              }
              <span className="font-rubik text-[#202A31] dark:text-[#CED8DF] px-2 whitespace-nowrap">Overall Score</span>
            </Link>
          </li>
        </ul>
        {/* <div className="hr border border-[#B1B1B1] md:hidden" /> */}
        {/* <div className="viewProfile flex items-center px-4 py-6 gap-4 md:hidden">
          <div className="userImg">
            <img src="../assets/user-icon.svg" alt="user-icon" />
          </div>
          <div className="userProfile flex flex-col gap-1">
            <span className="text-[#212121] text-sm font-semibold dark:text-[#F5F5F5]">Aayush Rathoree</span>
            <span className="text-[#212121] text-xs dark:text-[#F5F5F5]" onclick="userToggle()">View your profile</span>
          </div>
        </div> */}
      </div>
      {/* <div className="flex flex-col gap-12">
        <div className="flex items-center justify-center">
          <input id="checkbox" type="checkbox" className="hidden" onClick={(e) => {toggleDarkMode()}} />
          <label htmlFor="checkbox" className="flex items-center cursor-pointer">
            <div id="light_icon" className="w-full transition-all duration-300 mr-3">
              <img className="dark:hidden" src={light_mode} alt="light_mode" />
              <img className="hidden dark:block" src={Sun_dark} alt="light_mode" />
            </div>
            <div className="relative">
              <div className="w-10 h-6 bg-[rgba(120, 120, 128, 0.36)] border border-[#AAAAAA] rounded-full shadow-inner dark:bg-[#FFFFFF0A]" />
              <div className="toggle-dot absolute w-5 h-5 bg-[#F5F5F5] border border-[rgba(0, 0, 0, 0.04)] rounded-full shadow inset-y-0 left-0 m-0.5 dark:bg-[#0D0D0D] dark:border-[#0D0D0D]" />
            </div>
            <div id="dark_icon" className="w-full transition-all duration-300 ml-3 text-[#202A31] font-rubik dark:text-[#CED8DF]">
              <img className="dark:hidden" src={Moon} alt="dark_mode" />
              <img className="hidden dark:block" src={moon_dark} alt="dark_mode_moon" />
            </div>
          </label>
        </div>
      </div> */}
    </aside>
  )
}


export default UniversityAdminSidebar;