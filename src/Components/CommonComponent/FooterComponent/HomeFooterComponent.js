import React from "react";
// import { useHistory } from "react-router";
import "semantic-ui-css/semantic.min.css";
import { Grid, Container, List } from 'semantic-ui-react'
import fbImg from '../../../assets/img/fb.svg';
import twitterImg from '../../../assets/img/twitter.svg';
import instaImg from '../../../assets/img/insta.svg';
import linkedinImg from '../../../assets/img/linkedin.svg';
import youtubeImg from '../../../assets/img/youtube.svg';
import whatsappImg from '../../../assets/img/whatsapp.svg';
import './footer.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';


export default function FooterComponent(props) {
    return (
        <div className="home-footer">
            <Container>
                <div>

                    {/* <Divider /> */}
                    <Grid>
                        <Grid.Row  id='header-anchor'>
                            <Grid.Column width="1">

                            </Grid.Column>
                            <Grid.Column computer={8} mobile={16} tablet={8} className="vt-center menu-footer">
                                <List horizontal relaxed>
                                    <List.Item>
                                        <List.Content>
                                        <List.Header as='a'>
                                             <div role="listitem" className="item">
                                                <div className="content"><a href="/#" className="header" >Home</a></div>
                                            </div>
                                        </List.Header> 
                                            {/* <List.Header as='a' onClick={window.scrollTo(0, 0)}>Home</List.Header> */}
                                        </List.Content>
                                    </List.Item>

                                    <List.Item>
                                        <List.Content  >
                                          
                                            <List.Header  as='a'>  
                                            {/* <a href="/#" className="header"  >Contact</a> */}
                                            Contact </List.Header>
                                        </List.Content>
                                    </List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column computer={7} mobile={16} tablet={7} className="text-sm-center">
                                <div role="list" className="ui horizontal relaxed list social-list">
                                    <div role="listitem" className="item">
                                        <div className="content"><a href="/#" className="header" ><LazyLoadImage src={fbImg} className="fb-img" /></a></div>
                                    </div>
                                    <div role="listitem" className="item">
                                        <div className="content"><a href="/#" className="header"  ><LazyLoadImage src={twitterImg} className="twitter-img" /></a></div>
                                    </div>
                                    <div role="listitem" className="item">
                                        <div className="content"><a href="/#" className="header"  ><LazyLoadImage src={instaImg} className="insta-img" /></a></div>
                                    </div>
                                    <div role="listitem" className="item">
                                        <div className="content"><a href="/#" className="header"  ><LazyLoadImage src={linkedinImg} className="linkedin-img" /></a></div>
                                    </div>
                                    <div role="listitem" className="item">
                                        <div className="content"><a href="/#" className="header"  ><LazyLoadImage src={youtubeImg} className="youtube-img" /></a></div>
                                    </div>
                                    <div role="listitem" className="item">
                                        <div className="content"><a href="/#" className="header"  ><LazyLoadImage src={whatsappImg} className="whatsapp-img" /></a></div>
                                    </div>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </Container>
        </div>
    );
}
