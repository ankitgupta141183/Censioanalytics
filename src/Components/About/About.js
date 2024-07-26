import React from "react";
import { Header, Button, Icon, Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Grid } from "semantic-ui-react";
import './About.scss';
import FooterComponent from "../CommonComponent/FooterComponent/FooterComponent";
import { useHistory } from "react-router-dom";
import HeaderRegister from "../Register/HeaderRegister";


export default function About() {
    const history = useHistory()
    return (
        <div>
            <div className="about-page">
                <HeaderRegister  handleClickHeaderBtn={() => history.push("/login")} />
                <div className="home-main">
                    <div className="discover-sec">
                        <Container>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        <div className="potencial-landing">
                                            <div className="potencial-content">
                                                <Header as="h2"textAlign="center">
                                                    Unlock the true potential of your applicants and students.
                                                </Header>
                                                <p style={{textAlign: "center"}}>Measure your student's real potential using C360, an assessment based on the behavioral and science and audited AI technology.
                                                </p>
                                                <Button color='white' className="take-assement">Take the Assessment</Button>
                                            </div>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        {/* <Image src={potentialImg} /> */}
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Container>
                    </div>
                    <div className="personality-main-sec">
                        <Container>
                            <div className="personality-test">
                                <div>
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column mobile={3} tablet={3} computer={8}>
                                                {/* <Image src={objectiveInside} /> */}
                                            </Grid.Column>
                                            <Grid.Column mobile={3} tablet={3} computer={8}>
                                                <div className="potencial-landing objective-inside" style={{ width: "60%" }}>
                                                    <div className="potencial-content">

                                                        <Header as="h1">
                                                            See Objective insight
                                                        </Header>
                                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                    </div>
                                                </div>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column mobile={3} tablet={3} computer={8}>
                                                <div className="potencial-landing objective-inside" style={{ width: "70%", marginLeft: 15 }}>
                                                    <div className="potencial-content">

                                                        <Header as="h1">
                                                            Measure what matters of you
                                                        </Header>
                                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                    </div>
                                                </div>
                                            </Grid.Column>
                                            <Grid.Column mobile={3} tablet={3} computer={8}>

                                                {/* <Image src={masuareImg} /> */}
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column mobile={3} tablet={3} computer={8}>
                                                {/* <Image src={pullRealImg} /> */}
                                            </Grid.Column>
                                            <Grid.Column mobile={3} tablet={3} computer={8}>
                                                <div className="potencial-landing objective-inside" style={{ width: "60%" }}>
                                                    <div className="potencial-content">

                                                        <Header as="h1">
                                                            Pull real insight to work
                                                        </Header>
                                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                    </div>
                                                </div>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </div>
                            </div>
                        </Container>
                    </div>
                    <div className="discover-sec">
                        <div className="beyond-assesment">
                            <Header as="h1" className="beyond-heading">
                                Beyond the assessment
                            </Header>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={5}>

                                        <Header as="h3">
                                            <Icon name="star" className="start-icon" />   Clear reporting
                                        </Header>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                        <div className="start-bottom">
                                            <Header as="h3">
                                                <Icon name="star" className="start-icon" />  Consistent interview
                                            </Header>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column width={5}>

                                        <Header as="h3">
                                            <Icon name="star" className="start-icon" />   Assessment branding
                                        </Header>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                        <div className="start-bottom">
                                            <Header as="h3">
                                                <Icon name="star" className="start-icon" />   Total support
                                            </Header>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                        <div className="why-choose-img" style={{ marginTop: '-125px' }}>
                                            {/* <Image src={beyondAssesmentImg} /> */}

                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                    </div>
                    <div className="why-choose-censio">
                        <div className="why-choose-contain">
                            {/* <Container> */}
                            <Header as="h1" className="why-choose-heading">
                                Why choose censio
                            </Header>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={5}>

                                        <Header as="h3">
                                            <Icon name="check square outline" style={{ color: "#f58221" }} />   Accurate results
                                        </Header>
                                        <p>Personality theories have leaned more towards the idea that we all have similar personality traits</p>
                                        <div className="checkmark-bottom">
                                            <Header as="h3">
                                                <Icon name="check square outline" style={{ color: "#316db8" }} />   Accurate results
                                            </Header>
                                            <p>Personality theories have leaned more towards the idea that we all have similar personality traits</p>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column width={5}>

                                        <Header as="h3">
                                            <Icon name="check square outline" style={{ color: "#dc3e6f" }} />   Accurate results
                                        </Header>
                                        <p>Personality theories have leaned more towards the idea that we all have similar personality traits</p>
                                        <div className="checkmark-bottom">
                                            <Header as="h3">
                                                <Icon name="check square outline" style={{ color: "#50b848" }} />   Accurate results
                                            </Header>
                                            <p>Personality theories have leaned more towards the idea that we all have similar personality traits</p>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                        <div className="why-choose-img">
                                            {/* <Image src={whyChooseCensio} /> */}

                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                        {/* </Container> */}
                    </div>
                    
                    <div className="why-choose-censio" style={{background: "#f5f8fe"}}>
                        <div className="why-choose-contain">
                            <Grid>
                                <Grid.Row>
                                <Grid.Column width={6}>
                                        <Header as="h1">
                                            How we <br/>uncover what <br/> "<span style={{color: "#69d2c9"}}>good</span>" looks like:
                                        </Header>
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                    <Icon name="check square outline" style={{ color: "#f58221" }} />
                                        <Header as="h3">
                                               Research
                                        </Header>
                                        <p style={{margin: 0}}>Personality theories have leaned more towards the idea that we all have similar personality traits</p>
                                        <div className="checkmark-bottom">
                                        <Icon name="check square outline" style={{ color: "#316db8" }} /> 
                                            <Header as="h3">
                                                  High-performer interview
                                            </Header>
                                            <p style={{margin: 0}}>Personality theories have leaned more towards the idea that we all have similar personality traits</p>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                    <Icon name="check square outline" style={{ color: "#dc3e6f" }} /> 
                                        <Header as="h3">
                                              Workshop
                                        </Header>
                                        <p style={{margin: 0}}>Personality theories have leaned more towards the idea that we all have similar personality traits</p>
                                        <div className="checkmark-bottom">
                                        <Icon name="check square outline" style={{ color: "#50b848" }} />
                                            <Header as="h3">
                                                  Validation study
                                            </Header>
                                            <p style={{margin: 0}}>Personality theories have leaned more towards the idea that we all have similar personality traits</p>
                                        </div>
                                    </Grid.Column>
                                   
                                </Grid.Row>
                            </Grid>
                        </div>
                    </div>
                     <div className="today-sec">
                        <div>
                            <Header as="h1">
                                Try the test today!
                            </Header>
                            <p>Personality theories have leaned more towards the idea that <br /> we all have similar personality traits</p>
                            <Button color='white'>Take the Assessment</Button>
                        </div>
                    </div>
                </div>
            </div>
            <FooterComponent />
        </div>
    );
}
