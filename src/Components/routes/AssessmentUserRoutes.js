import React, { useState } from "react";
import { Route, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { UserServices } from '../../Services/UserServices';
import { getProfileSuccess } from '../../Actions/ProfileAction'
import { useEffect } from "react";
import AssessmentHeader from "../AssessmentHeader/AssessmentHeader";
import { showNotification } from "../../Actions/componentActions";

const AssessmentUserRoutes = (props) => {
    const { component: Component, userlogin, isAssessmentPage, ...rest } = props;
    const dispatch = useDispatch()
    const [isfetched, setIsfetched] = useState(false)
    const [isHeaderManu, setIsHeaderManu] = useState(true)
    const location = useLocation()
    const history = useHistory()

    const fetchAssessmentData = async () => {
        setIsfetched(true)
        const unique_id = location.search?.split("?")[1]?.split("=")[1];
        if (unique_id) {
            try {
                const data = await UserServices.fetchAssessementUser(unique_id)
                if (data?.data?.status === 200) {
                    setIsfetched(false)
                    sessionStorage.setItem("isPublicUser", true);
                    if (data?.data?.user?.is_private) {
                        sessionStorage.setItem("USER_TYPE", "PrivateUser")
                    }
                    console.log("----data-- response------===========", data?.data)
                    sessionStorage.setItem('ssoToken', data?.data?.token)
                    sessionStorage.setItem('assessmentUserId', data?.data?.user.id)
                    dispatch(getProfileSuccess(data))
                }
                else {
                    setIsfetched(false)
                    dispatch(showNotification(true, 'Something went wrong.'))
                }

            } catch (error) {
                setIsfetched(false)
                console.log(" const data = await fetchAssessementUser(", error)
            }
        } else {
            history.push("/")
        }
        // UserServices.fetchAssessementUser().then((res)=>console.log("res---",res)).catch(error=>console.log('error---------',error))

    }

    useEffect(() => {
        let getUserId = sessionStorage.getItem('assessmentUserId' || '')
        if (!getUserId) {
            fetchAssessmentData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <>
            {
                !isfetched && <>
                    <AssessmentHeader setIsHeaderManu={setIsHeaderManu} />
                </>
            }

            <Route {...rest} render={props => {
                return (
                    <Component {...props} isfetched={isfetched} isAssessmentPage={isAssessmentPage} isHeaderManu={isHeaderManu} />
                )
            }} />
        </>

    )
}


export default AssessmentUserRoutes;