import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { SignatureExpired } from '../../../Actions/AuthAction';
import { useHistory, useLocation } from 'react-router-dom';
import AdminLineGraph from '../../CommonComponent/Graph/AdminLineGraph';
import { Grid, Loader } from 'semantic-ui-react';
import { UserServices } from '../../../Services/UserServices';
import { useDispatch } from 'react-redux';
import AdminBoxs from '../AdminBoxs/AdminBoxs';
import "./AdminDashboard.scss"
import AdminTable from '../AdminTable/AdminTable';
import { Assessmentcolumns, Gamescolumns } from "../../Columns/Columns"
import UsersStatusTable from "../UsersStatus/UsersStatusTable"

const AdminDashboard = () => {
    const SIGNATURE_EXPIRED = useSelector((state) => state.authReducer.SIGNATURE_EXPIRED)
    
    const isToggle = useSelector((state) => state.componentReducer.isToggle)
    const AdminUser = sessionStorage.getItem("userData")
    const [isLoading ] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const Admin_FirstName = JSON.parse(AdminUser).first_name;


    const [BoxData, setBoxData] = useState({
        Total: 0,
        Pending: 0,
        Completed: 0,
        organisation: 0,
        isLoading : false
    })
    const [ShowUserTable, setShowUserTable] = useState({ type: "", statustype: "" })
    const location = useLocation()


    // const USER_TYPE = sessionStorage.getItem("USER_TYPE")

  
    // useEffect(()=>{
    //     let routesStatus =  sessionStorage.getItem('isActiveItem')  
    //     if(routesStatus === null ){
    //         history.push('/admin');
    //     }else{
    //         history.push(routesStatus);
    //     }
    //     // eslint-disable-next-line
    // },[USER_TYPE])


  
    useEffect(() => {
        if (SIGNATURE_EXPIRED !== "") {
            sessionStorage.clear();
            history.push("/");
            setTimeout(() => {
                dispatch(SignatureExpired(""))
            }, 1000)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [SIGNATURE_EXPIRED])

    useEffect(() => {
        setBoxData({
            Total: 0,
            Pending: 0,
            Completed: 0,
            organisation: 0,
            isLoading :  true
        })

        UserServices.AdminDashboard(location.pathname === '/admin' ? 'assessment_data' : "game_data").then((response) => {
            if (response.message !== "Request failed with status code 404") {
                if (location.pathname === '/admin')
                {
                    setBoxData({
                        Total: response.data.data.users,
                        Pending: response.data.data.pending_assessments,
                        Completed: response.data.data.completed_assessments,
                        organisation: response.data.data.organisations,
                        isLoading : false
                    })
                }
                else{
                    setBoxData({
                        Total: response.data.data.users,
                        Pending: response.data.data.pending_games,
                        Completed: response.data.data.completed_games,
                        organisation: response.data.data.organisations,
                        isLoading : false
                    })
                }
            }
        }).catch((error) => {
            if (error.response.data.errors === "Signature has expired") {
                dispatch(SignatureExpired(error.message))
                dispatch({
                    type: 'FETCH_SESSION_EXPIRED',
                    payload: error.response.data.errors
                })
            }
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    useEffect(() => {
        setShowUserTable({ type: "", statustype: "" })
    }, [location])

    return (<div className='admin-main admin-dashboard-bg'>
        <div className={!isToggle ? "admin-inner" : "admin"}>
            <div className='p-3'>
                <h1>Welcome {Admin_FirstName}</h1>
                {isLoading ? <Loader size='big' active inline='centered' /> 
                
                : <>
                      <div>
                    <AdminBoxs BoxData={BoxData} ChangeTable={setShowUserTable} ShowUserTable={ShowUserTable} />
                </div>
                <div>
                    {
                        (ShowUserTable.statustype === "games" || ShowUserTable.statustype === "assessments") ? <>
                        <div className='section_box'>                            <AdminTable
                                columns={location.pathname === "/admin" ? Assessmentcolumns : Gamescolumns}
                                params={ShowUserTable}
                            />
                            </div>
                        </>
                            : <>
                                {ShowUserTable.statustype !== "" && <div className='section_box'>  <UsersStatusTable param={ShowUserTable} /></div>}
                            </>
                    }
                </div>
                <div>
                    {ShowUserTable.statustype === "" &&
                        <Grid>
                            <Grid.Row>
                                <Grid.Column computer={16} tablet={16} mobile={16}>
                                    <div className="section_area Admin_Graph-blog">
                                        <AdminLineGraph />
                                        {/* <img src={graphImg} alt="" className="w-100" /> */}
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    }
                </div>
                </>}
              
            </div>
        </div>
    </div>)
};

export default AdminDashboard;
