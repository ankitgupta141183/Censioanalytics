import React from "react";
import { Button, Icon, Tab, Divider } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Grid, Image } from "semantic-ui-react";
import meetingImg from '../../assets/img/meeting.png';
import fileImg from '../../assets/img/file.png';
import userImg from '../../assets/img/user.png';
import advisorImg from '../../assets/img/advisor.png';
import './Messages.scss'

const panes = [
    {
        menuItem: 'Messages',
        render: () =>
            <Tab.Pane attached={false}>
                <div className="ui divider"></div>
                <div className="">
                    <div className="learning_program-sec">
                        <Grid>
                            <Grid.Row className="message-inner-sec-first">
                                <Grid.Column mobile={16} tablet={16} computer={16} className="vt-center">
                                    <div>
                                        <p className="message-left-talk">Hi Alison, how can I help you?</p>
                                        <small>10:24</small>
                                    </div>
                                    <div className="reply-sec">
                                        <p className="message-reply-talk">Hey John, I have a question regarding my account. Do you have time for a call?</p>
                                        <small className="reply-time">10:24</small>
                                    </div>
                                    <Divider hidden />
                                    <div>
                                        <p className="message-left-talk">Hi Alison, how can I help you?</p>
                                        <small>10:24</small>
                                    </div>
                                    <div className="reply-sec">
                                        <p className="message-reply-talk">Hey John, I have a question regarding my account. Do you have time for a call?</p>
                                        <small className="reply-time">10:24</small>
                                    </div>
                                    <Divider hidden />
                                    <div>
                                        <p className="message-left-talk">Hi Alison, how can I help you?</p>
                                        <small>10:24</small>
                                    </div>
                                    <div className="reply-sec">
                                        <p className="message-reply-talk">Hey John, I have a question regarding my account. Do you have time for a call?</p>
                                        <small className="reply-time">10:24</small>
                                    </div>
                                    <Divider hidden />
                                    <div>
                                        <p className="message-left-talk">Hi Alison, how can I help you?</p>
                                        <small>10:24</small>
                                    </div>
                                    <div className="reply-sec">
                                        <p className="message-reply-talk">Hey John, I have a question regarding my account. Do you have time for a call?</p>
                                        <small className="reply-time">10:24</small>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <div className="ui divider"></div>
                        <div>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column mobile={16} tablet={8} computer={8}>
                                        <p>Write your message...</p>
                                    </Grid.Column>
                                    <Grid.Column mobile={16} tablet={8} computer={8} textAlign="right">
                                        <div>
                                            <span className="attach-bg"><Icon name="attach"></Icon></span>
                                            <span className="send-bg"><Icon name="send"></Icon></span>
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                    </div>
                </div>
            </Tab.Pane>,
    },
    {
        menuItem: 'Documents',
        render: () =>
            <Tab.Pane attached={false}>
                <div className="ui divider"></div>
                <div className="">
                    <div className="learning_program-sec">
                        <Grid>
                            <Grid.Row className="message-inner-sec">
                                <Grid.Column mobile={16} tablet={16} computer={16} className="vt-center">
                                    <h6 className="filter-main-area">Filters: <span className="filter-left-space"><Button basic color='black'>By Me</Button></span><span><Button basic color='black'>By Professor</Button></span></h6>


                                    <div>

                                        <div>
                                            <Grid>
                                                <Grid.Row className="justify-txt-center">
                                                    <Grid.Column mobile={16} tablet={8} computer={5} className="doc-sec">
                                                        <div className="doc-box">
                                                            <div>
                                                                <Button color='black'>Today, 2 PM</Button>
                                                                <span><Icon name="ellipsis vertical"></Icon></span>
                                                            </div>

                                                            <div className="hr-center">
                                                                <Image src={fileImg} className="doc-img" />
                                                            </div>
                                                        </div>
                                                        <p className="doc-name-txt">Sample Document1.doc</p>
                                                    </Grid.Column>
                                                    <Grid.Column mobile={16} tablet={8} computer={5} className="doc-sec">
                                                        <div className="doc-box">
                                                            <div>
                                                                <Button color='black'>Today, 2 PM</Button>
                                                                <span><Icon name="ellipsis vertical"></Icon></span>
                                                            </div>

                                                            <div className="hr-center">
                                                                <Image src={fileImg} className="doc-img" />
                                                            </div>
                                                        </div>
                                                        <p className="doc-name-txt">Sample Document1.doc</p>
                                                    </Grid.Column>
                                                    <Grid.Column mobile={16} tablet={8} computer={5} className="doc-sec">
                                                        <div className="doc-box">
                                                            <div>
                                                                <Button color='black'>Today, 2 PM</Button>
                                                                <span><Icon name="ellipsis vertical"></Icon></span>
                                                            </div>

                                                            <div className="hr-center">
                                                                <Image src={fileImg} className="doc-img" />
                                                            </div>
                                                        </div>
                                                        <p className="doc-name-txt">Sample Document1.doc</p>
                                                    </Grid.Column>
                                                    <Grid.Column mobile={16} tablet={8} computer={5} className="doc-sec">
                                                        <div className="doc-box">
                                                            <div>
                                                                {/* <button class="ui button">Research Paper</button> */}
                                                                <Button color='black'>Today, 2 PM</Button>
                                                                <span><Icon name="ellipsis vertical"></Icon></span>
                                                            </div>

                                                            <div className="hr-center">
                                                                <Image src={fileImg} className="doc-img" />
                                                            </div>
                                                        </div>
                                                        <p className="doc-name-txt">Sample Document1.doc</p>
                                                    </Grid.Column>
                                                    <Grid.Column mobile={16} tablet={8} computer={5} className="doc-sec">
                                                        <div className="doc-box">
                                                            <div>
                                                                {/* <button class="ui button">Research Paper</button> */}
                                                                <Button color='black'>Today, 2 PM</Button>
                                                                <span><Icon name="ellipsis vertical"></Icon></span>
                                                            </div>

                                                            <div className="hr-center">
                                                                <Image src={fileImg} className="doc-img" />
                                                            </div>
                                                        </div>
                                                        <p className="doc-name-txt">Sample Document1.doc</p>
                                                    </Grid.Column>
                                                    <Grid.Column mobile={16} tablet={8} computer={5} className="doc-sec">
                                                        <div className="doc-box">
                                                            <div>
                                                                <Button color='black'>Today, 2 PM</Button>
                                                                <span><Icon name="ellipsis vertical"></Icon></span>
                                                            </div>

                                                            <div className="hr-center">
                                                                <Image src={fileImg} className="doc-img" />
                                                            </div>
                                                        </div>
                                                        <p className="doc-name-txt">Sample Document1.doc</p>
                                                    </Grid.Column>
                                                    <Grid.Column mobile={16} tablet={8} computer={5} className="doc-sec">
                                                        <div className="doc-box">
                                                            <div>
                                                                <Button color='black'>Today, 2 PM</Button>
                                                                <span><Icon name="ellipsis vertical"></Icon></span>
                                                            </div>

                                                            <div className="hr-center">
                                                                <Image src={fileImg} className="doc-img" />
                                                            </div>
                                                        </div>
                                                        <p className="doc-name-txt">Sample Document1.doc</p>
                                                    </Grid.Column>
                                                    <Grid.Column mobile={16} tablet={8} computer={5} className="doc-sec">
                                                        <div className="doc-box">
                                                            <div>
                                                                <Button color='black'>Today, 2 PM</Button>
                                                                <span><Icon name="ellipsis vertical"></Icon></span>
                                                            </div>

                                                            <div className="hr-center">
                                                                <Image src={fileImg} className="doc-img" />
                                                            </div>
                                                        </div>
                                                        <p className="doc-name-txt">Sample Document1.doc</p>
                                                    </Grid.Column>
                                                    <Grid.Column mobile={16} tablet={8} computer={5} className="doc-sec">
                                                        <div className="doc-box">
                                                            <div>
                                                                <Button color='black'>Today, 2 PM</Button>
                                                                <span><Icon name="ellipsis vertical"></Icon></span>
                                                            </div>

                                                            <div className="hr-center">
                                                                <Image src={fileImg} className="doc-img" />
                                                            </div>
                                                        </div>
                                                        <p className="doc-name-txt">Sample Document1.doc</p>
                                                    </Grid.Column>
                                                    <Grid.Column mobile={16} tablet={8} computer={5} className="doc-sec">
                                                        <div className="doc-box">
                                                            <div>
                                                                <Button color='black'>Today, 2 PM</Button>
                                                                <span><Icon name="ellipsis vertical"></Icon></span>
                                                            </div>

                                                            <div className="hr-center">
                                                                <Image src={fileImg} className="doc-img" />
                                                            </div>
                                                        </div>
                                                        <p className="doc-name-txt">Sample Document1.doc</p>
                                                    </Grid.Column>
                                                    <Grid.Column mobile={16} tablet={8} computer={5} className="doc-sec">
                                                        <div className="doc-box">
                                                            <div>
                                                                <Button color='black'>Today, 2 PM</Button>
                                                                <span><Icon name="ellipsis vertical"></Icon></span>
                                                            </div>

                                                            <div className="hr-center">
                                                                <Image src={fileImg} className="doc-img" />
                                                            </div>
                                                        </div>
                                                        <p className="doc-name-txt">Sample Document1.doc</p>
                                                    </Grid.Column>
                                                    <Grid.Column mobile={16} tablet={8} computer={5} className="doc-sec">
                                                        <div className="doc-box">
                                                            <div>
                                                                <Button color='black'>Today, 2 PM</Button>
                                                                <span><Icon name="ellipsis vertical"></Icon></span>
                                                            </div>

                                                            <div className="hr-center">
                                                                <Image src={fileImg} className="doc-img" />
                                                            </div>

                                                        </div>
                                                        <p className="doc-name-txt">Sample Document1.doc</p>
                                                    </Grid.Column>

                                                </Grid.Row>
                                            </Grid>
                                        </div>
                                    </div>
                                </Grid.Column>

                            </Grid.Row>
                        </Grid>
                        <div className="txt-right">
                            <span className="doc-plus-bg"><Icon name="plus"></Icon></span>
                        </div>
                    </div>
                </div>
            </Tab.Pane>,
    },
]

