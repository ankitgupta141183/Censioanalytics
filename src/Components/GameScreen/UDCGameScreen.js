import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dimmer, Grid, Icon, Loader } from "semantic-ui-react";
import { ShowGameLink } from "../../Actions/componentActions";
import './GameScreen.scss'
import GameVideo from "../gameVideo/GameVideo";

import { setGamesData } from '../../Actions/GameDetailsAction/gamesDetailsAction'

const UDCGameScreen = () => {
    const { gamesDetailsReducer } = useSelector(state => state)
    const { games } = gamesDetailsReducer
    const [isLoading, setIsLoading] = useState(false)
    const [ssoToken, setssoToken] = useState('')
    const [gameData, setgameData] = useState([])
    const [GameVideoPopUp, setGameVideoPopup] = useState(false)


    // const showGame = useSelector((state) => state.componentReducer.showgame)
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        if (sessionStorage.getItem('ssoToken')) {
            setssoToken(sessionStorage.getItem('ssoToken'))
        }

        const copyGames = [...gamesDetailsReducer.games]
        setIsLoading(true)
        const uid = sessionStorage.getItem("uid")
        if (uid !== "") {
            Promise.all([
                fetch(`https://censiobeta.in/CensioGame4Api/api/GetUserGame1Status?UID=${uid}&IDGAME=1`),
                fetch(`https://censiobeta.in/CensioGame4Api/api/GetUserGame2Status?UID=${uid}&IDGAME=2`),
                fetch(`https://censiobeta.in/CensioGame3Api/api/GetGame3GameCompletion?OrgId=1&GameId=3&UID=${uid}`),
                fetch(`https://censiobeta.in/CensioGame4Api/api/GetUserGame4Status?UID=${uid}&IDGAME=4`),
                fetch(`https://censiobeta.in/CensioGame4Api/api/GetUserGame5Status?UID=${uid}&IDGAME=5`),
            ]).then((responses) => {
                return Promise.all(responses.map((response) => response.json()))
            })
                .then((data) => {
                    const completeGame = copyGames.map((games, ind) => {
                        const clonegameObject = { ...games }
                        data.map(gameData => {

                            if (clonegameObject.idGame === gameData.idGame) {
                                clonegameObject.gamecompleted = gameData.gamecompleted
                            }
                            return gameData
                        })

                        setgameData(data)
                        return clonegameObject
                    })

                    dispatch(setGamesData(completeGame))
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
        // history.push({
        //     pathname: `/Take_a_Tour`,
        //     // visible: visible,
        // })
    }
    return (
        <div className="" style={{ margin: "0px" }}>
            <div className="assessment-test_inner" style={{ margin: "0px" }}>
                <Dimmer active={isLoading} inverted>
                    <Loader size='large' inline='centered' >
                        Loading...
                    </Loader>
                </Dimmer>
                {/* <Divider hidden /> */}
                <Grid>
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={16} computer={16}>
                            <Grid>
                                <Grid.Row className="vt-center">
                                    <>
                                        {!isLoading && games.map((game, ind) => {
                                            return (
                                                <Grid.Column mobile={16} tablet={8} computer={5} className="vt-center" key={ind}>
                                                    <div className="game__dashboard_box-container mb-1">

                                                        <img src={game.gameImage} style={{ width: '100%' }} alt={game.gamename} />
                                                        <div className="demo-row">
                                                            <div onClick={() => handleGameVideo(game)} >
                                                                <p className="btn-cursor-pointer" ><Icon name="video" />Watch Demo</p>
                                                            </div>
                                                            <div>
                                                                {
                                                                    game.gamecompleted ?
                                                                        <button className="finished-game" ><i class="check icon"></i>Finished</button>

                                                                        : <button onClick={() => handleGame(game)} ><Icon name="play circle" />Play</button>

                                                                }
                                                            </div>
                                                        </div>

                                                    </div>
                                                    {/* <Image src={game.gameImage} className="grey-img-assessment" /> */}
                                                </Grid.Column>
                                            )
                                        })}
                                    </>
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
export default UDCGameScreen;  