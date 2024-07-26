import { useEffect, useState } from "react";
import { Button, Popup } from "semantic-ui-react";
import AdminCommonTable from "../AdminCommanTable/AdminCommonTable";
import { CSVDownload } from 'react-csv';

import "./AdminSurveyData.scss"
import { fetchAllAdminSurveyData } from '../../../Services/SuperAdminServices/SuperAdminServices'
import LoaderLineSvg from "../../CommonComponent/LoaderLineSvg/LoaderLineSvg"
const AdminSurveyData = () => {
    // const [surveyusersdata, setSurveyUsersData] = useState([]) comment 
    const [surveyusersdata, setSurveyUsersData] = useState([])
    // const [getCurrentDate, setgetCurrentDate] = useState("")

    const [isdisable, setIsdisable] = useState(false)
    const [surveyCsvData, setSurveyCsvData] = useState({ export_data: [] })
    const [isLoading, setIsLoading] = useState(false)
    const [filterTablePresentData, setFilterTablePresentData] = useState([])
    const [isFilterButton, setIsFilterButton] = useState(false)
    const [selectValue, setSelectedValues] = useState({
        email: "",
        unique_id: ""
    })

    useEffect(() => {
        // RecentUserData()
        // const TodayDate = new Date().toISOString().slice(0, 10)
        // setgetCurrentDate(TodayDate)
        getAllSurveyTableRecord(`/api/v1/survey_data`)
        // eslint-disable-next-line
    }, [])

    const DynamicColumns =
        [
            {
                Header: "User ID",
                Value: "user_id"
            },
            {
                Header: "Email",
                Value: "email"
            },
            {
                Header: "Question ID",
                Value: "question_id"
            },
            {
                Header: "Instrument ID",
                Value: "instrument_id"
            },
            {
                Header: "Question Label",
                Value: "question_label"
            },
            {
                Header: "Selected Response",
                Value: "selected_response"
            },
            {
                Header: "Selected Option Number",
                Value: "selected_option_number"
            },
        ]







    const filterSurveyData = (surveyData) => {
        let userKeys = surveyData.flatMap((itmes) => Object.keys(itmes))
        let getData = surveyData.flatMap((items, index) => {
            let surveyData = items[userKeys[index]].survey.map(sur => ({ user_id: userKeys[index].split("_")[1], email: items[userKeys[index]].email, ...sur }))
            return surveyData
        })
        return getData
    }



    const getAllSurveyTableRecord = async (url) => {
        setIsLoading(true)
        const surveyDataAllUser = await fetchAllAdminSurveyData(url)
        if (surveyDataAllUser.status === 200 && surveyDataAllUser.data.status !== 422) {
            setIsLoading(false)
            let filteredData = filterSurveyData(surveyDataAllUser.data)
            setSurveyUsersData(splitQuesrionsLabel(filteredData))
        } else {
            setIsLoading(false)
            // dispatch(showNotification(true, questionsOptions?.data ? questionsOptions?.data?.message : questionsOptions.error.response.data.error ? questionsOptions?.error?.response?.data.error : "Somthing went wrong."))
        }

    }


    const getRecordToDownload = async (e) => {
        setSurveyCsvData({ export_data: [] })
        setIsdisable(true)
        if (filterTablePresentData.length === 0 && !isFilterButton) {
            // const fetchedCsvData = await fetchAllAdminSurveyData(isDownloadUrl ? isDownloadUrl : '/api/v1/game_bayesian_data')
            const fetchedCsvData = await fetchAllAdminSurveyData('/api/v1/survey_data')
            if (fetchedCsvData.status === 200 && fetchedCsvData.data.status !== 422) {
                setSurveyCsvData({ export_data: filterSurveyData(fetchedCsvData.data) })
                setIsdisable(false)
            } else {
                // dispatch(showNotification(true, "Somthing went wrong."))
                setSurveyCsvData({ export_data: [] })
                setIsdisable(false)
            }
        }
        else {
            setSurveyCsvData({ export_data: filterTablePresentData })
            setIsdisable(false)
        }
    }

    const splitQuesrionsLabel = (data) => {
        let res = data.map((items) => {
            if (items.question_label.length > 42) {
                return { ...items, question_label: items.question_label.substring(0, 41) + " ...." }
            }
            else {
                return { ...items }
            }
        })
        return res
    }

    const handleFilterChange = (e) => {
        const { name, value } = e.target
        setSelectedValues({ ...selectValue, [name]: value })
    }

    const handleFilterApiCall = () => {
        const { unique_id, email } = selectValue
        setIsFilterButton(true)
        setSurveyCsvData({ export_data: [] })
        let cloneData = [...surveyusersdata]
        // eslint-disable-next-line
        let filterItmes = cloneData.filter((data) => {
            if (email === "") {
                if (data.user_id.toLocaleLowerCase().includes(unique_id.toLocaleLowerCase())) {
                    return data.user_id.toLocaleLowerCase().includes(unique_id.toLocaleLowerCase())
                }
            }
            else if (unique_id === "") {
                if (data.email.toLocaleLowerCase().includes(email.toLocaleLowerCase())) {
                    return data.email.toLocaleLowerCase().includes(email.toLocaleLowerCase())
                }
            }
            else {
                if (data.email.toLocaleLowerCase().includes(email.toLocaleLowerCase()) && data.user_id.toLocaleLowerCase().includes(unique_id.toLocaleLowerCase())) {
                    return data.email.toLocaleLowerCase().includes(email.toLocaleLowerCase()) && data.user_id.toLocaleLowerCase().includes(unique_id.toLocaleLowerCase())
                }
            }
        })
        setFilterTablePresentData(filterItmes)
    }


    const handleClearFilter = () => {
        setIsFilterButton(false)
        setFilterTablePresentData([])
        setSelectedValues({ email: "", unique_id: "" })
        setSurveyCsvData({ export_data: [] })
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleFilterApiCall()
        }
    }


    return (
        <div className="Recent_hearder">
            <div className="p-3">
                <div>
                    <h1>Survey Data</h1>
                </div>
                <div className="header-tabs d-flex vt-center">
                    <div className="pr-2">
                        <input
                            type="text"
                            onKeyDown={(e) => handleKeyDown(e)}
                            className="py-2 input-style"
                            placeholder="Filter By Email"
                            onChange={(e) => { handleFilterChange(e) }}
                            value={selectValue.email}
                            name="email" id="email" />
                    </div>
                    <div className="pr-2">
                        <input
                            type="number"
                            onKeyDown={(e) => handleKeyDown(e)}
                            className="py-2 input-style"
                            placeholder="Filter By UserID"
                            value={selectValue.unique_id}
                            onChange={(e) => { handleFilterChange(e) }}
                            name="unique_id" id="unique_id" />

                    </div>
                    <div>
                        <Button className={""} onClick={handleFilterApiCall} style={{ padding: "10px" }} >Filter</Button>
                    </div>
                    <div>
                        <Button className={""} onClick={handleClearFilter} style={{ padding: "10px" }} >Clear Filter</Button>
                    </div>
                    <div className="download-button ms-auto" style={{ float: 'right' }}>
                        {/* <Dropdown placeholder='Export' options={options} defaultValue={ExportType} selection onChange={(e) => handleChange(e)} /> */}
                        <div></div>
                        {
                            isdisable ?
                                <>
                                    <LoaderLineSvg
                                        width={"60px"}
                                        height={"20px"}
                                    />
                                </> :
                                <Popup
                                    trigger={
                                        <Button type="button" onClick={getRecordToDownload} className={'clear-filter export-btn Csv-button '}><i className='download icon'></i></Button>
                                    }
                                    content='Export'
                                    inverted
                                />
                        }

                        {surveyCsvData.export_data.length > 0 && <CSVDownload data={surveyCsvData.export_data}
                            filename={`survey_data.csv`}
                            target="_blank"
                        >
                        </CSVDownload>}

                    </div>
                </div>
                {
                    // isLoading ?
                    // <div className="margin-top-loader" >
                    //     <Loader size='big' active inline='centered' />
                    // </div>
                    //     :

                    <div className="table-container">
                        <AdminCommonTable
                            // TableData={surveyusersdata.length > 0 ? surveyusersdata : []}
                            TableData={isFilterButton ? filterTablePresentData : surveyusersdata}
                            columns={DynamicColumns}
                            isLoading={isLoading}
                        />
                    </div>
                }

            </div>
        </div>
    )
}

export default AdminSurveyData;