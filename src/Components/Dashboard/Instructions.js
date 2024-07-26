import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Button, Grid,  Header } from "semantic-ui-react";
import "react-step-progress-bar/styles.css";
import "./dashboard.css"
import { useSelector } from "react-redux";

// import Dashboard from "./Dashboard";
const Instructions = (props) => {
    const [checked, setChecked] = useState(false)
    const [showError, setShowError] = useState(false)
    // const [showInputError, setshowInputError] = useState(false)
    // // const [initials, setInitials] = useState('')
    // const [informationPage, setinformationPage] = useState(false)
    const {isHeaderManu} = props
     // const location = useLocation()
    const history = useHistory()

    const isToggle = useSelector((state) => state.componentReducer.isToggle)
    const profileDetail = useSelector(state => (state.profileReducer.profileDetail));
    const {sidebarHoverReducer} = useSelector(state =>  state)


    useEffect(() => {
        if (sessionStorage.getItem('assessment_started') === 'true') {
            // history.push('/web-assessment')   // due to error commeting the code 
        }else{
            sessionStorage.setItem('informationPage', false)
        }
    }, []) /* eslint-disable-line*/
    useEffect(() => {
        if (checked) {
            setShowError(false)
        }
    }, [checked]) /* eslint-disable-line*/
    const handlenext = () => {
        if (checked) {
            sessionStorage.setItem('informationPage', true)
            if(props.isAssessmentPage){
                history.push('/assessment-welcome')
            }
            else{
                history.push({
                    // pathname: `/user-question/${sessionStorage.getItem("questionUuid")}`,
                    pathname: `/welcome`,
    
                })
            }

            setShowError(false)
            // setInitials('')
            // setshowInputError(false)
            // setinformationPage(true)

        }
        if (!checked) {
            setShowError(true)
        }
    }
    // const handleInputField = (e) => {
    //     setInitials(e.target.value)
    // }

    return (
        <div className={profileDetail?.data?.user?.udc_user ? sidebarHoverReducer.isHover ? "page-small dashboard-page-udc" : "dashboard-page-udc" : isHeaderManu  ? "assesment-test_sec m-auto" :  "assesment-test_sec"}>
        <div className={!isToggle? profileDetail?.data?.user?.udc_user  ? "" : !props.isAssessmentPage ? "dashboard-page" : "" :  "dashboard-page dashboard-page-small"}>
            <Grid>
                <Grid.Row>
                    <Grid.Column computer={16} tablet={16} mobile={16}>
                        <div className="main-content">
                            <div className="question-list enable-take-test">
                                <Header as='h3' icon textAlign="center">
                                    INFORMED CONSENT FOR PARTICIPATION IN C360 ASSESSMENT
                                    {/* <Icon name='check circle' style={{ color: "#1e1e62cf", marginTop: 30, marginBottom: 30 }} /> */}

                                </Header>

                                <h4>I.	PURPOSE OF THIS RESEARCH STUDY:</h4><p>Ihave been asked to complete a 30-minute web-based assessment and a 60-minute game-based assessment designed by Censio Analytics. The purpose of this assessment is to identify individual characteristics, attributes, and behaviors essential for success in college and post-graduation.</p>
                                <h4>II.	WHAT WILL BE DONE/PROCEDURES: </h4><p>The objective of this project is to build an accurate and psychometrically robust measure of student potential that assesses students’ metacognitive attributes (fluid intelligence, divergent thinking, achievement orientation, resilience, and proactive disposition). The results of the assessment can inform the college admissions process as well as identify developmental and learning needs of the students. I will complete a 30-minute web-based assessment and a 60-minute game-based assessment in two parts.</p>
                                <h4>III.	POSSIBLE BENEFITS:</h4><p>I have been informed that I will receive a customized report outlining my talents and strengths at the completion of this research study.</p>
                                <h4>IV.	POSSIBLE RISKS AND DISCOMFORTS:</h4><p> I have been informed that there are no risks and discomforts associated with this research study.</p>
                                <h4>V.	CONFIDENTIALITY OF RECORDS:</h4><p>Any data gathered from the web-based or gamified assessment in which I might be identified will remain confidential and will be disclosed only with my permission, to the extent allowed by law. All records will be stored on secure servers. Only the investigator and members of the research team will have access to these records. If information learned from this study is published, I will NOT be identified by name.</p>
                                <h4>VI.	OFFER TO ANSWER QUESTIONS NOTIFICATION: </h4><p> The principal investigator, Dr. Sangeeta Badal orthe faculty responsible for this research study, has offered to and has answered any and all questions regarding my participation in this research study.  If I have any further questions, I can contact Dr. Badal at <span className="admin-txt">Sangeeta.Badal@censioanalytics.com</span></p>
                                <h4>VII.	VOLUNTARY PARTICIPATION WITH RIGHT TO REFUSAL: </h4><p>I have been informed that my participation in this study is completely voluntary.  I am free to withdraw my consent for participation in the study at any time.</p>
                                <h4>VIII.	IRB REVIEW AND IMPARTIAL THIRD PARTY:</h4><p>This study has been reviewed and approved by the UDC Institutional Review Board (IRB).  A representative of that Board, from the IRB Office, is available to discuss the review process or my rights as a research subject.  The telephone number of the IRB Office is (202) 274-5705.</p>
                                {/* <h3>IX.	SIGNATURE FOR CONSENT (check box):</h3><p>I understand the purpose of this study and  agree to be a research subject in this study.</p> */}


                                <br />
                                <p>
                                    <input type="checkbox" id="password" className='' style={{ margin: '3px 5px 0 0', cursor: 'pointer' }} name="agree" checked={checked} onChange={(e) => {
                                        setChecked(!checked)
                                    }} /><span>I understand the purpose of this study and  agree to be a research subject in this study.</span>
                                    {showError &&
                                        < div style={{ margin: '10px 0 0 0' }}>
                                            <span style={{ color: 'red' }}>Please accept the consent</span>

                                        </div>


                                    }</p>


                                <div style={{ textAlign: "center", marginTop: 30 }}>


                                    <Button
                                        className="next-button yellow-button"
                                        onClick={() => handlenext()}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div >
        </div> 

    )
}
export default Instructions;