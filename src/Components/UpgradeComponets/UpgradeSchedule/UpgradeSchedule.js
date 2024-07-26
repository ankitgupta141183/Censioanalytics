
import React from "react";
import './_UpgradeSchedule.scss'
const UpgradeSchedule = ({ isHeaderManu }) => {

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
              className="font-rubik font-semibold text-xl md:text-2xl text-[#1A1919] dark:text-[#F5F5F5]">Schedule</span>
          </div>
          <div
            className="bg-white p-4 rounded-lg dark:bg-[#212121] transition-all duration-300 flex flex-col gap-2"
          >
            <div className="pb-2 flex flex-col gap-3">
              <span
                className="text-[#1A1919] font-rubik font-medium dark:text-[#F5F5F5]"
              >Game Completion Status</span>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              <div
                className="py-2 px-6 bg-[#EEEEEE] rounded-md flex items-center justify-between dark:bg-[#303030] transition-all duration-300"
              >
                <span
                  className="font-semibold font-rubik text-[#1A1919] dark:text-[#F5F5F5]"
                >Game 1</span>
                <div className="flex items-center gap-4">
                  <div
                    className="w-[80px] h-1 bg-[#EDEDED] border border-dashed border-[#BDC0C4] rounded-lg dark:bg-[#7D7D7D4D] transition-all duration-300 dark:border-[#F5F5F54D]"
                  >
                    <div className="w-[25%] h-full bg-[#1B75BC]"></div>
                  </div>
                  <span className="text-[#656575] dark:text-[#B1B1B1]">25%</span>
                </div>
              </div>
              <div
                className="py-2 px-6 bg-[#EEEEEE] rounded-md flex items-center justify-between dark:bg-[#303030] transition-all duration-300"
              >
                <span
                  className="font-semibold font-rubik text-[#1A1919] dark:text-[#F5F5F5]"
                >Game 2</span>
                <div className="flex items-center gap-4">
                  <div
                    className="w-[80px] h-1 bg-[#EDEDED] border border-dashed border-[#BDC0C4] rounded-lg dark:bg-[#7D7D7D4D] transition-all duration-300 dark:border-[#F5F5F54D]"
                  >
                    <div className="w-[15%] h-full bg-[#1B75BC]"></div>
                  </div>
                  <span className="text-[#656575] dark:text-[#B1B1B1]">15%</span>
                </div>
              </div>
              <div
                className="py-2 px-6 bg-[#EEEEEE] rounded-md flex items-center justify-between dark:bg-[#303030] transition-all duration-300"
              >
                <span
                  className="font-semibold font-rubik text-[#1A1919] dark:text-[#F5F5F5]"
                >Game 3</span>
                <div className="flex items-center gap-4">
                  <div
                    className="w-[80px] h-1 bg-[#EDEDED] border border-dashed border-[#BDC0C4] rounded-lg dark:bg-[#7D7D7D4D] transition-all duration-300 dark:border-[#F5F5F54D]"
                  >
                    <div className="w-[0%] h-full bg-[#1B75BC]"></div>
                  </div>
                  <span className="text-[#656575] dark:text-[#B1B1B1]" n>0%</span>
                </div>
              </div>
              <div
                className="py-2 px-6 bg-[#EEEEEE] rounded-md flex items-center justify-between dark:bg-[#303030] transition-all duration-300"
              >
                <span
                  className="font-semibold font-rubik text-[#1A1919] dark:text-[#F5F5F5]"
                >Game 4</span>
                <div className="flex items-center gap-4">
                  <div
                    className="w-[80px] h-1 bg-[#EDEDED] border border-dashed border-[#BDC0C4] rounded-lg dark:bg-[#7D7D7D4D] transition-all duration-300 dark:border-[#F5F5F54D]"
                  >
                    <div className="w-[40%] h-full bg-[#1B75BC]"></div>
                  </div>
                  <span className="text-[#656575] dark:text-[#B1B1B1]">40%</span>
                </div>
              </div>
              <div
                className="py-2 px-6 bg-[#EEEEEE] rounded-md flex items-center justify-between dark:bg-[#303030] transition-all duration-300"
              >
                <span
                  className="font-semibold font-rubik text-[#1A1919] dark:text-[#F5F5F5]"
                >Game 5</span>
                <div className="flex items-center gap-4">
                  <div
                    className="w-[80px] h-1 bg-[#EDEDED] border border-dashed border-[#BDC0C4] rounded-lg dark:bg-[#7D7D7D4D] transition-all duration-300 dark:border-[#F5F5F54D]"
                  >
                    <div className="w-[25%] h-full bg-[#1B75BC]"></div>
                  </div>
                  <span className="text-[#656575] dark:text-[#B1B1B1]">25%</span>
                </div>
              </div>
              <div
                className="py-2 px-6 bg-[#EEEEEE] rounded-md flex items-center justify-between dark:bg-[#303030] transition-all duration-300"
              >
                <span
                  className="font-semibold font-rubik text-[#1A1919] dark:text-[#F5F5F5]">SX<sup>2</sup> Survey</span>
                <div className="flex items-center gap-4">
                  <div
                    className="w-[80px] h-1 bg-[#EDEDED] border border-dashed border-[#BDC0C4] rounded-lg dark:bg-[#7D7D7D4D] transition-all duration-300 dark:border-[#F5F5F54D]"
                  >
                    <div className="w-[12.14%] h-full bg-[#1B75BC]"></div>
                  </div>
                  <span className="text-[#656575] dark:text-[#B1B1B1]">12.14%</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="py-2">
              {/* <span
                className="text-[#1A1919] font-rubik font-medium dark:text-[#F5F5F5]"
              >Lorem Ipsum</span> */}
            </div>
            <div
              className="p-4 w-full bg-white rounded-lg dark:bg-[#212121] transition-all duration-300"
            >
              <table className="w-full">
                <thead
                  className="border-b-[2px] border-[rgba(32, 42, 49, 0.3)] dark:border-[#656575] transition-all duration-300"
                >
                  <th className="pb-4"></th>
                  <th className="pb-4 text-[#656575] font-semibold">Status</th>
                  <th className="pb-4 text-[#656575] font-semibold">Due Date</th>
                </thead>
                <tbody>
                  <tr>
                    <td
                      className="text-center p-4 text-[#1A1919] font-medium dark:text-[#F5F5F5]"
                    >
                      Game 1
                    </td>
                    <td
                      className="text-center p-4 text-[#39434F] dark:text-[#B1B1B1]"
                    >
                      Complete
                    </td>
                    <td
                      className="text-center p-4 text-[#39434F] dark:text-[#B1B1B1]"
                    >
                      Aug 20, 2023
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="text-center p-4 text-[#1A1919] font-medium dark:text-[#F5F5F5]"
                    >
                      Game 2
                    </td>
                    <td
                      className="text-center p-4 text-[#39434F] dark:text-[#B1B1B1]"
                    >
                      Not Started
                    </td>
                    <td
                      className="text-center p-4 text-[#39434F] dark:text-[#B1B1B1]"
                    >
                      Aug 22, 2023
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="text-center p-4 text-[#1A1919] font-medium dark:text-[#F5F5F5]"
                    >
                      Game 3
                    </td>
                    <td
                      className="text-center p-4 text-[#39434F] dark:text-[#B1B1B1]"
                    >
                      Not Started
                    </td>
                    <td
                      className="text-center p-4 text-[#39434F] dark:text-[#B1B1B1]"
                    >
                      Aug 24, 2023
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="text-center p-4 text-[#1A1919] font-medium dark:text-[#F5F5F5]"
                    >
                      Game 4
                    </td>
                    <td
                      className="text-center p-4 text-[#39434F] dark:text-[#B1B1B1]"
                    >
                      Not Started
                    </td>
                    <td
                      className="text-center p-4 text-[#39434F] dark:text-[#B1B1B1]"
                    >
                      Aug 26, 2023
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="text-center p-4 text-[#1A1919] font-medium dark:text-[#F5F5F5]"
                    >
                      Game 5
                    </td>
                    <td
                      className="text-center p-4 text-[#39434F] dark:text-[#B1B1B1]"
                    >
                      Not Started
                    </td>
                    <td
                      className="text-center p-4 text-[#39434F] dark:text-[#B1B1B1]"
                    >
                      Aug 28, 2023
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="text-center p-4 text-[#1A1919] font-medium dark:text-[#F5F5F5]"
                    >
                      SX<sup>2</sup> Survey
                    </td>
                    <td
                      className="text-center p-4 text-[#39434F] dark:text-[#B1B1B1] dark"
                    >
                      Not Started
                    </td>
                    <td
                      className="text-center p-4 text-[#39434F] dark:text-[#B1B1B1]"
                    >
                      Aug 30, 2023
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}


export default UpgradeSchedule