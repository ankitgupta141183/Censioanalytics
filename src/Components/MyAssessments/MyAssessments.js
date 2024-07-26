import React from "react";
import { Button, Icon, Grid } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import CardList from "../CardList/CardList";
import './MyAssessments.scss'

export default function MyAssessments() {
    return (
        <div className="dashboard-page">
            <div className="right-content-sec-all">
            <div className="main-content">
                <div className="my-assessments-page-inner">
                    <div className="page-header">
                        <Grid>
                            <Grid.Row className="mt-20">
                                <Grid.Column mobile={16} tablet={8} computer={12}>
                                <div className="page-header__left">
                                    <div className="page-header__left__title vt-center">
                                        My Assessments
                                    </div>
                                </div>
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={8} computer={4}>
                                <div className="page-header__right">
                                    <div className="page-header__right__button">
                                        <Button className=""><Icon name="redo"></Icon>Take the Test Again </Button>
                                    </div>
                                </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>

                    <div>
                        <p>
                            This Month
                         </p>
                        <CardList />

                        <p>
                            Last Month
                        </p>
                        <CardList />
                        <CardList />

                       <p>
                            April
                        </p>
                        <CardList />

                        {/* <Header as="h1" className="H1DesktopPrimary"> */}
                        <p>February 2021</p>
                        {/* </Header> */}
                        <CardList />
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}
