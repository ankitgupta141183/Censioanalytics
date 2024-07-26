import React from "react";
import { Button} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Grid, Image } from "semantic-ui-react";
import greyRect from '../../assets/img/grey-rect.png';
import './Certificate.scss'
// import FooterComponent from "../CommonComponent/FooterComponent/FooterComponent";

export default function Certificate() {

    return (
        <div>
        <div className="dashboard-page">
            <div className="right-content-sec-all">
            <div className="main-content">
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                        <p className="mg-bottom-none">My Certificates</p>
                        <br />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
               
            <div className="CardList">
            <h6 className="filter-main-area">Filters: <span className="filter-lest-space display-grid-mb"><Button basic color="black">Science</Button><Button basic color="black">IT</Button><Button basic color="black">Healthcare</Button><Button basic color="black">Education</Button></span></h6>
                    <div className="learning_program-sec">
                        <Grid>
                            <Grid.Row>
                                <Grid.Column mobile={16} tablet={3} computer={2} className="vt-center">
                                    <Image src={greyRect} className="CardList__container__card-image" />
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={10} computer={11} className="vt-center">
                                    <h2>Program Title Here</h2>
                                    <div className="CardList__container__description">
                                        <p>Program topic</p>
                                        
                                       
                                    </div>
                                </Grid.Column>

                                <Grid.Column mobile={11} tablet={8} computer={3} textAlign="right" className="program-continue-sec vt-center">
                             
                                    <Button className="program__continue-btn">View Certificate</Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                    <div className="ui divider"></div>
                    <div className="learning_program-sec">
                        <Grid>
                            <Grid.Row>
                                <Grid.Column mobile={16} tablet={3} computer={2} className="vt-center">
                                    <Image src={greyRect} className="CardList__container__card-image" />
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={10} computer={11} className="vt-center">
                                    <h2>Program Title Here</h2>
                                    <div className="CardList__container__description">
                                        <p>Program topic</p>
                                        
                                       
                                    </div>
                                </Grid.Column>

                                <Grid.Column mobile={11} tablet={8} computer={3} textAlign="right" className="program-continue-sec vt-center">
                             
                                    <Button className="program__continue-btn">View Certificate</Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                    <div className="ui divider"></div>
                    <div className="learning_program-sec">
                        <Grid>
                            <Grid.Row>
                                <Grid.Column mobile={16} tablet={3} computer={2} className="vt-center">
                                    <Image src={greyRect} className="CardList__container__card-image" />
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={10} computer={11} className="vt-center">
                                    <h2>Program Title Here</h2>
                                    <div className="CardList__container__description">
                                        <p>Program topic</p>
                                        
                                       
                                    </div>
                                </Grid.Column>

                                <Grid.Column mobile={11} tablet={8} computer={3} textAlign="right" className="program-continue-sec vt-center">
                             
                                    <Button className="program__continue-btn">View Certificate</Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                    <div className="ui divider"></div>
                    <div className="learning_program-sec">
                        <Grid>
                            <Grid.Row>
                                <Grid.Column mobile={16} tablet={3} computer={2} className="vt-center">
                                    <Image src={greyRect} className="CardList__container__card-image" />
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={10} computer={11} className="vt-center">
                                    <h2>Program Title Here</h2>
                                    <div className="CardList__container__description">
                                        <p>Program topic</p>
                                        
                                       
                                    </div>
                                </Grid.Column>

                                <Grid.Column mobile={11} tablet={8} computer={3} textAlign="right" className="program-continue-sec vt-center">
                             
                                    <Button className="program__continue-btn">View Certificate</Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                    <div className="ui divider"></div>
                    <div className="learning_program-sec">
                        <Grid>
                            <Grid.Row>
                                <Grid.Column mobile={16} tablet={3} computer={2} className="vt-center">
                                    <Image src={greyRect} className="CardList__container__card-image" />
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={10} computer={11} className="vt-center">
                                    <h2>Program Title Here</h2>
                                    <div className="CardList__container__description">
                                        <p>Program topic</p>
                                        
                                       
                                    </div>
                                </Grid.Column>

                                <Grid.Column mobile={11} tablet={8} computer={3} textAlign="right" className="program-continue-sec vt-center">
                             
                                    <Button className="program__continue-btn">View Certificate</Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </div>
               
            </div>
            </div>
            <br />
            
        </div>
        {/* <FooterComponent /> */}
        </div>
    );
}
