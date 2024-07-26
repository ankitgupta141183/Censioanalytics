import React, { useEffect, useState } from "react"
import { Button, Dimmer, Grid, Icon, Image, Segment } from "semantic-ui-react"
import { GameStaticData } from "../../../StaticData/GameStaticData"
import './gameSection.scss'
import axios from "axios"
import { callingToSendGamesCompleted } from "../../../Services/AssessementQuestionsServices"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { ShowGameLink } from "../../../Actions/componentActions"
import GameVideo from "../../gameVideo/GameVideo"

const GameSection = () => {
    const [activeTab, setActiveTab] = useState('awaiting')
    const [isLoading, setIsLoading] = useState(false)
    const [rendergamesData, setrendergamesData] = useState(GameStaticData)
    const [gamesData, setGamesData] = useState([])

    const generateGameUrl = (uid, gameId, role) => {
        switch (role) {
            case 'game3Status':
                return `${process.env.REACT_APP_GAMES_URL}/CensioApi/api/GetGame${gameId}GameCompletion?OrgId=1&GameId=${gameId}&UID=${uid}`;
            case 'gameStatus':
            default:
                return `${process.env.REACT_APP_GAMES_URL}/CensioApi/api/GetUserGame${gameId}Status?UID=${uid}&IDGAME=${gameId}`;
        }
    };

    useEffect(() => {
        setIsLoading(true)
        const uid = sessionStorage.getItem("uid")
        if (uid) {
            setIsLoading(true)
            const fetchData = async () => {
                try {
                    let gamePromises = [
                        generateGameUrl(uid, 1, 'gameStatus'),
                        generateGameUrl(uid, 2, 'gameStatus'),
                        generateGameUrl(uid, 3, 'game3Status'),
                        generateGameUrl(uid, 4, 'gameStatus'),
                        generateGameUrl(uid, 5, 'gameStatus')
                    ].map(url => axios.get(url));

                    // Make multiple API requests concurrently using Promise.all
                    const allGameResponse = await Promise.all(gamePromises);
                    let allGameResPonseData = await allGameResponse.map(response => response.data)
                    callingToSendGamesCompleted(allGameResPonseData)
                    let setGameStatus = [...GameStaticData].map((gameObj) => {
                        let findGame = allGameResPonseData.find(gameStatus => gameStatus.idGame === gameObj.idGame)
                        return {
                            ...gameObj,
                            ...findGame
                        }
                    })
                    setGamesData(setGameStatus)
                    let renderGames = setGameStatus.filter(gameobj => activeTab === 'completed' ? gameobj?.gamecompleted : !gameobj?.gamecompleted)
                    setrendergamesData(renderGames)
                } catch (error) {
                    console.log('Error fetching data:', error.response);
                } finally {
                    setIsLoading(false)
                }
            };

            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const handleTabChange = (tab) => {
        let renderGames = gamesData.filter(gameobj => tab === 'completed' ? gameobj?.gamecompleted : !gameobj?.gamecompleted)
        setrendergamesData(renderGames)
        setActiveTab(tab)
    }

    return (
        <Grid className="game-section">
            <Grid.Row>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <div className="game__tab-row">
                        <Button
                            onClick={() => handleTabChange('awaiting')}
                            className={activeTab === "awaiting" ? "active__game-tab" : "inactive__game-tab"}
                            color='grey'
                        >
                            <Icon name="sync" />Awaiting Your Action
                        </Button>
                        <Button
                            onClick={() => handleTabChange('completed')}
                            className={activeTab === "completed" ? "active__game-tab" : "inactive__game-tab"}
                            color='grey'
                        >
                            <Icon name="check circle" />Completed
                        </Button>
                    </div>
                    <Grid>
                        {
                            isLoading ?
                                GameStaticData.map((game, index) => {
                                    return (
                                        <Grid.Column mobile={8} tablet={8} computer={5} className="vt-center" key={index} >
                                            <Dimmer.Dimmable as={Segment} dimmed={isLoading}>
                                                <Dimmer active={isLoading} inverted />
                                                <p>
                                                    <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                                                </p>
                                            </Dimmer.Dimmable>
                                        </Grid.Column>
                                    )
                                })
                                : rendergamesData.length > 0 ? rendergamesData.map((game, index) => {
                                    return (
                                        <React.Fragment key={`rander-game-${index}`}>
                                            <GameCard game={game} type={activeTab} />
                                        </React.Fragment>
                                    )
                                }) : <>
                                    <Grid.Column mobile={8} tablet={4} computer={4} className="vt-center" style={{ margin: "auto" }}>
                                        <div className="container-center">
                                            <p>No Record</p>
                                        </div>
                                    </Grid.Column>
                                </>
                        }
                    </Grid>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default GameSection

const GameCard = (props) => {
    let { game, type } = props
    const dispatch = useDispatch()
    const history = useHistory()
    const [GameVideoPopUp, setGameVideoPopup] = useState(false)

    const ssoToken = localStorage.getItem('ssoToken') || sessionStorage.getItem('ssoToken')
    const handlePlayGame = () => {
        dispatch(ShowGameLink(`${game.GameLink}${ssoToken}`))
        history.push({
            pathname: `/generic-games-tab`,
            state: game.gamename
        })
    }

    const handlePlayVideo = () => {
        dispatch(ShowGameLink(game.gameVideoLink))
        setGameVideoPopup(true)
    }
    return (
        <Grid.Column mobile={8} tablet={8} computer={5} className="vt-center">
            <div className="game__dashboard_box-container">
                <img src={game?.gameImage} style={{ width: '100%' }} alt={game?.gamename} />
                {
                    type === 'awaiting' ?
                        <Icon onClick={handlePlayGame} name="play circle" className="playbutton" />
                        : <Icon name="check circle" className="playbutton" style={{ cursor: "default" }} />
                }
                {
                    type === 'awaiting' &&
                    <span className="video_view-link" onClick={handlePlayVideo} >
                        <Icon name="video" className="" ></Icon>See Demo
                    </span>
                }
            </div>
            <GameVideo GameVideoPopUp={GameVideoPopUp} setGameVideoPopup={setGameVideoPopup} />
        </Grid.Column>
    )
}