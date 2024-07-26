import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Grid, Form, Header, Image, Container, Icon } from "semantic-ui-react";
import './login.scss';
import { Link, useHistory } from "react-router-dom";
import { authServices } from "../../Services/Auth";
import censioLogo from '../../assets/img/censio_logo.png';
import registerSecImg from '../../assets/img/register-left-sec.png';
import { showNotification } from "../../Actions/componentActions";
import { useDispatch } from "react-redux";



export default function ResetPassword(props) {

    var validationPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    const [formData, setFormData] = useState({
        password: ""
    })
    const [submitted, setSubmitted] = useState(false); /* eslint-disable-line*/
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [passwordSameError, setPasswordSameError] = useState(false);
    const [token, setToken] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const history = useHistory();

    const dispatch = useDispatch()

    const handleInputChangePassword = (e) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            password: value,
        });
    };

    useEffect(() => {
        if (window.location) {
            if (window.location.search) {
                var token = window.location.search.split("=")[1];
                setToken(token);
            }
        }
    }, [])

    const doUserResetPassword = (e) => {
        e.preventDefault();
        if (formData.password === confirmPassword) {
            if (formData.password && validationPassword.test(formData.password)) {
                var user = {
                    reset_password_token: token,
                    password: formData.password
                }
                setDisableSubmit(true);

                authServices.resetPassword(user).then(
                    (data) => {
                        dispatch(showNotification(true, data.message ? data.message : "Successful !!", "success"))

                        setTimeout(() => {
                            history.push('/login');
                        }, 3000);
                    },
                    (error) => {
                        dispatch(showNotification(true, error.message))
                        setDisableSubmit(false);
                        // console.log("error.response.status", error);
                    }
                );
            }
        } else {
            setPasswordSameError(true)
        }
    };

    const handleInputOnBlur = (e) => {

        const { name, value } = e.target;
        var passwordValidError;
        if (name === "password" && value.length > 0) {
            passwordValidError = validationPassword.test(value)
                ? ""
                : "Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character";
            setPasswordError(passwordValidError);
        }
    }

    return (
        <div className="register-page login-page-full-height-background">
            <div className="login-header-seperate">
                <Container>
                    <div className="header-logobefore-login">

                        <Grid>
                            <Grid.Row>
                                <Grid.Column mobile={8} tablet={10} computer={12}>
                                    <Image src={censioLogo} onClick={() => history.push("/")} className="image-logo-censio-before-login w-100" width="120" />
                                </Grid.Column>
                                <Grid.Column mobile={8} tablet={6} computer={4} className='align-verticle__center text-right'>

                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </Container>
            </div>


            <Grid>
                <Grid.Row className="account-bg">
                    <Grid.Column computer={8} mobile={16} tablet={16}>
                        <Image src={registerSecImg} className="image-register" />
                    </Grid.Column>

                    <Grid.Column computer={8} mobile={16} tablet={16} className="login-content-sec">
                        <div className={'center-align login-inner-sec'}>
                            <div className={'sub-center-align login-sub-sec login-sub-sec__inner-container'}>
                                <Header as='h2' textAlign="center" className="m-0">
                                    Reset Password
                                </Header>
                                <div className="login-input mt-12">
                                    <Form style={{ width: '80%', margin: 'auto' }}>

                                        <Form.Input
                                            fluid
                                            type={"password"}
                                            label='Password'
                                            placeholder="******"
                                            value={formData.password}
                                            onKeyUp={() => setPasswordSameError(false)}
                                            onBlur={handleInputOnBlur}
                                            name="password"
                                            required={true}
                                            error={submitted && !formData.password ? true : false}
                                            onChange={handleInputChangePassword}
                                            selection
                                        />
                                        <div style={{ margin: 8 }}>
                                            <span style={{ color: "red" }}>{
                                                passwordError ?
                                                    passwordError
                                                    :
                                                    null
                                            }</span>
                                        </div>
                                        <Form.Input
                                            fluid
                                            type={"password"}
                                            label='Confirm Password'
                                            placeholder="******"
                                            onKeyUp={() => setPasswordSameError(false)}
                                            error={
                                                submitted && !confirmPassword
                                                    ? true
                                                    : false
                                            }
                                            value={formData.confirmPassword}
                                            onBlur={() => formData.password !== confirmPassword ? setPasswordSameError(true) : setPasswordSameError(false)}

                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        <div style={{ margin: 8 }}>
                                            <span style={{ color: "red" }}>{passwordSameError && "Password does not match"}</span>
                                        </div>
                                        <div style={{ margin: '0 0 1px 0' }}>
                                            <ul className='password-rule-list'>
                                                <li><Icon name="circle" />One Lowercase</li>
                                                <li><Icon name="circle" />One  Uppercase</li>
                                                <li><Icon name="circle" />One Special Character</li>
                                                <li><Icon name="circle" />8 Characters Minimum</li>
                                            </ul>

                                        </div>
                                        <Button
                                            className="next-button login-btn primary-btn"
                                            onClick={doUserResetPassword}
                                            disabled={disableSubmit}
                                        >Submit</Button>
                                    </Form>
                                </div>

                            </div>
                        </div>
                        <div className="login-footer">
                            <p style={{ textAlign: 'center' }} className='txt-12'>
                                Already have an account?
                                <Link
                                    to="/register"
                                    className="lbl_href"
                                    style={{ color: "#000", fontWeight: 600, marginLeft: 3 }}
                                >
                                    Register Here
                                </Link>
                            </p>
                        </div>

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
}
