import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import researchAssessment from '../../assets/img/research-assessment.png';
import { Button, Grid, Header, Image, Icon, Loader, Dimmer } from "semantic-ui-react";
import './dashboard.scss';
import { Markup } from 'interweave';
import { useSelector, useDispatch } from 'react-redux';
import { getReviewQuestion, getAllAssesment } from '../../Actions/questionAction';
import { useHistory } from "react-router-dom";

import '../DashboardUDC/dashboardUDC.scss'

export default function NewDashboard(props) {

    const history = useHistory()
    const profileDetail = useSelector(state => (state.profileReducer.profileDetail));
    const isSessionExpired = useSelector(state => (state.questionListReducer.isSessionExpired))
    const reviewList = useSelector(state => (state.questionListReducer.reviewList))
    // const assesmentList = useSelector(state => (state.questionListReducer.assesmentList))

    const [isopenTakeTest, setIsopenTakeTest] = React.useState(false)
    // const [userName, setUserName] = useState("")
    const [reviewData, setReviewData] = React.useState(reviewList)
    const [isQuestionReviewShow, setIsQuestionReviewShow] = React.useState(false)
    const [isOpenViewReport, setIsOpenViewReport] = React.useState(false)
    // const [isShowTestButton, setIsShowTestButton] = React.useState(reviewList && reviewList.length > 0 && reviewList[0].is_complete)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const [isShowButton, setIsShowButton] = React.useState(false)
    const [assesmentData, setAssesmentData] = React.useState("")
    const isUdc = useSelector(state => state.profileReducer?.profileDetail?.data?.user?.udc_user )
    const {sidebarHoverReducer} = useSelector(state => state)

    // const [assesmentListing, setAssesmentList] = React.useState("")
    // const [visible, setVisible] = React.useState(true)

    const handleClickTakeTest = () => {
        if (isShowButton === "In Progress") {
            // history.push("/welcome") 
            if(props?.isAssessmentPage){
                history.push("/assessment-welcome")
            }
            else{
                history.push("/welcome") 
            }

        } else {
            props?.isAssessmentPage ? history.push("/assessment-instructions") : history.push("/instructions") 
            // history.push("/instructions")    
        }
    }
    const handleClickReport = () => {
        // setIsOpenViewReport(true)
        history.push("/completed")
    }

    useEffect(() => {
        // var testUserName = sessionStorage.getItem("userName") ? sessionStorage.getItem("userName") : ""
        // var testName = (profileDetail && profileDetail.first_name) ? `${profileDetail.first_name}` : testUserName.split(" ")[0]
        // setUserName(testName)
        setIsopenTakeTest(false)
    }, [profileDetail])

    const handleClickOpenQuestion = (val) => {
        if (val === "question_list") {
            history.push({
                pathname: `/user-question/${assesmentData}`,
                // visible: visible,
            })
        }
        // setIsopenTakeTest(val)
        if (isShowButton === "In Progress") {
            history.push("/welcome")
        } else {
            history.push("/instructions")
        }
    }

    useEffect(() => {
        getAllAssesmentListing()
    }, []);  /* eslint-disable-line*/

    useEffect(() => {
        if (isSessionExpired === "Signature has expired") {
            sessionStorage.clear()
            history.push("/login")
        }
    }, [isSessionExpired]) /* eslint-disable-line*/

    const getAllReviewQuestion = (id) => {
        setIsLoading(true)
        dispatch(getReviewQuestion(id))
            .then(
                (data) => {
                    setIsLoading(false)
                    if (data && data.payload === "Signature has expired") {
                        history.push("/login")
                        sessionStorage.clear()
                    }
                    if (data && data.payload !== "Signature has expired") {
                        
                        setReviewData(data.payload)
                        // setIsLoading(false)
                        // setIsShowTestButton(data.payload.length > 0 && data.payload[0].is_submit)
                    }

                },
                (error) => {
                    // setIsLoading(false)
                    if (error.response.data.errors === "Signature has expired") {
                        sessionStorage.clear()
                        history.push("/login")
                    }
                    console.log("error.response.status", error);
                }
            );
    };


    const getAllAssesmentListing = () => {
        setIsLoading(true)
        dispatch(getAllAssesment())
            .then(
                (data) => {
                    // setIsLoading(false)
                    // if (data && data.payload == "Signature has expired") {
                    //     history.push("/login")
                    // }
                    // if (data && data.payload != "Signature has expired") {
                    //     setReviewData(data.payload)
                    //     setIsShowTestButton(data.payload.length > 0 && data.payload[0].is_submit)
                    // }
                    if (data && data.payload && data.payload[0]) {
                        setAssesmentData(data.payload[0].uuid)
                        // setAssesmentList(data.payload[0])
                        getAllReviewQuestion(data.payload[0].uuid)

                        setIsShowButton(data.payload[0].status)
                    }

                },
                (error) => {
                    setIsLoading(false)
                    if (error.response.data.errors === "Signature has expired") {
                        sessionStorage.clear()
                        history.push("/login")
                    }
                    console.log("error.response.status", error);
                }
            );
    };

    const handleClickReview = () => {
        if (isOpenViewReport) {
            setIsOpenViewReport(false)
        } else {
            setIsQuestionReviewShow(!isQuestionReviewShow)
        }

    }

    // const titleCase = (str) => {
    //     if (str) {

    //         var splitStr = str.toLowerCase().split(' ');
    //         for (var i = 0; i < splitStr.length; i++) {
    //             splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    //         }
    //         // Directly return the joined string
    //         return splitStr.join(' ');
    //     }

    // }

    const LastAccessed = () => {
        if (reviewData && reviewData.updated_at) {
            const date = new Date(reviewData.updated_at)
            // const currentDate = date.getDate()
            // const month = time.getMonth()
            // const year = time.getFullYear()
            return <p style={{ marginBottom: "0%", marginLeft: "2px" }}> Last Accessed on {date.getDate()}  {date.toLocaleString('default', { month: 'long' })} {date.getFullYear()} </p>

        }
    }
    return (
        // isUdc
        // dashboard-page-udc
        // assesment-test_sec
        // className={sidebarHoverReducer.isHover ? "dashboard-page-udc page-small" : "dashboard-page-udc" }
        // className={`${isUdc ? "dashboard-page-udc  one" : "assesment-test_sec  two" }`}
        <div className={`${isUdc ? "dashboard-page-udc  one" :  props?.isAssessmentPage ? "assesment-test_sec  two m-auto" : 'assesment-test_sec  two' }`}  >
            <div className={sidebarHoverReducer.isHover ? "dashboard-page-udc page-small" : "dashboard-page-ud" }>
                {/* <BreadCrumb /> */}
                {/*class =  right-content-sec-all */}
                <Grid className="">
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <div className="main-content">
                                <div>
                                    <Dimmer active={isLoading} inverted>
                                        <Loader size='large' inline='centered' >
                                            Loading...
                                        </Loader>
                                    </Dimmer>
                                </div>
                                <div className="enable-take-test-sec">
                                    <Grid>
                                        <Grid.Row>
                                            {/* <Grid.Column width={14}>
                                                <Header as="h2" className="grey-heading" style={{ margin: '0' }}>
                                                    Web Assessment
                                                </Header>
                                            </Grid.Column> */}
                                            <Grid.Column width={2}>
                                                {
                                                    isShowButton === "Complete" &&
                                                    <Button
                                                        onClick={handleClickReview}
                                                        className="take-test_btn"
                                                        style={{ marginBottom: 20 }}
                                                    >
                                                        {
                                                            isQuestionReviewShow || isOpenViewReport ?
                                                                "Close"
                                                                :
                                                                "Review"
                                                        }
                                                    </Button>

                                                }
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                    {/* </div> */}


                                    {
                                        !isopenTakeTest && !isQuestionReviewShow && !isOpenViewReport ?
                                            <div>
                                                {/* <div className={'assesment-test_sec'}>
                                                    <Grid>
                                                        <Grid.Row>
                                                            <Grid.Column mobile={16} tablet={3} computer={3} className="vt-center">
                                                                <Image src={threesixtyLogo} className="grey-img-assessment threesixty__logo" />
                                                            </Grid.Column>

                                                            <Grid.Column mobile={16} tablet={12} computer={9} className="vt-center">

                                                                {LastAccessed()}
                                                                <h2 style={{ marginTop: "0%" }}>{assesmentListing && assesmentListing.title}</h2>
                                                                <p>The assesment test takes around 20 to 30 minutes to complete.<br />You can pause and continue your test later. </p>
                                                            </Grid.Column>

                                                        </Grid.Row>
                                                    </Grid>
                                                </div> */}
                                                
                                                
                                                <div className={'student-research_sec'}>
                                                    <Grid>
                                                        <Grid.Row>
                                                            <Grid.Column mobile={16} tablet={3} computer={3} className="vt-center">
                                                                <Image src={researchAssessment} className="grey-img-assessment threesixty__lo" />
                                                            </Grid.Column>

                                                            <Grid.Column mobile={16} tablet={12} computer={12} className="vt-center">

                                                                {LastAccessed()}
                                                                <h2 style={{ marginTop: "0%" }}>Web Assessment</h2>
                                                                    <p>Censio Analytics is conducting advanced research to measure attributes that affect student retention and success. Completing the following assessment will contribute immensely to further this research. </p>
                                                                    <p>The questions are grouped into sections. You will be given specific instructions at the beginning of each section.</p>
                                                                    <p>The assessment will take approximately 25 minutes to complete.</p>
                                                                    <p>We strongly recommend you find 25 minutes of uninterrupted time to complete the assessment.  If you do not complete the assessment in one sitting, you can log in again and the assessment will resume where you left off. You will not have to repeat any of the questions you have already answered.</p>
                                                                    <p>For the assessment to be considered 'complete' please make sure you answer every question and click SUBMIT ASSESSMENT at the end screen. </p>
                                                                    <p>Thank you in advance for your valued input.</p>
                                                                {/* <p>The assesment test takes around 20 to 30 minutes to complete.<br />You can pause and continue your test later. </p> */}
                                                            </Grid.Column>

                                                            <Grid.Column mobile={16} tablet={12} computer={16} className="text-align">
                                                                {
                                                                    // isShowTestButton ?
                                                                        isShowButton === "Completed" ?
                                                                        <Button
                                                                            onClick={handleClickReport}
                                                                            className="take-test_btn">
                                                                             Assessment Completed 
                                                                        </Button>
                                                                        :
                                                                        isShowButton === "In Progress" ?
                                                                            <Button
                                                                                // onClick={() => history.push(`/user-question/${assesmentData}`)}
                                                                                onClick={() => handleClickOpenQuestion("gameSection")}
                                                                                className="take-test_btn">
                                                                                <Icon name='file' />
                                                                                Continue the Assessment
                                                                            </Button>
                                                                            :
                                                                            <Button
                                                                                onClick={handleClickTakeTest}
                                                                                className="take-test_btn">
                                                                                <Icon name='file' />
                                                                                Take the Assessment
                                                                            </Button>

                                                                }

                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>
                                                </div>
                                                <br />
                                                {/* {location.pathname === "/dashboard/games" && */}
                                                 {/* <div className='' style={{ marginTop: "5px" }}>
                                                    <GameScreen  setIsLoading={setIsLoading} isLoading={isLoading} reviewData={reviewData} />
                                                </div> */}
                                                {/* } */}
                                            </div>
                                            :
                                            !isQuestionReviewShow && !isOpenViewReport && isopenTakeTest === "welcome_assisment" ?
                                                <div>
                                                    {/* <div className={'assesment-test_sec'} style={{ height: 80, marginBottom: 20 }}>

                                            </div> */}
                                                    <div className="enable-take-test">
                                                        <Header as="h3" textAlign="center">
                                                            Welcome to the Censio360 assessment!
                                                        </Header>
                                                        <p>
                                                            This assessment will take you less than 30 minutes to complete. We recommend you find 30 minutes of uninterrupted time to complete the assessment.  If you do not complete the assessment in one sitting, you can log in again and the assessment will resume where you left off. You will not have to repeat any of the questions you have already answered.
                                                            Thank you for participating in this research. Your responses will contribute immensely to further this research. Your responses are confidential. The research team will never release any of your information.
                                                        </p>
                                                        <p>
                                                            If you need assistance completing this assessment, please contact the Principal Investigator, Dr. Sangeeta Badal, by sending an email to sangeeta.badal@gmail.com or by calling 402-332-6088. Support is available from 8:00 a.m. to 8:00 p.m. Eastern Time, Monday through Friday, or 8:00 a.m. to 6:00 p.m. Eastern Time on Saturday and Sunday.
                                                        </p>
                                                        <p>Thank you in advance for your valued input.</p>
                                                        <p>Sincerely,</p>
                                                        <p>Censio Analytics team.</p>
                                                        <p>Please enter your ID Code from the email invitation you received earlier and click the </p>
                                                        <p>"Begin Survey" button to continue.</p>
                                                        <div style={{ textAlign: "center" }}>

                                                            <Button
                                                                className="next-button"
                                                                onClick={() => handleClickOpenQuestion("instruction")}
                                                            >
                                                                Next <Icon name="arrow right" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                !isQuestionReviewShow && !isOpenViewReport && isopenTakeTest === "instruction" ?
                                                    <div>
                                                        {/* <div className={'assesment-test_sec'} style={{ height: 80, marginBottom: 20 }}>

                                                </div> */}
                                                        <div className="enable-take-test">
                                                            <Header as="h3" textAlign="center">
                                                                Read Instructions Carefully
                                                            </Header>
                                                            <p>
                                                                Mark one box only to indicate the answer you consider correct for each question.
                                                            </p>
                                                            <p>No Negative marking.</p>

                                                            <p>You need to select atleat one option in every question.</p>
                                                            <p>After responding to a question, click on the "Next" button at the bottom to go to the next question.</p>
                                                            <p>
                                                                You won't be able to go ahead if you have not answered the current question.
                                                            </p>
                                                            <div style={{ textAlign: "center" }}>
                                                                <Button
                                                                    className="next-button"
                                                                    onClick={() => handleClickOpenQuestion("gameSection")}
                                                                >
                                                                    Next <Icon name="arrow right" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    !isQuestionReviewShow && !isOpenViewReport && isopenTakeTest === "gameSection" ?
                                                        <div>
                                                            {/* <div className={'assesment-test_sec'} style={{ height: 80, marginBottom: 20 }}>

                                            </div> */}
                                                            <div className="enable-take-test">
                                                                <div>
                                                                    {/* <Assessment /> */}
                                                                </div>

                                                            </div>
                                                            <div style={{ float: "right", marginTop: "-50px", marginRight: 60 }}>
                                                                <Button
                                                                    className="next-button"
                                                                    onClick={() => handleClickOpenQuestion("question_list")}
                                                                >
                                                                    Next  <Icon name="arrow right" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        :
                                                        isQuestionReviewShow && !isOpenViewReport ?
                                                            <div className={'assesment-test_sec'}>
                                                                <Header as="h3" className="header-review">
                                                                    Below is the list of responses that you have submitted -
                                                                </Header>
                                                                {
                                                                    reviewData.length > 0 &&
                                                                    <>
                                                                        {
                                                                            reviewData.length > 0 &&
                                                                            <>
                                                                                {
                                                                                    reviewData.map((item, i) => {
                                                                                        return <>
                                                                                            <div style={{ marginBottom: 20 }}>
                                                                                                <b>
                                                                                                    {
                                                                                                        !item.image &&
                                                                                                        <span>{i + 1} .</span>
                                                                                                    }

                                                                                                    <Markup content={item.label} />
                                                                                                </b>
                                                                                                {
                                                                                                    item.image &&
                                                                                                    <Image src={item.image} height="300" width="300" />
                                                                                                }
                                                                                                <p> <span style={{ fontWeight: 600 }}>Answer: </span>  {item.option}</p>
                                                                                            </div>
                                                                                        </>
                                                                                    })
                                                                                }
                                                                                <div style={{ textAlign: "end" }}>
                                                                                    <Button
                                                                                        onClick={() => setIsQuestionReviewShow(false)}
                                                                                        className="take-test_btn">
                                                                                        Close
                                                                                    </Button>
                                                                                </div>

                                                                            </>
                                                                        }

                                                                    </>
                                                                }

                                                            </div>
                                                            :
                                                            isOpenViewReport &&
                                                            <>
                                                                {/* <ViewReport /> */}
                                                            </>
                                    }
                                </div>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>



            </div>
        </div>
    );
}
