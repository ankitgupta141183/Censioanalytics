import React, { useState } from 'react';
import "semantic-ui-css/semantic.min.css";
import { Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { Button, Form, } from "semantic-ui-react";
import "react-datepicker/dist/react-datepicker.css";
import "react-step-progress-bar/styles.css";
import "../register.css";
import { authServices } from '../../../Services/Auth';
// import { initializeApp } from "firebase/app";
// import { firebaseConfig } from "../../../Services/Firebase/firebase"
// import { Paths } from '../../routes/routePaths';
// import googleIcon from "../../../assets/img/googleIcon.png"
// import fbLogo from "../../../assets/img/fbLogo.png"
import { useDispatch } from "react-redux";
// import { showNotification } from "../../../Actions/componentActions";
import { emailExist } from '../../../Actions/AuthAction';
import { useSelector } from 'react-redux';
import CommonInput from '../../CustomInput/CustomInput';
// const validEmailRegex = RegExp(
//     /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i  // eslint-disable-line
// );


// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// const provider = new GoogleAuthProvider();

const Step1 = ({ domainError, nextClick = () => { }, formData, submitted, handleInputEmail = () => { }, setPasswordSameError = () => { }, handleInputChangePassword, handleConfirmPassword, passwordSameError, passwordError, handleInputOnBlur = () => { } }) => {


    const dispatch = useDispatch()
    const [checked, setChecked] = useState(false)
    const emailExistErr = useSelector((state) => state.authReducer.emailExistErr)
    // console.log(emailExistErr , "this is email exixt err");
    // const history = useHistory()

    // const SignInWithGoogle = () => {

    //     signInWithPopup(auth, provider)
    //         .then((result) => {

    //             const first_name = result.user.displayName.split(" ")[0]
    //             const last_name = result.user.displayName.split(" ")[1]

    //             var user = {
    //                 provider: result.providerId === "google.com" ? "google" : result.providerId === "facebook.com" ? "facebook" : "linkedin",
    //                 social_uid: result.user.uid,
    //                 email: result.user.email,
    //                 role: "user",
    //                 first_name: first_name,
    //                 last_name: last_name
    //             };

    //             var form_data = new FormData();
    //             for (var key in user) {
    //                 form_data.append(`user[${key}]`, user[key])
    //             }
    //             authServices.userSignUp(form_data).then(
    //                 (data) => {
    //                     dispatch(showNotification(true, "Registered Successfully!!!", "success"))
    //                     setTimeout(() => {
    //                         history.push(Paths.LogIn);
    //                     }, 3000);
    //                 },
    //                 (error) => {
    //                     dispatch(showNotification(true, error.messages ? error.messages : "Something went wrong, please try again"))
    //                 }
    //             );

    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };

    // const SignupWithFacebook = () => {

    //     var fbProvider = new FacebookAuthProvider();

    //     signInWithPopup(auth, fbProvider)
    //         .then((result) => {

    //             const first_name = result.user.displayName.split(" ")[0]
    //             const last_name = result.user.displayName.split(" ")[1]

    //             var user = {
    //                 provider: result.providerId === "google.com" ? "google" : result.providerId === "facebook.com" ? "facebook" : "linkedin",
    //                 social_uid: result.user.uid,
    //                 email: result.user.email,
    //                 role: "user",
    //                 first_name: first_name,
    //                 last_name: last_name
    //             };

    //             var form_data = new FormData();
    //             for (var key in user) {
    //                 form_data.append(`user[${key}]`, user[key])
    //             }
    //             authServices.userSignUp(form_data).then(
    //                 (data) => {
    //                     dispatch(showNotification(true, "Registered Successfully!!!", "success"))
    //                     setTimeout(() => {
    //                         history.push(Paths.LogIn);
    //                     }, 3000);
    //                 },
    //                 (error) => {
    //                     dispatch(showNotification(true, error.messages ? error.messages : "Something went wrong, please try again"))
    //                 }
    //             );

    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };

    const checkEmailExist = () => {
        authServices.emailExist(formData.email).then((data) => {
            data.status === 422 ? dispatch(emailExist(true)) : dispatch(emailExist(false))
        })
    }
    const handlefocus = (e) => {
        e.target.readOnly = false
    }
    return <div className="register-content-sec" style={{ marginTop: '10px' }}>
        <Form onSubmit={(e) => nextClick(e)} style={{ padding: '0 0 0px 0' }}>
            <div className="sign-page-filter" style={{ padding: '3px 0 7px 0', marginTop: '0', }}>
                <div style={{ width: "90%", margin: "auto" }}>
                    <Header as="h2" textAlign="center" className='m-0'>
                        Register
                    </Header>

                    {!emailExistErr ? null : <div className='email-existing-input'>
                        <span style={{ color: "red" }}>{"An account with this email already exists."}</span>
                    </div>}
                    <Form.Group widths='equal' >


                        <div className='field'>
                            <label htmlFor=""> Email <span style={{ color: "red" }}>*  </span>
                            </label>

                            <CommonInput
                                fluid={"true"}
                                placeholder='Email'
                                type="email"
                                readOnly={true}
                                onFocus={(e) => handlefocus(e)}
                                onChange={handleInputEmail}
                                value={formData.email}
                                autoComplete="off"
                                name="email"
                                error={
                                    (submitted && !formData.email)
                                        ? true
                                        : false
                                }
                                required={true}
                                selection={"true"}
                                style={{ marginBottom: 0 }}
                                onBlur={checkEmailExist}
                            />

                        </div>
                    </Form.Group>
                    <div style={{ margin: 1, fontSize: '10px', lineHeight: '1.4' }}>
                        <span style={{ color: "red" }}>
                            {domainError && domainError }
                        </span>
                    </div>

                    <div style={{ margin: 1 }}>

                        <Form.Group widths='equal' style={{ marginTop: 0 }}>

                            <div className='field'>

                                <label htmlFor=""> Password <span style={{ color: "red" }}>*</span></label>

                                <div className='d-flex'>
                                    <input fluid={"true"}
                                        placeholder='Password'
                                        type={`${checked ? "Text" : "Password"}`}
                                        value={formData.password}
                                        onKeyUp={() => setPasswordSameError(false)}
                                        onBlur={handleInputOnBlur}
                                        name="password"
                                        error={(submitted && !formData.password) ? "true" : "false"}
                                        onChange={handleInputChangePassword}
                                        autoComplete="off"
                                        required={true}
                                        selection={"true"}
                                        style={{ marginBottom: 2, width: '65%' }}
                                        className='custom-password-field'
                                    />
                                    <div className='w-35 show-txt-input'>
                                        <input type="checkbox" id="password" className='hidden-password-input' style={{ margin: '3px 5px 0 0', cursor: 'pointer' }} name="password" value="password" onChange={(e) => setChecked(!checked)} />{checked ? "Hide" : "Show"}
                                        <span className='checkmark-password'></span>
                                    </div>
                                </div>
                            </div>
                        </Form.Group>
                        <div style={{ margin: 1, fontSize: '10px', lineHeight: '1.4' }}>
                            <span style={{ color: "red" }}>{
                                passwordError ?
                                    passwordError
                                    :
                                    null
                            }</span>
                        </div>
                        <div style={{ margin: '0 0 1px 0' }}>
                            <ul className='password-rule-list'>
                                <li><Icon name="circle" />One Lowercase</li>
                                <li><Icon name="circle" />One  Uppercase</li>
                                <li><Icon name="circle" />One Special Character</li>
                                <li><Icon name="circle" />8 Characters Minimum</li>
                            </ul>
                        </div>
                        <div className='field'>
                            <label htmlFor=""> Confirm Password <span style={{ color: "red" }}>*</span></label>
                            <input fluid={"true"}
                                type={"password"}
                                // label='Confirm Password'
                                placeholder="Confirm Password"
                                error={
                                    (submitted && !formData.confirmPassword)
                                        ? "true"
                                        : "false"
                                }
                                value={formData.confirmPassword}
                                onChange={handleConfirmPassword}
                                autoComplete="off"
                                onBlur={() => formData.password !== formData.confirmPassword && formData.confirmPassword.length > 0 ? setPasswordSameError(true) : setPasswordSameError(false)}
                                required={true}
                                selection={"true"}
                                style={{ marginBottom: 0 }}
                            />
                        </div>
                        <div style={{ margin: 0 }}>
                            <span style={{ color: "red" }}>{passwordSameError ? "Password does not match" :
                                null
                            }</span>
                        </div>
                    </div>
                    <div style={{ width: '70%', margin: '0 auto 0 auto', textAlign: 'center' }}>
                        <Button
                            className="next-button primary-btn w-100 pr-btn-sm"
                            // onClick={(e) => nextClick(e)}
                            type="submit"
                        >
                            Next
                        </Button>

                    </div>
                    <div className='text-center login-option-seperator'>
                        OR
                    </div>
                    {/* <br /><br /> */}
                    {/* <div className="social-login" style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>

                        <img src={googleIcon} alt="" style={{ width: "40px", padding: "5px", marginTop: "-40px" }} onClick={() => SignInWithGoogle()} />
                        <img src={fbLogo} alt="" style={{ width: "40px", padding: "5px", marginTop: "-40px" }} onClick={() => SignupWithFacebook()} />
                    </div> */}
                    <div className='login-footer'>
                        <p style={{ textAlign: 'center' }} className='txt-12'>
                            Already have an account?<Link
                                to="/login"
                                className="lbl_href"
                                style={{ color: "#1b75bc", fontWeight: 600, marginLeft: 3 }}
                            >
                                Login Here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </Form>
    </div>
};

export default Step1;
