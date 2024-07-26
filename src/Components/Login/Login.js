import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Grid, Form, Header, Image, Checkbox, Loader, Dimmer } from "semantic-ui-react";
import './login.scss';
import { Link, useHistory } from "react-router-dom";
import { authServices } from "../../Services/Auth";
import registerSecImg from '../../assets/img/register-left-sec.png';
import axios from 'axios';
import HeaderRegister from "../Register/HeaderRegister";
import { checkRegistrationCompleted, SignatureExpired } from '../../Actions/AuthAction';
import { showNotification } from "../../Actions/componentActions";
import { useDispatch } from 'react-redux';
// import { getAuth, GoogleAuthProvider} from "firebase/auth";
// import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
// import { initializeApp } from "firebase/app";
// import { firebaseConfig } from "../../Services/Firebase/firebase";
// import googleIcon from "../../assets/img/googleIcon.png"
// import fbLogo from "../../assets/img/fbLogo.png"
import Footer from "../Footer/Footer";
import CommonInput from "../CustomInput/CustomInput";
import { Paths } from "../routes/routePaths";

// new import 
// import usdImage from '../../../assets/img/udc-logo-long.png';
// import usdImage from "../../assets/img/udc-logo-long.png"
    // import { fetchGamesPercentages } from '../../Services/UpgradeDashboardServices/UpgradeDashboardServices'
    // import { updateGamesPercentages } from '../../Actions/GamesPercentageActions/gamesPercentageActions'
// import { SignInWithGoogle } from '../../Services/Firebase/firebase';


// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

