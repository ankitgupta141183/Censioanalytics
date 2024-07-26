import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Dimmer, Divider, Grid, Header, Icon, Image, Loader } from "semantic-ui-react";
import { ShowGameLink } from "../../Actions/componentActions";
import goldMineImage from "../../assets/img/Game 1 The gold mine treasure map.png";
import threesixtyLogo from '../../assets/img/360-gradient.png';
import GameVideo from "../gameVideo/GameVideo"
import './GameScreen.scss'
import { CSVDownload } from "react-csv";
import {GameStaticData} from '../../StaticData/GameStaticData'
const GameScreen = () => {
    const [Games, setGames] = useState(GameStaticData)
    const [isLoading, setIsLoading] = useState(false)
    const [gameType, setGameType] = useState(false)
    const [ssoToken, setssoToken] = useState('')
    const [gameCompleted, setGameCompleted] = useState([])
    const [gameNotComplete, setGameNotCompleted] = useState([])
    const [gameData, setgameData] = useState([])
    const [Showtabs, setShowtabs] = useState("awaiting")
    const [GameVideoPopUp, setGameVideoPopup] = useState(false)
    const [exportData ,  setExportData] = useState("")

    
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        if (sessionStorage.getItem('ssoToken')) {
            setssoToken(sessionStorage.getItem('ssoToken'))
        }

        const copyGames = [...Games]
        setIsLoading(true)
        setExportData("")
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

                    setGames(completeGame)
                    // setIsLoading(false)
                })

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if ((gameData.length > 0)) {
            setIsLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameData])

    const handleclick = (type) => {
        setShowtabs(type)
        if (type === "awaiting") {
            setGameType(false)
        } else {
            setGameType(true)
        }

    }

    const handleGame = (game) => {
        dispatch(ShowGameLink(`${game.GameLink}${ssoToken}`))
        history.push({
            pathname: `/games`,
            state: game.gamename
            // visible: visible,
        })
    }
    const handleGameVideo = (video) => {
        dispatch(ShowGameLink(video.gameVideoLink))
        setGameVideoPopup(true)
    }



    return (
        <div className="assesment-test_sec">
            <div className="assessment-test_inner">
                {/* <Header className="test_heading" as="h2">Games Assessment</Header> */}
                <Dimmer active={isLoading} inverted>
                    <Loader size='large' inline='centered' >
                        Loading...
                    </Loader>
                </Dimmer>
                <Divider hidden />
                <Grid>
                    <Grid.Row className="shadow_box">
                        {
                           exportData && <CSVDownload data={exportData}
                            filename={`UsersData.csv`}
                            target="_blank"
                        >
                        </CSVDownload>
                        }
                        <Grid.Column mobile={16} tablet={16} computer={3} className='d-flex vt-center'>
                            <Image src={threesixtyLogo} className="grey-img-assessment threesixty__logo" />
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={16} computer={12} className='d-flex vt-center'>
                            <Header as="h2">Game Assessment</Header>

                            <p>Censio Analytics is conducting advanced research to measure attributes that affect student retention and success. Completing the following games will contribute immensely to further this research. </p>
                            <p>The three games will take approximately 30 minutes of your time.</p>
                            <p>We strongly recommend you find 30 minutes of uninterrupted time to complete the games. If you do not complete the games in one sitting, you can log in again and the games will resume where you left off. You will not have to repeat any of the games you have already played.</p>
                            <p>Thank you in advance for your valued input.</p>
                        </Grid.Column>
                    </Grid.Row>
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
                                <Grid.Row>
                                    {Showtabs !== "Take a Tour" ? <>
                                        {!isLoading && ((gameCompleted.length > 0 && gameType) || (gameNotComplete.length > 0)) && Games.map((game, ind) => {
                                            return (!gameType ?
                                                game.gamecompleted === 0 ?
                                                    <Grid.Column  mobile={8} tablet={8} computer={5} className="vt-center" key={ind}>
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
                                                    <img src={goldMineImage} style={{ width: '100%', visibility: "hidden" }} alt={"Game_image"} />
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
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>

                    <GameVideo GameVideoPopUp={GameVideoPopUp} setGameVideoPopup={setGameVideoPopup} />
                </Grid>
            </div>
        </div>
    )
}
export default GameScreen;  