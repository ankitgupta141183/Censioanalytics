import React from "react";
import { Button, Tab, Progress, Icon} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Grid, Image } from "semantic-ui-react";
import greyRect from '../../assets/img/grey-rect.png';
import './LearningPrograms.scss'

const panes = [
    {
        menuItem: 'My Programs',
        render: () =>
            <Tab.Pane attached={false}>
                <div className="ui divider"></div>
                <div className="CardList">
                    <div className="learning_program-sec">
                        <Grid>
                            <Grid.Row>
                                <Grid.Column mobile={16} tablet={3} computer={2} className="vt-center">
                                    <Image src={greyRect} className="CardList__container__card-image" />
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={13} computer={11} className="">
                                    <h2>Program Title Here</h2>
                                    <div className="CardList__container__description">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column mobile={16} tablet={11} computer={11} className="vt-center">
                                                    <div><Progress percent={70} size='tiny'></Progress></div>
                                                </Grid.Column>
                                                <Grid.Column mobile={16} tablet={5} computer={5}>
                                                    <div>2/3 Modules Completed</div>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                       
                                    </div>
                                </Grid.Column>

                                <Grid.Column mobile={16} tablet={8} computer={3} textAlign="right" className="program-continue-sec">
                                    {/* <div><Icon name='angle right' /></div> */}
                                    <Button className="program__continue-btn">Continue <Icon name="angle right"></Icon></Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </div>
                <div className="ui divider"></div>

                <div className="CardList">
                    <div className="learning_program-sec">
                        <Grid>
                            <Grid.Row>
                                <Grid.Column mobile={16} tablet={3} computer={2} className="vt-center">
                                    <Image src={greyRect} className="CardList__container__card-image" />
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={13} computer={11} className="">
                                    <h2>Program Title Here</h2>
                                    <div className="CardList__container__description">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column mobile={16} tablet={11} computer={11} className="vt-center">
                                                    <div><Progress percent={70} size='tiny'></Progress></div>
                                                </Grid.Column>
                                                <Grid.Column mobile={16} tablet={5} computer={5}>
                                                    <div>2/3 Modules Completed</div>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                       
                                    </div>
                                </Grid.Column>

                                <Grid.Column mobile={16} tablet={8} computer={3} textAlign="right" className="program-continue-sec">
                                    {/* <div><Icon name='angle right' /></div> */}
                                    <Button className="program__continue-btn">Continue <Icon name="angle right"></Icon></Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </div>
                <div className="ui divider"></div>

                <div className="CardList">
                    <div className="learning_program-sec">
                        <Grid>
                            <Grid.Row>
                                <Grid.Column mobile={16} tablet={3} computer={2} className="vt-center">
                                    <Image src={greyRect} className="CardList__container__card-image" />
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={13} computer={11} className="">
                                    <h2>Program Title Here</h2>
                                    <div className="CardList__container__description">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column mobile={16} tablet={11} computer={11} className="vt-center">
                                                    <div><Progress percent={70} size='tiny'></Progress></div>
                                                </Grid.Column>
                                                <Grid.Column mobile={16} tablet={5} computer={5}>
                                                    <div>2/3 Modules Completed</div>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                       
                                    </div>
                                </Grid.Column>

                                <Grid.Column mobile={16} tablet={8} computer={3} textAlign="right" className="program-continue-sec">
                                    {/* <div><Icon name='angle right' /></div> */}
                                    <Button className="program__continue-btn">Continue <Icon name="angle right"></Icon></Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </div>
                <div className="ui divider"></div>

                <div className="CardList">
                    <div className="learning_program-sec">
                        <Grid>
                            <Grid.Row>
                                <Grid.Column mobile={16} tablet={3} computer={2} className="vt-center">
                                    <Image src={greyRect} className="CardList__container__card-image" />
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={10} computer={11} className="">
                                    <h2>Program Title Here</h2>
                                    <div className="CardList__container__description">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column mobile={16} tablet={11} computer={11} className="vt-center">
                                                    <div><Progress percent={70} size='tiny'></Progress></div>
                                                </Grid.Column>
                                                <Grid.Column mobile={16} tablet={5} computer={5}>
                                                    <div>2/3 Modules Completed</div>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                       
                                    </div>
                                </Grid.Column>

                                <Grid.Column mobile={16} tablet={8} computer={3} textAlign="right" className="program-continue-sec">
                                    {/* <div><Icon name='angle right' /></div> */}
                                    <Button className="program__continue-btn">Continue <Icon name="angle right"></Icon></Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </div>
            </Tab.Pane>,
    },
    {
        menuItem: 'Explore Programs',
        render: () =>
            <Tab.Pane attached={false}>
                
                <div className="ui divider"></div>
                <div className="CardList">
                    <h6 className="filter-main-area">Filters: <span className="filter-lest-space"><Button basic color="black">Science</Button><Button basic color="black">IT</Button><Button basic color="black">Healthcare</Button><Button basic color="black">Education</Button></span></h6>
                    <div className="learning_program-sec">
                        <Grid>
                            <Grid.Row>
                                <Grid.Column mobile={16} tablet={3} computer={2} className="vt-center">
                                    <Image src={greyRect} className="CardList__container__card-image" />
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={13} computer={11} className="">
                                    <h2>Program Title Here</h2>
                                    <div className="CardList__container__description">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column mobile={16} tablet={16} computer={16} className="vt-center">
                                                    <div className="my_program-bottom-list"><span>3 Sections</span><span>24 Videos</span><span>5 Articles</span><span>7 Quizzes</span></div>
                                                </Grid.Column>
                                                
                                            </Grid.Row>
                                        </Grid>
                                       
                                    </div>
                                </Grid.Column>

                                <Grid.Column mobile={11} tablet={8} computer={3} textAlign="right" className="program-continue-sec">
                                    {/* <div><Icon name='angle right' /></div> */}
                                    <Button className="program__continue-btn">Learn More</Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </div>
                <div className="ui divider"></div>

                <div className="CardList">
                    <div className="learning_program-sec">
                        <Grid>
                            <Grid.Row>
                                <Grid.Column mobile={16} tablet={3} computer={2} className="vt-center">
                                    <Image src={greyRect} className="CardList__container__card-image" />
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={13} computer={11} className="">
                                    <h2>Program Title Here</h2>
                                    <div className="CardList__container__description">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column mobile={16} tablet={16} computer={16} className="vt-center">
                                                    <div className="my_program-bottom-list"><span>3 Sections</span><span>24 Videos</span><span>5 Articles</span><span>7 Quizzes</span></div>
                                                </Grid.Column>
                                                
                                            </Grid.Row>
                                        </Grid>
                                       
                                    </div>
                                </Grid.Column>

                                <Grid.Column mobile={11} tablet={8} computer={3} textAlign="right" className="program-continue-sec">
                                    {/* <div><Icon name='angle right' /></div> */}
                                    <Button className="program__continue-btn">Learn More</Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </div>
                <div className="ui divider"></div>

                <div className="CardList">
                    <div className="learning_program-sec">
                        <Grid>
                            <Grid.Row>
                                <Grid.Column mobile={16} tablet={3} computer={2} className="vt-center">
                                    <Image src={greyRect} className="CardList__container__card-image" />
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={13} computer={11} className="">
                                    <h2>Program Title Here</h2>
                                    <div className="CardList__container__description">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column mobile={16} tablet={16} computer={16} className="vt-center">
                                                    <div className="my_program-bottom-list"><span>3 Sections</span><span>24 Videos</span><span>5 Articles</span><span>7 Quizzes</span></div>
                                                </Grid.Column>
                                                
                                            </Grid.Row>
                                        </Grid>
                                       
                                    </div>
                                </Grid.Column>

                                <Grid.Column mobile={11} tablet={8} computer={3} textAlign="right" className="program-continue-sec">
                                    {/* <div><Icon name='angle right' /></div> */}
                                    <Button className="program__continue-btn">Learn More</Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </div>
                <div className="ui divider"></div>

                <div className="CardList">
                    <div className="learning_program-sec">
                        <Grid>
                            <Grid.Row>
                                <Grid.Column mobile={16} tablet={3} computer={2} className="vt-center">
                                    <Image src={greyRect} className="CardList__container__card-image" />
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={13} computer={11} className="">
                                    <h2>Program Title Here</h2>
                                    <div className="CardList__container__description">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column mobile={16} tablet={16} computer={16} className="vt-center">
                                                    <div className="my_program-bottom-list"><span>3 Sections</span><span>24 Videos</span><span>5 Articles</span><span>7 Quizzes</span></div>
                                                </Grid.Column>
                                                
                                            </Grid.Row>
                                        </Grid>
                                       
                                    </div>
                                </Grid.Column>

                                <Grid.Column mobile={11} tablet={8} computer={3} textAlign="right" className="program-continue-sec">
                                    {/* <div><Icon name='angle right' /></div> */}
                                    <Button className="program__continue-btn">Learn More</Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </div>

                

            </Tab.Pane>,
    },
]

const TabExampleSecondary = () => (
    <Tab menu={{ secondary: true }} panes={panes} />
)

export default function LearningPrograms() {

    
    return (
        <div className="dashboard-page">
            <div className="right-content-sec-all">
            <div className="main-content">
            <Grid>
                <Grid.Row>
                    <Grid.Column width="16">
                   <div> <p>Learning Programs</p></div>
                   <br />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            
                <div className="learning-programs-page-inner">
                
                    <TabExampleSecondary />
                    
                </div>
            </div>
            </div>
        </div>
    );
}