const TabExampleText = () => (
    <Tab menu={{ secondary: true }} panes={panes} />
)

export default function Messages() {

    return (
        <div className="dashboard-page">
            <div className="right-content-sec-all">
                <div className="main-content message-page">
                    <Grid>
                        <Grid.Row>
                            <Grid.Column mobile={16} tablet={16} computer={6}>
                                <p>My Advisors</p>
                                <div>
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column mobile={16} tablet={16} computer={16} className="msg-advisor-sec">
                                                <div className={'assesment-test_sec h-fix'}>
                                                    <h2 className="academic-heading">My Academic Advisor</h2>
                                                    <Grid>
                                                        <Grid.Row>
                                                            <Grid.Column mobile={16} tablet={6} computer={5} className="vt-center">
                                                                <Image src={advisorImg} className="grey-img-assessment msg-academic-adviosr-img" />
                                                            </Grid.Column>

                                                            <Grid.Column mobile={16} tablet={10} computer={11} className="vt-center">
                                                                <h2>Prof. Shepherd</h2>
                                                                <p>Ph.D, MIT </p>
                                                            </Grid.Column>


                                                        </Grid.Row>
                                                    </Grid>
                                                    <Divider hidden />
                                                    <div class="ui divider"></div>
                                                    <Divider hidden />
                                                    <Grid className="upcoming-meeting-bg">
                                                        <Grid.Row>
                                                            <Grid.Column mobile={16} tablet={10} computer={10} className="vt-center">
                                                                <p>Upcoming appointment: </p>
                                                                <p>On <b>Today</b> at <b>10:00 AM</b></p>
                                                            </Grid.Column>


                                                            <Grid.Column mobile={16} tablet={6} computer={6} className="vt-center">

                                                                <Image src={meetingImg} className="grey-img-assessment" />
                                                            </Grid.Column>


                                                        </Grid.Row>
                                                    </Grid>
                                                    <Divider hidden />
                                                    <div class="ui divider"></div>
                                                   
                                                    <p>You have a new message </p>
                                                    <Grid>
                                                        <Grid.Row>
                                                            <Grid.Column mobile={16} tablet={7} computer={7}>
                                                                <div className="txt-medium">
                                                                    <span>Send message to your advisor? </span>


                                                                </div>
                                                            </Grid.Column>
                                                            <Grid.Column mobile={16} tablet={9} computer={9}>
                                                                <Button className="send-msg-btn float-right"
                                                                >
                                                                    <Icon name="chat"></Icon>
                                                                    My Messages
                                                                </Button>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>

                                                </div>


                                                <h2 className="academic-heading">Previous Advisors</h2>
                                                <div className={'previous-advisor-sec'}>
                                                    <Grid>
                                                        <Grid.Row>
                                                            <Grid.Column mobile={8} tablet={6} computer={5} className="vt-center">
                                                                <Image src={userImg} className="grey-img-assessment previous-adviosr-img" />
                                                            </Grid.Column>


                                                            <Grid.Column mobile={8} tablet={9} computer={9} className="vt-center">
                                                                <h2>Prof. Shepherd</h2>
                                                                <p>Ph.D, MIT </p>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                        <div class="ui divider"></div>
                                                        <Grid.Row>
                                                            <Grid.Column mobile={8} tablet={6} computer={5} className="vt-center">
                                                                <Image src={userImg} className="grey-img-assessment previous-adviosr-img" />
                                                            </Grid.Column>
                                                            <Grid.Column mobile={8} tablet={9} computer={9} className="vt-center">
                                                                <h2>Prof. Shepherd</h2>
                                                                <p>Ph.D, MIT </p>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                        <div class="ui divider"></div>
                                                        <Grid.Row>
                                                            <Grid.Column mobile={8} tablet={6} computer={5} className="vt-center">
                                                                <Image src={userImg} className="grey-img-assessment previous-adviosr-img" />
                                                            </Grid.Column>
                                                            <Grid.Column mobile={8} tablet={9} computer={9} className="vt-center">
                                                                <h2>Prof. Shepherd</h2>
                                                                <p>Ph.D, MIT </p>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                        <div class="ui divider"></div>
                                                        <Grid.Row>
                                                            <Grid.Column mobile={8} tablet={6} computer={5} className="vt-center">
                                                                <Image src={userImg} className="grey-img-assessment previous-adviosr-img" />
                                                            </Grid.Column>


                                                            <Grid.Column mobile={8} tablet={9} computer={9} className="vt-center">
                                                                <h2>Prof. Shepherd</h2>
                                                                <p>Ph.D, MIT </p>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                        <div class="ui divider"></div>
                                                        <Grid.Row>
                                                            <Grid.Column mobile={8} tablet={6} computer={5} className="vt-center">
                                                                <Image src={userImg} className="grey-img-assessment previous-adviosr-img" />
                                                            </Grid.Column>
                                                            <Grid.Column mobile={8} tablet={9} computer={9} className="vt-center">
                                                                <h2>Prof. Shepherd</h2>
                                                                <p>Ph.D, MIT </p>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>
                                                </div>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </div>
                            </Grid.Column>
                            <Grid.Column mobile={16} tablet={16} computer={10}>
                                <p>Activities</p>
                                <div className="message-activity_sec">
                                    <TabExampleText />
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>

            </div>
        </div>
    );
}
