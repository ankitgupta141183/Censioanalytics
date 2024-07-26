import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Button, Grid, Header, Icon } from "semantic-ui-react";
import './dashboard.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Paths } from "../routes/routePaths";

// import {Completed} from "../routes/routePaths"
import { getReviewQuestion, getAllAssesment } from '../../Actions/questionAction';
export default function Dashboard(props) {
    const history = useHistory()
    const isSessionExpired = useSelector(state => (state.questionListReducer.isSessionExpired))
    const [isopenTakeTest, setIsopenTakeTest] = useState("welcome_assisment")
    const [isQuestionReviewShow, setIsQuestionReviewShow] = useState(false)
    const [isOpenViewReport, setIsOpenViewReport] = useState(false)
    const [assessmentData, setAssessmentData] = useState([])
    const [isAssessmentSubmitted, SetIsAssessmentSubmitted] = useState(false)
    const dispatch = useDispatch()

    const profileDetail = useSelector(state => (state.profileReducer.profileDetail));
    const { sidebarHoverReducer } = useSelector(state => state)



    const handleClickOpenQuestion = (val) => {



        if (val === "question_list") {
            sessionStorage.setItem('informationPage', true)
            if (props?.isAssessmentPage) {
                history.push(`/college-status`)
            } else {
                history.push({
                    pathname: `/user-question/${sessionStorage.getItem("questionUuid")}`,
                })
            }
            // }
        }
        else if (val === 'Completed') {
            history.push({
                pathname: Paths.Completed
            })
        }
        setIsopenTakeTest(val)
    }

    useEffect(() => {
        if (sessionStorage.getItem('informationPage') === 'false') {
            history.push(Paths.Instructions)
        }
        getAllAssesmentListing()
        setIsQuestionReviewShow(false)
        setIsOpenViewReport(false)
    }, []);  /* eslint-disable-line*/

    useEffect(() => {
        if (isSessionExpired === "Signature has expired") {
            sessionStorage.clear()
            history.push("/login")
        }
    }, [isSessionExpired]) /* eslint-disable-line*/

    const getAllReviewQuestion = (id) => {
        dispatch(getReviewQuestion(id))
            .then(
                (data) => {

                    if (data && data.payload === "Signature has expired") {
                        history.push("/login")
                    }

                    if (data.payload.next_question !== null) {
                        var NextcategoryId = data.payload.next_question.category_id;
                        var NextQuestionId = data.payload.next_question.id;

                        sessionStorage.setItem("NextQuestionId", NextQuestionId)
                        sessionStorage.setItem('NextcategoryId', NextcategoryId);
                        // sessionStorage.setItem('assessment_started',true)

                        // sessionStorage.setItem('informationPageAcess',false)
                    }
                    if (data.payload.last_question_data !== undefined) {
                        // sessionStorage.setItem('informationPage', false)
                        sessionStorage.setItem('assessment_started', true)
                        var LastcategoryId = data.payload.last_question_data.category_id;
                        var LastQuestionId = data.payload.last_question_data.id;
                        sessionStorage.setItem('lastCategoryId', LastcategoryId);
                        sessionStorage.setItem("lastQuestionId", LastQuestionId)

                    }
                    // if()
                    sessionStorage.setItem("questionAnswerList", JSON.stringify(data.payload))
                },
                (error) => {
                    if (error.response.data.errors === "Signature has expired") {
                        sessionStorage.clear()
                        history.push("/login")
                    }
                }
            );
    };
    const getAllAssesmentListing = () => {
        dispatch(getAllAssesment())
            .then(
                (data) => {
                    console.log("wel    come assessment data----:", data)

                    if (data && data.payload && data.payload[0]) {
                        setAssessmentData(data.payload)
                        getAllReviewQuestion(data.payload[0].uuid)
                        sessionStorage.setItem("questionUuid", data.payload[0].uuid)
                        SetIsAssessmentSubmitted(data.payload[0].status)
                        sessionStorage.setItem("assessmentSubmitted", data.payload[0].status)
                    }
                }
                ,
                (error) => {
                    if (error.response.data.errors === "Signature has expired") {
                        sessionStorage.clear()
                        history.push("/login")
                    }
                }
            );
    };
   
    return (
        <div className={profileDetail?.data?.user?.udc_user ? sidebarHoverReducer.isHover ? "page-small dashboard-page-udc" : "dashboard-page-udc" : props.isHeaderManu ? "assesment-test_sec m-auto" : "assesment-test_sec"}>
            {/* {`${isToggleTrue ? "dashboard-page" : "dashboard-page dashboard-page-small"}`} */}
            <div className={profileDetail?.data?.user?.udc_user ? "" : "dashboard-page"}>
                <Grid className="right-content-sec-all">
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <div className="main-content">
                                {
                                    <div>
                                        {assessmentData.map((data) => {
                                            const { uuid } = data;
                                            return <div key={uuid} >
                                            </div>
                                        })}
                                    </div>
                                }
                                {isopenTakeTest === "welcome_assisment" ?
                                    <div>
                                        <div className="enable-take-test">
                                            <Header as="h3" textAlign="center">
                                                Welcome to the Censio360 Research Project!
                                            </Header>
                                            <p className="txt-label">
                                                Censio and University of District of Columbia (UDC)  are conducting advanced research to measure an individual's meta-cognitive skills. Your responses to the following questions will contribute immensely to further this research.
                                            </p>
                                            <p className="txt-label">
                                                The assessment will take approximately 15 minutes to complete.
                                            </p>
                                            <p className="txt-label">
                                                We recommend you find 15 minutes of uninterrupted time to complete the assessment. If you do not complete the assessment in one sitting, you can log in again and the assessment will resume where you left off. You will not have to repeat any of the questions you have already answered.
                                            </p>
                                            <p>Please note that once you select your response to a question, navigation will automatically move to the next question. You will not be able to go back and edit any of your responses.</p>
                                            <p>Your responses are confidential. The research team will never release any of your information.</p>
                                            <p>Thank you in advance for your valued input .</p>
                                            <p>For any technical issue, please email <span className="admin-txt">admin@censioanalytics.com</span>. We will respond to your query within 24 hours.</p>
                                            <br />
                                            <p>Sincerely,</p>
                                            <p>Censio Analytics Research team.</p>

                                            <div style={{ textAlign: "center" }}>

                                                <Button
                                                    className="yellow-button"
                                                    onClick={() => isAssessmentSubmitted === "Completed" ? handleClickOpenQuestion("Completed") : handleClickOpenQuestion("question_list")}
                                                >
                                                    <Icon name="arrow right" style={{ margin: '0' }} /> Next
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    !isQuestionReviewShow && !isOpenViewReport && isopenTakeTest === "instruction" &&
                                    <div>

                                        <div className="enable-take-test">

                                        </div>
                                    </div>
                                }

                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </div>
        </div>
    );
}
