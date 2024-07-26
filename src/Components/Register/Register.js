import "semantic-ui-css/semantic.min.css";
import { Grid, Image } from "semantic-ui-react";
import './register.scss';
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import { useHistory } from "react-router-dom";
import { Paths } from "../routes/routePaths";
import betterNew from '../../assets/img/better-new.png';
import HeaderRegister from "./HeaderRegister";
import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import "react-datepicker/dist/react-datepicker.css";
import './register.scss';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import PhoneInputField from "../CommonComponent/PhoneInputField";
import Footer from "../Footer/Footer";
import { authServices } from "../../Services/Auth";
import check2 from "../../assets/img/check2.png"
import { useDispatch } from "react-redux";
import { showNotification } from "../../Actions/componentActions";
import { useSelector } from "react-redux";
import { emailExist } from "../../Actions/AuthAction";
// const validEmailRegex = RegExp(
//     /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i  // eslint-disable-line
// );


export default function Register() {
    const [isSetOpenSignupPage, setIsSetOpenSignupPage] = useState(false);
    const [isShowOrginizationName, setIsShowOrginizationName] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        organisation_name: "",
        password: "",
        confirmPassword: "",
        gender: "",
        country: "United States",
        Race: "",
        Enrollment: "",
        Job: "",
        Own_Business: "",
        born_usa: "",
        Mother_Education_Level: "",
        Father_Education_Level: "",
        Zip_Code: "",
        isChecked: false,
        year_of_birth: "",
        role: "",
        Randomized_ID: "",
        familyIncome: "",
        isParentsGraduate: ""
    });

    const dispatch = useDispatch()
    const history = useHistory()

    const validEmailRegex = RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i  // eslint-disable-line
    );
    // var validateAlphabate = /^[A-Za-z]+$/;
    var validationPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
    const [emailValidError, setEmailValidateErr] = useState("");
    const [submitted, setSubmitted] = useState(false); /* eslint-disable-line*/
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordSameError, setPasswordSameError] = useState(false);
    const [orginizationName, setOrginizationName] = useState("");
    // const [code, setCode] = useState("")
    const [step, setStep] = useState(1)
    const [domainError , setDomainError] = useState("")
    const emailExistErr = useSelector((state) => state.authReducer.emailExistErr)

    const nextClick = () => {

        authServices.emailExist(formData.email).then((data) => {

            if (data.status === 200) {
                dispatch(emailExist(false))
                if ((!emailValidError && !domainError && formData.password.length > 0 && formData.password === formData.confirmPassword && !passwordError && !emailExistErr)) {
                    setStep(step + 1)
                }
            } else if (data.status === 422) {
                dispatch(emailExist(true))
            }
        })
    }

    const previousClick = () => {
        setStep(step - 1)
    }
    
    // const handleClickSignUP = (type) => {
    //     setIsShowOrginizationName(type)
    //     setIsSetOpenSignupPage(true)
    //     if (type === "Student" || type === "Organization") {
    //         setFormData({
    //             ...formData,
    //             role: type,
    //         })
    //     }
    // }

    useEffect(() => {
        let email = sessionStorage.getItem("email");
        let isLogin = sessionStorage.getItem("isLogin");
        if (email && isLogin) {
            history.push(Paths.upgradeDashboard);
        }
    }, []) /* eslint-disable-line*/

    // const handleClickOnVerify = (e, code) => {
    //     e.preventDefault()
    //     authServices.userSignInWithCode(code).then((data) => {
    //         if (data.data.status === 200) {
    //             dispatch(showNotification(true, data.data.message, "success"))

    //             setIsShowOrginizationName("orginization")

    //         } else if (data.data.status === 422) {
    //             dispatch(showNotification(true, data.data.message ? data.data.message : "Something went wrong, please try again"))
    //         }
    //     })
    // }

    useEffect(()=>{
        setDomainError("")
        setIsShowOrginizationName(false)
    },[])

    const handleInputEmail = (e) => {
        const { name, value } = e.target;
        var emailValidError;
        let UDC = false
        if (name === "email") {
            if (value.includes("@")) {
                
                let [, UDCDomain] = value.split("@")
                // !UDCDomain.includes("udc.edu") ? setDomainError("Please use your school email, e.g., Johndoe@udc.edu") : setDomainError("")
                if (UDCDomain.toLocaleLowerCase().includes("udc")) {
                    UDC = true
                }
                else {
                    UDC = false
                }

            }
            emailValidError = validEmailRegex.test(value)
                ? ""
                : "Email is not valid!";
            setEmailValidateErr(emailValidError);
            setFormData({
                ...formData,
                email: value,
                UDC
            });
            // setEmail(value);
        }
    };
    //   handle submit sign up
    const doUserSignUp = (e) => {
        setSubmitted(true)
        e.preventDefault();
        var isValidate = false;
        var user = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            password: formData.password,
            organisation_name: formData.organisation_name,
            gender: formData.gender,
            race: formData.Race,
            enrollment: formData.Enrollment,
            job: formData.Job,
            own_business: formData.Own_Business,
            mother_education_level: formData.Mother_Education_Level,
            father_education_level: formData.Father_Education_Level,
            zipcode: formData.Zip_Code,
            born_in_usa: formData.born_usa,
            year_of_birth: formData.year_of_birth,
            random_id: formData.Randomized_ID,
            udc_user: formData.UDC,
            family_income: formData.familyIncome,
            parents_graduation: formData.isParentsGraduate
        };

        var form_data = new FormData();
        for (var key in user) {
            form_data.append(`user[${key}]`, user[key])
        }
        // form_data.append(`code`, code)
        if (formData.password === formData.confirmPassword) {
            setTimeout(() => {
                if (!isValidate && !emailValidError && !passwordError && formData.isChecked) {
                    setDisableSubmit(true);
                    authServices.userSignUp(form_data).then(
                        (data) => {

                            dispatch(showNotification(true, "Registered successfully. Please login to continue", "success"))
                            sessionStorage.removeItem("emailExistErr");
                            setTimeout(() => {

                                history.push({ pathname: '/login', state: { login_type: formData.udc_user ? "UDC" : "Assessment" } });//new Change on 23_02_22
                                setIsSetOpenSignupPage(false)
                                setStep(1)
                                setFormData({
                                    ...formData,
                                    firstName: "", lastName: "", email: "", organisation_name: "", dob: "", password: "", confirmPassword: "",
                                    school: "", gender: "", mobile: "", country: "United States", Race: "", Enrollment: "",
                                    Job: "", Own_Business: "", born_usa: "", Mother_Education_Level: "", Father_Education_Level: "", Zip_Code: "",
                                    isChecked: false, age: "", year_of_birth: ""
                                })
                                setSubmitted(false)
                            }, 3000);


                        },
                        (error) => {

                            if (error.status === 422) {
                                sessionStorage.setItem("emailExistErr", true)
                            }

                            error.status !== 422
                                &&
                                dispatch(showNotification(true, error.messages ? error.messages : "Something went wrong, please try again ", "Failure"))
                            setDisableSubmit(false);
                        }
                    );
                }
            }, 100);
        } else {
            setPasswordSameError(true)
        }
    };


    const handleInputChangePassword = (e) => {
        const { name, value } = e.target;
        // var passwordValidError;
        if (name === "password") {
            setFormData({
                ...formData,
                password: value,
            });
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

    const handleConfirmPassword = (e) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            confirmPassword: value,
        });
    }


    const raceOptions = ["Select", "White", "Black or African American", "American Indian or Alaska Native", "Asian or Asian American", "Native Hawaiian or Other Pacific Islander", "Mixed Race", "Prefer not to respond"]

    const enrolmentOptions = ["Select", "High school student", "College Freshman", "College Sophomore", "College Junior", "College Senior", "Graduate school (MS, MA, JD, MBA, MD, Ph.D.)"]

    const jobOptions = ["Select", "Internship", "Employed Full-Time", "Employed Part-time", "Not working"]

    const eduOptions = ["Select", "12th grade or less", "High school graduate or GED", "Some college/AA degree/Technical school training", "College graduate (BA or BS)", "Graduate school degree: Master’s or Doctorate degree (MD, PhD, JD)", "DK/NA"]

    const isBusiness = ["Select", "I currently own a business", "I plan to start a business in the next 5 years", "N/A"]

    const genderOptions = ["Select", "Female", "Male", "Non-binary", "Prefer not to respond"]
    const businessPlanOptions = ["Select", "Yes", "No"]
    const bornOption = ["Select", "Yes", "No", "N/A"]
    // console.log(formData);


    // const handleLogin = (type) => {
    //     history.push({ pathname: '/login', state: { login_type: type } })
    // }



    return (
        <div className="register-page register-full-background">
            {
                <>
                    <div className="register-page-header">
                        <HeaderRegister btnText={"Login to my Account"} handleClickHeaderBtn={() => history.push("/login")} handleRegisterTrue={(res) => {
                            setIsSetOpenSignupPage(res)
                        }} isSetOpenSignupPage={isSetOpenSignupPage} />
                    </div>

                    <div className="register-page-content-area">
                        <Grid className="flex-100">
                            <Grid.Row className="account-bg vt-center">

                                <Grid.Column computer={8} mobile={16} tablet={16} className="register-left-content">
                                    <Image src={betterNew} className="image-register" />
                                </Grid.Column>

                                <>
                                    <Grid.Column computer={8} mobile={16} tablet={16} style={{ display: 'grid', alignItems: 'center' }}
                                        className='register-progress'>

                                        <ProgressBar
                                            filledBackground="green"
                                            percent={step === 1 ? 0 : 100}
                                        >
                                            <Step transition="scale">
                                                {({ accomplished, index }) => (
                                                    <div
                                                        className={`transitionStep ${accomplished ? "accomplished" : null} ${step === 2 && "greenClass"}`}
                                                    >
                                                        <span> {step === 1 ? "1" : <img src={check2} alt="" width="15px" />}</span>
                                                    </div>
                                                )}
                                            </Step>
                                            <Step transition="scale">
                                                {({ accomplished, index }) => (
                                                    <div
                                                        className={`transitionStep ${accomplished ? "accomplished" : null}`}
                                                    >
                                                        <span>2</span>
                                                    </div>
                                                )}
                                            </Step>
                                        </ProgressBar>

                                        {step === 1 ? <Step1 nextClick={nextClick} isShowOrginizationName={isShowOrginizationName} setOrginizationName={() => setOrginizationName} formData={formData} orginizationName={orginizationName} submitted={submitted} setFormData={setFormData} handleInputEmail={handleInputEmail} emailValidError={emailValidError} setPasswordSameError={setPasswordSameError} handleInputChangePassword={handleInputChangePassword} handleConfirmPassword={handleConfirmPassword} passwordSameError={passwordSameError} passwordError={passwordError} disableSubmit={disableSubmit} handleInputOnBlur={handleInputOnBlur} domainError={domainError} /> :

                                            <Step2 nextClick={nextClick} formData={formData} orginizationName={orginizationName} submitted={submitted} setFormData={setFormData} disableSubmit={disableSubmit} doUserSignUp={doUserSignUp} PhoneInputField={PhoneInputField} raceOptions={raceOptions} enrolmentOptions={enrolmentOptions} jobOptions={jobOptions} isBusiness={isBusiness} eduOptions={eduOptions} previousClick={previousClick} isShowOrginizationName={isShowOrginizationName} setOrginizationName={() => setOrginizationName}
                                                bornOption={bornOption}
                                                genderOptions={genderOptions} businessPlanOptions={businessPlanOptions} />}
                                    </Grid.Column>

                                </>
                                {/* {isSetOpenSignupPage && (isShowOrginizationName === "Organization" || isShowOrginizationName === "Student") ?
                                    <>
                                        <Grid.Column computer={8} mobile={16} tablet={16} style={{ display: 'grid', alignItems: 'center' }}
                                            className='register-progress'>

                                            <ProgressBar
                                                filledBackground="green"
                                                percent={step === 1 ? 0 : 100}
                                            >
                                                <Step transition="scale">
                                                    {({ accomplished, index }) => (
                                                        <div
                                                            className={`transitionStep ${accomplished ? "accomplished" : null} ${step === 2 && "greenClass"}`}
                                                        >
                                                            <span> {step === 1 ? "1" : <img src={check2} alt="" width="15px" />}</span>
                                                        </div>
                                                    )}
                                                </Step>
                                                <Step transition="scale">
                                                    {({ accomplished, index }) => (
                                                        <div
                                                            className={`transitionStep ${accomplished ? "accomplished" : null}`}
                                                        >
                                                            <span>2</span>
                                                        </div>
                                                    )}
                                                </Step>
                                            </ProgressBar>

                                            {step === 1 ? <Step1 nextClick={nextClick} isShowOrginizationName={isShowOrginizationName} setOrginizationName={() => setOrginizationName} formData={formData} orginizationName={orginizationName} submitted={submitted} setFormData={setFormData} handleInputEmail={handleInputEmail} emailValidError={emailValidError} setPasswordSameError={setPasswordSameError} handleInputChangePassword={handleInputChangePassword} handleConfirmPassword={handleConfirmPassword} passwordSameError={passwordSameError} passwordError={passwordError} disableSubmit={disableSubmit} handleInputOnBlur={handleInputOnBlur} /> :


                                                <Step2 nextClick={nextClick} formData={formData} orginizationName={orginizationName} submitted={submitted} setFormData={setFormData} disableSubmit={disableSubmit} doUserSignUp={doUserSignUp} PhoneInputField={PhoneInputField} raceOptions={raceOptions} enrolmentOptions={enrolmentOptions} jobOptions={jobOptions} isBusiness={isBusiness} eduOptions={eduOptions} previousClick={previousClick} isShowOrginizationName={isShowOrginizationName} setOrginizationName={() => setOrginizationName}
                                                    bornOption={bornOption}
                                                    genderOptions={genderOptions} businessPlanOptions={businessPlanOptions} />}
                                        </Grid.Column>

                                    </>
                                    :

                                    isSetOpenSignupPage && (isShowOrginizationName === "code") ? <Grid.Column computer={8} mobile={16} tablet={16} className="register-content-sec" style={{ margin: "auto", padding: "100px 0" }}>
                                        <div className="sign-page-filter code-page">

                                            <div className="code-input-box">
                                                <Header as="h2" textAlign="center">
                                                    Enter Your Code
                                                </Header>
                                                <p>Please enter a unique code provide by school/ college</p>
                                                <div className="input-code">
                                                    <div className="mb-10">
                                                        <Form.Input
                                                            fluid
                                                            placeholder='6-digit code'
                                                            value={code}
                                                            onChange={(e) => setCode(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                    <Button
                                                        className="primary-btn login-btn"
                                                        onClick={((e) => handleClickOnVerify(e, code))}
                                                        // disabled={disableSubmit}
                                                        style={{ marginTop: 20 }}
                                                    >Verify code</Button>
                                                </div>
                                            </div>
                                        </div>

                                    </Grid.Column> 
                                    : 
                                    <Grid.Column computer={8} mobile={16} tablet={16} className="register-content-sec">
                                        <div className={'center-align register-inner-sec'}>
                                            <div className={'sub-center-align'}>
                                                <Header as='h2' textAlign="center" className='m-0'>
                                                    Register
                                                </Header>
                                                <div className="select-register-btn active-btn-register" onClick={() => handleClickSignUP("Student")}>
                                                    <p style={{ color: "#fff" }}>Student</p>
                                                </div>
                                                <div className="select-register-btn" onClick={() => handleClickSignUP("Organization")} >
                                                    <p>School / Organization</p>
                                                </div>
                                                <div className="horigetail-line-register"></div>
                                                <div className="select-register-have-code" onClick={() => handleClickSignUP("code")}>
                                                    <p>I have a code</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="login-footer">
                                            <span style={{ textAlign: 'center' }} className='txt-12'>
                                                Already have an account?
                                                <Link
                                                    // to="/login"
                                                    onClick={() => handleLogin("Assessment")}
                                                    className="lbl_href"
                                                    style={{ color: "#1b75bc", fontWeight: 600, marginLeft: 3 }}
                                                >
                                                    Login Here
                                                </Link>
                                            </span>
                                        </div>
                                    </Grid.Column>
                                } */}
                            </Grid.Row>
                        </Grid>
                    </div>
                </>
            }
            <Footer />
        </div>
    );
}
