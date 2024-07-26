import React, { useState } from "react";
import './AssessmentGamesScreens'
import glodMineImage from "../../../assets/img/Game 1 The gold mine treasure map.png"
// import skylineImage from "../../../assets/img/Game 2 Manhattan City Skyline.png";
// import wordplayImage from "../../../assets/img/Game 4 word play make the connection.png";
// import TheGreatEscapeImage from "../../../assets/img/Game 5 the great escape.png";
// import The_Restaurant from '../../../assets/img/Game 3 The restauranteur.png'
import { useDispatch, useSelector } from "react-redux";
import { ShowGameLink } from "../../../Actions/componentActions";
import { useHistory, useLocation } from "react-router-dom";
import GameVideo from "../../gameVideo/GameVideo";
import { Button, Dimmer, Divider, Grid, Icon, Image, Segment } from 'semantic-ui-react'
import { useEffect } from "react";
import { getProfileDetail } from '../../../Actions/ProfileAction';
import { callingToSendGamesCompleted } from '../../../Services/AssessementQuestionsServices'
import { GameStaticData } from '../../../StaticData/GameStaticData'

const AssessmentGamesScreens = ({ isHeaderManu }) => {
    const [Games, setGames] = useState(GameStaticData.slice(0, 3))
    const [ssoToken, setssoToken] = useState('')
    const [Showtabs, setShowtabs] = useState("awaiting")
    const [gameCompleted, setGameCompleted] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()
    const [gameNotComplete, setGameNotCompleted] = useState([])
    const [gameType, setGameType] = useState(false)
    const [gameData, setgameData] = useState([])
    const [GameVideoPopUp, setGameVideoPopup] = useState(false)
    const { profileReducer } = useSelector(state => state)
    const profileDetail = profileReducer?.profileDetail?.data?.user
    const [showElements, setShowElements] = useState(
        {
            isDemographic: false,
            gamesTab: false,
            feedbackButton: false,
            surveyButton: false,
        }
    )
    // const [notPlayedFirstGame, setNotPlayedFirstGame] = useState("")
    const [feedbacktextToggle, setFeedbackTextToggle] = useState(false)
    const [questionnaireTextToggle, setQuestionnaireTextToggle] = useState(false)

    useEffect(() => {
        dispatch(getProfileDetail())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        checkMturkSteps()
        // eslint-disable-next-line 
    }, [profileDetail, gameData])

    const handleGameVideo = (video) => {
        dispatch(ShowGameLink(video.gameVideoLink))
        setGameVideoPopup(true)
    }

    const handleGame = (game) => {

        dispatch(ShowGameLink(`${game.GameLink}${ssoToken}`))
        history.push({
            pathname: `/assessment-games`,
            state: game.gamename
            // visible: visible,
        })
    }

    const handleclick = (type) => {
        setShowtabs(type)
        if (type === "awaiting") {
            setGameType(false)
        } else {
            setGameType(true)
        }

    }

    useEffect(() => {
        if (sessionStorage.getItem('ssoToken')) {
            setssoToken(sessionStorage.getItem('ssoToken'))
        }
    }, [ssoToken])




    useEffect(() => {
        async function sendData() {
            let currentUrl = location.search.split("redirecturl")?.[1];
            if (gameData.length === 5) {
                const response = await gameData.length > 0 && ssoToken && callingToSendGamesCompleted(gameData, currentUrl)
                return response;
            }
        }
        sendData()
        // eslint-disable-next-line
    }, [gameData])

    const uid = sessionStorage.getItem('assessmentUserId' || '')
    useEffect(() => {
        if (sessionStorage.getItem('ssoToken')) {
            setssoToken(sessionStorage.getItem('ssoToken'))
        }

        const copyGames = [...Games]
        setIsLoading(true)


        if (uid !== "") {
            Promise.all([
                fetch(`${process.env.REACT_APP_GAMES_URL}/CensioApi/api/GetUserGame1Status?UID=${uid}&IDGAME=1`),
                fetch(`${process.env.REACT_APP_GAMES_URL}/CensioApi/api/GetUserGame2Status?UID=${uid}&IDGAME=2`),
                fetch(`${process.env.REACT_APP_GAMES_URL}/CensioApi/api/GetGame3GameCompletion?OrgId=1&GameId=3&UID=${uid}`),
                fetch(`${process.env.REACT_APP_GAMES_URL}/CensioApi/api/GetUserGame4Status?UID=${uid}&IDGAME=4`),
                fetch(`${process.env.REACT_APP_GAMES_URL}/CensioApi/api/GetUserGame5Status?UID=${uid}&IDGAME=5`),
            ]).then((responses) => {
                return Promise.all(responses.map((response) => response.json()))
            })
                .then((data) => {

                    const completeGame = copyGames.map((games, ind) => {

                        const clonegameObject = { ...games }
                        const clonegameCompleted = [...gameCompleted]
                        const cloneNotgameCompleted = [...gameNotComplete]

                        if ((data[ind].gamecompleted === 0)) {
                            cloneNotgameCompleted.push(data[ind].gamecompleted)
                            setGameNotCompleted(cloneNotgameCompleted)
                        } else {
                            clonegameCompleted.push(data[ind].gamecompleted)
                            setGameCompleted(clonegameCompleted)
                        }
                        if (games.idGame === data[ind].idGame) {
                            clonegameObject.gamecompleted = data[ind].gamecompleted
                        }
                        setgameData(data)
                        return clonegameObject
                    })
                    setGames(completeGame)
                    setIsLoading(false)
                })

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ssoToken, uid])

    const checkMturkSteps = () => {
        if (gameData.length > 4 && profileDetail && profileDetail?.mturk_steps) {
            const { feedback_submitted, demographic_submitted, questionnaire_submitted } = profileDetail?.mturk_steps
            setFeedbackTextToggle(feedback_submitted)
            setQuestionnaireTextToggle(questionnaire_submitted)
            setShowElements({
                ...showElements,
                isDemographic: demographic_submitted,
                feedbackButton: (gameNotComplete.length > 0) || feedback_submitted ? true : false,
                surveyButton: feedback_submitted && !questionnaire_submitted ? false : true,
            })
        }
    }




    // useEffect(() => {
    //     let notPlayGame = Games.find((game, ind) => game?.gamecompleted === 0)
    //     setNotPlayedFirstGame(notPlayGame)
    // }, [Games])
    const { feedbackButton, surveyButton } = showElements



    return (
        <>
            <main className="talwind-dashboard max-w-xs mx-auto pt-24 pb-20 flex flex-col gap-6 w-full transition-all duration-300 sm:max-w-[420px] md:max-w-[calc(100vw-80px)] md:pl-16" >
                <div id="main_section" className={isHeaderManu ? "flex flex-col gap-6 transition-all duration-30 md:w-[72%] lg:w-[79%] xl:w-[84.5%] 2xl:w-[86.5%] 3xl:w-[90%] md:ml-auto md:w-full lg:w-full xl:w-full 2xl:w-full 3xl:w-full"
                    : "flex flex-col gap-6 transition-all duration-30 md:w-[72%] lg:w-[79%] xl:w-[84.5%] 2xl:w-[86.5%] 3xl:w-[90%] md:ml-auto"} >

                    {/* <span className="font-semibold font-rubik text-[#1A1919] dark:text-[#F5F5F5]">Lorem ipsum dolor sit amet</span> */}

                    <span className="font-rubik font-semibold text-xl text-[#1A1919] dark:text-[#F5F5F5]" >Games (Please note that the games are sequential.)</span>
                    <div className="bg-white p-1 rounded-2xl dark:bg-[#212121] transition-all duration-300 games-survey">

                        {/* <div className="py-2 flex flex-col gap-3">
                            <span className="text-[#1A1919] font-rubik font-medium dark:text-[#F5F5F5]" >Please complete the games and the Student Experience & Expectations Survey listed below.</span >
                            <div
                                className="hr w-full h-0.5 bg-[#202A31] opacity-25 dark:bg-[#CED8DF] transition-all duration-300"
                            ></div>
                        </div> */}

                        {
                            <Grid>
                                <Divider hidden />
                                <Grid.Row>
                                    <Grid.Column mobile={16} tablet={16} computer={16}>
                                        <div className="game__tab-row">
                                            <Button
                                                onClick={() => handleclick("awaiting")}
                                                className={Showtabs === "awaiting" ? "active__game-tab" : "inactive__game-tab"}
                                                color='grey'
                                            >
                                                <Icon name="sync" />Awaiting Your Action
                                            </Button>
                                            <Button
                                                onClick={() => handleclick("completed")}
                                                className={Showtabs === "completed" ? "active__game-tab" : "inactive__game-tab"}
                                                color='grey'
                                            >
                                                <Icon name="check circle" />Completed
                                            </Button>
                                            {/* <Button
                                onClick={() => handleclick("Take a Tour")}
                                className={Showtabs === "Take a Tour" ? "active__game-tab" : "inactive__game-tab"}
                                color='grey'
                            >
                                <Icon name="external alternate" />Take a Tour
                            </Button> */}
                                        </div>
                                        <Grid>
                                            {
                                                !isLoading ?
                                                    <>
                                                        <Grid.Row>
                                                            {Showtabs !== "Take a Tour" ? <>
                                                                {!isLoading && ((gameCompleted.length > 0 && gameType) || (gameNotComplete.length > 0)) && Games.map((game, ind) => {
                                                                    return (!gameType ?
                                                                        game.gamecompleted === 0 ?
                                                                            <Grid.Column mobile={8} tablet={8} computer={5} className="vt-center" key={ind}>
                                                                                <div className="game__dashboard_box-container">

                                                                                    <img
                                                                                        // className={notPlayedFirstGame && notPlayedFirstGame.idGame === game.idGame ? "" : 'filter-gray-scale'}}
                                                                                        src={game.gameImage}
                                                                                        style={{ width: '100%' }}
                                                                                        alt={game.gamename}
                                                                                    />

                                                                                    {
                                                                                        // notPlayedFirstGame && notPlayedFirstGame.idGame === game.idGame && (
                                                                                            <Icon
                                                                                                onClick={() => handleGame(game)}
                                                                                                name="play circle"
                                                                                                className="playbutton"
                                                                                            />
                                                                                        // )
                                                                                    }
                                                                                    <span className="video_view-link" onClick={() => handleGameVideo(game)}>
                                                                                        <Icon name="video" className=""></Icon>See Demo
                                                                                    </span>
                                                                                </div>
                                                                                {/* <Image src={game.gameImage} className="grey-img-assessment" /> */}
                                                                            </Grid.Column>
                                                                            : null
                                                                        : game.gamecompleted === 1 ?
                                                                            <Grid.Column mobile={8} tablet={8} computer={5} className="vt-center" key={ind}>
                                                                                <div className="game__dashboard_box-container">
                                                                                    <img src={game.gameImage} style={{ width: '100%' }} title="hello every one" alt={game.gamename} />
                                                                                    {
                                                                                        // <Icon onClick={() => handleGame(game)} name="play circle" className="playbutton" />
                                                                                        // :
                                                                                        <Icon name="check circle" className="playbutton" />

                                                                                    }
                                                                                    {/* <span className="video_view-link" onClick={() => HandleGameExport(game)} >
                                                                Export <i className='download icon'> </i>
                                                            </span> */}
                                                                                </div>

                                                                            </Grid.Column>
                                                                            : null
                                                                    )
                                                                })}
                                                                {
                                                                    ((gameCompleted.length === 0 && gameType) || (gameNotComplete.length === 0 && !gameType)) && !isLoading &&
                                                                    <Grid.Column mobile={8} tablet={4} computer={4} className="vt-center" style={{ margin: "auto" }}>
                                                                        <div className="game__dashboard_box-container" style={{ textAlign: "center" }}>
                                                                            <img src={glodMineImage} style={{ width: '100%', visibility: "hidden" }} alt={"Game_image"} />
                                                                            <p style={{ position: "absolute", top: "0" }}>No Record</p>
                                                                        </div>
                                                                    </Grid.Column>
                                                                }
                                                            </>

                                                                : <>

                                                                    {/* {GameVideoLinks.map((gameVideo, ind) => {
                                            return (
                                                <Grid.Column mobile={8} tablet={8} computer={5} className="vt-center" key={ind}>
                                                    <div className="game__dashboard_box-container">
                                                        <img src={gameVideo.gameImage} style={{ width: '100%' }} alt={"game video"} />
                                                        <Icon onClick={() => handleGameVideo(gameVideo)} name="play circle" className="playbutton" />
                                                    </div>
                                                </Grid.Column>
                                            )
                                        })} */}
                                                                </>}
                                                        </Grid.Row>
                                                    </> :
                                                    <>
                                                        {
                                                            Games.map((games, index) => {
                                                                return < Grid.Column mobile={8} tablet={8} computer={5} className="vt-center" key={index} >
                                                                    <Dimmer.Dimmable as={Segment} dimmed={isLoading}>
                                                                        <Dimmer active={isLoading} inverted />
                                                                        <p>
                                                                            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                                                                        </p>
                                                                    </Dimmer.Dimmable>
                                                                </Grid.Column>
                                                            })
                                                        }
                                                    </>
                                            }
                                        </Grid>
                                    </Grid.Column>
                                </Grid.Row>
                                <GameVideo GameVideoPopUp={GameVideoPopUp} setGameVideoPopup={setGameVideoPopup} />
                            </Grid>
                        }


                    </div >

                    <div className="pb-10 flex flex-col gap-3">
                        <div className="py-2">
                            <span className="font-medium font-rubik text-[#1A1919] dark:text-[#F5F5F5]" >User Feedback (Please provide your feedback after completing all the games) </span>
                        </div>

                        <div
                            className="py-4 px-6 bg-[#FDFDFD] relative shadow-md rounded-l-sm rounded-r-lg flex flex-col gap-1 dark:bg-[#212121] transition-all duration-300 ">
                            <span className="w-3 h-full absolute bg-[#7D7D7D] rounded-sm left-0 top-0 transition-all duration-300 dark:bg-[#7D7D7D ]"></span>
                            {/* <span className="font-semibold font-rubik text-[#1A1919] dark:text-[#F5F5F5]">Lorem ipsum dolor sit amet</span>
                             <span className="text-[#656575] font-rubik dark:text-[#B1B1B1]">Lorem ipsum dolor sit amet</span>  */}
                            <button
                                className={
                                    feedbackButton ?
                                        "rounded bg-[#D3D3D3] text-[#FFFFFF] py-2 w-[15%]"
                                        : "rounded bg-[#0198e1] text-[#FFFFFF] py-2 w-[15%]"

                                }
                                onClick={(e) => { history.push('/assessment-feedback') }}
                                disabled={feedbackButton ? true : false}
                            >
                                {feedbacktextToggle ? "Feedback submitted" : "Feedback"}
                            </button>


                        </div>
                    </div>

                    <div className="pb-10 flex flex-col gap-3">
                        <div className="py-2">
                            <span className="font-medium font-rubik text-[#1A1919] dark:text-[#F5F5F5]" >Questionnaire (We are conducting advanced research to assess non-cognitive attributes of college students. Your responses to the following questionnaire will contribute immensely to further this research. )</span>
                        </div>

                        <div
                            className="py-4 px-6 bg-[#FDFDFD] relative shadow-md rounded-l-sm rounded-r-lg flex flex-col gap-1 dark:bg-[#212121] transition-all duration-300">
                            <span className="w-3 h-full absolute bg-[#7D7D7D] rounded-sm left-0 top-0 transition-all duration-300 dark:bg-[#7D7D7D]"></span>
                            {/* <span className="font-semibold font-rubik text-[#1A1919] dark:text-[#F5F5F5]">Lorem ipsum dolor sit amet</span>
                             <span className="text-[#656575] font-rubik dark:text-[#B1B1B1]">Lorem ipsum dolor sit amet</span>  */}
                            <button
                                className={
                                    surveyButton ?
                                        "rounded bg-[#D3D3D3] text-[#FFFFFF] py-2 w-[15%]"
                                        : "rounded bg-[#0198e1] text-[#FFFFFF] py-2 w-[15%]"

                                }
                                disabled={surveyButton ? true : false}
                                onClick={(e) => { history.push('/assessment-Mturk-introduction') }}
                            >
                                {questionnaireTextToggle ? "Questionnaire submitted" : "Start"}
                            </button>

                        </div>
                    </div>

                </div >
            </main >
        </>
    )
}


export default AssessmentGamesScreens