// import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Header, Loader } from "semantic-ui-react";
import { SignatureExpired } from "../../../Actions/AuthAction";
import { UserServices } from "../../../Services/UserServices";
import AdminCommonTable from "../AdminCommanTable/AdminCommonTable";
import "./UsersStatusTable.scss"

const UsersStatusTable = ({ param }) => {
    // var apiUrl = global.platformURI;
    const [isLoading, setIsLoading] = useState(false)
    const [Heading, setHeading] = useState("")
    const dispatch = useDispatch()
    // const param = useParams()
    const [columns, setColumns] = useState([])
    const [UsersData, setuserData] = useState([])


    const gamesStatus = () => {
        UserServices.getgameStatus(param.statustype).then((res) => {
            if (res.data) {
                setuserData(res.data)
                setIsLoading(false)
            } else {
                if (res.response.data.errors === "Signature has expired") {
                    dispatch(SignatureExpired("Signature has expired"))
                }
            }
        })
    }
    const AssessmentStatus = () => {
        UserServices.getAssessmentStatus(param.statustype).then((res) => {
            if (res.data) {
                setuserData(res.data)
                setIsLoading(false)
            } else {
                if (res.response.data.errors === "Signature has expired") {

                    dispatch(SignatureExpired("Signature has expired"))
                }
            }
        })
    }

    const organizationsStatus = () =>{
        UserServices.orgData().then((res) => {
            if (res.data) {
                setuserData(res.data.organisations)
                setIsLoading(false)
            } else {
                if (res.response.data.errors === "Signature has expired") {

                    dispatch(SignatureExpired("Signature has expired"))
                }
            }
        })
    }
    useEffect(() => {
        setIsLoading(true)
        if(param.statustype === "organizations"){
            organizationsStatus()
        }
        else if (param.type === "games") {
            gamesStatus()
        } else if (param.type === "assessment") {
            AssessmentStatus()
        } else {
            setIsLoading(false)
        }
        return () => {
            setuserData([])
        }
        // eslint-disable-next-line 
    }, [param])



    const Assessmentcolumns = useMemo(() => [
        // {
        //     Header: 'CSV Data',
        //     accessor: 'CSVData', // accessor is the "key" in the data
        //     placeholder: 'Filter By CheckBox',
        //     type: "checkbox"

        // },
        {
            Header: 'User Id',
            accessor: "id", // accessor is the "key" in the data
            placeholder: 'Filter By UserId',
            type: "number",
            Value :"id"

        },

        {
            Header: 'Name',
            accessor: "full_name", // accessor is the "key" in the data
            placeholder: 'Filter By Name',
            type: 'text',
            Value: "full_name"
        },
        {
            Header: 'Email',
            accessor: "email",
            placeholder: 'Filter By Email',
            type: 'text',
            Value : "email"

        },
        {
            Header: 'Organization',
            accessor: "organisation_name", // accessor is the "key" in the data
            // placeholder: 'Filter By Organization',
            // type: 'text',
            Value : "organisation_name"
        },
        {
            Header: 'Role',
            accessor: "role", // accessor is the "key" in the data
            placeholder: 'Filter By Role',
            type: 'text',
            Value : "role",
            inputType: "select",
            options: ["Student", "Organization", "Not Assign"]
        },
        // {
        //     Header: 'Status',
        //     accessor: "status", // accessor is the "key" in the data
        //     placeholder: 'Filter By Status ',
        //     type: 'select',
        //     Value : "results",
        //     ValueType : "Object",
        //     inputType: "select",
        //     options: ["Student", "Organization", "Not Assign"]
        // },
        {
            Header: 'Start Date',
            accessor: "started_at", // accessor is the "key" in the data
            placeholder: 'Filter Not Applied',
            type: 'text',
            Value : "results",
            ValueType : "Object",
            accessorType: "date"

        },
        {
            Header: 'Comp. Date',
            accessor: "ended_at", // accessor is the "key" in the data
            placeholder: 'Filter Not Applied',
            type: 'text',
            Value : "results",
            ValueType : "Object",
            accessorType: "date"

        }

    ],
        []
    )

    const Gamescolumns = useMemo(() => [
        {
            Header: 'User Id',
            accessor: 'id', // accessor is the "key" in the data
            placeholder: 'Filter By UserId',
            type: "number",
            Value: "id",
            inputType: "input"
        },

        {
            Header: 'Name',
            accessor: 'first_name', // accessor is the "key" in the data
            placeholder: 'Filter By Name',
            type: 'text',
            Value: ["first_name", "last_name"],
            combined: true
        },
        {
            Header: 'Email',
            accessor: 'email',
            placeholder: 'Filter By Email',
            type: 'text',
            Value: "email",
            inputType: "input"
        },
        {
            Header: 'Organization',
            accessor: 'organisation_name', // accessor is the "key" in the data
            placeholder: 'Filter By Organization',
            type: 'text',
            Value: "organisation_name",
            inputType: "input"

        },
        {
            Header: 'Role',
            accessor: 'role', // accessor is the "key" in the data
            placeholder: 'Filter By Role',
            type: 'text',
            Value: "role",
            inputType: "select",
            options: ["Student", "Organization", "Not Assign"]
        },
        {
            Header: 'Game Name',
            accessor: 'game_name', // accessor is the "key" in the data
            placeholder: 'Filter By game_name',
            type: 'text',
            Value: "game_name",
            inputType: "input",

        }
    ],
        []
    )

    const organizationsColumns = [
        {
            Header: 'Id',
            accessor: 'id', // accessor is the "key" in the data
            placeholder: 'Filter By Id',
            type: "number",
            Value: "organisation_id",
            inputType: "input" 
        },
        {
            Header: 'Name',
            accessor: 'name', // accessor is the "key" in the data
            placeholder: 'Filter By Name',
            type: "text",
            Value: "organisation_name",
            inputType: "input"    
        },
        {
            Header: 'No. of Users',
            accessor: 'name', // accessor is the "key" in the data
            placeholder: 'Filter Not Applied',
            type: "text",
            Value: "total_users",
            inputType: "input" 
        }

    ]

    useEffect(() => {
        if (param.statustype === "Completed") {
            setHeading("Completed Assessment")
            setColumns(Assessmentcolumns)
        } else if (param.statustype === "complete_games") {
            setHeading("Completed Games")
            setColumns(Gamescolumns)
        } else if (param.statustype === "In Progress") {
            setHeading("Pending Assessment")
            setColumns(Assessmentcolumns)
        } else if (param.statustype === "pending_games") {
            setHeading("Pending Games")
            setColumns(Gamescolumns)
        }else if(param.statustype === "organizations"){
            setHeading("Organizations")
            setColumns(organizationsColumns)
        }
        // eslint-disable-next-line
    }, [param.statustype])

    const handleLink = (link , key) =>{
        const AssessmentLink = { pathname: '/get-user-info', state: { uuid: link.uuid, name: link.full_name, id: link.id }}
        const GameLink = { pathname: '/game-info', state: { uuid: link.id, name: link.first_name } }
      return (param.type === "games" ? GameLink : AssessmentLink )
    }   
    return (
        <div className='completed_game-statuss'>
            <div className="status_tables">
                <div className="p-3s">
                    <div className="kstatus_table-inner">
                        <Header as="h2">{Heading}</Header>
                        {/* <div>
                            <select className="select-input" placeholder="Select Game Status" value={`/status/${param.statustype}`}  onChange={handleChangeGameStattus}>
                            <option hidden value={""}>{"Select Game Status"}</option>
                                <option value={"/status/complete_games"}>
                                    Completed Games
                                </option>
                                <option value={"/status/pending_games"}>
                                    Pending Games
                                </option>
                            </select>
                        </div> */}
                        {isLoading ? <Loader size='big' active inline='centered' /> :
                            <>
                                <div className='ui table-responsive' style={{ overflow: 'auto' }}>
                                    <AdminCommonTable
                                        TableData={UsersData}
                                        columns={columns}
                                        filters={param.statustype === "organizations" ? false : true}
                                        sorting={true}
                                        LinkBy={["full_name" , "first_name"]}
                                        LinkFunCtion={handleLink}
                                    />
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsersStatusTable;