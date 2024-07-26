import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Container } from "semantic-ui-react";
import "./footer.scss";

const Footer = () => {

    const history = useHistory()
  return <div>
      <div className="outer-footer">

       <Container>
          <Grid>
              <Grid.Row>
                <Grid.Column>
                  <div>
                    <ul className='footer-outer-list sm-hide'>
                      <li>©2022 - Censio | All Rights Reserved</li>
                      <li onClick={()=>history.push("/terms")}>Terms of Service</li>
                      <li onClick={()=>history.push("/privacy-policy")}>Privacy Policy</li>
                    </ul>
                    <div className='sm-block'>
                      <ul className='footer-outer-list'>
                        <li onClick={()=>history.push("/terms")}>Terms of Service</li>
                        <li onClick={()=>history.push("/privacy-policy")}>Privacy Policy</li>
                      </ul>
                        <p>©2022 - Censio | All Rights Reserved</p>
                    </div>
                  </div>
                </Grid.Column>

              </Grid.Row>
          </Grid>
        </Container>
      </div>
  </div>;
};

export default Footer;
