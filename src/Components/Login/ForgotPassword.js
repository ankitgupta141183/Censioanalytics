import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Grid, Form, Header, Image, Container } from "semantic-ui-react";
import './login.scss';
import { Link, useHistory } from "react-router-dom";
import { authServices } from "../../Services/Auth";
import censioLogo from '../../assets/img/censio_logo.png';
import registerSecImg from '../../assets/img/register-left-sec.png';
// import { Menu, Dropdown, List } from 'semantic-ui-react'
import Footer from "../Footer/Footer";
import { showNotification } from "../../Actions/componentActions";
import { useDispatch } from "react-redux";
// import { Handle } from "rc-slider";
import axios from "axios";




export default function ForgotPassword(props) {
    var apiUrl = global.platformURI;

    const userEmail = props.location.state.email
    const [formData, setFormData] = useState({
        email: userEmail ? userEmail : "",
    })

    const [disableSubmit, setDisableSubmit] = useState(false);
    const [showResend, setshowResend] = useState(false);

    const history = useHistory();
    const dispatch = useDispatch()

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };
    const ResendLink = (e) => {
        e.preventDefault();
        let isValidate = false;

        if (!isValidate) {
            // var user = {
            //     email: formData.email,
            // };
            setDisableSubmit(true);
            // api/v1/resend_confirmation_email
            axios.get(apiUrl + `/api/v1/resend_confirmation_email?email=${formData.email}`).then(response => {
                if (response.status === 200) {
                    dispatch(showNotification(true, response.data.message, "success"))
                    setDisableSubmit(false);
                    setshowResend(false)
                    history.push('/login')
                }
                else {
                    setDisableSubmit(false);

                }

            })
        }
    }

    const doUserLogin = (e) => {
        e.preventDefault();
        let isValidate = false;

        if (!isValidate) {
            var user = {
                email: formData.email,
            };
            setDisableSubmit(true);

            authServices.userForgotPassword(user).then(
                (data) => {
                    if (data.status === 200) {

                        dispatch(showNotification(true, data.message, "success"))
                        history.push("/")
                        setDisableSubmit(false);
                    }
                    else if (data.status === 401) {
                        if(data.message !== "Please enter a valid email"){
                            setshowResend(true)
                        }
                        dispatch(showNotification(true, data.message))
                        setDisableSubmit(false);
                        
                    }
                    else {

                        dispatch(showNotification(true, data.message))
                        setDisableSubmit(false);

                    }

                },
                (error) => {
                    setDisableSubmit(false);
                }
            );
        }
    };

    return (
        <div className="forgot-page">
            <div className="forgot-page__header">
                <Container>
                    <div className="header-logobefore-login">
                        <Grid>
                            <Grid.Row>
                                <Grid.Column mobile={4} tablet={3} computer={3}>
                                    <Image src={censioLogo} onClick={() => history.push("/")} className="image-logo-censio-before-login w-100" />
                                </Grid.Column>
                                <Grid.Column mobile={2} tablet={2} computer={8} className='vt-center'>

                                </Grid.Column>
                                <Grid.Column mobile={10} tablet={11} computer={5} className='align-verticle__center text-right'>
                                    <Button className="login-account-btn" onClick={() => history.push("/login")}>
                                        Login
                                    </Button>
                                    <Button className="login-account-btn" onClick={() => history.push("/register")}>
                                        Create New Account
                                    </Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </Container>
            </div>
            <div style={{height: '85%', display: 'flex'}}>
                <Grid>
                    <Grid.Row className="account-bg vt-center">
                        <Grid.Column computer={8} mobile={16} tablet={16}>
                            <Image src={registerSecImg} className="image-register" />
                        </Grid.Column>
                        <Grid.Column computer={8} mobile={16} tablet={16} className="forgot-content-sec">
                            <div className={'center-align forgot-inner-sec'}>
                                <div className={'sub-center-align'}>
                                    <Header as='h2' textAlign="center" className="m-0">
                                        {showResend ?
                                        <>Resend Confirmation Link</>
                                        :
                                        <>  Forgot Password </>
                                }
                                    </Header>


                                    <div className="login-input mt-12">
                                        <Form style={{ width: '80%', margin: 'auto' }}>

                                            <Form.Input
                                                fluid
                                                // label='Username' 
                                                placeholder='Email'
                                                onChange={handleInputChange}
                                                value={formData.email}
                                                name="email"
                                                required={true}
                                            />
                                            {showResend ?
                                                <Button className="login-btn primary-btn w-100"
                                                    onClick={ResendLink}
                                                    disabled={disableSubmit}
                                                // onClick={() => HandleClick()}
                                                >Resend</Button>
                                                :
                                                <Button
                                                    className="login-btn primary-btn w-100"
                                                    onClick={doUserLogin}
                                                    disabled={disableSubmit}
                                                >Submit</Button>
                                            }
                                        </Form>
                                    </div>

                                </div>

                            </div>
                            <div className="login-footer">
                                <p style={{ textAlign: 'center' }} className="reg-here-txt txt-12">
                                    Already have an account?
                                    <Link
                                        to="/register"
                                        className="lbl_href"
                                        style={{ color: "#1b75bc", fontWeight: 600, marginLeft: "3px" }}
                                    >
                                        Register Here
                                    </Link>
                                </p>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
            <Footer />
        </div>
    );
}
