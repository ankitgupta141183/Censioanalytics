import React, { useState, lazy } from "react";
import { Header, Button, Container, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Grid } from "semantic-ui-react";
import dotSvgImg from '../../assets/img/dot-shape.svg';
import testOneSvg from '../../assets/img/test-one.svg';
import testTwoSvg from '../../assets/img/test-two.svg';
import testThreeSvg from '../../assets/img/test-three.svg';
import missionBannerSvg from '../../assets/img/mission-banner.svg';
import talentSvgImg from '../../assets/img/talent.svg';
import scienceImgOne from '../../assets/img/science-img-one.svg';
import scienceImgTwo from '../../assets/img/science-img-two.svg';
import scienceImgThree from '../../assets/img/science-img-three.svg';
import scienceImgFour from '../../assets/img/science-img-four.png';
import scienceImgFive from '../../assets/img/science-img-five.png';
import experienceSvgImg from '../../assets/img/experience.svg';
import awarenessSvgImg from '../../assets/img/awareness.svg';
import expertsImg from '../../assets/img/experts.svg';
import educatorsImg from '../../assets/img/educators.svg';
import slideImgone from '../../assets/img/workSlider1.png';
import slideImgtwo from '../../assets/img/workSlider3.png';

import Censio_Main_Illustrations from '../../assets/img/Censio_Main_Illustrations_5.gif'

// import HomeGame from '../../assets/img/workSlider2.png';
// import censioLogo from '../../assets//img/censio_logo.png'
// import HomeGame from '../../assets/img/game-image-slider-5.png';
// import HomeGame from '../../assets/img/imgStepLeaves-10-april.png';
import HomeGame from '../../assets/img/image-slider-2-image-header-11-4-23.png';

