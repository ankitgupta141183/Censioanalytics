import React from "react";
// import { useHistory } from "react-router";
import "semantic-ui-css/semantic.min.css";
import { Grid, Image, Container } from "semantic-ui-react";
import fbImg from "../../../assets/img/fb.svg";
import twitterImg from "../../../assets/img/twitter.svg";
import instaImg from "../../../assets/img/insta.svg";
import linkedinImg from "../../../assets/img/linkedin.svg";
import youtubeImg from "../../../assets/img/youtube.svg";
import whatsappImg from "../../../assets/img/whatsapp.svg";
import "./footer.scss";
import { useSelector } from "react-redux";

export default function FooterComponent(props) {
    const isToggle = useSelector((state) => state.componentReducer.isToggle)
  return (
    <div className={isToggle? "footer-section home-footer footer-inner-section" :  "footer-section home-footer"} >
      <Container>
        <div>
          {/* <Divider /> */}
          <Grid>
            <Grid.Row>
              <Grid.Column width="16" className="footer-social-container">
                <div
                  role="list"
                  className="ui horizontal relaxed list social-list"
                >
                  <div role="listitem" className="item">
                    <div className="content">
                      <a href="#null" className="header">
                        <Image src={fbImg} className="fb-img" />
                      </a>
                    </div>
                  </div>
                  <div role="listitem" className="item">
                    <div className="content">
                      <a href="#null" className="header">
                        <Image src={twitterImg} className="twitter-img" />
                      </a>
                    </div>
                  </div>
                  <div role="listitem" className="item">
                    <div className="content">
                      <a href="#null" className="header">
                        <Image src={instaImg} className="insta-img" />
                      </a>
                    </div>
                  </div>
                  <div role="listitem" className="item">
                    <div className="content">
                      <a href="#null" className="header">
                        <Image src={linkedinImg} className="linkedin-img" />
                      </a>
                    </div>
                  </div>
                  <div role="listitem" className="item">
                    <div className="content">
                      <a href="#null" className="header">
                        <Image src={youtubeImg} className="youtube-img" />
                      </a>
                    </div>
                  </div>
                  <div role="listitem" className="item">
                    <div className="content">
                      <a href="#null" className="header">
                        <Image src={whatsappImg} className="whatsapp-img" />
                      </a>
                    </div>
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
