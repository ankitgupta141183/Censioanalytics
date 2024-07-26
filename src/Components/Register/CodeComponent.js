import React, { useState} from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Grid, Form, Header, Image ,Icon, Loader, Dimmer } from "semantic-ui-react";
import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from "react-datepicker";
import './register.scss';
// import CommonInput from '../CustomInput/CustomInput'
import headerLogo from '../../assets/img/censio_logo.png';
// import PhoneInputField from "../CommonComponent/PhoneInputField";
// import { authServices } from "../../Services/Auth";
// import { Paths } from "../routes/routePaths";
import { useHistory } from "react-router-dom";
// import { Country, State, City } from 'country-state-city';

// const validEmailRegex = RegExp(
//     /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
// );
// var validateAlphabate = /^[A-Za-z]+$/;

export default function CodeComponent({ handleCloseSignUp = () => { }, handleClickOnVerify = () => {}, codePopup=false }) {

    // const [isLastNameError, setIsLastNameError] = useState(false);
    const [isLoading, setIsLoading] = useState(false) /* eslint-disable-line*/
    const history = useHistory()



    return (
        <div >
            {!codePopup && 
            <div className="header-logobefore-login">
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={14}>
                            <Image src={headerLogo}  onClick={() => history.push("/")} className="image-logo-censio-before-login" />
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <Button className="close-btn" onClick={handleCloseSignUp}>
                              <Icon name="close" />  Close
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
    }
            <div className="sign-filter-main">
                <div>
                    <Dimmer active={isLoading} inverted>
                        <Loader size='large' inline='centered' >
                            Loading...
                        </Loader>
                    </Dimmer>
                </div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column computer={15} mobile={16} tablet={16} style={{ margin: "auto" }}>
                            <Form>
                                <div className="sign-page-filter code-page">
                                    {/* <div className="code-close">
                                    <Button className="close-btn-code" onClick={handleCloseSignUp}>
                                        <Icon name="close" />  Close
                                    </Button>
                                    </div> */}
                                    <div className="code-input-box">
                                    <Header as="h2" textAlign="center">
                                        Enter Your Code
                                    </Header>
                                    <p>Please enter a unique code provide by school/ college</p>
                                    <div className="input-code">
                                        <div className="field mb-10">
                                        <Form.Input
                                            fluid
                                            // label='First Name'
                                            placeholder='6-digit code'
                                        // onChange={handleInputChangeFirstName}
                                        // value={formData.firstName}
                                        // name="firstName"
                                        // error={
                                        //     (submitted && !formData.firstName) || isFirstNameError
                                        //         ? true
                                        //         : false
                                        // }
                                        />
                                        </div>
                                        <Button
                                            className="next-button login-btn"
                                        onClick={handleClickOnVerify}
                                        // disabled={disableSubmit}
                                        style={{width: "100%", marginTop: 20}}
                                        >Verify code</Button>
                                    </div>

                                    </div>


                                </div>

                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </div>


    );
}