import './Home.scss'
import { useHistory } from "react-router-dom";
import ImageCarouel from '../CommonComponent/ImageCarousel';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// import glodMineImage from "../../assets/img/Game 1 The gold mine treasure map.png";
import { GameStaticData } from "../../StaticData/GameStaticData"
// import ContectModalPopUp from "../ContactModal/ContactModalPopUp";
import ContactDetails from "../ContactDetailsPage/ContactDetails";
const HeaderRegister = lazy(() => import("../Register/HeaderRegister"));
const HomeFooterComponent = lazy(() => import('../CommonComponent/FooterComponent/HomeFooterComponent'));
const firstImageSlider = [slideImgone, HomeGame, slideImgtwo]
export default function Home() {
    const history = useHistory()
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const [isShowPlaceholderHeader, setIsShowPlaceholderHeader] = useState("admission")
    const [isShowPlaceholderScience, setIsShowPlaceholderScience] = useState("rigorous")

    const [videoPlay, setVideoPlay] = useState(false)
    // const [modalOpen, setModelOpen] = useState(false)

    // const [state, dispatch] = React.useReducer(exampleReducer, {
    //     open: false,
    //     size: undefined,
    // })
    const handlePlay = (id) => {
        setVideoPlay(id)
    }

    const handleLoadedMetadata = (e) => {
        let durationTime = e.target.duration * 1000
        setTimeout(() => {
            setVideoPlay(false)
        }, [durationTime])
    }

    // function exampleReducer(state, action) {
    //     switch (action.type) {
    //         case 'close':
    //             return { open: false }
    //         case 'open':
    //             return { open: true, size: action.size }
    //         default:
    //             throw new Error('Unsupported action...')
    //     }
    // }


    const handleContectModal = () => {
        // console.log("worki")
        // dispatch({ type: 'open', size: 'large' })
        // setModelOpen(true)
        
    }

    
    return (
        <div>
            <div className="home-page">

                <HeaderRegister btnText={"Login to my Account"} handleClickHeaderBtn={() => history.push("/login")} />
                <div className="home-main-new">
                    <div className="home-top-section">
                        <Container>
                            {/* <ContectModalPopUp handleClose={handleClose} open={open} size={size} dispatch={dispatch} /> */}
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column computer={8} mobile={16} tablet={16}>
                                        <div className="top-inner-sec">
                                            <div >
                                              
                                            <img class='home-mobile-image'
                                             src={Censio_Main_Illustrations} alt="backgraundImage" />
                        
                                            </div>
                                            <Header as="h1">
                                                Improve student retention,<br /><span className="pr-color"> avoid attrition</span>, and keep your students on track to graduation
                                                {/* Unlock The True <br /><span className="pr-color">Potential</span> <br />Of Your <span className="pr-color">Students</span> */}
                                            </Header>
                                            <p>
                                                Censio technology effectively measures the psychological underpinnings of student attrition via game-based assessments and predicts dropout risk in real time.
                                                {/* Measure your students’ real potential using C360, a gamified assessment based on behavioral science and AI technology. */}
                                            </p>
                                            <Button className="btn-primary" onClick={() => history.push('/')}>
                                            {/* Get a free Discovery Call */}
                                                <a  href="#header-anchor">  Get a free Discovery Call </a>
                                            </Button>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column computer={8} mobile={16} tablet={0}>
                                        <div className="yourself-better-section">

                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Container>
                    </div>

                    <div className="white-shape-bg">
                        <div className="">
                            <div className="ui container">
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={16}>
                                            <div className="step-dot-img">
                                                <LazyLoadImage
                                                    alt=""
                                                    src={dotSvgImg}
                                                />
                                            </div>
                                        </Grid.Column>

                                    </Grid.Row>
                                </Grid>
                            </div>
                        </div>

                    </div>

                    <div className="about-censio bg-white">
                        <Container>
                            <Grid>
                                {/* <Grid.Row>
                                    <Grid.Column mobile={16} tablet={16} computer={16} className="vt-center text-center">
                                        <Header as="h2" className="Second-section-heading">
                                            Improve student retention, avoid attrition, and keep your students on track to graduation.
                                        </Header>
                                        <p className="text-headin">
                                        Counter high disengagement and dropout rates with a novel and scalable solution. Censio technology will effectively measure the psychological underpinnings of student attrition via game-based assessments and predict dropout risk in real time.
                                        </p>
                                    </Grid.Column>
                                </Grid.Row> */}
                                <Grid.Row>
                                    <Grid.Column mobile={16} tablet={8} computer={8} className="vt-center">
                                        <div>
                                            <Header as="h4" className="clr-heading">
                                                About Censio Technology
                                            </Header>
                                            <Header as="h1">
                                                What is the Censio <br /> Solution
                                                {/* What Does C360  Measure */}
                                            </Header>


                                        </div>
                                    </Grid.Column>
                                    <Grid.Column mobile={16} tablet={8} computer={8}>
                                        <div className="bdr-left">
                                            <div className="">
                                                <Grid>
                                                    <Grid.Row className="bottom-space">
                                                        <Grid.Column width={3} className="pd-right-none">
                                                            <div>
                                                                <LazyLoadImage
                                                                    alt=""
                                                                    src={testOneSvg} className="w-100"
                                                                />
                                                            </div>
                                                        </Grid.Column>
                                                        <Grid.Column width={13}>
                                                            <p className="text-heading">
                                                                A psychometrically robust game-based assessment that measures psychological attributes directly related to student retention – Resilience, Proactive Disposition, Fluid Intelligence, Achievement Orientation and many more.
                                                                {/* C360 evaluates critical skills needed for success in college and life - <span className="s-color"><i>Resilience, Divergent Thinking, Fluid Intelligence, Proactive Disposition </i></span>and many more. */}
                                                            </p>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                            </div>

                                            <div className="">
                                                <Grid>
                                                    <Grid.Row className="bottom-space">
                                                        <Grid.Column width={3} className="pd-right-none">
                                                            <div>
                                                                <LazyLoadImage
                                                                    alt=""
                                                                    src={testTwoSvg} className="w-100"
                                                                />
                                                            </div>
                                                        </Grid.Column>
                                                        <Grid.Column width={13}>
                                                            <p className="text-heading">
                                                                A Bayesian model that accurately risk-stratifies students with predictive updating as student information evolves over time. The ‘at-risk’ identifier derived from the gameplay data will enable educational institutions to prioritize and triage the students who are most in need of targeted intervention.
                                                            </p>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                            </div>

                                            <div className="">
                                                <Grid>
                                                    <Grid.Row className="bottom-space">
                                                        <Grid.Column width={3} className="pd-right-none">
                                                            <div>
                                                                <LazyLoadImage
                                                                    alt=""
                                                                    src={testThreeSvg} className="w-100"
                                                                />
                                                            </div>
                                                        </Grid.Column>
                                                        <Grid.Column width={13}>
                                                            <p className="text-heading">
                                                                In-game learning supports to build student competency in the above-mentioned attributes to enable them to bounce back faster educationally and psychologically.
                                                            </p>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                            </div>
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>

                        </Container>
                    </div>
                    <div className="white-shape-bg">
                        <div className="">
                            <div className="ui container">
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={16}>
                                            <div className="step-dot-img">
                                                <LazyLoadImage
                                                    alt=""
                                                    src={dotSvgImg}
                                                />
                                            </div>
                                        </Grid.Column>

                                    </Grid.Row>
                                </Grid>
                            </div>
                        </div>

                    </div>



                    <div className="educators">
                        <Container>
                            <Grid>
                                <Grid.Row>

                                    <Grid.Column mobile={16} tablet={8} computer={8}>
                                        <div className="">
                                            <div className="">
                                                <Header as="h4" className="clr-heading">
                                                    For Whom
                                                </Header>
                                                <Header as="h1">
                                                    Invest in Your <br />Students Today to<br /> Change Their <br />Tomorrow
                                                    {/* Invest In Your <br />Students Today To<br /> Change Their <br />Tomorrow */}
                                                </Header>
                                                <Grid>
                                                    <Grid.Row className="bottom-space">

                                                        <Grid.Column width={16}>
                                                            <div style={{ cursor: "pointer", padding: "0 0 0 25px" }} onClick={() => setIsShowPlaceholderHeader("admission")} className={isShowPlaceholderHeader === "admission" ? "active-step disactive-step" : ""} >
                                                                <h6 className="text-heading">
                                                                    {/* Admission Experts */}
                                                                    Academic advisors, Enrollment Managers, and Administrators
                                                                </h6>
                                                                <ul className="text-light experts-list">
                                                                    <li>Reduce tuition loss.</li>
                                                                    <li>Increase ranking/status of your institution.</li>
                                                                    <li>Improve perceptions of your institution among prospective students and funders.</li>
                                                                </ul>
                                                            </div>

                                                        </Grid.Column>
                                                    </Grid.Row>
                                                    <Grid.Row className="bottom-space">

                                                        <Grid.Column width={16}>
                                                            <div style={{ cursor: "pointer", padding: "0 0 0 25px" }} onClick={() => setIsShowPlaceholderHeader("educators")} className={isShowPlaceholderHeader === "educators" ? "active-step disactive-step" : ""}>
                                                                <h6 className="text-heading">
                                                                    Educators
                                                                </h6>
                                                                <ul className="text-light experts-list">
                                                                    <li>Develop 21st century skills among your students.</li>
                                                                    <li>Identify students at risk of drop-out in real-time to provide academic support.</li>
                                                                    <li>Build your students’ self-awareness and self-efficacy towards achieving their academic and career goals.</li>
                                                                </ul>
                                                            </div>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                            </div>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column mobile={16} tablet={8} computer={8} className="vt-center">
                                        <div className="txt-center">
                                            <LazyLoadImage
                                                alt=""
                                                src={isShowPlaceholderHeader === "admission" ? expertsImg : educatorsImg} className="w-100"
                                            />
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <div className="step-dot-img">
                                <LazyLoadImage
                                    alt=""
                                    src={dotSvgImg}
                                />
                            </div>
                        </Container>
                    </div>
                    <div className="bottom-shade">
                        <Container >
                            <div className="">
                                <div className="home_video_sec">
                                    <Grid>
                                        {/* <Grid.Row centered className="text-center vt-center">
                                                <Header as="h2" >
                                                Validate and Backed by Science
                                                </Header>
                                                <Grid.Column mobile={14} tablet={12} computer={11} >
                                                <p style={{textAlign:"Center"}}>C360 leverages new science and audited AI technology to improve prediction of student success and reduce bias. Leveraging insights from Entrepreneurship, Behavioral Economics, Measurement, Psychology and other social sciences.</p>

                                                </Grid.Column>
                                        </Grid.Row> */}
                                        <Grid.Row centered>
                                            {
                                                GameStaticData.map(game => {
                                                    return (
                                                        <Grid.Column mobile={16} tablet={8} computer={5} key={game.idGame}>
                                                            <div className="home_video-container">
                                                                {videoPlay === game.idGame ?
                                                                    <video
                                                                        className="Video"
                                                                        src={game.gameVideoLink}
                                                                        controls
                                                                        muted
                                                                        autoPlay={"autoplay"}
                                                                        preLoad="auto"
                                                                        // loop
                                                                        disablePictureInPicture
                                                                        onLoadedMetadata={handleLoadedMetadata}
                                                                        controlslist="nofullscreen nodownload noremoteplayback noplaybackrate"
                                                                        width={"100%"} height={"80%"} > something</video>
                                                                    :
                                                                    <div class="Image_container">
                                                                        <LazyLoadImage
                                                                            alt="Game Image"
                                                                            src={game.gameImage}
                                                                        />
                                                                        <Icon onClick={() => handlePlay(game.idGame)} name="play circle" className="home_video-playbutton" />
                                                                    </div>

                                                                }
                                                            </div>
                                                        </Grid.Column>
                                                    )
                                                })
                                            }
                                            {/* <Grid.Column computer="7">
                                                <Header as="h2" className="our-mission-desc">
                                                    Validate and Backed by Science
                                                </Header>
                                                <p> C360 leverages new science and audited AI technology to improve prediction of student success and reduce bias. Leveraging insights from Entrepreneurship, Behavioral Economics, Measurement, Psychology and other social sciences.</p>
                                            </Grid.Column>
                                            <Grid.Column computer="9">
                                                <div className="home_video-container">
                                                    {!videoPlay ?
                                                        <div class="Image_container">
                                                            <LazyLoadImage
                                                                alt="Game Image"
                                                                src={glodMineImage}
                                                            />
                                                            <Icon onClick={() => handlePlay()} name="play circle" className="home_video-playbutton" />
                                                        </div>
                                                        :
                                                        <video
                                                            ref={VideoRef}
                                                            className="Video"
                                                            src={"https://s3.amazonaws.com/censioanalytics.com/assets/img/Game1.mp4"}
                                                            controls
                                                            muted
                                                            autoPlay={"autoplay"}
                                                            preLoad="auto"
                                                            // loop
                                                            onProgress={handleProgress}
                                                            disablePictureInPicture
                                                            controlslist="nofullscreen nodownload noremoteplayback noplaybackrate"
                                                            width={"100%"} height={"80%"} > something</video>
                                                    }
                                                </div>
                                            </Grid.Column> */}
                                        </Grid.Row>
                                    </Grid>
                                </div>
                            </div>
                        </Container>
                    </div>

                    <div className="about-censio bg-white">
                        <Container>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column mobile={16} tablet={9} computer={9} className="vt-center">
                                        <div className="step-slider-bg">
                                            <ImageCarouel images={firstImageSlider} selectedImageIndex={selectedImageIndex} />
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column mobile={16} tablet={7} computer={7}>
                                        <div className="">
                                            <div className="">
                                                <Header as="h4" className="clr-heading">
                                                    How it works
                                                </Header>
                                                <Header as="h1">
                                                    A Novel Way to Boost your Student Retention & Graduation
                                                </Header>
                                                <Grid>
                                                    <Grid.Row className="bottom-space">

                                                        <Grid.Column width={16}>
                                                            <div style={{ cursor: "pointer" }} className={selectedImageIndex === 0 ? "active-step" : ""} onClick={() => setSelectedImageIndex(0)}>
                                                                <h6 className="text-heading">
                                                                    <span>01</span> Dedicated Student Portal
                                                                </h6>
                                                                <p className="text-light">Share the link to the portal with your students. Students create an account and complete a brief registration process.</p>
                                                            </div>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                    <Grid.Row className="bottom-space">
                                                        <Grid.Column width={16}>
                                                            <div style={{ cursor: "pointer" }} className={selectedImageIndex === 1 ? "active-step" : ""} onClick={() => setSelectedImageIndex(1)}>
                                                                <h6 className="text-heading">
                                                                    <span>02</span> Students play the games
                                                                </h6>
                                                                <p className="text-light"> Students complete the psychometrically robust game-based assessments, at their own pace. Each game takes less than 15 minutes to complete. At the completion of a set of games, students receive a personalized report on their dashboard. The report consists of game scores and behavioral nudges based on game scores, that can be used to improve each competency. </p>
                                                            </div>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                    <Grid.Row className="bottom-space">
                                                        <Grid.Column width={16}>
                                                            <div style={{ cursor: "pointer" }} className={selectedImageIndex === 2 ? "active-step" : ""} onClick={() => setSelectedImageIndex(2)}>
                                                                <h6 className="text-heading">
                                                                    <span>03</span> Administrators Track Data
                                                                </h6>
                                                                <p className="text-light"> Faculty/staff can track student data and risk-score via the admin portal to use the results in real-time to affect change. </p>
                                                            </div>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                                <div className="step-dot-img">
                                                    <LazyLoadImage
                                                        alt=""
                                                        src={dotSvgImg}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Container>
                    </div>

                    <div className="science-sec" id="science">
                        <Container>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column mobile={16} tablet={8} computer={8} className="vt-center">
                                        <div>
                                            <Header as="h4" className="clr-heading">
                                                Science
                                            </Header>
                                            <Header as="h1">
                                                Informed by Science and Backed by Research
                                            </Header>
                                            <Grid>
                                                <Grid.Row className="bottom-space">
                                                    <Grid.Column width={16}>
                                                        <div style={{ cursor: "pointer" }} onClick={() => setIsShowPlaceholderScience("rigorous")} className={isShowPlaceholderScience === "rigorous" ? "active-step" : ""} >
                                                            <h6 className="text-heading">
                                                                <span>01</span> Rigorous Research
                                                            </h6>
                                                            <p className="text-light"> The Censio Solution leverages recent advances in the learning sciences, instructional technology, measurement, and game design approaches to improve student retention and engagement. The novel game-based solution is reliable, valid, and fair. We are using probabilistic generative model for real-time risk prediction of student attrition using psychological attributes.</p>
                                                        </div>
                                                    </Grid.Column>
                                                </Grid.Row>

                                                <Grid.Row className="bottom-space">
                                                    <Grid.Column width={16}>
                                                        <div style={{ cursor: "pointer" }} onClick={() => setIsShowPlaceholderScience("tiesToPerformance")} className={isShowPlaceholderScience === "tiesToPerformance" ? "active-step" : ""} >
                                                            <h6 className="text-heading">
                                                                <span>02</span> Ties to Performance
                                                            </h6>
                                                            <p className="text-light">Based upon Fishbein and Ajzen’s (1975) attitude-behavior theory,  we identified key psychological processes that directly impact student retention, engagement, and graduation rate. Each meta-cognitive attribute has a direct link to student retention.</p>
                                                        </div>
                                                    </Grid.Column>
                                                </Grid.Row>

                                                <Grid.Row className="bottom-space">
                                                    <Grid.Column width={16}>
                                                        <div style={{ cursor: "pointer" }} onClick={() => setIsShowPlaceholderScience("CustomizedReporting")} className={isShowPlaceholderScience === "CustomizedReporting" ? "active-step" : ""} >
                                                            <h6 className="text-heading">
                                                                <span>03</span> Customized Reporting
                                                            </h6>
                                                            <p className="text-light">Highly detailed data traces captured by the games will elicit patterns of student behavior that provide key insights into student’s decision-making processes. These insights will be used to develop individualized reports for students. </p>
                                                        </div>
                                                    </Grid.Column>
                                                </Grid.Row>

                                                <Grid.Row className="bottom-space">
                                                    <Grid.Column width={16}>
                                                        <div style={{ cursor: "pointer" }} onClick={() => setIsShowPlaceholderScience("DataSafety")} className={isShowPlaceholderScience === "DataSafety" ? "active-step" : ""} >
                                                            <h6 className="text-heading">
                                                                <span>04</span> Data safety
                                                            </h6>
                                                            <p className="text-light"> Censio is committed to being a good custodian of your data, taking all reasonable and appropriate countermeasures, following procedures and best practices in ensuring data confidentiality, integrity and availability. </p>
                                                        </div>
                                                    </Grid.Column>
                                                </Grid.Row>

                                                {/* <Grid.Row className="bottom-space">
                                                    <Grid.Column width={16}>
                                                        <div style={{ cursor: "pointer" }} onClick={() => setIsShowPlaceholderScience("StudentAndEducatorAdvisoryBoards")} className={isShowPlaceholderScience === "StudentAndEducatorAdvisoryBoards" ? "active-step" : ""} >
                                                            <h6 className="text-heading">
                                                                <span>05</span> Student and Educator Advisory Boards
                                                            </h6>
                                                            <p className="text-light"> We involve students and educators in our design process. Their feedback drives our product development process. </p>
                                                        </div>
                                                    </Grid.Column>
                                                </Grid.Row> */}
                                            </Grid>


                                        </div>
                                    </Grid.Column>
                                    <Grid.Column mobile={16} tablet={8} computer={8} className="vt-center">
                                        <div>
                                            <LazyLoadImage
                                                alt=""
                                                className="w-100" src={isShowPlaceholderScience === "rigorous" ? scienceImgOne : isShowPlaceholderScience === "tiesToPerformance" ? scienceImgTwo : isShowPlaceholderScience === "CustomizedReporting" ? scienceImgThree : isShowPlaceholderScience === "DataSafety" ? scienceImgFour : scienceImgFive}
                                            />
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>

                        </Container>
                    </div>

                    <br />
                    <div className="different-sec">
                        <div className="why-choose-contain ui container">
                            <Header as="h1" className="why-choose-heading txt-center">
                                How Are We Different
                            </Header>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column mobile={16} tablet={5} computer={5} className="txt-center">
                                        <div className="txt-center">
                                            <LazyLoadImage
                                                alt=""
                                                src={experienceSvgImg}
                                                className='different-sec_img'
                                            />
                                        </div>
                                        <Header as="h2" className="h-fix-heading">
                                            Engaging Experience<br /> for Students:
                                        </Header>
                                        <p className="horizontal-space">Censio games assess and develop multi-dimensional learner attributes that impact retention. Our solution is likely to stimulate engagement and flow, keeping students motivated to play the games multiple times- key for capturing the dynamic nature of a student’s journey through college.</p>
                                        {/* <p><i><b>C360 allows all students, regardless of their ethnicity or socio-economic status, to showcase their potential.</b></i></p> */}
                                    </Grid.Column>
                                    <Grid.Column mobile={16} tablet={5} computer={5} className="txt-center">
                                        <div className="txt-center">
                                            <LazyLoadImage
                                                alt=""
                                                src={talentSvgImg} style={{ padding: "27px 0" }}
                                                className='different-sec_img'
                                            />
                                        </div>
                                        <Header as="h2" className="h-fix-heading">
                                            Real-time Data:
                                        </Header>
                                        <p className="horizontal-space">We will capture data every semester so that institutions can use real-time data to affect just-in-time change.</p>
                                        {/* <p><i><b>C360 assesses students while they play low-stake, fun and engaging games at their own pace.</b></i></p> */}
                                    </Grid.Column>
                                    <Grid.Column mobile={16} tablet={5} computer={5} className="txt-center">
                                        <div className="txt-center">
                                            <LazyLoadImage
                                                alt=""
                                                src={awarenessSvgImg} style={{ padding: "20px 0" }}
                                                className='different-sec_img'
                                            />
                                        </div>
                                        <Header as="h2" className="h-fix-heading">
                                            Less Resource Intensive & affordable:
                                        </Header>
                                        <p className="horizontal-space">We do all the heavy lifting. The Censio solution is least resource intensive for educational institutions compared to traditional retention solutions that require system conversions, upgrades, and/or material modifications to reprocess, remap, and revalidate archival data. And we are very affordable. </p>

                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                    </div>

                    <br />

                    <div className="bottom-shade">
                        <div></div>
                        <div className="">
                            <Container>
                                <div className="mission-sec">
                                    <div>
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column mobile={16} tablet={7} computer={9}>
                                                    <LazyLoadImage
                                                        alt=""
                                                        src={missionBannerSvg} className="mg-negative"
                                                    />
                                                </Grid.Column>
                                                <Grid.Column mobile={16} tablet={9} computer={7} className="vt-center">
                                                    <div className="mg-negative">
                                                        <div className="">

                                                            <Header as="h2" className="">
                                                                Our Mission
                                                            </Header>
                                                            <p className="our-mission-desc">
                                                                To close the education equity gap by building educational games that assess and develop human potential.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </div>
                                </div>
                            </Container>
                        </div>


                        <div className="today-sec">
                            <Container>
                              
                                <div >
                                        <LazyLoadImage
                                            alt=""
                                            src={dotSvgImg} className="today-dot-img"
                                        />
                                        <div className="form-gap">
                                            <Grid>
                                                <Grid.Row>
                                                    <Grid.Column  mobile={16} tablet={16} computer={8} className="text-left">
                                                        {/* <div class='footer-censio-logo-form'>
                                                        <Image  src={censioLogo} wrapped ui={false} />
                                                        </div> */}
                                                
                                                    <Header as="h1" className="last-section">
                                                        Improve Student Retention & Unlock the True Potential of your Students   
                                                    </Header>
                                                    
                                                    </Grid.Column>
                                                    <Grid.Column mobile={16} tablet={16} computer={8}>

                                                    <ContactDetails />
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </div>
                                </div>
                            </Container>
                        </div>

                        {/* <div className="today-sec">
                           <div>
                           <LazyLoadImage
                                    alt=""
                                    src={dotSvgImg} className="today-dot-img"
                                />
                            <ContactDetails />
                           </div>
                        </div> */}
                    </div>
                </div>


                <HomeFooterComponent handleContectModal={handleContectModal} />
            </div>
        </div>
    );
}

