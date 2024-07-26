import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { Grid } from "semantic-ui-react"
import Censio_guidelines from "../../assets/img/Censio-guideline-trim.png";
const GameInstructions = () => {
    const showGame = useSelector((state) => state.componentReducer.showgame)
    
    const iframeref = useRef()
    const [showiframeGame, setshowiframeGame] = useState(false)
    useEffect(() => {
        if (showiframeGame) {
            console.log("iframe height width")
            console.log("parent frame cw " + iframeref.current.clientWidth);
            console.log("parent frame ow " + iframeref.current.offsetWidth);
            console.log("parent frame sw " + iframeref.current.style.width);
            console.log("parent window h " + window.innerWidth);
            console.log("parent window w " + window.innerHeight);
            console.log("parent innerHTML w " + iframeref.current);
        }
    }, [showiframeGame])
    const handleClick = () => {
        // if (gamename === "Wordplay") {
        // window.open(`https://censiobeta.in/Censiowordplay/?token=${ssoToken}`, "_self")
        // } else {
        setshowiframeGame(true)
        // }
    }

    return (
        <>
            {!showiframeGame ?
                <div className="game__instruction-container dark:bg-[#212121]">
                    <Grid>
                        <Grid.Row style={{ paddingBottom: '0', alignItems: 'center' }}>

                            <Grid.Column computer={12} tablet={12} mobile={16} className="m-auto">
                                <div className="game__play-guideline">
                                    <img src={Censio_guidelines} width={"75%"} height={"100%"} alt="game_insructions" />
                                    <button onClick={handleClick}>Ok</button>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                </Grid>

                </div>
                : <iframe ref={iframeref} width="100%" height="100%" src={showGame} title="Game" allowFullScreen="" controls="" frameBorder="0" scrolling="no" style={{ width: '100%' }} className="dark:bg-[#212121]" />
            }
        </>
    )
}

export default GameInstructions