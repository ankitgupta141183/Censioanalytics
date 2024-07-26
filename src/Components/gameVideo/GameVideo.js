// import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {  Modal } from 'semantic-ui-react'
// import { useHistory } from 'react-router'
// import { Embed } from 'semantic-ui-react'
import './GameVideo.scss'
const GameVideo = ({ setGameVideoPopup, GameVideoPopUp }) => {
    // const history = useHistory()
    const showGameVideo = useSelector((state) => state.componentReducer.showgame)
    // useEffect(() => {
    //     if (!showGameVideo) {
    //         history.push("/dashboard")
    //     }
    //     // eslint-disable-next-line 
    // }, [])

    return (
        <>
            <Modal
                closeIcon
                // dimmer={"inverted"}
                open={GameVideoPopUp}
                onClose={() => setGameVideoPopup(false)}
                onOpen={() => setGameVideoPopup(true)}
            >
                {/* <Header icon='archive' content='Archive Old Messages' /> */}
                <div className="game_video_page" >
                    <div className='game_video-container'>
                        <video
                            src={showGameVideo}
                            controls
                            // ref={videoElement}
                            muted
                            autoPlay={"autoplay"}
                            preLoad="auto"
                            loop
                            width={"100%"}
                            disablePictureInPicture
                            controlslist="nofullscreen nodownload noremoteplayback noplaybackrate"
                        />

                    </div>
                </div>

            </Modal>

        </>
    )
}

export default GameVideo