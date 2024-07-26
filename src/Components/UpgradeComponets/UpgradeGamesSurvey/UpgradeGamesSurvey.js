import React, { useState } from "react";
import './_UpgradeGamesSurvey.scss'
import glodMineImage from "../../../assets/img/Game 1 The gold mine treasure map.png"
import { useDispatch, useSelector } from "react-redux";
import { ShowGameLink } from "../../../Actions/componentActions";
import { useHistory } from "react-router-dom";
import GameVideo from "../../gameVideo/GameVideo";
import { Button, Dimmer, Divider, Grid, Icon, Image, Segment } from 'semantic-ui-react'
import { useEffect } from "react";
import { Paths } from "../../routes/routePaths";
import { getProfileDetail } from '../../../Actions/ProfileAction';
import { callingToSendGamesCompleted } from '../../../Services/AssessementQuestionsServices'
import { GameStaticData } from '../../../StaticData/GameStaticData'


const UpgradeGamesSurvey = ({ isHeaderManu }) => {
    const [Games, setGames] = useState(GameStaticData)
    const [ssoToken, setssoToken] = useState('')
    const [Showtabs, setShowtabs] = useState("awaiting")
    const [gameCompleted, setGameCompleted] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()
    const [gameNotComplete, setGameNotCompleted] = useState([])

    const [gameType, setGameType] = useState(false)
    const [gameData, setgameData] = useState([])
    const [GameVideoPopUp, setGameVideoPopup] = useState(false)
    const { profileReducer } = useSelector(state => state)
    const profileDetail = profileReducer?.profileDetail?.data?.user

    useEffect(() => {
        dispatch(getProfileDetail())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleGameVideo = (video) => {
        dispatch(ShowGameLink(video.gameVideoLink))
        setGameVideoPopup(true)
    }


    const handleGame = (game) => {
        dispatch(ShowGameLink(`${game.GameLink}${ssoToken}`))
        history.push({
            pathname: `/upgrade-games`,
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
    }, [])

    useEffect(() => {
        if (sessionStorage.getItem('ssoToken')) {
            setssoToken(sessionStorage.getItem('ssoToken'))
        }

        const copyGames = [...Games]
        setIsLoading(true)
        const uid = sessionStorage.getItem("uid")
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
                    // console.log("completeGame---",completeGame)
                    // console.log("data---",data)

                    setGames(completeGame)
                    setIsLoading(false)
                })

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        async function sendData() {
            if (gameData.length === 5) {
                const response = await gameData.length > 0 && callingToSendGamesCompleted(gameData, null)
                return response;
            }
        }
        sendData()
    }, [gameData])



    return (
        <>
            <main className="talwind-dashboard max-w-xs mx-auto pt-24 pb-20 flex flex-col gap-6 w-full transition-all duration-300 sm:max-w-[420px] md:max-w-[calc(100vw-80px)] md:pl-16" >
                <div id="main_section" className={isHeaderManu ? "flex flex-col gap-6 transition-all duration-30 md:w-[72%] lg:w-[79%] xl:w-[84.5%] 2xl:w-[86.5%] 3xl:w-[90%] md:ml-auto md:w-full lg:w-full xl:w-full 2xl:w-full 3xl:w-full"
                    : "flex flex-col gap-6 transition-all duration-30 md:w-[72%] lg:w-[79%] xl:w-[84.5%] 2xl:w-[86.5%] 3xl:w-[90%] md:ml-auto"} >
                    <div className="pt-2">
                        <span className="font-rubik font-semibold text-xl text-[#1A1919] md:text-2xl dark:text-[#F5F5F5]" >Games & Survey</span>
                    </div>

                    <div className="bg-white p-6 rounded-2xl dark:bg-[#212121] transition-all duration-300 games-survey">
                        <div className="py-2 flex flex-col gap-3">
                            <span className="text-[#1A1919] font-rubik font-medium dark:text-[#F5F5F5]" >Please complete the games and the Student Experience & Expectations Survey listed below.</span >
                            <div
                                className="hr w-full h-0.5 bg-[#202A31] opacity-25 dark:bg-[#CED8DF] transition-all duration-300"
                            ></div>
                        </div>

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
                                                                                <img src={game.gameImage} style={{ width: '100%' }} alt={game.gamename} />
                                                                                <Icon onClick={() => handleGame(game)} name="play circle" className="playbutton" />


                                                                                <span className="video_view-link" onClick={() => handleGameVideo(game)} >
                                                                                    <Icon name="video" className="" ></Icon>See Demo
                                                                                </span>

                                                                            </div>
                                                                            {/* <Image src={game.gameImage} className="grey-img-assessment" /> */}
                                                                        </Grid.Column>
                                                                        : null
                                                                    : game.gamecompleted === 1 ?
                                                                        <Grid.Column mobile={8} tablet={8} computer={5} className="vt-center" key={ind}>
                                                                            <div className="game__dashboard_box-container">
                                                                                <img src={game.gameImage} style={{ width: '100%' }} alt={game.gamename} />
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



                        <div className="grid gap-6 grid-cols-1 py-6 md:grid-cols-2 lg:grid-cols-3" >


                            {/* <div
                                className="pt-6 pl-6 h-28 bg-[#E5EFF7] flex flex-col gap-1 rounded-lg dark:bg-[#1B75BC66] transition-all duration-300 md:h-40"  >
                                <span className="text-[#1A1919] font-rubik font-medium dark:text-[#F5F5F5]">Game 1</span>
                                <span className="text-[#656575] font-rubik dark:text-[#B7B7B7]">Lorem Ipsum</span>
                            </div>
                            <div className="pt-6 pl-6 h-28 bg-[#E5EFF7] flex flex-col gap-1 rounded-lg dark:bg-[#1B75BC66] transition-all duration-300 md:h-40">
                                <span className="text-[#1A1919] font-rubik font-medium dark:text-[#F5F5F5]">Game 1</span>
                                <span className="text-[#656575] font-rubik dark:text-[#B7B7B7]">Lorem Ipsum</span>
                            </div>
                            <div
                                className="pt-6 pl-6 h-28 bg-[#E5EFF7] flex flex-col gap-1 rounded-lg dark:bg-[#1B75BC66] transition-all duration-300 md:h-40">
                                <span className="text-[#1A1919] font-rubik font-medium dark:text-[#F5F5F5]" >Game 1</span>
                                <span className="text-[#656575] font-rubik dark:text-[#B7B7B7]">Lorem Ipsum</span>
                            </div>
                            <div
                                className="pt-6 pl-6 h-28 bg-[#E5EFF7] flex flex-col gap-1 rounded-lg dark:bg-[#1B75BC66] transition-all duration-300 md:h-40">
                                <span className="text-[#1A1919] font-rubik font-medium dark:text-[#F5F5F5]">Game 1</span>
                                <span className="text-[#656575] font-rubik dark:text-[#B7B7B7]">Lorem Ipsum</span>
                            </div> */}
                        </div>
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
                                    profileDetail?.feedback_submitted === true ?
                                        "rounded bg-[#D3D3D3] text-[#FFFFFF] py-2 w-[15%]"
                                        : "rounded bg-[#0198e1] text-[#FFFFFF] py-2 w-[15%]"

                                }
                                onClick={(e) => { history.push(Paths.UpgradeFeedbackQuestions) }}
                                disabled={profileDetail?.feedback_submitted === true ? true : false}
                            >
                                {profileDetail?.feedback_submitted === true ? "Feedback submitted" : "Feedback"}
                            </button>

                        </div>
                    </div>

                    <div className="pb-10 flex flex-col gap-3">
                        <div className="py-2">
                            <span className="font-medium font-rubik text-[#1A1919] dark:text-[#F5F5F5]" >Student Experience & Expectations Survey</span>
                        </div>

                        <div
                            className="py-4 px-6 bg-[#FDFDFD] relative shadow-md rounded-l-sm rounded-r-lg flex flex-col gap-1 dark:bg-[#212121] transition-all duration-300">
                            <span className="w-3 h-full absolute bg-[#7D7D7D] rounded-sm left-0 top-0 transition-all duration-300 dark:bg-[#7D7D7D]"></span>
                            {/* <span className="font-semibold font-rubik text-[#1A1919] dark:text-[#F5F5F5]">Lorem ipsum dolor sit amet</span>
                             <span className="text-[#656575] font-rubik dark:text-[#B1B1B1]">Lorem ipsum dolor sit amet</span>  */}
                            <button
                                className={
                                    profileDetail?.survey_submitted === true ?
                                        "rounded bg-[#D3D3D3] text-[#FFFFFF] py-2 w-[15%]"
                                        : "rounded bg-[#0198e1] text-[#FFFFFF] py-2 w-[15%]"

                                }
                                disabled={profileDetail?.survey_submitted === true ? true : false}
                                onClick={(e) => { history.push(Paths.upgradeIntroduction) }}
                            >
                                {profileDetail?.survey_submitted === true ? "Survey submitted" : "Take Survey "}
                            </button>
                        </div>
                    </div>

                </div >
            </main >
        </>
    )
}


export default UpgradeGamesSurvey