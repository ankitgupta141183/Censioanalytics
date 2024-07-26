import "./GameStyle.scss"
import "semantic-ui-css/semantic.min.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {useSelector } from "react-redux";
import GameInstructions from "./GameInstructions";
import { useLocation } from "react-router-dom";



function AllGames({isAssessmentPage , isHeaderManu}) {
    const profileDetail = useSelector(state => (state.profileReducer.profileDetail));
    const {sidebarHoverReducer} = useSelector(state =>  state)
    const assessmentUser = ['shivam.sharma34@oaktreecloud.com' ,'sourabh.staging34@gmail.com']
    const USER_TYPE = sessionStorage.getItem("USER_TYPE")
    const history = useHistory()
    const [ssoToken, setssoToken] = useState('')
    const location = useLocation()
    const [GameName, setGamename] = useState("")
    const isToggle = useSelector((state) => state.componentReducer.isToggle)
    const showGame = useSelector((state) => state.componentReducer.showgame)
    useEffect(() => {
        if (sessionStorage.getItem('ssoToken')) {
            setssoToken(sessionStorage.getItem('ssoToken'))
            const email = sessionStorage.getItem('email')
            if(!showGame){
                assessmentUser.includes(email)  || USER_TYPE === 'PrivateUser' ?   history.push("/assessment-dashboard") :  history.push("/upgrade-dashboard")
                
            }
            if (location.state !== undefined) {
                setGamename(location.state)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    return (
        <div className={profileDetail?.data?.user?.udc_user ? sidebarHoverReducer.isHover ? "page-small dashboard-page-udc" : "" : isHeaderManu ? "assesment-test_sec m-auto "  : "assesment-test_sec bg-[#F7FAFF] dark:bg-[#212121]" }>
        <div className={!isToggle && profileDetail?.data?.user?.udc_user ? "gamecontainer udc-game-screen-color" : "gamecontainer dark:bg-[#212121]"}>
                  {showGame && <GameInstructions gamename={GameName} ssoToken={ssoToken} /> }
        </div>
         </div>
    )
}

export default AllGames