export default function Login(props) {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const dispatch = useDispatch()
    const [submitted, setSubmitted] = useState(false); /* eslint-disable-line*/
    const [disableSubmit, setDisableSubmit] = useState(false);
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false)
    const [confirmEmail, setConfirmEmail] = useState(false)
    const [message, setMessage] = useState("")
    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        if (props.location.search) {
            setIsLoading(true)
            var getToken = props.location.search.split("=")[1]
            authServices.userLoginConfirm(getToken).then(
                (data) => {
                    history.push("/login")
                    setIsLoading(false)
                },
                (error) => {
                    setIsLoading(false)
                    setDisableSubmit(false);
                    dispatch(showNotification(true, error.message[0] ? error.message[0] : "Something went wrong, please try again"))

                    // console.log("error.response.status", error);
                }
            );
        }

    }, []) /* eslint-disable-line*/

    // const fetchGamesPercentagesUpgrade = async () => {
    //     let progressData = await fetchGamesPercentages()
    //     dispatch(updateGamesPercentages(progressData.data))
    // }

    // console.log("this location", location.state.login_type);
    const doUserLogin = (e) => {
        e.preventDefault();
        let isValidate = false;
        if (!isValidate) {
            isValidate = true
            var user = {
                email: formData.email,
                password: formData.password,
                // UDC: location.state.login_type === "UDC"
            };
            setIsLoading(true)
            setDisableSubmit(true);
            // const param = {UDC : location.state.login_type === "UDC"}
            authServices.userLogin(user).then(
                (data) => {
                    if (data.status === 200) {
                        dispatch(SignatureExpired(""))
                        dispatch({
                            type: 'FETCH_SESSION_EXPIRED',
                            payload: false
                        })

                        setDisableSubmit(false);
                        axios.defaults.headers.common['Authorization'] = `${data.data.token}`;
                        sessionStorage.setItem("ssoToken", data.data.token);
                        // sessionStorage.setItem("isPrivateUser",!data.data.public_access);
                        sessionStorage.setItem("isPublicUser", data.public_access);
                        sessionStorage.setItem("isGenericUser", data.generic_access);
                        // sessionStorage.setItem("profileImage", data.data.user.user_image)
                        sessionStorage.setItem("userName", `${data.data.user.first_name} ${data.data.user.last_name}`)
                        sessionStorage.setItem("isLogin", true);
                        sessionStorage.setItem("uid", data.data.user.id)
                        sessionStorage.setItem("uuid", data.data.user.uuid)
                        sessionStorage.setItem("assessment_started", data.data.assessment_started)
                        sessionStorage.setItem("informationPage", data.data.assessment_started)
                        sessionStorage.setItem("userData", JSON.stringify(data.data.user))
                        sessionStorage.setItem("registration_completed", data.data.user.registration_completed === true ? true : false)
                        dispatch(checkRegistrationCompleted(data.data.user.registration_completed === true ? true : false))

                        sessionStorage.setItem("email", data.data.user.email)
                        sessionStorage.setItem('isAdmin', data.data.user.admin)
                        // console.log(data.data.user.udc_user_id, "data.data.user.udc_user_id");
                        // data.data.user.admin ? history.push("/admin") : history.push(Paths.Instructions)
                        // setTimeout(() => {
                        sessionStorage.setItem("userRole", data?.data?.user?.role)
                        // console.log("data.data.user ===>",data.data.user.role)

                        data.data.user.role === "super_admin" ? history.push("/admin") : data.data.user.role === "udc_admin" ? history.push("/university-dashboard")
                            : data.data.user.udc_user ? history.push(Paths.upgradeDashboard) : history.push(Paths.upgradeDashboard)

                        sessionStorage.setItem("USER_TYPE", data.data.user.admin ? "Admin"
                            : data.data.user.udc_user ? "UDC_USER" : "Assessment_user"
                        )

                        // } , 200)
                        // data.data.user.admin ? history.push("/admin") : data.data.assessment_started ?  history.push("/dashboard") : history.push(Paths.Instructions) 

                        setConfirmEmail(false)

                    } else {

                        setConfirmEmail(true)
                        setMessage(data.message)
                        setDisableSubmit(false);
                    }
                    setTimeout(() => {
                        setIsLoading(false)

                    }, 200)
                },
                (error) => {
                    setIsLoading(false)
                    setDisableSubmit(false);
                    dispatch(showNotification(true, error.message ? error.message : "Something went wrong, please try again"))
                }
            );
        }
    };


    // const SignInWithGoogle = () => {

    //     signInWithPopup(auth, provider)
    //         .then((result) => {

    //             var user = {
    //                 provider: result.providerId === "google.com" ? "google" : result.providerId === "facebook.com" ? "facebook" : "linkedin",
    //                 social_uid: result.user.uid,
    //                 email: result.user.email,
    //             };

    //             var form_data = new FormData();
    //             for (var key in user) {
    //                 form_data.append(`user[${key}]`, user[key])
    //             }

    //             authServices.socialLogin(form_data).then(
    //                 (data) => {
    //                     if (data.status === 200) {
    //                         setDisableSubmit(false);
    //                         axios.defaults.headers.common['Authorization'] = `${data.data.token}`;
    //                         sessionStorage.setItem("ssoToken", data.data.token);
    //                         // sessionStorage.setItem("profileImage", data.data.user.user_image)
    //                         sessionStorage.setItem("userName", `${data.data.user.first_name} ${data.data.user.last_name}`)
    //                         sessionStorage.setItem("isLogin", true);
    //                         sessionStorage.setItem("uid", data.data.user.id)
    //                         sessionStorage.setItem("uuid", data.data.user.uuid)
    //                         sessionStorage.setItem("assessment_started", data.data.assessment_started)
    //                         sessionStorage.setItem("informationPage", data.data.assessment_started)
    //                         sessionStorage.setItem("userData", JSON.stringify(data.data.user))
    //                         sessionStorage.setItem("registration_completed", data.data.user.registration_completed === true ? true : false)
    //                         dispatch(checkRegistrationCompleted(data.data.user.registration_completed === true ? true : false))
    //                         sessionStorage.setItem("email", data.data.user.email)
    //                         sessionStorage.setItem('isAdmin', data.data.user.admin)
    //                         sessionStorage.setItem('isActiveItem', data.data.user.admin ? "/admin" : Paths.upgradeDashboard)
    //                         data.data.user.admin ? history.push("/admin") : history.push(Paths.upgradeDashboard)

    //                     } else {

    //                         dispatch(showNotification(true, data.message))
    //                         setDisableSubmit(false);
    //                     }
    //                     setIsLoading(false)
    //                 },
    //                 (error) => {
    //                     setIsLoading(false)
    //                     setDisableSubmit(false);
    //                     dispatch(showNotification(true, error.messages))
    //                     // console.log("error.response.status", error);
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

    //             var user = {
    //                 provider: result.providerId === "google.com" ? "google" : result.providerId === "facebook.com" ? "facebook" : "linkedin",
    //                 social_uid: result.user.uid,
    //                 email: result.user.email,
    //             };

    //             var form_data = new FormData();
    //             for (var key in user) {
    //                 form_data.append(`user[${key}]`, user[key])
    //             }

    //             authServices.socialLogin(form_data).then(
    //                 (data) => {
    //                     if (data.status === 200) {
    //                         setDisableSubmit(false);
    //                         axios.defaults.headers.common['Authorization'] = `${data.data.token}`;
    //                         sessionStorage.setItem("ssoToken", data.data.token);
    //                         // sessionStorage.setItem("profileImage", data.data.user.user_image)
    //                         sessionStorage.setItem("userName", `${data.data.user.first_name} ${data.data.user.last_name}`)
    //                         sessionStorage.setItem("isLogin", true);
    //                         sessionStorage.setItem("uid", data.data.user.id)
    //                         sessionStorage.setItem("uuid", data.data.user.uuid)
    //                         sessionStorage.setItem("assessment_started", data.data.assessment_started)
    //                         sessionStorage.setItem("informationPage", data.data.assessment_started)



    //                         sessionStorage.setItem("userData", JSON.stringify(data.data.user))
    //                         sessionStorage.setItem("registration_completed", data.data.user.registration_completed === true ? true : false)

    //                         dispatch(checkRegistrationCompleted(data.data.user.registration_completed === true ? true : false))

    //                         sessionStorage.setItem("email", data.data.user.email)
    //                         sessionStorage.setItem('isAdmin', data.data.user.admin)

    //                         // data.data.user.admin ? history.push("/admin") : history.push("/dashboard")
    //                         data.data.user.admin ? history.push("/admin") : history.push(Paths.upgradeDashboard)
    //                     } else {

    //                         dispatch(showNotification(true, data.message))
    //                         setDisableSubmit(false);
    //                     }
    //                     setIsLoading(false)
    //                 },
    //                 (error) => {
    //                     setIsLoading(false)
    //                     setDisableSubmit(false);
    //                     dispatch(showNotification(true, error.message))
    //                     // console.log("error.response.status", error);
    //                 }
    //             );
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };

    return (
        <div className="login-page-full-height-background">
            <div>
                <Dimmer active={isLoading} inverted>
                    <Loader size='large' inline='centered' >
                        Loading...
                    </Loader>
                </Dimmer>
            </div>

            <div className="login-page-header">
                <HeaderRegister />
            </div>
            <div className="login-page-content-area">
                <Grid className="flex-100">
                    <Grid.Row className="account-bg-new">

                        <Grid.Column computer={8} mobile={16} tablet={16} className="vt-center login-left-content">
                            <Image src={registerSecImg} className="image-register" />
                        </Grid.Column>

                        <Grid.Column computer={8} mobile={16} tablet={16} className="login-content-sec">
                            <div className={'center-align login-inner-sec'}>
                                <div className={'login-sub-sec'}>
                                    <div className="login-sub-sec__inner-container">
                                        <div className={'sub-center-align'}>
                                            <div className="text-center">
                                                <Header as="h2" className="mg-top-none mt-12">
                                                    {/* {location.state.login_type === "Game" && "UDC"} Login */}




                                                    {/* {location.state.login_type === "UDC" && "UDCLogin" ?
                                                        <Image className="university-logo-image-homepage univerisity-image" src={usdImage} style={{ cursor: "pointer" }} /> : "Login"
                                                    } */}


                                                </Header>
                                            </div>
                                            <div className="login-input mt-12">
                                                <Form style={{ width: '80%', margin: 'auto' }} >
                                                    {confirmEmail && <div className='email-existing-input'>
                                                        <span style={{ color: "red" }}>{message}</span>
                                                    </div>}

                                                    <CommonInput
                                                        fluid={true}
                                                        placeholder='Username'
                                                        className='mt-12'
                                                        onChange={handleInputChange}
                                                        value={formData.email === "" ? "" : formData.email}
                                                        autocomplete="off"
                                                        name="email"
                                                        type="email"
                                                        error={
                                                            submitted && !formData.email
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    <CommonInput
                                                        fluid={true}
                                                        type={"password"}
                                                        placeholder="Password"
                                                        value={formData.password === "" ? "" : formData.password}
                                                        name="password"
                                                        autocomplete="off"
                                                        error={submitted && !formData.password ? true : false}
                                                        onChange={handleInputChange}
                                                    />
                                                    <Form.Group widths='equal' className='mb-0' style={{ padding: '0 8px', marginBottom: '0' }}>
                                                        <div style={{ width: '60%' }}>
                                                            <Checkbox label='Remember me' className="ui-checkbox-remember" />
                                                        </div>
                                                        <span className="forgot-password-container"><Link
                                                            to={{ pathname: "/forgot-password", state: { email: formData.email } }}
                                                            className="forgot-password"
                                                            style={{ color: "#000", fontWeight: 500, fontSize: '14px', lineHeight: '17px' }}
                                                        >
                                                            <label>Forgot password?</label>
                                                        </Link></span>

                                                    </Form.Group>
                                                    <Button
                                                        // className={`${location.state.login_type === "UDC" && "UDCLogin"}  w-100 primary-btn login-btn`}
                                                        className={`w-100 primary-btn login-btn`}
                                                        onClick={doUserLogin}
                                                        disabled={disableSubmit}
                                                    >Login</Button>
                                                    <div className='text-center login-option-seperator'>
                                                        OR
                                                    </div>
                                                </Form>

                                                {/* <div className="social-login" style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                                                    <img src={googleIcon} alt="" style={{ width: "40px", padding: "5px", }} onClick={() => SignInWithGoogle()} />
                                                    <img src={fbLogo} alt="" style={{ width: "40px", padding: "5px" }} onClick={() => SignupWithFacebook()} />
                                                </div> */}
                                                <div className="">
                                                    <Grid>
                                                        <Grid.Row>
                                                            <Grid.Column className="login-footer">
                                                                <span as="h5" style={{ textAlign: 'center' }} className='txt-12'>
                                                                    Don't have an account?
                                                                    <Link
                                                                        to="/register"
                                                                        className="lbl_href"
                                                                        style={{ color: "#1b75bc", fontWeight: 600, marginLeft: 3 }}
                                                                    >
                                                                        Register Here
                                                                    </Link>
                                                                </span>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
            <Footer />
        </div>
    );
}
