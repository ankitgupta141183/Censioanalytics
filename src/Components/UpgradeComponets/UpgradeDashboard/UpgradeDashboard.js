import React, { useEffect, useState } from "react";
import missionBanner from '../../../assets/upgrade-images/mission-banner.svg'
import missionBannerDark from '../../../assets/upgrade-images/mission-banner_dark.svg'
import { fetchGamesPercentages } from '../../../Services/UpgradeDashboardServices/UpgradeDashboardServices'
import "./_UpgradeDashboard.scss"
import "../_Progress.scss";
import { useSelector } from 'react-redux'
import { Loader } from 'semantic-ui-react';
import YourProgress from "../../CommonComponent/StaticJsx/YourProgress";

const UpgradeDashboard = ({ isHeaderManu }) => {

  const [gamesProgressPercentage, setGamesProgressPercentage] = useState([])

  const { profileReducer } = useSelector(state => state)
  const profileDetail = profileReducer?.profileDetail?.data?.user
  const userName = profileDetail?.first_name ? profileDetail?.first_name + " " + profileDetail?.last_name : ""
  // const [isLoading, setIsLoading] = useState(false)
  const [isPresent, setIsPresent] = useState(false)

  useEffect(() => {
    fetchGamesProgressData()
     // eslint-disable-next-line 
  }, [])

  const filterObject = (obj) => {
    let valuesInArray = Object.keys(obj).map(keyName => ({ key: keyName, value: obj[keyName] }))
    return valuesInArray
  }

  const fetchGamesProgressData = async () => {
    // setIsLoading(true)
    let progressData = await fetchGamesPercentages()
    let length = Object.keys(progressData?.data).length;
    if (length > 0) {
      let your_progress = filterObject(progressData?.data?.game_coverage)
      let cohort_progress = filterObject(progressData?.data?.cohort_progress)
      setGamesProgressPercentage({ your_progress, cohort_progress })
      if (your_progress.length === 0) {
        console.log("zero")
        setIsPresent(true)
      }
      else {
        setIsPresent(false)
      }
      // setIsLoading(false)
    }
  }


  function calculateDays(dateString) {
    var currentDate = new Date()
    var inputDate = new Date(dateString)
    var timeDiff = inputDate.getTime() - currentDate.getTime()
    var days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return days;
  }

  function circleProgressBar(containerIndex, progressEndValue) {
    let progressBar = document.querySelector(".container" + containerIndex);
    let barValue = document.querySelector(".container-value" + containerIndex);
    let progressValue = 0;
    let speed = 30;
    let progress = setInterval(() => {
      progressValue++;
      if (barValue) {
        barValue.textContent = `${progressValue}%`;
        progressBar.style.background = `conic-gradient(
            #F5AB3C,  #F53C3C ${progressValue * 3.6}deg,
            #f0f5ff ${progressValue * 3.6}deg
        )`;
      }
      if (progressValue === progressEndValue) {
        clearInterval(progress);
      }
    }, speed);
  }

  useEffect(() => {
    if (gamesProgressPercentage?.cohort_progress) {
      gamesProgressPercentage?.cohort_progress.map((items, index) => circleProgressBar(index + 1, items.value))
    }
  }, [gamesProgressPercentage?.cohort_progress])


  return (
    <>
      <main
        className="talwind-dashboard max-w-xs mx-auto pt-24 pb-20 flex flex-col gap-6 w-full transition-all duration-300 sm:max-w-[420px] md:max-w-[calc(100vw-80px)] md:pl-16"
      >
        <div
          id="main_section"
          className={isHeaderManu ? "flex flex-col gap-6 transition-all duration-30 md:w-[100%] lg:w-[100%] xl:w-[100%] 2xl:w-[100%] 3xl:w-[100%] md:ml-auto" : "flex flex-col gap-6 transition-all duration-30 md:w-[72%] lg:w-[79%] xl:w-[84.5%] 2xl:w-[86.5%] 3xl:w-[90%] md:ml-auto"}
        >
          <div
            className="relative hero-head flex flex-col items-center gap-8 mt-10 p-4 md:p-12 lg:flex lg:flex-row lg:items-center bg-[#CCE0F080] rounded-2xl md:pl-8 lg:mt-16 dark:bg-[#B1B1B133] transition-all duration-300"
          >
            <div
              className="w-full pl-4 lg:pl-0 md:w-[440px] lg:w-[400px] flex flex-col gap-6"
            >
              <h1
                className="font-rubik font-medium text-lg md:text-xl dark:text-[#F5F5F5]"
              >

                <span className="font-rubik font-bold text-xl md:text-2xl"> Hello  {userName}</span>

              </h1>
              <h2 className="dark:text-[#F5F5F5]"> Welcome!</h2>
            </div>
            <div
              className="lg:absolute right-[0%] -top-[30%] xl:right-[15%] 2xl:right-[18%] 3xl:right-[23%]"
            >
              <img
                className="transition-all duration-300 dark:hidden"
                src={missionBanner}
                alt=""
              />
              <img
                className="transition-all duration-300 hidden dark:block"
                src={missionBannerDark}
                alt=""
              />
            </div>
          </div>


          <div className="hero grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div
              className="card-1 flex flex-col gap-6 w-full bg-[#FFFFFF] p-6 rounded-2xl dark:bg-[#212121] transition-all duration-300"
            >
              <div
                className="card-head border-b border-[#202A31] border-opacity-30 pb-3 dark:border-[#CED8DF4D]"
              >
                <h2
                  className="font-rubik font-medium text-base text-[#1A1919] dark:text-[#F5F5F5]"
                >
                  Your Progress
                </h2>
              </div>
              <div className="card-body flex flex-col gap-6">
                {
                  isPresent && <YourProgress/>
                }
                {
                  gamesProgressPercentage.your_progress ?
                    gamesProgressPercentage?.your_progress.map((games, index) => {
                      return <>
                        <div>
                          <h2
                            className="font-rubik font-medium text-base text-[#1A1919] dark:text-[#F5F5F5]"
                          >
                            Game {index + 1}
                          </h2>

                          <div
                            className="bar-block flex justify-between items-center gap-6"
                          >
                            <div
                              className="bar1 w-full h-2.5 overflow-hidden bg-[#ededed4d] rounded-2xl border-dashed border-[Neutral/ 50] border-[0.497577px] transition-all duration-300 dark:border-[#F5F5F54D] dark:border-[#F5F5F54D]"
                            >
                              <div className={games.value ? `front-bar1 h-2.5 bg-[#1B75BC] rounded-2xl w-[${games.value}%]` : "front-bar1 h-2.5 bg-[#1B75BC] rounded-2xl w-[0%] "}></div>
                            </div>
                            <div
                              className="bar-value1 font-rubik text-base text-[#39434F] dark:text-[#B1B1B1]"
                            >
                              {games.value > 0 ? `${games.value + "%"}` : `${"0%"}`}
                            </div>
                          </div>
                        </div>
                      </>
                    }) : <div className="margin-top-loader" >
                      {

                      }
                      <Loader size='big' active inline='centered' />
                    </div>
                }

                <div>
                  <h2
                    className="font-rubik font-medium text-base text-[#1A1919] dark:text-[#F5F5F5]"
                  >
                    SX<sup>2</sup> Survey
                  </h2>

                  <div
                    className="bar-block flex justify-between items-center gap-6"
                  >
                    <div
                      className="bar1 w-full h-2.5 overflow-hidden bg-[#ededed4d] rounded-2xl border-dashed border-[Neutral/ 50] border-[0.497577px] transition-all duration-300 dark:border-[#F5F5F54D]"
                    >
                      <div
                        className="front-bar6 h-2.5 bg-[#1B75BC] rounded-2xl w-[10%]"
                      ></div>
                    </div>
                    <div
                      className="bar-value1 font-rubik text-base text-[#39434F] dark:text-[#B1B1B1]"
                    >
                      10%
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div
              className="card-2 bg-[#FFFFFF] p-6 rounded-2xl dark:bg-[#212121] transition-all duration-300"
            >
              <div>
                <div className="card-head pb-8">
                  <h2
                    className="font-rubik font-medium text-base text-[#1A1919] dark:text-[#F5F5F5]"
                  >
                    Your Cohort’s Progress
                  </h2>
                </div>
                <div className="card-body flex flex-col gap-4">

                  {
                    gamesProgressPercentage?.cohort_progress ?
                      gamesProgressPercentage?.cohort_progress.map((cohortItems, index) => {

                        return <>
                          <div className="flex justify-between items-center">
                            <h2
                              className="font-rubik font-medium text-base text-[#1A1919] dark:text-[#F5F5F5]"
                            >
                              Game {index + 1}
                            </h2>
                            <div className="relative">
                              <div
                                className={`container${index + 1} transition-all duration-300 dark:before:bg-[#212121]`}
                              >
                                <div
                                  className={`container-value${index + 1} transition-all duration-300 bg-gradient-to-r from-[#F53C3C] to-[#F5AB3C] bg-clip-text text-transparent`}
                                >
                                  {cohortItems.value > 0 ? `${cohortItems.value + "%"}` : `${"0%"}`}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      })
                      : <div className="margin-top-loader" >
                        <Loader size='big' active inline='centered' />
                      </div>
                  }

                  {
                    gamesProgressPercentage?.cohort_progress &&
                    <div className="flex justify-between items-center">
                      <h2
                        className="font-rubik font-medium text-base text-[#1A1919] dark:text-[#F5F5F5]"
                      >
                        SX<sup>2</sup> Survey
                      </h2>
                      <div className="relative">
                        <div
                          className="container6 transition-all duration-300 dark:before:bg-[#212121]"
                        >
                          <div
                            className="container-value6 transition-all duration-300 dark:text-[#F5F5F5]"
                          >
                            0%
                          </div>
                        </div>
                      </div>
                    </div>
                  }

                </div>
              </div>
            </div>

            <div
              className="card-3 w-full bg-[#FFFFFF] p-6 rounded-2xl dark:bg-[#212121] transition-all duration-300"
            >
              <div className="card-head pb-8">
                <h2
                  className="font-rubik font-medium text-base text-[#1A1919] dark:text-[#F5F5F5]"
                >
                  Time Table
                </h2>
              </div>
              <div className="card-body flex flex-col gap-4">
                <div
                  className="time-block relative flex rounded-l-sm overflow-hidden rounded-r-lg justify-between py-2 px-6 shadow-[0px_8px_24px_rgba(69,69,80,0.1)] bg-[#FDFDFD] dark:bg-[#303030] transition-all duration-300"
                >
                  <div
                    className="w-1 h-16 bg-[#42E8E0] rounded-sm absolute top-0 left-0"
                  ></div>
                  <div>
                    <p
                      className="font-rubik text-sm text-[#656575] pb-0.5 dark:text-[#B1B1B1]"
                    >
                      Aug 20
                    </p>
                    <h3
                      className="font-rubik font-semibold text-base text-[#1A1919] dark:text-[#F5F5F5]"
                    >
                      Game 1
                    </h3>
                  </div>
                  <div>
                    <span
                      className="text-[#656575] font-rubik bg-[#F8F7F1] rounded-sm text-xs py-1 px-2 dark:bg-[#121212] dark:text-[#B4B4B4] transition-all duration-300"
                    >Due</span>
                    <p><small className="text-[#00FF00]" >{calculateDays("2023-08-20")} days left</small></p>
                  </div>
                </div>

                <div
                  className="time-block relative flex rounded-l-sm overflow-hidden rounded-r-lg justify-between py-2 px-6 shadow-[0px_8px_24px_rgba(69,69,80,0.1)] bg-[#FDFDFD] dark:bg-[#303030] transition-all duration-300"
                >
                  <div
                    className="w-1 h-16 bg-[#77C05C] rounded-sm absolute top-0 left-0"
                  ></div>
                  <div>
                    <p
                      className="font-rubik text-sm text-[#656575] pb-0.5 dark:text-[#B1B1B1]"
                    >
                      Aug 22
                    </p>
                    <h3
                      className="font-rubik font-semibold text-base text-[#1A1919] dark:text-[#F5F5F5]"
                    >
                      Game 2
                    </h3>

                  </div>
                  <div>
                    <span
                      className="text-[#656575] font-rubik bg-[#F8F7F1] rounded-sm text-xs py-1 px-2 dark:bg-[#121212] dark:text-[#B4B4B4] transition-all duration-300"
                    >Due</span>
                    <p><small className="text-[#00FF00]">{calculateDays("2023-08-22")} days left</small> </p>
                  </div>
                </div>

                <div
                  className="time-block relative flex rounded-l-sm overflow-hidden rounded-r-lg justify-between py-2 px-6 shadow-[0px_8px_24px_rgba(69,69,80,0.1)] bg-[#FDFDFD] dark:bg-[#303030] transition-all duration-300"
                >
                  <div
                    className="w-1 h-16 bg-[#FF8676] rounded-sm absolute top-0 left-0"
                  ></div>
                  <div>
                    <p
                      className="font-rubik text-sm text-[#656575] pb-0.5 dark:text-[#B1B1B1]"
                    >
                      Aug 24
                    </p>
                    <h3
                      className="font-rubik font-semibold text-base text-[#1A1919] dark:text-[#F5F5F5]"
                    >
                      Game 3
                    </h3>
                  </div>
                  <div>
                    <span
                      className="text-[#656575] font-rubik bg-[#F8F7F1] rounded-sm text-xs py-1 px-2 dark:bg-[#121212] dark:text-[#B4B4B4] transition-all duration-300"
                    >Due</span >
                    <p><small className="text-[#00FF00]">{calculateDays("2023-08-24")} days left</small> </p>
                  </div>
                </div>

                <div
                  className="time-block relative flex rounded-l-sm overflow-hidden rounded-r-lg justify-between py-2 px-6 shadow-[0px_8px_24px_rgba(69,69,80,0.1)] bg-[#FDFDFD] dark:bg-[#303030] transition-all duration-300"
                >
                  <div
                    className="w-1 h-16 bg-[#4136A4] rounded-sm absolute top-0 left-0"
                  ></div>
                  <div>
                    <p
                      className="font-rubik text-sm text-[#656575] pb-0.5 dark:text-[#B1B1B1]"
                    >
                      Aug 26
                    </p>
                    <h3
                      className="font-rubik font-semibold text-base text-[#1A1919] dark:text-[#F5F5F5]"
                    >
                      Game 4
                    </h3>
                  </div>
                  <div>
                    <span
                      className="text-[#656575] font-rubik bg-[#F8F7F1] rounded-sm text-xs py-1 px-2 dark:bg-[#121212] dark:text-[#B4B4B4] transition-all duration-300"
                    >Due</span>
                    <p><small className="text-[#00FF00]">{calculateDays("2023-08-26")} days left</small></p>
                  </div>
                </div>

                <div
                  className="time-block relative flex rounded-l-sm overflow-hidden rounded-r-lg justify-between py-2 px-6 shadow-[0px_8px_24px_rgba(69,69,80,0.1)] bg-[#FDFDFD] dark:bg-[#303030] transition-all duration-300"
                >
                  <div
                    className="w-1 h-16 bg-[#7D7D7D] rounded-sm absolute top-0 left-0"
                  ></div>
                  <div>
                    <p
                      className="font-rubik text-sm text-[#656575] pb-0.5 dark:text-[#B1B1B1]"
                    >
                      Aug 30
                    </p>
                    <h3
                      className="font-rubik font-semibold text-base text-[#1A1919] dark:text-[#F5F5F5]"
                    >
                      SX<sup>2</sup> Survey
                    </h3>
                  </div>
                  <div>
                    <span
                      className="text-[#656575] font-rubik bg-[#F8F7F1] rounded-sm text-xs py-1 px-2 dark:bg-[#121212] dark:text-[#B4B4B4] transition-all duration-300"
                    >Due</span>
                    <p><small className="text-[#00FF00]">{calculateDays("2023-08-30")} days left</small></p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* <div className="notification pb-[60px]">
            <div className="pb-4">
              <h2
                className="font-rubik font-medium text-base text-[#1A1919] dark:text-[#F5F5F5]"
              >
                Notifications
              </h2>
            </div>
            <div className="grid gap-6 md:grid md:grid-cols-2 md:gap-6">
              <div
                className="noti-card py-4 pl-6 bg-[#FFFFFF] rounded-r-lg flex items-center relative dark:bg-[#212121] transition-all duration-300"
              >
                <div
                  className="left-bar w-1.5 h-20 bg-[#7D7D7D] rounded-sm absolute top-0 left-0"
                ></div>
                <div>
                  <h2
                    className="font-rubik font-semibold text-base text-[#1A1919] dark:text-[#F5F5F5]"
                  >
                    Principle Component Analysis
                  </h2>
                  <h3
                    className="font-rubik text-base text-[#656575] dark:text-[#B1B1B1]"
                  >
                    9:00 AM - 10:00 AM,
                    <span
                      className="font-rubik font-semibold text-base text-[#656575] dark:text-[#B1B1B1]"
                    >7th Jun 2023</span>
                  </h3>
                </div>
              </div>

              <div
                className="noti-card py-4 pl-6 bg-[#FFFFFF] rounded-r-lg flex items-center relative dark:bg-[#212121] transition-all duration-300"
              >
                <div
                  className="left-bar w-1.5 h-20 bg-[#7D7D7D] rounded-sm absolute top-0 left-0"
                ></div>
                <div>
                  <h2
                    className="font-rubik font-semibold text-base text-[#1A1919] dark:text-[#F5F5F5]"
                  >
                    Principle Component Analysis
                  </h2>
                  <h3
                    className="font-rubik text-base text-[#656575] dark:text-[#B1B1B1]"
                  >
                    9:00 AM - 10:00 AM,
                    <span
                      className="font-rubik font-semibold text-base text-[#656575] dark:text-[#B1B1B1]"
                    >7th Jun 2023</span>
                  </h3>
                </div>
              </div>

              <div
                className="noti-card py-4 pl-6 bg-[#FFFFFF] rounded-r-lg flex items-center relative dark:bg-[#212121] transition-all duration-300"
              >
                <div
                  className="left-bar w-1.5 h-20 bg-[#7D7D7D] rounded-sm absolute top-0 left-0"
                ></div>
                <div>
                  <h2
                    className="font-rubik font-semibold text-base text-[#1A1919] dark:text-[#F5F5F5]"
                  >
                    Principle Component Analysis
                  </h2>
                  <h3
                    className="font-rubik text-base text-[#656575] dark:text-[#B1B1B1]"
                  >
                    9:00 AM - 10:00 AM,
                    <span
                      className="font-rubik font-semibold text-base text-[#656575] dark:text-[#B1B1B1]"
                    >7th Jun 2023</span>
                  </h3>
                </div>
              </div>

              <div
                className="noti-card py-4 pl-6 bg-[#FFFFFF] rounded-r-lg flex items-center relative dark:bg-[#212121] transition-all duration-300"
              >
                <div
                  className="left-bar w-1.5 h-20 bg-[#7D7D7D] rounded-sm absolute top-0 left-0"
                ></div>
                <div>
                  <h2
                    className="font-rubik font-semibold text-base text-[#1A1919] dark:text-[#F5F5F5]"
                  >
                    Principle Component Analysis
                  </h2>
                  <h3
                    className="font-rubik text-base text-[#656575] dark:text-[#B1B1B1]"
                  >
                    9:00 AM - 10:00 AM,
                    <span
                      className="font-rubik font-semibold text-base text-[#656575] dark:text-[#B1B1B1]"
                    >7th Jun 2023</span>
                  </h3>
                </div>
              </div>
            </div>
          </div> */}

        </div>
      </main>
    </>
  )
}


export default UpgradeDashboard;