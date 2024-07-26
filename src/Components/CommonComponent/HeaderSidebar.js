import React, { useEffect } from 'react';
// import { Grid } from 'semantic-ui-react';
import SidebarComponent from '../Sidebar/SidebarComponent';
// import FooterComponent from './FooterComponent/FooterComponent';
import HeaderComponent from './HeaderComponent/HeaderComponent';
import { useSelector, useDispatch } from 'react-redux';
// import BreadCrumb from '../Breadcrumb/Breadcrumb';
import { useHistory } from 'react-router-dom';
import { SignatureExpired } from '../../Actions/AuthAction';
import { getProfileDetail } from '../../Actions/ProfileAction';
import AdminBreadCrumb from '../Admin/AdminBreadCrumb/AdminBreadCrumb';


export default function HeaderSidebar() {
    const SIGNATURE_EXPIRED = useSelector((state) => state.authReducer.SIGNATURE_EXPIRED)
    const { profileReducer } = useSelector(state => state)
    const { profileDetail } = profileReducer
    // const profileDetail = useSelector(state => (state.profileReducer.profileDetail));
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getProfileDetail())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    // const isRegisteredFromLocal = localStorage.getItem("registration_completed") === "true" ? true : false
    // console.log(SIGNATURE_EXPIRED , "----SIGNATURE_EXPIRED-----");

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


   

    return (
        <div style={{ backgroundColor: "#f5f8fe", position: "relative" }}>
            <div>
             {profileDetail?.data?.user &&
             <>
                <HeaderComponent />
                {
                     !profileDetail?.data?.user?.udc_user && 
                     <>  
                     {/* <BreadCrumb /> */}
                     <AdminBreadCrumb />
                     <SidebarComponent />
                     </>
                }
              
                </>
             }
                {/* <Grid>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <HeaderComponent />
                        </Grid.Column>
                        <Grid.Column>
                        <FooterComponent />
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: 0 }}>
                        {<SidebarComponent />}
                    </Grid.Row>
                </Grid> */}
            </div>
            {/* <div><FooterComponent /></div> */}
        </div>
    )
}
