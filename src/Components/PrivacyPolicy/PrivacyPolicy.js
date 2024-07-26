import React from 'react';
import HeaderRegister from '../Register/HeaderRegister';
import { Grid, Header,Container } from "semantic-ui-react";
import Footer from '../Footer/Footer';
import "./privacy-policy.scss";


const PrivacyPolicy = () => {
  return <div className='privacy-page'>
      <HeaderRegister/>
      <Container>
          <Grid>
              <Grid.Row>
                <Grid.Column computer={12} className='m-auto'>
                  <div>
                  <br />
                    <Header as="h2">Overview</Header>
                    <p>censio.com is firmly committed to the privacy of its members. censio.com works hard to earn and keep your trust, so it adheres to the following principles to protect your privacy:
                    </p>
                  </div>
                  <div>
                    <Header as="h2">Information Collection</Header>
                    <p>censio.com is an online marketplace that connects businesses with Freelancers. When you visit censio.com you provide two types of information: personal information you knowingly choose to disclose that is collected by censio.com and website use information collected by censio.com as you interact with the censio.com website (the "Website").</p>
                    <p>When you register with censio.com as a Freelancer or as an Employer, you provide certain personal information, including, your name, your email address and your address. Additionally, when you establish your profile as a Freelancer or as an Employer you will provide information relating to your skills, experience, education level, compensation, work availability, geographic region and self-evaluation. Such information does not identify the specificity of the individual member. Freelancers are not required to, but have the option to display their contact information (i.e. name, address, phone number, email address, etc.) to Employers who conduct searches of the censio.com database.</p>
                    <p>When you enter the Website, censio.com collects your IP address. This information is gathered for all censio.com visitors. In addition, censio.com stores certain information from your browser using "cookies." A cookie is a piece of data stored on the user's computer tied to information about the user. censio.com uses session ID cookies to confirm that users are logged in. These cookies terminate once the user closes the browser. By default, censio.com uses a persistent cookie that stores your login ID (but not your password) to make it easier for you to login when you return to the Website. censio.com members must have cookies enabled on their browser. Note: Cookie preferences are set within each browser's Internet options/preferences.</p>
                  </div>
                  <br />
                  <div>
                    <Header as="h2">Information Use</Header>
                    <p>censio.com will not sell or rent any collected information to third parties. censio.com will not share your contact information with other users or third parties except in connection with possible employment and with your express consent. All registered censio.com members click the "I AGREE" checkbox on the registration form to agree to the censio.com Privacy Policy and Terms of Service. Accordingly, all registered users agree that certain profile information is accessible to other registered users.
                    </p>
                    <p>censio.com records IP addresses for system administration purposes. This information is used to diagnose server problems, monitor traffic patterns, analyze trends, administer the Website, track member user patterns, and identify the most popular areas of the Website to deliver content most relevant to registered members. IP addresses are not linked to personally identifiable information and are only used to gather broad demographic information for aggregate use, except in the case of fraud.</p>
                    <p>censio.com reserves the right to share aggregated demographic information with its partners and/or advertisers, such information will not be linked to personal information that identifies registered users, except in the case of fraud.</p>
                  </div>
                </Grid.Column>

              </Grid.Row>
          </Grid>
        </Container>
      <Footer/>
  </div>;
};

export default PrivacyPolicy;
