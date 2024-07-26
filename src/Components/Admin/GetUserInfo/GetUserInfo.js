import React from 'react';
import "./GetUserInfo.scss"
import { useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";
// import { Paths } from '../../routes/routePaths';
import { Loader } from 'semantic-ui-react';
import { CSVLink } from 'react-csv';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { SignatureExpired } from '../../../Actions/AuthAction';
import Pagination from '../../CommonComponent/Pagination/Pagination';

const GetUserInfo = () => {
    const history = useHistory()
    const StateData = useLocation();
    const dispatch = useDispatch()
    var apiUrl = global.platformURI;
    const [orgData, setOrgData] = useState({ answers: [], assessment_name: '', assessment_status: '', total_assesment_time_taken: "" })
    const [csvData1, setCsvData1] = useState({ export_data: [] })
    const [shownext, setShownext] = useState(0)
    const [currentPageNum, setCurrentPageNum] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    function getOrgData() {
        return axios.get(apiUrl + `/api/v1/users/${StateData.state.uuid}/user_review`).then(response => {
            setOrgData(response.data);
            setIsLoading(false)
        }).catch((error) => {
            if (error.response.data.errors === "Signature has expired") {
                dispatch(SignatureExpired("Signature has expired"))
            }
        }
        );
    }
    function ExportData() {
        return axios.get(apiUrl + `/api/v1/exports`, { params: { id: [StateData.state.id] , export_type: "Assessments"  } }).then(response => {
            setCsvData1(response.data)
        })
    }

    const isToggle = useSelector((state) => state.componentReducer.isToggle)

    React.useEffect(() => {
        if (StateData.state === undefined) {
            history.push("/admin")
        } else {
            getOrgData()
            ExportData()
            setIsLoading(true)
            // setDownloadCsvFile(false)
        }
        // eslint-disable-next-line
    }, [])

    const columns = React.useMemo(
        () => [
            {
                Header: 'Section',
                accessor: 'Section', // accessor is the "key" in the data
            },
            {
                Header: 'Question',
                accessor: 'first_name', // accessor is the "key" in the data
            },
            {
                Header: 'Answer',
                accessor: 'email',
            },
            {
                Header: 'Option Number',
                accessor: 'Option Number', // accessor is the "key" in the data
            },
            {
                Header: 'Time',
                accessor: 'organisation_name', // accessor is the "key" in the data
            },
        ],
        []
    )

    const sectionSorting = (a, b) => {
        return (a.section.toLocaleLowerCase() > b.section.toLocaleLowerCase()) ? 1 : -1
    }

    const handleGetPageNum = (num) => {
        setShownext((num * 10) - 10)
        setCurrentPageNum(num)
    }
    return <div >
        <div className={!isToggle ? "admin-table admin-table-inner" : "admin-table"}>
            {/* <form onSubmit={(e) => downloadCSV(e)}> */}
            <div className='p-3'>
                <h1>{StateData.state && StateData.state.name}<span>
                    <CSVLink data={csvData1.export_data}
                    filename={`${StateData.state.name}.csv`}
                    className="back-info-btn btn-primary button ui"
                    target="_blank"
                // headers={'Data'}
                >Export</CSVLink><Link to={"/reporting/assessment"} className='back-info-btn btn-primary button ui'>Back</Link></span></h1>
                <h3>Assessment - {orgData.assessment_name !== null ? orgData.assessment_name : 'Assesment Not Started'}</h3>
                {orgData.assessment_status === 'complete' ?
                    <h3>Total Time Taken - {orgData.total_assesment_time_taken}
                    </h3> : null}
                {isLoading && <Loader size='big' active inline='centered' />}
                <div className='admin-table-com'>
                    <div className='table-responsive'>
                        <table className='Admin_Table'>
                            <thead>
                                <tr>
                                    {columns.map((column) => {
                                        return <th>{column.Header}</th>
                                    })}
                                </tr>
                            </thead>
                            <tbody>

                                {orgData.answers && orgData.answers.sort((a, b) => { return sectionSorting(a, b) }).slice(shownext, shownext + 10).map((val, key) => {

                                    return (
                                        <tr key={key}>
                                            <td>{val.section}</td>
                                            <td>{val.label}</td>
                                            <td>{val.option}</td>
                                            <td>{val.option_number}</td>
                                            <td>{val.time_taken}</td>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className='pagination-bg'>
                        <Pagination
                            activePage={currentPageNum}
                            TotalPage={orgData.answers.length}
                            itemsCountPerPage={10}
                            onClick={handleGetPageNum}
                        />
                    </div>
                </div>
            </div>
        </div>

    </div>
}
export default GetUserInfo;
