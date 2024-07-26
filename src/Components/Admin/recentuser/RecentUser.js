import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Popup } from "semantic-ui-react";
import AdminCommonTable from "../AdminCommanTable/AdminCommonTable";
import { CSVDownload } from 'react-csv';

import "./RecentUser.scss"
import { showNotification } from "../../../Actions/componentActions";
import { useDispatch } from "react-redux";

const Recentuser = () => {
    var apiUrl = global.platformURI;
    const dispatch = useDispatch()
    const [recentuser, setRecentUser] = useState([])
    const [getCurrentDate, setgetCurrentDate] = useState("")
    const [getFilterDate, setgetfilterDate] = useState("")
    const [csvData, setCsvData] = useState({ export_data: [] })

    function RecentUserData(param) {
        return axios.get(apiUrl + `/api/v1/users/recent_registrations`, { params: { date: param } }).then(response => {
            // setOrgData(response.data);
            let data = response.data.map(item => ({ ...item, year_of_birth: new Date().getFullYear() - parseInt(item.year_of_birth) }))
            setRecentUser(data)
        })
            .catch((error) => {
                if (error.response.data.errors === "Signature has expired") {
                    // dispatch(SignatureExpired("Signature has expired"))
                }
            }
            );
    }
    useEffect(() => {
        RecentUserData()

        const TodayDate = new Date().toISOString().slice(0, 10)
        setgetCurrentDate(TodayDate)
        // eslint-disable-next-line
    }, [])

    const DynamicColumns =
        [
            {
                Header: "Id",
                Value: "id"
            },
            {
                Header: "Email",
                Value: "email"
            },
            {
                Header: "Organisation Name",
                Value: "organisation_name"
            },
            {
                Header: "Full Name",
                Value: "full_name"
            },
            {
                Header: "Gender",
                Value: "gender"
            },
            {
                Header: "Age",
                Value: "year_of_birth"
            },
            {
                Header: "Role",
                Value: "role"
            },
            {
                Header: "Race",
                Value: "race"
            }

        ]


    const handleGetDate = (e) => {
        setgetfilterDate(e.target.value)

    }

    const handleRecentFilter = () => {
        RecentUserData(getFilterDate)
        setgetfilterDate("")
    }
    function AllExportData() {
        // setCsvData({export_data: recentuser})
        axios.get(apiUrl + `/api/v1/users/get_registrations_data`).then(response => {
            if (response.data.length === 0) {
                dispatch(showNotification(true, "Assessment data not found for selected user account"))
            } else {
                setCsvData({ export_data: response.data})
            }
            // setExportType("")
            // setCheckedState([])
        })

        setTimeout(() => {
            setCsvData({ export_data: [] })
        }, 5000);
    }

    return (
        <div className="Recent_hearder">
            <div className="p-3">
                <div>
                    <h1>Recently Registered Users</h1>
                </div>
                <div className="header-tabs d-flex vt-center justify-between">
                    <div>
                    <input type="date" className="DateInput"  onChange={(e) => handleGetDate(e)} max={getCurrentDate} />
                    <Button className={getFilterDate ? "blue" : ""} onClick={handleRecentFilter} style={{ padding: "10px", margin: "15px 5px" }} >Filter</Button>
                    </div>

                    <div className="download-button" style={{ float: 'right' }}>
                        {/* <Dropdown placeholder='Export' options={options} defaultValue={ExportType} selection onChange={(e) => handleChange(e)} /> */}
                        &nbsp;&nbsp;


                        <Popup
                            trigger={
                                <Button type="button" onClick={AllExportData} className={'clear-filter export-btn Csv-button '}><i className='download icon'></i></Button>
                            }
                            content='Export'
                            inverted
                        />
                        {csvData.export_data.length > 0 && <CSVDownload data={csvData.export_data}
                            filename={`RegisteruserData.csv`}
                            target="_blank"
                        >
                        </CSVDownload>}

                    </div>
                </div>
                <div>
                    <AdminCommonTable
                        TableData={recentuser}
                        columns={DynamicColumns}
                    />
                </div>
            </div>
        </div>
    )
}

export default Recentuser;