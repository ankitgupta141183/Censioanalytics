import { useEffect } from "react"
import { useState } from "react"
import { CSVDownload } from "react-csv"
import { useDispatch } from "react-redux"
import { Button, Loader, Popup } from "semantic-ui-react"
import { showNotification } from "../../../Actions/componentActions"
import { ExportGameData } from "../../../Services/ExportData"
import { UserServices } from "../../../Services/UserServices"
import AdminCommonTable from "../AdminCommanTable/AdminCommonTable"
import { ColumnsNames } from "./ColumnName"
import "./Researchers.scss"
function Researchers() {
    const [isLoading, setIsLoading] = useState(false)
    const [csvData, setCsvData] = useState({ export_data: [] })
    const [researchersUser, setResearchersUser] = useState([])
    const [checked, setChecked] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        UserServices.ResearchersUser().then(res => {
            if (res.data) {
                setResearchersUser(res.data)
            } else {
                setResearchersUser([])
            }
        })
    }, [])

    const AllExportData = () => {
        setCsvData({ export_data: [] })
        if (checked.length > 0) {
            setIsLoading(true)
            ExportGameData([], checked, "Games").then(res => {
                if (res.data.export_data.length === 0) {
                    setIsLoading(false)
                    setChecked([])
                    dispatch(showNotification(true, "Games data not found!", "error"))
                } else {
                    setIsLoading(false)
                    setCsvData({ export_data: res?.data?.export_data })
                    setChecked([])
                    setIsLoading(false)
                }

            }).catch((error) => {
                setIsLoading(false)
                setChecked([])
                dispatch(showNotification(true, "The server cannot find the requested resource.", "error"))
                return error
            })
        } else {
            dispatch(showNotification(true, "Please select user to export data", "error"))
        }
    }

    const UserActionButton = (value) => {
        const handleDeleteGame = (value) => {
            UserServices.GameDataDelete(value.id).then(res => {
                dispatch(showNotification(true, "Data deleted successfully"))
            }).catch((err) => {
                console.log(err, "err message game Api");
            })
        }
        return <div className="Action-button">
            <Button style={{ paddingRight: "12px" }} onClick={() => handleDeleteGame(value)}><i className="trash icon" ></i></Button>
            {/* <div className="download-button" >
                <Popup
                    trigger={
                        <Button type="button" onClick={() => ExportData(value)} className={'clear-filter export-btn Csv-button '}><i className='download icon'></i></Button>
                    }
                    content='Export'
                    inverted
                />
            </div> */}
        </div>
    }

    const HandleNavigate = (val, type) => {
        if (type === "id") {
            let LinkUpdateuserprofile = { pathname: '/updateuserprofile', state: { uuid: val.uuid, name: val.full_name } }
            return LinkUpdateuserprofile
        } else {
            let LinkGetUserInfo = { pathname: '/game-info', state: { uuid: val.id, name: val.full_name } }
            return LinkGetUserInfo
        }
    }


    return (
        <div className="Researchers_hearder">
            <div className="p-3">
                {/* {csvData.export_data.length > 0 && <CSVDownload data={csvData.export_data}
                    filename={`RegisteruserData.csv`}
                    target="_blank"
                >
                </CSVDownload>} */}
                <div>
                    <h1>Researchers</h1>
                </div>
                <div className="header-tabs d-flex vt-center justify-between">
                    <p></p>
                    <h3 className='m-auto'>List of Users</h3>

                    <div className="download-button" style={{ float: 'right' }}>
                        <Popup
                            trigger={
                                <Button type="button" onClick={AllExportData} className={`clear-filterexport-btn Csv-button ${checked.length > 0 && "blue"}`}><i className='download icon'></i></Button>
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
                    {
                        <div style={{ zIndex: "23" }}>{
                            isLoading && <Loader size='big' active inline='centered' />
                        }</div>
                    }
                    <AdminCommonTable
                        TableData={researchersUser}
                        columns={ColumnsNames}
                        UserActionButton={UserActionButton}
                        LinkBy={["id", "full_name"]}
                        checkBoxInput={["checkBox"]}
                        checked={checked}
                        setChecked={setChecked}
                        LinkFunCtion={HandleNavigate}
                        pagination={false}
                        itemsCountPerPages={researchersUser.length}
                        filters={true}
                        sorting={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default Researchers