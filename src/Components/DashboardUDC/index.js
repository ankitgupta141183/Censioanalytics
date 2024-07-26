import { useSelector, useDispatch } from "react-redux";
import { Grid, Header, Icon, Container, Popup } from "semantic-ui-react";
// import CustomLoader from "../Loader";
import "./dashboardUDC.scss"
// import meetingImg from '../../assets/img/meeting.png';
// import isfpImg from '../../assets/img/isfp.png'
// import threesixtyLogo from '../../assets/img/360-gradient.png';

import { Link, useHistory } from "react-router-dom";
import React from "react";
// import advisorImg from '../../assets/img/advisor.png';
// import GameScreen from "../GameScreen/GameScreen";
import UDCGameScreen from "../GameScreen/UDCGameScreen";

import { getAllAssesment } from '../../Actions/questionAction';
import { useEffect } from "react";


const DashBoardUDC = () => {

    const { profileReducer, sidebarHoverReducer, gamesDetailsReducer } = useSelector(state => state)
    const { profileDetail } = profileReducer
    const [assessementStatus, setAssessementStatus] = React.useState(false)
    const history = useHistory()
    const dispatch = useDispatch()
    const {games} = gamesDetailsReducer

    const titleCase = (str) => {
        if (str) {
            var splitStr = str.toLowerCase().split(' ');
            for (var i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }
            // Directly return the joined string
            return splitStr.length > 0 ? splitStr?.join(' ') : ""
        }

    }

    const handleOnClickLink = (type) => {
        history.push(type)
    }


    useEffect(() => {
        getAllAssesmentListing()
        // eslint-disable-next-line 
    }, [])


    const getAllAssesmentListing = () => {
        dispatch(getAllAssesment())
            .then(
                (data) => {
                    if (data && data.payload && data.payload[0]) {
                        setAssessementStatus(data.payload[0].status)
                    }
                },
                (error) => {
                    console.log("error.response.status", error);
                }
            );
    };

    const Completed_games = games?.filter(item =>  item.gamecompleted === 1)
    

    const HandleProgressText = () => {
        if( assessementStatus === "pending" ){
            return "Start Assessment"
        }
        else if (assessementStatus === "In Progress"  ){
            return "Complete Assessment"
        }
        
        else if(  assessementStatus === "Completed" && Completed_games.length === 0  ){
            return "Start Playing Games"
        }
        else if(  assessementStatus === "Completed" && [1 , 2 ].includes(Completed_games.length)){   
            return "Finish Playing Games"
        }
        else{
            return "Wohoo! You did it."
        }
    }

    const handleProgressBar = () =>{
        if(assessementStatus === "Completed" && Completed_games.length === 3  ){
            return "100%"
        }
        else if(assessementStatus === "Completed" && [1, 2].includes(Completed_games.length) ){
            return "50%"
        }
        else if( assessementStatus === "Completed" && Completed_games.length === 0  ){
            return "27%"
        } else if(assessementStatus === "In Progress" && Completed_games.length === 0){
            return "10%"
        }
        else{
            return "0%"
        }
    }

    //   ['pending' , 'Completed' , 'In Progress']
    return (
        <div>
            <>
            {/* <div className={sidebarHoverReducer.isHover ? "dashboard-page-udc page-small" : "dashboard-page-udc" }>
                <Grid className="right-content-sec-all">
                    <Grid.Row>
                        <Grid.Column width={16} className="p-3">
                            <div className="">
                                <div>
                               
                                </div>
                            </div>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Header as="h2" className="grey-heading">
                                            Good Afternoon, {titleCase(profileDetail?.data?.user?.first_name || "")}
                                        </Header>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <div>
                              
                                <div>
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column mobile={16} tablet={16} computer={16} className="vt-center pro-full-width">
                                                <div>
                                                  
                                                    <div className={'assesment-test'} style={{margin: "0px"}}>
                                                        <Grid>
                                                            <Grid.Row>
                                                               
                                                                <Grid.Column mobile={16} tablet={16} computer={16}  >
                                                                <UDCGameScreen />

                                                                </Grid.Column>
                                                            </Grid.Row>
                                                        </Grid>
                                                    </div>
                                                </div>
                                            </Grid.Column>

                                            
                                        </Grid.Row>
                                    </Grid>
                                </div>

                                

                                <Divider hidden />
                                <div className="opted-program">
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column mobile={16} tablet={16} computer={16}>
                                                <Header as="h2" className="grey-heading">
                                                    My Academic Advisor
                                                </Header>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column mobile={16} tablet={16} computer={16} className="">
                                                <div className={'assesment-test_sec h-fix'} style={{ margin: "0px", height : "auto" }}>
                                                    <Grid>
                                                        <Grid.Row>
                                                            <Grid.Column mobile={16} tablet={16} computer={8}>
                                                                <Grid>
                                                                    <Grid.Row>
                                                                        <Grid.Column width={6} className="vt-center">
                                                                            <Image src={advisorImg} className="grey-img-assessment" />
                                                                        </Grid.Column>

                                                                        <Grid.Column width={10} className="vt-center">
                                                                            <h2>Prof. Shepherd</h2>
                                                                            <p>Ph.D, MIT </p>
                                                                        </Grid.Column>
                                                                    </Grid.Row>
                                                                </Grid>
                                                            </Grid.Column>

                                                            <Grid.Column mobile={16} tablet={16} computer={8}>
                                                                <Grid className="upcoming-meeting-bg">
                                                                    <Grid.Row>
                                                                        <Grid.Column width={10} className="vt-center">
                                                                            <p>Upcoming Meeting: </p>
                                                                            <p>On <b>Today</b> at <b>10:00 AM</b></p>
                                                                        </Grid.Column>

                                                                        <Grid.Column width={6} className="vt-center">

                                                                            <Image src={meetingImg} className="grey-img-assessment" />
                                                                        </Grid.Column>

                                                                    </Grid.Row>
                                                                </Grid>
                                                                <Divider />
                                                                <p>You have a new message </p>
                                                                <Grid>
                                                                    <Grid.Row>
                                                                        <Grid.Column mobile={16} tablet={9} computer={9}>
                                                                            <span>Send message to your advisor? </span>
                                                                        </Grid.Column>
                                                                        <Grid.Column mobile={16} tablet={7} computer={7}>
                                                                            <Button className="send-msg-btn float-right"
                                                                            >
                                                                                <Icon name="chat"></Icon>
                                                                                My Messages
                                                                            </Button>
                                                                        </Grid.Column>
                                                                    </Grid.Row>
                                                                </Grid>

                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>
                                                </div>
                                            </Grid.Column>
                                        
                                        </Grid.Row>
                                    </Grid>
                                </div>
                            
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div> */}
            </>
            {/* ---------------------------------------------------- */}
            <div className={sidebarHoverReducer.isHover ? "dashboard-page-udc page-small" : "dashboard-page-udc"}>
                <div className="udc-home">
                    <Container>
                        <div>
                            <Grid className="right-content-sec-all mb-1">
                                <Grid.Row>
                                    <Grid.Column computer={10} mobile={16} className="p-3">
                                        <Header as="h2">Let’s start with your Web Assessment</Header>
                                    </Grid.Column>
                                    <Grid.Column computer={6} mobile={16} className="p-3 text-right text-sm-left">
                                        <button><Icon name="close" />Save Test & Exit</button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <div className="bg-white p-2"
                            >
                                <Header as="h3"> Good Afternoon, {titleCase(profileDetail?.data?.user?.first_name || "")}</Header>
                            </div>
                            <div className="bg-black p-2 progress-bar">
                                <div className="d-flex align-center">
                                    <Header as="h3">Overall Progress</Header>

                                    <div className="ui progress flex-80"
                                  
                                    >
                                        <Popup
                                            position='bottom right'
                                            trigger={
                                                <div className="bar"
                                                style={{width:handleProgressBar()}}
                                                >
                                                    <div className="progress"></div>
                                                </div>

                                            }
                                        >
                                            <Popup.Header>
                                             { HandleProgressText() }
                                            </Popup.Header>

                                        </Popup>

                                    </div>

                                </div>
                            </div>
                            <div className="bg-white p-2">
                                <ul>
                                    <li><span className={assessementStatus === "Completed" ? "count assessment-completed" : "count active"}>1</span></li>
                                    <li>
                                        <Header as="h3">Take a web assesment

                                            {
                                                assessementStatus === "pending" ? <span className="badge badge-black">Not Started</span> :
                                                    assessementStatus === "In Progress" ? <span className="badge badge-warning">Partially Completed</span> : <span className="badge badge-green">Completed</span>
                                            }



                                        </Header>

                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                         { assessementStatus !== "Completed" && 
                                         
                                         <button onClick={() => handleOnClickLink("/udc-web-assessment")} className="btn-primary">Start Assessment</button>
                                        }
                                         </li>
                                </ul>
                                <ul>
                                    <li>
                                        <span className={`${
                                             assessementStatus === "Completed" &&  Completed_games.length  === 3 ?
                                            "count assessment-completed"
                                            : assessementStatus === "Completed" ?
                                            "count active"
                                            : "count"}`}>
                                            2</span>
                                    </li>
                                    <li>
                                        <Header as="h3">Play these 3 Games
                                        <span className={Completed_games.length === 3 ? "badge badge-green" : "badge badge-warning"}>{Completed_games.length === 0 ? "Not Started" 
                                        :Completed_games.length === 3 ? "Completed" : Completed_games.length + "/ 3 Done"
                                        
                                          }</span>
                                        </Header>
                                        <Grid className="mb-1">
                                            <Grid.Row>
                                                <UDCGameScreen />
                                            </Grid.Row>
                                        </Grid>
                                    </li>
                                </ul>
                                <ul>
                                    <li><span className={`${ assessementStatus === "Completed" &&  Completed_games.length  === 3  ? "count assessment-completed" : "count"}`}>3</span></li>
                                    <li className="">
                                        {
                                            assessementStatus === "Completed" && Completed_games.length === 3 ?
                                               <>
                                                <Header as="h3">Congratulations  {`${profileDetail?.data?.user?.first_name || ""}`}
                                                </Header>
                                                <p>You have finished all the required steps. And your results are here. </p>
                                                <Link><Icon name="file" />View Results</Link>

                                               </> :
                                                <Header as="h3">Wait for Assessment Results </Header>
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>

        </div>
    )
}

export default DashBoardUDC;