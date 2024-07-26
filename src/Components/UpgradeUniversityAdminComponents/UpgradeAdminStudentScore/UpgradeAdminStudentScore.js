import React, { useState, useEffect, useMemo } from "react"
import './_UpgradeAdminStudentScore.scss'
import iconChev_down from '../../../assets/upgrade-images/icon_chev_down.svg'
import StatudentScoreChart from "./StatudentScoreChart"
import AdminPaginationComponent from "../UniversityAdminPagination/AdminPaginationComponent/AdminPaginationComponent"
import { fetchAllStudentTableRecord } from '../../../Services/UniversityAdminServices/UniversityAdminServices'
import { showNotification } from "../../../Actions/componentActions";
import { CSVDownload } from 'react-csv';
import { Loader } from 'semantic-ui-react';
import { useDispatch } from "react-redux"
import LoaderLineSvg from "../../CommonComponent/LoaderLineSvg/LoaderLineSvg"
import ProfileOptions from '../../../StaticData/ProfileOptions'
import CommonProfileOptions from '../../CommonComponent/StaticData/ProfileOptions'

const UpgradeAdminStudentScore = ({ isHeaderManu }) => {
  const [studentsRecords, setStudentsRecords] = useState({ result: [] })
  const [graphCounts, setGraphCounts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [studentsCsvData, setStudentsCsvData] = useState({ export_data: [] })
  const [isdisable, setIsdisable] = useState(false)
  const [dropdownValues, setDropDownValues] = useState(CommonProfileOptions.adminFilterDropDown)
  const [showGame, setShowGame] = useState(1)
  const [isGraphData, setIsGraphData] = useState(false)
  const [gameValue, setGameValue] = useState("Game 1")
  const dispatch = useDispatch()
  let PageSize = 5;
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    getAllStudentTableRecord()
    setCurrentPage(1)
    // eslint-disable-next-line 
  }, [])

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return studentsRecords?.result?.slice(firstPageIndex, lastPageIndex)
    // eslint-disable-next-line 
  }, [currentPage, studentsRecords]);


  const getAllStudentTableRecord = async (type, body) => {
    setIsLoading(true)
    const studentRecord = await (type === 'filter' && Object.getOwnPropertyNames(body).length !== 0 ?
      fetchAllStudentTableRecord(JSON.stringify(body)) : fetchAllStudentTableRecord(false))
    if (studentRecord.status === 200 && studentRecord.data.status !== 422) {
      setStudentsRecords(studentRecord?.data)
      console.log("studentRecord.data?.game_count", studentRecord.data?.game_count)
      filterGamesObjectIntoArray(studentRecord.data?.game_count)
      setCurrentPage(1)
      setIsLoading(false)
    } else {
      setIsLoading(false)
      // dispatch(showNotification(true, questionsOptions?.data ? questionsOptions?.data?.message : questionsOptions.error.response.data.error ? questionsOptions?.error?.response?.data.error : "Somthing went wrong."))
    }

  }

  const filterGamesObjectIntoArray = (data) => {
    let arrayObject = Object.values(data)
    setGraphCounts(arrayObject)
  }

  const getRecordToDownload = async (e) => {
    e.preventDefault()
    let isFilterValue = !Object.values(dropdownValues).every((val) => val === "") ? JSON.stringify(filterRemoveEmptyKeys()) : false
    setStudentsCsvData({ export_data: [] })
    setIsdisable(true)
    const fetchedCsvData = await fetchAllStudentTableRecord(isFilterValue)
    if (fetchedCsvData.status === 200 && fetchedCsvData.data.status !== 422) {
      if (fetchedCsvData.data?.result) {
        let downloadResponse = fetchedCsvData.data?.result.map((data, items) => {
          let res = data.game_status.find((val, index) => {
            return val[`game_id_${index + 1}`] === val[`game_id_${showGame}`]
          })
          delete data.game_status
          return { ...data, ...res }
        })
        setStudentsCsvData({ export_data: downloadResponse })
        setIsdisable(false)
      }
    } else {
      dispatch(showNotification(true, "Somthing went wrong."))
      setStudentsCsvData({ export_data: [] })
      setIsdisable(false)
    }
  }


  const handleOnchangeDropDown = (e, type) => {
    const { name, value } = e.target

    if (type) {
      setGameValue(value)
      setShowGame(parseInt(value.slice(-1)))
    }
    else {
      setDropDownValues({
        ...dropdownValues,
        [name]: value
      })
    }
  }

  useEffect(() => {
    getAllStudentTableRecord('filter', filterRemoveEmptyKeys())
    // eslint-disable-next-line 
  }, [dropdownValues])

  const filterRemoveEmptyKeys = () => {
    const cloneDropDownValues = { ...dropdownValues }
    for (const key in cloneDropDownValues) {
      if (cloneDropDownValues[key] === "")
        delete cloneDropDownValues[key]
    }
    if (cloneDropDownValues?.date) {
      const inputDate = new Date(cloneDropDownValues?.date);
      const isoDate = inputDate.toISOString();
      cloneDropDownValues.date = isoDate
    }
    return cloneDropDownValues
  }



  

  const isNoGameData = (data) => {
    const findIsNoData = data.map((items, i) => {
      if (items.low === 0 && items.medium === 0 && items.high === 0) {
        return true
      }
      else {
        return false
      }
    })
    let isIncludesTrue = findIsNoData.includes(true)
    return isIncludesTrue
  }

  useEffect(() => {
    setIsGraphData(isNoGameData(graphCounts))
  }, [graphCounts])

 


  return (
    <main
      className="talwind-dashboard max-w-xs mx-auto pt-24 pb-20 flex flex-col gap-6 w-full transition-all duration-300 sm:max-w-[420px] md:max-w-[calc(100vw-80px)] md:pl-16"
    >
      <div id="main_section"
        className={isHeaderManu ? "flex flex-col gap-6 transition-all duration-30 md:w-[100%] lg:w-[100%] xl:w-[100%] 2xl:w-[100%] 3xl:w-[100%] md:ml-auto" : "flex flex-col gap-6 transition-all duration-30 md:w-[72%] lg:w-[79%] xl:w-[84.5%] 2xl:w-[86.5%] 3xl:w-[90%] md:ml-auto"}

      >
        <div className="pt-2">
          <span className="font-rubik font-semibold text-xl text-[#1A1919] md:text-2xl transition-all duration-300 dark:text-[#F5F5F5]">Overall Results</span>
        </div>
        <div className="result_top w-full bg-[#FFFFFF] rounded-xl p-6 flex flex-col gap-6 transition-all duration-300 dark:bg-[#212121]">
          <div className="chart_block w-full flex flex-col gap-8 lg:flex-row lg:justify-between">
            {
              graphCounts && graphCounts.length > 0 && graphCounts instanceof Array ?
                graphCounts.map((graphData, index) => {
                  return <div className="doughnut flex flex-col items-center gap-4 lg:gap-9">
                    <span className="text-[#1A1919] font-medium transition-all duration-300 dark:text-[#F5F5F5]">Game {index + 1}</span>
                    <div className="max-w-[150px]">
                      <StatudentScoreChart
                        graphPercentages={[graphData.high, graphData.medium, graphData.low]}
                      />
                    </div>
                  </div>
                }) :
                <div className="margin-top-loader w-full flex  justify-center items-center" >
                  <Loader size='big' active inline='centered' />
                </div>
            }
          </div>
          <ul className="chart_label flex items-center justify-center gap-6 lg:justify-start">
            <li className="flex items-center gap-2">
              <div className="color_box w-4 h-4 rounded bg-[#1B75BC]" />
              <span className="text-[#1A1919] text-sm transition-all duration-300 dark:text-[#F5F5F5]">High</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="color_box w-4 h-4 rounded bg-[#A4D1F4]" />
              <span className="text-[#1A1919] text-sm transition-all duration-300 dark:text-[#F5F5F5]">Mid</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="color_box w-4 h-4 rounded bg-[#ECF7FF]" />
              <span className="text-[#1A1919] text-sm transition-all duration-300 dark:text-[#F5F5F5]">Low</span>
            </li>
            {
              isGraphData &&
              <li className="flex items-center gap-2">
                <div className="color_box w-4 h-4 rounded bg-[#EDEDED]" />
                <span className="text-[#1A1919] text-sm transition-all duration-300 dark:text-[#F5F5F5]">No Data</span>
              </li>
            }
          </ul>
        </div>
        <div className="result_btm w-full bg-[#FFFFFF] rounded-xl p-6 transition-all duration-300 dark:bg-[#212121] mb-8">
          <form className="flex flex-col gap-6" action>
            <div className="top_row flex flex-col lg:justify-between lg:flex-row">
              <div className="row_left flex gap-4">
                <div className="select_input relative flex items-center">
                  <select className="appearance-none text-[#1A1919] text-xs border border-[#DAE0E6] rounded-lg pl-3 pr-8 py-2.5 focus:outline-none text-[#1A1919] dark:border-[#E0E7ED] dark:text-[#F5F5F5] transition-all duration-300 bg-transparent"
                    name="race"
                    value={dropdownValues.race ? dropdownValues.race : 'Race'}
                    onChange={(e) => { handleOnchangeDropDown(e) }}
                    id="demography">
                    {CommonProfileOptions.newRaceOptions.map((option) => {
                      return <option className="text-black dark:text-[#FFFFFF]" key={option} value={option === 'Select' ? '' : option}>{option === 'Select' ? 'Race' : option}</option>
                    })}
                  </select>
                  <div className="arrow absolute right-3">
                    <img className="transition-all duration-300 dark:invert" src={iconChev_down} alt="icon_chev_down" />
                  </div>
                </div>
                <div className="select_input relative flex items-center">
                  <select className="appearance-none text-[#1A1919] text-xs border border-[#DAE0E6] rounded-lg pl-3 pr-8 py-2.5 focus:outline-none text-[#1A1919] dark:border-[#E0E7ED] dark:text-[#F5F5F5] transition-all duration-300 bg-transparent"
                    name="enrollment"
                    value={dropdownValues.enrollment ? dropdownValues.enrollment : 'School'}
                    onChange={(e) => { handleOnchangeDropDown(e) }}
                    id="demography">
                    {ProfileOptions.enrolmentOptions.map((option) => {
                      return <option className="text-black dark:text-[#FFFFFF]" key={option} value={option === 'Select' ? '' : option}>{option === 'Select' ? 'School' : option}</option>
                    })}
                  </select>
                  <div className="arrow absolute right-3">
                    <img className="transition-all duration-300 dark:invert" src={iconChev_down} alt="icon_chev_down" />
                  </div>
                </div>

                <div className="select_input relative flex items-center">
                  <select className="appearance-none text-[#1A1919] text-xs border border-[#DAE0E6] rounded-lg pl-3 pr-8 py-2.5 focus:outline-none text-[#1A1919] dark:border-[#E0E7ED] dark:text-[#F5F5F5] transition-all duration-300 bg-transparent"
                    name="gender"
                    value={dropdownValues.gender ? dropdownValues.gender : 'Gender'}
                    onChange={(e) => { handleOnchangeDropDown(e) }}
                    id="demography">
                    {CommonProfileOptions.newGenderOptions.map((option) => {
                      return <option className="text-black dark:text-[#FFFFFF]" key={option} value={option === 'Select' ? '' : option}>{option === 'Select' ? 'Gender' : option}</option>
                    })}
                  </select>
                  <div className="arrow absolute right-3">
                    <img className="transition-all duration-300 dark:invert"
                      src={iconChev_down} alt="icon_chev_down" />
                  </div>
                </div>
                <div className="select_input relative flex items-center">
                  <select className="appearance-none text-[#1A1919] text-xs border border-[#DAE0E6] rounded-lg pl-3 pr-8 py-2.5 focus:outline-none text-[#1A1919] dark:border-[#E0E7ED] dark:text-[#F5F5F5] transition-all duration-300 bg-transparent"
                    name="game"
                    value={gameValue}
                    onChange={(e) => { handleOnchangeDropDown(e, 'frontEndFilter') }}
                    id="demography">
                    {CommonProfileOptions.gamesOption.map((option) => {
                      return <option className="text-black dark:text-[#FFFFFF]" key={option} value={option === 'Select' ? '' : option}>{option}</option>
                    })}
                  </select>
                  <div className="arrow absolute right-3">
                    <img className="transition-all duration-300 dark:invert"
                      src={iconChev_down} alt="icon_chev_down" />
                  </div>
                </div>
                <div className="select_input relative flex items-center">
                  <input
                    value={dropdownValues.date ? dropdownValues.date : 'dd/mm/yy'}
                    onChange={(e) => { handleOnchangeDropDown(e) }}
                    name="date"
                    className="appearance-none text-[#1A1919] text-xs border border-[#DAE0E6] m-0 rounded-lg pl-3 pr-8 py-2.5 focus:outline-none text-[#1A1919] dark:border-[#E0E7ED] dark:text-[#F5F5F5] transition-all duration-300 bg-transparent"
                    type="date"
                    id="start"
                    min="2022-01-01"
                    // max="2030-12-31"
                    max={CommonProfileOptions.formattedDate}
                  />
                </div>
              </div>
              <div className="row_right">
                <button disabled={isdisable}
                  onClick={(e) => { getRecordToDownload(e) }}
                  className={`border border-[#1B75BC]  rounded py-2 px-8 flex items-center`}>
                  {isdisable || isLoading ? <>
                    <LoaderLineSvg
                      width={"60px"}
                      height={"20px"}
                    />
                  </> : <>
                    <span className="text-[#1B75BC]">Download</span>
                    <img src={iconChev_down} alt="icon_chev_right" />
                  </>
                  }


                </button>
                {studentsCsvData.export_data?.length > 0 &&
                  <CSVDownload
                    data={studentsCsvData.export_data}
                    filename={`student_scores.csv`}
                    target="_blank"
                  >
                  </CSVDownload>
                }
              </div>
            </div>
            {
              !isLoading ?
                <>
                  <div className="btm_table border border-[#EAEBF0] rounded-[16px]">
                    <table className="w-full border-collpase table-fixed">
                      <thead className="text-left border-b border-[#EAEBF0]">
                        <tr>
                          <th className="text-[#656575] font-semibold text-xs p-5">
                            Student Id
                          </th>
                          <th className="text-[#656575] p-3 font-semibold text-xs">
                            Student Name
                          </th>
                          <th className="text-[#656575] font-semibold text-xs">{gameValue}</th>
                          <th className="text-[#656575] font-semibold text-xs p-3">Race</th>
                          <th className="text-[#656575] font-semibold text-xs p-3">School</th>
                          <th className="text-[#656575] font-semibold text-xs p-3">Gender</th>
                          <th className="text-[#656575] font-semibold text-xs">
                            Status
                          </th>
                          <th className="text-[#656575] font-semibold text-xs">
                            College
                          </th>
                          <th className="text-[#656575] font-semibold text-xs ">Completed At</th>
                        </tr></thead>
                      <tbody>

                        {
                          studentsRecords && currentTableData && studentsRecords?.result?.length > 0 && studentsRecords?.result instanceof Array ?
                            currentTableData.map((records, index) => {
                              return (<React.Fragment key={index} >
                                <tr className="border-b border-[#EAEBF0]">
                                  <td className="text-[#1A1919]  py-5 p-5 text-xs dark:text-[#F5F5F5]">
                                    {records.user_id}
                                  </td>
                                  <td className="flex flex-col p-3 py-5">
                                    <span className="text-[#333333]  text-xs dark:text-[#F5F5F5]"> {records.first_name + " " + records.last_name}</span>
                                    <span className="text-[#828282] text-xs">{records.first_name}</span>
                                  </td>
                                  {
                                    records?.game_status && records?.game_status instanceof Array &&
                                    records?.game_status.map((gamesStaus, statusIndex) => {
                                      return (
                                        statusIndex + 1 === showGame && <td key={statusIndex} className="text-[#1A1919] text-xs dark:text-[#F5F5F5]">
                                          {
                                            gamesStaus[`game_id_${statusIndex + 1}`] === null ? "N/A" : gamesStaus[`game_id_${statusIndex + 1}`]
                                          }
                                        </td>
                                      )
                                    })
                                  }
                                  <td className="text-[#1A1919] p-3 text-xs dark:text-[#F5F5F5]">
                                    {records.race === null ? "N/A" : records.race}
                                  </td>
                                  <td className="text-[#1A1919] p-3 text-xs dark:text-[#F5F5F5]">
                                    {records.school === null ? "N/A" : records.school}
                                  </td>
                                  <td className="text-[#1A1919] p-3 text-xs dark:text-[#F5F5F5]">
                                    {records.gender === null ? "N/A" : records.gender}
                                  </td>
                                  <td className="">
                                    {
                                      records.status === "Started" ?
                                        <span class="text-[#EEA23E] p-3 text-xs font-semibold border border-[#EEA23E] rounded-lg px-3 py-2"
                                        >{records.status}</span> :
                                        records.status === "Completed" ?
                                          <span className="text-[#2D8A39] p-3 text-xs font-semibold border border-[#2D8A39] rounded-lg px-3 py-2">{records.status}</span> :
                                          <span class="text-[#E2341D] text-xs font-semibold border border-[#E2341D] rounded-lg px-3 py-2" >{records.status}</span>
                                    }
                                  </td>
                                  <td className="text-[#333333]  text-xs font-semibold dark:text-[#F5F5F5]">
                                    {/* Van Ness */}
                                    {records.user_college === null ? "N/A" : records.user_college}
                                  </td>
                                  <td className="text-[#333333] text-xs font-semibold dark:text-[#F5F5F5]">

                                    {records.completed_at === "NA" ? "N/A" : CommonProfileOptions.formatDateToCustomString(records?.completed_at)}
                                  </td>
                                </tr>
                              </React.Fragment>)
                            })
                            : <tr className="margin-top-loader" >
                              <td colSpan={'8'}>
                                <p className="text-xs text-center py-5">No data found.</p>
                              </td>
                            </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                  {
                    studentsRecords && studentsRecords?.result?.length > 0 && studentsRecords?.result instanceof Array &&
                    <div className="pagination py-4 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                      <div className="pagination_left flex items-center gap-1">
                        <span className="text-[#1A1919] text-xs dark:text-[#F5F5F5]">Showing</span>
                        <span className="text-[#1A1919] text-xs dark:text-[#F5F5F5]">01</span>
                        <span className="text-[#1A1919] text-xs dark:text-[#F5F5F5]">to</span>
                        <span className="text-[#1A1919] text-xs dark:text-[#F5F5F5]">05</span>
                        <span className="text-[#1A1919] text-xs dark:text-[#F5F5F5]">of</span>
                        <span className="text-[#1A1919] text-xs dark:text-[#F5F5F5]">{studentsRecords?.result.length}</span>
                        <span className="text-[#1A1919] text-xs dark:text-[#F5F5F5]">entries</span>
                      </div>
                      <div>
                        <AdminPaginationComponent
                          className="pagination-bar"
                          currentPage={currentPage}
                          totalCount={studentsRecords?.result?.length}
                          pageSize={PageSize}
                          onPageChange={page => setCurrentPage(page)}
                        />
                      </div>
                    </div>
                  }
                </> : <div className="margin-top-loader" >
                  <Loader size='big' active inline='centered' />
                </div>
            }

          </form>
        </div>
      </div>
    </main>
  )
}


export default UpgradeAdminStudentScore
