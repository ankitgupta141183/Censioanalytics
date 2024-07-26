import React from "react";
import { Grid, Image, Button, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
// import greyRect from '../../assets/img/grey-rect.png';
import isfpImg from '../../assets/img/isfp.png';
import './CardList.scss'
// import ShareIcon from './../../Components/SVG/ShareIcon';

export default function CardList() {

    return (
        <>
            <div className="CardList">
                <div className="CardList__container">
                    <Grid>
                        <Grid.Row>
                            <Grid.Column mobile={16} tablet={3} computer={2} className="vt-center">
                                <Image src={isfpImg} className="CardList__container__card-image" />
                            </Grid.Column>
                            <Grid.Column mobile={16} tablet={11} computer={10} className="">
                                <div className="">Assessed On 12 Jan 2021</div>
                                <div className=""><h2>Adventure (ISFP-T)</h2></div>
                                <div className="CardList__container__description">
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. consectetuer adipiscing elit.
                                   
                                </div>
                            </Grid.Column>

                            <Grid.Column mobile={16} tablet={1} computer={1} className="vt-center">
                                <Icon name="share alternate"  className="CardList__container__share-icon" />
                            </Grid.Column>

                            <Grid.Column mobile={16} tablet={8} computer={3} className="vt-center">
                                <Button className="CardList__container__view-full-report"><Icon name="file"></Icon>View Full Report</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </div>
        </>
    );
}
