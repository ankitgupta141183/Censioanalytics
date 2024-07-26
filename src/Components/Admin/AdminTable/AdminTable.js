import React, { useState } from 'react';
import { Form, Button, Icon, Popup, Loader } from 'semantic-ui-react';
import "./AdminTable.css"
import { UserServices } from "../../../Services/UserServices"
import { Link } from 'react-router-dom';
import { CSVDownload } from 'react-csv';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { SignatureExpired } from '../../../Actions/AuthAction';
import { showNotification } from '../../../Actions/componentActions';
import Pagination from '../../CommonComponent/Pagination/Pagination';
import "../UserRepoting/UserRepoting.scss"

var apiUrl = global.platformURI

const AdminTable = ({ columns, params }) => {

    const [search, setSearch] = React.useState("")
    const [newData, SetNewData] = useState([])
    const [UsesrData, setUsersData] = useState([])
    const [filter, setFilter] = useState(false)
    const [shownext, setShownext] = useState(0)
    const [sort, setSort] = useState("")
    const dispatch = useDispatch()
    const [checkedState, setCheckedState] = useState([])
    const [Allchecked, setAllChecked] = useState(false)
    const [csvData1, setCsvData1] = useState({ export_data: [] })
    const [currentPageNum, setCurrentPageNum] = useState(1)
    const [ExportType, setExportType] = useState("All Games")
    const [isLoading, setIsLoading] = useState(true)
    const [tableColumns, setTablecolumns] = useState(columns)
    // const params = useParams()

    const userInfo = () => {
        setIsLoading(true)
        UserServices.getAllUsers().then((res) => {
            // console.log(res , "resssssssss");
            if (res.data) {
                setUsersData(res.data)
                SetNewData(res.data)
                setIsLoading(false)
            } else {
                if (res.response.data.errors === "Signature has expired") {

                    dispatch(SignatureExpired("Signature has expired"))
                }
            }
        })
    }
    const GameInfo = (id) => {
        setIsLoading(true)
        return axios.get(apiUrl + `/api/v1/users`, { params: { game_id: id, game_user: true } })
            .then(response => {
                if (response.data) {
                    setUsersData(response.data)
                    SetNewData(response.data)
                    setIsLoading(false)
                }
            })
            .catch((err => {
                if (err?.response?.data?.errors === "Signature has expired") {
                    dispatch(SignatureExpired("Signature has expired"))
                }
                return err

            }))
    }
    function GameExportData(gameId) {
        setIsLoading(true)
        setCsvData1({ export_data: [] })
        return axios.get(apiUrl + `/api/v1/exports?game_id=${gameId}`, { params: { id: checkedState, export_type: "Games" } }).then(response => {
            if (response.data.export_data.length === 0) {
                // setExportType("All Games")
                dispatch(showNotification(true, "Games data not found for selected user account(s)", "error"))
            } else {
                setCsvData1(response.data)
            }
            // setExportType("")
            setCheckedState([])
            setIsLoading(false)
            setAllChecked(false)
        }).catch((error => {
            dispatch(showNotification(true, "The server cannot find the requested resource.", "error"))
            return error
        }))
    }
    function AllExportData() {
        setCsvData1({ export_data: [] })
        axios.get(apiUrl + `/api/v1/get_metadata`).then(response => {
            if (response.data.export_data.length === 0) {
                dispatch(showNotification(true, "Assessment data not found for selected user account"))
            } else {
                setCsvData1(response.data)
            }
            // setExportType("")
            setAllChecked(false)
            setCheckedState([])
        })
    }
    function ExportData() {
        if (checkedState.length > 0) {
            if (params.type === "assessment") {
                setIsLoading(true)
                return axios.get(apiUrl + `/api/v1/exports`, { params: { id: checkedState, export_type: "Assessments" } }).then(response => {
                    if (response.data.export_data.length === 0) {
                        dispatch(showNotification(true, "Assessment data not found for selected user account"))
                    } else {
                        setCsvData1(response.data)
                    }
                    setExportType("All Games")
                    setCheckedState([])
                    setAllChecked(false)
                    setIsLoading(false)
                }).catch((err) => {
                    console.log(err, "Csv Error");
                })
            } else {
                if (ExportType === "The Gold Mine Treasure Map") {
                    GameExportData(1)
                } else if (ExportType === "Skyline") {
                    GameExportData(2)
                } else if (ExportType === "The Restaurateur") {
                    GameExportData(3)
                } else if (ExportType === "Wordplay") {
                    GameExportData(4)
                } else if (ExportType === "The Great Escape") {
                    GameExportData(5)
                } else if (ExportType === "All Games") {
                    GameExportData("")
                }

            }
        }
        else {
            dispatch(showNotification(true, "Please select user to export data", "error"))
        }
    }


    React.useEffect(() => {
        if (params.type === "games" && ExportType !== "All Games") {
            const cloneColumns = [...tableColumns]
            if (!cloneColumns.map(item => item.Header).includes("Played Date")) {
                cloneColumns.push(
                    {
                        Header: 'Status',
                        accessor: 'status',
                        placeholder: "Filter By Status",
                        type: "text"
                    },
                    {
                        Header: 'Played Date',
                        accessor: 'Attempt_Start_Date', // accessor is the "key" in the data
                        placeholder: 'Filter Not Applied',
                        type: 'text'

                    },
                )
            }


            setTablecolumns(cloneColumns)

        } else {
            // cloneColumns = columns
            if (ExportType === "All Games") {

                setTablecolumns(columns)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ExportType])

    React.useEffect(() => {
        if (params.type === "assessment") {
           if(newData.length ===0){
            userInfo()
            setTablecolumns(columns)
            setUsersData([])
            SetNewData([])
            setFilter(false)
            setSearch('')
            setExportType("All Games")
            setCheckedState([])
            setAllChecked(false)
           }
        } else if (params.type === "games") {
            GameInfo("")
            setTablecolumns(columns)
            userInfo()
            setUsersData([])
            SetNewData([])
            setFilter(false)
            setSearch('')
            setExportType("All Games")
            setCheckedState([])
            setAllChecked(false)

        }
       
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params])
    React.useEffect(() => {
        if (Allchecked) {
            setCheckedState(newData.map(val => val.id))
        }
        else {
            setCheckedState([])
            setCsvData1({ export_data: [] })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Allchecked])

    const Sortascending = (e) => {
        setAllChecked(false)
        setSort(e.target.name)
        if (e.target.name === 'filterbyemail') {
            const SortByEmail = [...newData].sort((a, b) => (a.email.toLocaleLowerCase() > b.email.toLocaleLowerCase()) ? 1 : -1)
            SetNewData(SortByEmail)
        }
        else if (e.target.name === 'filterbyorganization') {
            const assignValue = (a, b) => {
                if (a === null || a === "") {
                    return 1;
                }
                else if (b === null || b === "") {
                    return -1;
                }
                else if (a.toLocaleLowerCase() === b.toLocaleLowerCase()) {
                    return 0;
                }
                else {
                    return a.toLocaleLowerCase() < b.toLocaleLowerCase() ? -1 : 1;
                }
            };
            const SortByOrg = [...newData].sort((a, b) => assignValue(a.organisation_name, b.organisation_name))
            SetNewData(SortByOrg)
        }
        else if (e.target.name === 'UserId') {
            const SortByUuid = [...newData].sort((a, b) => (a.id > b.id) ? 1 : -1)
            SetNewData(SortByUuid)
        }
        else if (e.target.name === 'first_name') {
            const SortByName = [...newData].sort((a, b) => (a.full_name.toLocaleLowerCase() > b.full_name.toLocaleLowerCase()) ? 1 : -1)
            SetNewData(SortByName)
        }
        else {
            console.log(e.target.name)
        }
    }
    const Sortdescending = (e) => {
        setAllChecked(false)
        setSort("")
        if (e.target.name === 'filterbyemail') {
            const SortByEmail = [...newData].sort((a, b) => (a.email.toLocaleLowerCase() < b.email.toLocaleLowerCase()) ? 1 : -1)
            SetNewData(SortByEmail)
        }
        else if (e.target.name === 'filterbyorganization') {
            const assignValue = (a, b) => {
                if (a === null || a === "") {
                    return 1;
                }
                else if (b === null || b === "") {
                    return -1;
                }
                else if (a.toLocaleLowerCase() === b.toLocaleLowerCase()) {
                    return 0;
                }
                else {
                    return a.toLocaleLowerCase() < b.toLocaleLowerCase() ? 1 : -1;
                }

            };

            const SortByOrg = [...newData].sort((a, b) => assignValue(a.organisation_name, b.organisation_name))
            SetNewData(SortByOrg)
        }
        else if (e.target.name === 'UserId') {
            const SortByUuid = [...newData].sort((a, b) => (a.id < b.id) ? 1 : -1)
            SetNewData(SortByUuid)
        }
        else if (e.target.name === 'first_name') {
            const SortByName = [...newData].sort((a, b) => (a.full_name.toLocaleLowerCase() < b.full_name.toLocaleLowerCase()) ? 1 : -1)
            SetNewData(SortByName)
        }
        else {
            console.log(e.target.name)
        }
    }

    const FilterByEmail = () => {
        setAllChecked(false)
        const filterEmail = UsesrData.filter((val) => {
            let email = "";
            if (val.email.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                return email = val.email.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            }
            return email
        })
        if (search !== "") {
            SetNewData(filterEmail)
            setFilter(true)
        }

    }

    const FilterByID = () => {
        setAllChecked(false)
        const filterID = UsesrData.filter((val) => {
            // if (val.id.toString().includes(search)) {
            return val.id.toString().includes(search)
            // }
        })
        if (search !== "") {
            SetNewData(filterID)
            setFilter(true)
        }
    }
    const FilterByName = () => {
        setAllChecked(false)
        const filterName = UsesrData.filter((val) => {
            return val.full_name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        })
        if (search !== "") {
            SetNewData(filterName)
            setFilter(true)
        }
    }
    const FilterByOrg = () => {
        setAllChecked(false)
        const filterOrg = UsesrData.filter((val) => {
            let org
            if (val.organisation_name === null || val.organisation_name === "") {
                return null
            }
            else if (val.organisation_name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                return org = val.organisation_name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            }

            return org
        })
        if (search !== "") {
            SetNewData(filterOrg)
            setFilter(true)
        }
    }
    const FilterByStatus = (Status) => {
        setAllChecked(false)
        const filterStatus = UsesrData.filter((val) => {
            let sts
            if (val.results === null) {
                if (Status === "Not Started") {
                    return sts = val.results == null
                } else {
                    return null
                }
            }
            // Completed
            else if (val.results.status.includes(Status)) {
                return sts = val.results.status.includes(Status)
            }
            return sts
        })
        if (Status !== "") {
            SetNewData(filterStatus)
            setFilter(true)
        }
    }


    const FilterByRole = (Role) => {
        setAllChecked(false)
        const filterRole = UsesrData.filter((val) => {
            let role
            if (val.role === null) {
                if (Role === "Not Assign") {
                    return role = val.results == null
                } else {
                    return null
                }
            }
            // Completed
            else if (val.role.includes(Role)) {
                return role = val.role.includes(Role)
            }
            return role
        })
        if (Role !== "") {
            SetNewData(filterRole)
            setFilter(true)
        }

    }


    const ClearFilter = (e) => {

        e.target.filterbyemail[0].value = ''
        e.target.filterbyorganization[0].value = ''
        e.target.first_name[0].value = ''
        e.target.UserId[0].value = ''
        params.type === "assessment" && (e.target.Status.value = "")
        e.target.Role.value = ""

        params.type === "games" && (e.target.Game.value = "All Games")
        userInfo()
        setFilter(false)
        setSearch('')
        setExportType("All Games")
        setCheckedState([])
        setAllChecked(false)
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (e.target.name === 'filterbyemail') {
                e.preventDefault();
                FilterByEmail()
            }
            else if (e.target.name === 'filterbyorganization') {
                e.preventDefault();
                FilterByOrg()

            }
            else if (e.target.name === 'first_name') {
                e.preventDefault();
                FilterByName()
            }
            else if (e.target.name === 'UserId') {
                e.preventDefault();
                FilterByID()
            }
            else if (e.target.name === 'Status') {
                e.preventDefault();
                FilterByStatus()
            }
            setCurrentPageNum(1)
            setShownext(0)
        }
    }
    const datFunction = (fetcheddate) => {
        const lastUpdate = new Date(fetcheddate)
        const Year = lastUpdate.getFullYear()
        let Month = lastUpdate.getMonth() + 1
        let date = lastUpdate.getDate()
        let Hours = lastUpdate.getHours()
        let Minutes = lastUpdate.getMinutes()
        let Sec = lastUpdate.getSeconds()
        if (Month < 10) {
            Month = `0${Month}`;
        }
        if (date < 10) {
            date = `0${date}`;
        }
        if (Hours < 10) {
            Hours = `0${Hours}`;
        }
        if (Minutes < 10) {
            Minutes = `0${Minutes}`;
        }
        if (Sec < 10) {
            Sec = `0${Sec}`;
        }
        // const LastUpdateTime = Year + "/" + Month + "/" + date + "  " + Hours + ":" + Minutes + ":" + Sec
        const LastUpdateTime = Month + "/" + date + "/" + Year
        return LastUpdateTime
    }

    const setCheck = (e, id) => {
        var temp = [...checkedState]
        // if (Allchecked) {
        //     alert('checked')

        // }

        if (temp.includes(id)) {
            // temp.pop(id)
            const index = temp.indexOf(id);
            if (index > -1) {
                temp.splice(index, 1); // 2nd parameter means remove one item only
            }
        }
        // else if( Allchecked){

        //     temp.push()
        // }
        else {
            temp.push(id)
        }
        // setChecked(!checked)
        setCheckedState(temp)
        // setCheckedState(...checkedState[temp])
    }

    const HandleAllCheckbox = () => {
        setAllChecked(!Allchecked)

    }

    // const handleChange = (e) => {
    //     setExportType(e.target.innerText)
    // }



    const handleChangeTableData = (e) => {
        const GameName = e.target.value
        setAllChecked(false)
        setCheckedState([])
        SetNewData([])

        if (GameName === "The Gold Mine Treasure Map") {
            GameInfo(1)
        } else if (GameName === "Skyline") {
            GameInfo(2)
        } else if (GameName === "The Restaurateur") {
            GameInfo(3)
        } else if (GameName === "Wordplay") {
            GameInfo(4)
        } else if (GameName === "The Great Escape") {
            GameInfo(5)
        } else {
            if (GameName === "All Games") {
                GameInfo("")
            }
        }
        setFilter(true)
        setExportType(GameName)
        setIsLoading(true)
    }
    const handleGetPageNum = (num) => {
        setShownext((num * 10) - 10)
        setCurrentPageNum(num)
    }

    const GamesOptions = [
        { key: 6, text: "All", value: "All Games" },
        { key: 1, text: 'The Gold Mine Treasure Map', value: "The Gold Mine Treasure Map" },
        { key: 2, text: 'Skyline', value: "Skyline" },
        { key: 3, text: 'The Restaurateur', value: "The Restaurateur" },
        { key: 4, text: 'Wordplay', value: "Wordplay" },
        { key: 5, text: 'The Great Escape', value: "The Great Escape" },
    ]
    return <div className=''>
        <h1 className='admin-tab-header'> {params.type === "assessment" ? "Assessments" : "Games"} Reporting</h1>


        <Form onSubmit={(e) => ClearFilter(e)} >
            <div className='d-flex vt-center'>
                <Button type="submit" className={filter !== false ? 'clear-filter-btn blue' : 'clear-filter-btn'}>Clear Filter</Button>&nbsp;&nbsp;
                {params.type === "games" &&
                    <select
                        // id="game"
                        className="game_select"
                        name="Game"
                        value={ExportType}
                        onChange={(e) => handleChangeTableData(e)}
                    >
                        {
                            GamesOptions.map((option) => {
                                return <option value={option.value} key={option.value} id={option.key}>{option.text}</option>
                            })
                        }
                    </select>

                }
                <h3 className='m-auto'>List of Users</h3>

                {params.type !== "assessment" && <Button type="button" onClick={AllExportData} className={'clear-filter export-btn '}>Metadata Export</Button>}
                <div style={{ float: 'right' }}>
                    {/* <Dropdown placeholder='Export' options={options} defaultValue={ExportType} selection onChange={(e) => handleChange(e)} /> */}
                    &nbsp;&nbsp;
                    {/* {checkedState.length !== 0 ?
                        <Button type="button" onClick={checkedState.length !== 0 ? ExportData : null} className={checkedState.length !== 0 ? 'clear-filter blue export-btn' : 'clear-filter export-btn'}><i className='download icon'></i></Button>
                        : */}
                    <Popup
                        trigger={
                            <Button type="button" onClick={ExportData} disabled={false} className={checkedState.length !== 0 ? 'clear-filter blue export-btn' : 'clear-filter export-btn'}><i className='download icon'></i></Button>
                        }
                        content='Export'
                        inverted
                    />
                    {/* } */}
                    {csvData1.export_data.length !== 0 ?

                        <CSVDownload data={csvData1.export_data}
                            filename={`UsersData.csv`}
                            target="_blank"
                        >
                        </CSVDownload>
                        :
                        null
                    }
                </div>
            </div>
            {/* {
                <div className='d-flex vt-center'>
                    
                    <div className='d-flex'>
                        <input type={"date"} />&nbsp;&nbsp;
                        <input type={"date"} />
                    </div>
                </div>
            } */}
            {isLoading && <Loader size='big' active inline='centered' />}
            <>
                <div className='table-responsive'>
                    <table className='Admin_Table admin_user-table'>

                        <thead>
                            <tr>
                                {tableColumns.map((column) => {
                                    return <th key={column.Header}>{column.Header !== "CSV Data" ? column.Header : null}</th>

                                })}
                            </tr>
                            <tr>
                                {tableColumns.map((column) => {
                                    return <th className='filter_admin-row' key={column.Header}>
                                        {column.accessor === "CSVData" ?
                                            <>
                                                {/* {params.type === "assessment"  ? */}
                                                <input name='checkAll' id='checkAll' style={{ margin: '3px 3px 0 0', cursor: 'pointer', width: '48% !important' }} checked={Allchecked} type={column.type} onChange={(e) => HandleAllCheckbox(e)} className='' />
                                                {/* :
                                                    <Popup
                                                        trigger={
                                                            <input name='checkAll' id='checkAll' style={{ margin: '3px 3px 0 0', cursor: 'pointer', width: '48% !important' }} checked={Allchecked} type={column.type} className='' />
                                                        }
                                                        content='Please select a game'
                                                        inverted
                                                    />} */}

                                                {/* <input type='checkbox'></input> */}

                                            </>
                                            :
                                            column.accessor === "Status" ?
                                                <>
                                                    <select name={column.accessor} placeholder={column.placeholder} onChange={(e) => FilterByStatus(e.target.value)} onKeyDown={(e) => handleKeyDown(e)}>
                                                        <option hidden value={""}>{column.placeholder}</option>
                                                        <option value={"Completed"}>Completed</option>
                                                        <option value={"In Progress"}>In Progress</option>
                                                        <option value={"Not Started"}>Not Started</option>
                                                    </select>
                                                    {/* <Button name={column.accessor} type="button" onClick={(e) => FilterData(e)} className=""><Icon name="sort alphabet up" /> </Button> */}
                                                </>
                                                : column.accessor === "Role" ?
                                                    <>
                                                        <select name={column.accessor} placeholder={column.placeholder} onChange={(e) => FilterByRole(e.target.value)} onKeyDown={(e) => handleKeyDown(e)}>
                                                            <option hidden value={""}>{column.placeholder}</option>
                                                            <option value={"Student"}>Student</option>
                                                            <option value={"Organization"}>Organization</option>
                                                            <option value={"Not Assign"}>Not Assign</option>
                                                        </select>
                                                    </>
                                                    :
                                                    <>
                                                        <input name={column.accessor} placeholder={column.placeholder} type={column.type} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} />
                                                        {sort === column.accessor ?
                                                            <Button name={column.accessor} type="button" onClick={(e) => Sortdescending(e)} className="">
                                                                {
                                                                    column.accessor === "UserId" ?
                                                                        <Icon name="sort numeric up" />
                                                                        :
                                                                        <Icon name="sort alphabet descending" />
                                                                }

                                                            </Button>
                                                            :
                                                            <Button name={column.accessor} type="button" onClick={(e) => Sortascending(e)} className="">
                                                                {
                                                                    column.accessor === "UserId" ?
                                                                        <Icon name="sort numeric down" />
                                                                        :
                                                                        <Icon name="sort alphabet ascending" />
                                                                }
                                                            </Button>
                                                        }
                                                    </>
                                        }
                                    </th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {newData.length !== 0 ?
                                newData.slice(shownext, shownext + 10).map((val, key) => {

                                    return (
                                        <tr key={key}>
                                            <td style={{ textAlign: 'center' }}>

                                                {/* {params.type === "assessment" || ExportType !== "All Games" ? */}
                                                <input type="checkbox" id={key} className='' style={{ margin: '3px 3px 0 0', cursor: 'pointer' }} name={val.id} checked={checkedState.includes(val.id)} onChange={(e) => setCheck(e, val.id)} />
                                                {/* : <Popup
                                                        trigger={
                                                            <input type="checkbox" id={key} className='' style={{ margin: '3px 3px 0 0', cursor: 'pointer' }} name={val.id} checked={checkedState.includes(val.id)} />
                                                        }
                                                        content='Please select a game'
                                                        inverted
                                                    />} */}
                                            </td>
                                            <td><Link to={{ pathname: '/updateuserprofile', state: { uuid: val.uuid, name: val.full_name } }}>{val.id}</Link></td>
                                            <td>
                                                {
                                                    params.type === "assessment" ?
                                                        val.results != null ?
                                                            <Link to={{ pathname: '/get-user-info', state: { uuid: val.uuid, name: val.full_name, id: val.id } }}>
                                                                {val.full_name}
                                                            </Link>
                                                            :
                                                            <Popup
                                                                trigger={
                                                                    <p style={{ cursor: "pointer" }}>{val.full_name}</p>
                                                                }
                                                                content='Assessment not started'
                                                                inverted
                                                            />
                                                        : <Link to={{ pathname: '/game-info', state: { uuid: val.id, name: val.full_name } }}>
                                                            {val.full_name}
                                                        </Link>
                                                }
                                            </td>
                                            <td>
                                                {val.email}
                                            </td>
                                            <td>{val.organisation_name ? val.organisation_name : "N/A"}</td>
                                            <td>{val.role ? val.role : "N/A"}</td>
                                            {
                                                params.type === "assessment" &&
                                                <>
                                                    <td>{val.results != null ? val.results.status : 'Not Started'}</td>
                                                    <td>{val.results != null && val.results.started_at != null ? datFunction(val.results.started_at) : '-'}</td>
                                                    <td>{val.results != null && val.results.ended_at != null ? datFunction(val.results.ended_at) : '-'}</td>
                                                </>
                                            }
                                            {
                                                params.type === "games" && ExportType !== "All Games" &&
                                                <>
                                                    <td>{val.status != null ? val.status : 'Not Started'}</td>
                                                    <td>{val.played_date != null ? val.played_date : '-'}</td>
                                                </>

                                            }


                                            {/* <td>{val.verify_code ? val.verify_code : "N/A"}</td> */}

                                        </tr>
                                    )
                                })
                                :
                                <tr><td colSpan='9' style={{ textAlign: "center" }}>No Data Found!</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
                <div className='pagination-bg'>
                    <Pagination
                        activePage={currentPageNum}
                        TotalPage={newData.length}
                        itemsCountPerPage={10}
                        onClick={handleGetPageNum}
                    />
                </div>
            </>


        </Form>
    </div>
};

export default AdminTable;