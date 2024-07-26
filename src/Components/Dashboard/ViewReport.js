import React from "react";
import "semantic-ui-css/semantic.min.css";
import greyRect from '../../assets/img/grey-rect.png';
import meetingImg from '../../assets/img/meeting.png';
import graphImg from '../../assets/img/graph.png';
import userImg from '../../assets/img/user.png';
import { Button, Grid, Header, Image, Progress, Divider } from "semantic-ui-react";
import './dashboard.scss';


export default function ViewReport(props) {

    return (
        <>
            <Header as="h2">
                Censio 360 Report
            </Header>
            <div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <div className={'assesment-test_sec'}>
                                <Image src={graphImg} style={{ margin: "0 auto" }} />
                            </div>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <div className={'view-report-section'}>
                                <div className="progress-bar-user">
                                    <Header as="h4">
                                        Overall Talent Score
                                    </Header>
                                    <Grid columns={3}>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <label>Your Score</label>
                                                <p className="your-scrore-count">73</p>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <label>General Population</label>
                                                <Progress percent={47} size='tiny' className="score-bar" />
                                                <p>47</p>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <label>Top-Quartile Builders</label>
                                                <Progress percent={66} size='tiny' className="score-bar" />
                                                <p>66</p>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </div>

                                <div className="detail-user">
                                    <Header as="h5">
                                        Your Details
                                    </Header>
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column width={8}>
                                                <label>Name</label>
                                                <p>Nikita Bansal</p>
                                                <label>School</label>
                                                <p>SGSITS</p>
                                            </Grid.Column>
                                            <Grid.Column width={8}>
                                                <label>Assessment Date</label>
                                                <p>14th June 2021</p>
                                                <label>Location</label>
                                                <p>Indore</p>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </div>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
            <Header as="h2" className="grey-heading">
                Dimension Scores
            </Header>
            <div className={'assesment-test_sec'} style={{ marginBottom: 30 }}>
                <Grid>
                    <Grid.Row style={{ borderBottom: "1px solid #dededf" }}>
                        <Grid.Column width={10}>
                            <Header as="h4">
                                Communication
                            </Header>
                            <p>Description is the pattern of narrative development</p>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Progress percent={32} color='red' size='small' />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ borderBottom: "1px solid #dededf" }}>
                        <Grid.Column width={10}>
                            <Header as="h4">
                                Fuild Intelligence
                            </Header>
                            <p>Description is the pattern of narrative development</p>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Progress percent={32} color='red' size='small' />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column width={10}>
                            <Header as="h4">
                                Risk Taking
                            </Header>
                            <p>Description is the pattern of narrative development</p>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Progress percent={32} color='red' size='small' />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
            <div className="opted-program">
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10} className="vt-center">
                            <Header as="h2" className="grey-heading">
                                Most-Opted Programs in your High School
                            </Header>
                        </Grid.Column>

                        <Grid.Column width={6} className="vt-center">
                            <Header as="h2" className="grey-heading">
                                Your Academic Advisor
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>

            <div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={16} computer={10} className="vt-center">
                            <div>
                                <div className={'assesment-test_sec h-fix'}>
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column width={3} className="">
                                                <Image src={greyRect} className="grey-img-assessment" />
                                            </Grid.Column>

                                            <Grid.Column width={9} className="vt-center">
                                                <h2>Program Title Here</h2>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, </p>
                                            </Grid.Column>

                                            <Grid.Column width={4} className="vt-center">
                                                <Button
                                                    className="take-test_btn">
                                                    Learn More
                                                </Button>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                    <div className="ui divider"></div>
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column width={3} className="vt-center">
                                                <Image src={greyRect} className="grey-img-assessment" />
                                            </Grid.Column>

                                            <Grid.Column width={9} className="vt-center">
                                                <h2>Program Title Here</h2>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, </p>
                                            </Grid.Column>

                                            <Grid.Column width={4} className="vt-center">
                                                <Button
                                                    className="take-test_btn">
                                                    Learn More
                                                </Button>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                    <div className="ui divider"></div>
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column width={3} className="vt-center">
                                                <Image src={greyRect} className="grey-img-assessment" />
                                            </Grid.Column>

                                            <Grid.Column width={9} className="vt-center">
                                                <h2>Program Title Here</h2>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, </p>
                                            </Grid.Column>

                                            <Grid.Column width={4} className="vt-center">
                                                <Button
                                                    className="take-test_btn">
                                                    Learn More
                                                </Button>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </div>
                            </div>
                        </Grid.Column>

                        <Grid.Column mobile={16} tablet={16} computer={6} className="">
                            <div className={'assesment-test_sec h-fix'}>
                                <h2>My Academic Advisor</h2>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={6} className="vt-center">
                                            <Image src={userImg} className="grey-img-assessment" />
                                        </Grid.Column>

                                        <Grid.Column width={10} className="vt-center">
                                            <h2>Prof. Shepherd</h2>
                                            <p>Ph.D, MIT </p>
                                        </Grid.Column>

                                    </Grid.Row>
                                </Grid>
                                <Divider hidden />
                                <div className="ui divider"></div>
                                <Divider hidden />
                                <Grid>
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
                                <Divider hidden />
                                <div className="ui divider"></div>
                                <p>You have a new message </p>
                                <Button className="send-msg-btn"
                                >
                                    Send A Message
                                </Button>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </>

    );
}
