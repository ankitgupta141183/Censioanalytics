import React, { useState, useEffect } from "react";
import './_UpgradeUniversityDashboard.scss'
import StatusChart from "./StatusChart";
import ChartOne from "./ChartOne";
import ChartTwo from "./ChartTwo";
import { Loader } from 'semantic-ui-react';
import { fetchGraphDetails } from '../../../Services/UniversityAdminServices/UniversityAdminServices'




const UpgradeUniversityDashboard = ({ isHeaderManu }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [graphData, setGraphData] = useState([])

  useEffect(() => {
    getAllStudentTableRecord()
  }, [])


  const getAllStudentTableRecord = async (type, body) => {
    setIsLoading(true)
    const graphRecord = await fetchGraphDetails()
    if (graphRecord.status === 200 && graphRecord.data.status !== 422) {
      setGraphData(graphRecord?.data)
      setIsLoading(false)
    } else {
      setIsLoading(false)
      // dispatch(showNotification(true, questionsOptions?.data ? questionsOptions?.data?.message : questionsOptions.error.response.data.error ? questionsOptions?.error?.response?.data.error : "Somthing went wrong."))
    }

  }


  return (
    <main className="talwind-dashboard max-w-xs mx-auto pt-24 pb-20 flex flex-col gap-6 w-full transition-all duration-300 sm:max-w-[420px] md:max-w-[calc(100vw-80px)] md:pl-16">
      <div id="main_section"
        className={isHeaderManu ? "flex flex-col gap-6 transition-all duration-30 md:w-[100%] lg:w-[100%] xl:w-[100%] 2xl:w-[100%] 3xl:w-[100%] md:ml-auto" : "flex flex-col gap-6 transition-all duration-30 md:w-[72%] lg:w-[79%] xl:w-[84.5%] 2xl:w-[86.5%] 3xl:w-[90%] md:ml-auto"}

      >
        <div className="pt-2">
          <span className="font-rubik font-semibold text-xl text-[#1A1919] md:text-2xl transition-all duration-300 dark:text-[#F5F5F5]">Student Performance Summary</span>
        </div>
        <div className="dashboard_content flex flex-col gap-6 xl:flex-row">
          <div className="status bg-[#FFFFFF] rounded-xl p-6 xl:w-2/5 flex flex-col gap-9 transition-all duration-300 dark:bg-[#212121]">
            {
              !isLoading && graphData ? <>
                <span className="text-[#1A1919] font-medium dark:text-[#F5F5F5]">UDC Total</span>
                <div className="myChart flex justify-center items-center">
                  <div className="relative flex justify-center items-center w-[196px] h-[196px]">
                    {/* <canvas id="statusChart" ref={chartRefOne} /> */}
                    <StatusChart
                      udcTotal={[graphData?.udc_total?.complete, graphData?.udc_total?.started]}
                    />
                    <div className="inner_txt absolute flex flex-col items-center justify-center">
                      <span className="text-[#1A1919] opacity-[0.6] text-sm transition-all duration-300 dark:text-[#F5F5F5]">Total</span>
                      <span className="text-[#1A1919] font-bold text-xl transition-all duration-300 dark:text-[#F5F5F5]">{graphData?.udc_total?.udc_user}</span>
                      <span className="text-[#1A1919] opacity-[0.6] text-sm transition-all duration-300 dark:text-[#F5F5F5]">Students</span>
                    </div>
                  </div>
                </div>
                <ul>
                  <li className="flex items-center justify-between py-4">
                    <span className="text-[#1A1919] font-medium transition-all duration-300 dark:text-[#F5F5F5]">Completed</span>
                    <span className="text-[#1B75BC] font-medium">{graphData?.udc_total?.complete}</span>
                  </li>
                  <li className="border border-[#00000033] transition-all duration-300 dark:border-[#F5F5F54D]" />
                  <li className="flex items-center justify-between py-4">
                    <span className="text-[#1A1919] font-medium transition-all duration-300 dark:text-[#F5F5F5]">Started</span>
                    <span className="text-[#1A1919] font-medium transition-all duration-300 dark:text-[#F5F5F5]">{graphData?.udc_total?.started}</span>
                  </li>

                </ul>
              </> : <div className="margin-top-loader" >
                <Loader size='big' active inline='centered' />
              </div>
            }

          </div>
          <div className="right w-full">
            <div className="right_chart w-full bg-[#FFFFFF] rounded-xl p-6 flex flex-col gap-6 transition-all duration-300 dark:bg-[#212121]">
              <ul className="chart_label flex items-center justify-center gap-6 lg:justify-start">
                <li className="flex items-center gap-2">
                  <div className="color_box w-4 h-4 rounded bg-[#1B75BC]" />
                  <span className="text-[#1A1919] text-sm transition-all duration-300 dark:text-[#F5F5F5]">Completed</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="color_box w-4 h-4 rounded bg-[#A4D1F4]" />
                  <span className="text-[#1A1919] text-sm transition-all duration-300 dark:text-[#F5F5F5]">Started</span>
                </li>

              </ul>
              <div className="chart_block flex flex-col gap-8 lg:flex-row lg:justify-around 3xl:justify-around">
                {
                  !isLoading && graphData ?
                    <div className="doughnut flex flex-col items-center gap-4 lg:gap-9">
                      <span className="text-[#1A1919] font-medium transition-all duration-300 dark:text-[#F5F5F5]">Van Ness</span>
                      <div className="max-w-[150px]">
                        <ChartOne
                          vanNass={[graphData?.van_ness?.completed, graphData?.van_ness?.started]}
                        />
                      </div>
                    </div> :
                    <div className="margin-top-loader" >
                      <Loader size='big' active inline='centered' />
                    </div>
                }

                {
                  !isLoading ?
                    <div className="doughnut flex flex-col items-center gap-4 lg:gap-9">
                      <span className="text-[#1A1919] font-medium transition-all duration-300 dark:text-[#F5F5F5]">Community College
                      </span>
                      <div className="max-w-[150px]">
                        <ChartTwo
                          communityCollege={[graphData?.community_college?.completed, graphData?.community_college?.started]}
                        />
                      </div>
                    </div>
                    :
                    <div className="margin-top-loader" >
                      <Loader size='big' active inline='centered' />
                    </div>
                }



              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}


export default UpgradeUniversityDashboard;