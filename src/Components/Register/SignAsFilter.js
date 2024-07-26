import React, { useState, useEffect, useRef } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Grid, Form, Image, Dropdown, Icon, Loader, Dimmer } from "semantic-ui-react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import './register.scss';
// import CommonInput from '../CustomInput/CustomInput'
import userImage from '../../assets/img/manager_profile_image.png';

import headerLogo from '../../assets/img/censio_logo.png';
import betterNew from '../../assets/img/better-new.png';
import PhoneInputField from "../CommonComponent/PhoneInputField";
import { authServices } from "../../Services/Auth";
import { Paths } from "../routes/routePaths";
import { useHistory } from "react-router-dom";
import { Country, State, City } from 'country-state-city';

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i  // eslint-disable-line
);
var validateAlphabate = /^[A-Za-z]+$/;
var validationPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
export default function SignAsFilter({ handleCloseSignUp = () => { }, isShowOrginizationName = "" }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        
    });
    const [emailValidError, setEmailValidateErr] = useState("");
    const [submitted, setSubmitted] = useState(false); /* eslint-disable-line*/
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [passwordSameError, setPasswordSameError] = useState(false);
    const [profileImage, setProfileImage] = useState("");
    const [avatarPath, setAvatarPath] = useState("");
    const hiddenFileInput = useRef();
    const history = useHistory()
    const [countryList, setCountryList] = useState([])
    const [stateList, setStateList] = useState([])
    const [cityList, setCityList] = useState([])
    const [countryCode, setCountryCode] = useState("");
    const [orginizationName, setOrginizationName] = useState("");
    const [isFirstNameError, setIsFirstNameError] = useState(false);
    const [isLastNameError, setIsLastNameError] = useState(false);
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        var tempArr = []
        Country.getAllCountries().map((item) => {
            return tempArr.push({
                key: item.isoCode,
                text: item.name,
                value: item.name
            })
        })
        // setCountryList([...tempArr])
    }, [])

    const options = [
        { key: 'm', text: 'Male', value: 'Male' },
        { key: 'f', text: 'Female', value: 'Female' },
        { key: 'o', text: 'Other', value: 'Other' },
    ]


    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleInputChangeFirstName = (event) => {
        if (event.target.value.match(validateAlphabate)) {
            setFormData({
                ...formData,
                [event.target.name]: event.target.value,
            });
            setIsFirstNameError(false)
        }
        else {
            setIsFirstNameError("Enter alphabets only.")
        }

    };

    const handleInputChangeLastName = (event) => {
        if (event.target.value.match(validateAlphabate)) {
            setFormData({
                ...formData,
                [event.target.name]: event.target.value,
            });
            setIsLastNameError(false)
        }
        else {
            setIsLastNameError("Enter alphabets only.")
        }
    };



    const handleInputEmail = (e) => {
        const { name, value } = e.target;
        var emailValidError;
        if (name === "email") {
            emailValidError = validEmailRegex.test(value)
                ? ""
                : "Email is not valid!";
            setEmailValidateErr(emailValidError);
            setFormData({
                ...formData,
                email: value,
            });
            // setEmail(value);
        }
    };

    //   handle submit sign up
    const doUserSignUp = (e) => {
        e.preventDefault();
        var isValidate = false;
        // const userObj = Object.values(formData).map((res, v) => {
        //     if (Object.values(formData)[v] === "") {
        //         setSubmitted(true);
        //         isValidate = true;
        //         return false;
        //     }
        // }); 
        var user = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            // is_private: true,
            password: formData.password,
            avatar: avatarPath
        };
        // if (orginizationName) {
        //     user = {
        //         first_name: formData.firstName,
        //         last_name: formData.lastName,
        //         email: formData.email,
        //         dob: formData.dob,
        //         city: formData.city,
        //         country: formData.country,
        //         gender: formData.gender,
        //         mobile: formData.mobile,
        //         school_name: formData.school,
        //         is_private: true,
        //         state: formData.state,
        //         organisation_name: orginizationName,
        //         password: formData.password,
        //         avatar: avatarPath
        //     };
        // }

        var form_data = new FormData();
        for (var key in user) {
            form_data.append(`user[${key}]`, user[key])
        }
        if (formData.password === confirmPassword) {
            if (!isValidate && !emailValidError && !passwordError) {
                setDisableSubmit(true);
                setIsLoading(true)
                authServices.userSignUp(form_data).then(
                    (data) => {
                        setIsLoading(false)
                        // toast.success("Registered Successfully!!!", {
                        //     position: toast.POSITION.TOP_RIGHT,
                        // });
                        setTimeout(() => {
                            history.push(Paths.LogIn);
                        }, 3000);
                    },
                    (error) => {
                        setIsLoading(false)
                        // toast.error(error.messages, {
                        //     position: toast.POSITION.TOP_RIGHT,
                        // });
                        setDisableSubmit(false);
                        console.log("error.response.status", error);
                    }
                );
            }
        } else {
            setPasswordSameError(true)
        }


    };

    const handleInputChangePassword = (e) => {
        const { name, value } = e.target;
        var passwordValidError;
        if (name === "password") {
            passwordValidError = validationPassword.test(value)
                ? ""
                : "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character";
            setPasswordError(passwordValidError);
            setFormData({
                ...formData,
                password: value,
            });
        }
    };

    const handleUploadImage = (event) => {
        setAvatarPath(event.target.files[0])

        let reader = new FileReader()
        let file = event.target.files[0]
        reader.onloadend = () => {
            setProfileImage(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const handleChangeCountry = (e, { value }) => {
        setFormData({
            ...formData,
            country: value
        })
        var selectCountryId;
        if (countryList.length > 0) {
            countryList.map((item) => {/* eslint-disable-line*/
                if (item.text === value) { /* eslint-disable-line*/
                    selectCountryId = item.key
                }
            })
            setCountryCode(selectCountryId)
            var allState = State.getStatesOfCountry(selectCountryId)
            var tempArr = []
            if (allState.length > 0) {
                allState.map((item) => {/* eslint-disable-line*/
                    tempArr.push({ /* eslint-disable-line*/
                        key: item.isoCode,
                        text: item.name,
                        value: item.name
                    })
                })
                setStateList([...tempArr])
            }
        }

    }

    const handleChangeState = (e, { value }) => {
        setFormData({
            ...formData,
            state: value
        })
        var selectStateId;
        if (stateList.length > 0) {
            stateList.map((item) => {/* eslint-disable-line*/
                if (item.text === value) { /* eslint-disable-line*/
                    selectStateId = item.key
                }
            })

            var allCity = City.getCitiesOfState(countryCode, selectStateId)
            var tempArr = []
            if (allCity.length > 0) {
                allCity.map((item) => { /* eslint-disable-line*/
                    tempArr.push({ /* eslint-disable-line*/
                        key: item.isoCode,
                        text: item.name,
                        value: item.name
                    })
                })
                setCityList([...tempArr])
            }
        }
    }


    return (
        <div >
            {/* <div className="header-div">
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Image className={'header-logo'}
                                src={headerLogo}
                                style={{paddingTop: 12}}
                            />
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Button className="close-btn" onClick={handleCloseSignUp}>
                                Close
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div> */}
            <div className="header-logobefore-login">
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={14}>
                            <Image src={headerLogo} onClick={() => history.push("/")} className="image-logo-censio-before-login" />
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <Button className="close-btn" onClick={handleCloseSignUp}>
                                <Icon name="close" />  Close
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>

            <div className="sign-filter-main">
                <div>
                    <Dimmer active={isLoading} inverted>
                        <Loader size='large' inline='centered' >
                            Loading...
                        </Loader>
                    </Dimmer>
                </div>
                {/* <CommonInput type={'text'} placeholder={"First Name"} /> */}
                <Grid>
                    <Grid.Row>
                        <Grid.Column computer={8} mobile={16} tablet={16} className="vt-center text-center">
                            <Image src={betterNew} style={{ width: "90%" }} />
                        </Grid.Column>
                        <Grid.Column computer={8} mobile={16} tablet={16} style={{ margin: "auto" }}>
                            <Form>
                                <div className="sign-page-filter">
                                    <div style={{ width: "70%" }}>
                                        <div className="image-edit">
                                            <div className="image-upload" style={{ height: "120px" }}>
                                                <Image
                                                    className="image-user"
                                                    src={profileImage ? profileImage : userImage}
                                                    style={{ height: "120px" }}
                                                />
                                            </div>

                                            <React.Fragment>
                                                <Button onClick={() => hiddenFileInput.current.click()} className="edit-button">
                                                    Upload Profile Photo
                                                </Button>
                                                <input
                                                    type="file"
                                                    ref={hiddenFileInput}
                                                    id="file-input"
                                                    name="avatarPath"
                                                    accept="image/jpeg,image/jpg"
                                                    onChange={handleUploadImage}
                                                    style={{ display: 'none' }}
                                                />
                                            </React.Fragment>
                                        </div>
                                        {
                                            isShowOrginizationName === "orginization" &&
                                            <Form.Group widths="equal">
                                                <Form.Input
                                                    fluid
                                                    placeholder='Organization Name'
                                                    onChange={(e) => setOrginizationName(e.target.value)}
                                                    value={orginizationName}
                                                    name="orginizationName"
                                                    error={
                                                        (submitted && !orginizationName)
                                                            ? true
                                                            : false
                                                    }
                                                />
                                            </Form.Group>
                                        }
                                        <Form.Group widths='equal'>

                                            <Form.Input
                                                fluid
                                                placeholder='First Name'
                                                maxLength={12}
                                                onChange={handleInputChangeFirstName}
                                                value={formData.firstName}
                                                name="firstName"
                                                error={
                                                    (submitted && !formData.firstName) || isFirstNameError
                                                        ? true
                                                        : false
                                                }
                                            />

                                            <Form.Input
                                                fluid
                                                placeholder='Last Name'
                                                maxLength={12}
                                                onChange={handleInputChangeLastName}
                                                value={formData.lastName}
                                                name="lastName"
                                                error={
                                                    (submitted && !formData.lastName) || isLastNameError
                                                        ? true
                                                        : false
                                                }
                                            />

                                        </Form.Group>
                                        {
                                            (isFirstNameError || isLastNameError) && (
                                                <div className="error-alpha-content">
                                                    <div className="error-alpha">
                                                        <p>{isFirstNameError ? isFirstNameError : ""}</p>
                                                    </div>
                                                    <div >
                                                        <p>{isLastNameError ? isLastNameError : ""}</p>
                                                    </div>
                                                </div>)
                                        }

                                        {/* <Form.Group widths='equal'> */}
                                        {/* <Form.Input
                                    type="date"
                                    label="Date of Birth"
                                    name="dob"
                                    error={
                                        submitted && !formData.dob
                                            ? true
                                            : false
                                    }
                                    placeholder="Select the date"
                                    value={formData.dob}
                                    onChange={handleInputChange}
                                    maxDate={new Date()}
                                /> */}
                            



                                        {/* </Form.Group> */}
                                        <Form.Group widths='equal'>
                                           
                                            <Form.Input
                                                fluid
                                                placeholder='Email'
                                                type="email"
                                                onChange={handleInputEmail}
                                                value={formData.email}
                                                name="email"
                                                error={
                                                    (submitted && !formData.email)
                                                        ? true
                                                        : false
                                                }
                                            />
                                            <span>{emailValidError ? emailValidError : ""}</span>
                                        </Form.Group>
                                        



                                        {/* <Form.Group widths='equal'> */}
                                        {/* <label className="label-custom">Select State</label> */}
                                       
                                        {/* <label className="label-custom">Select City</label> */}
                                      
                                        {/* <Form.Select
                                    fluid
                                    label='Select State'
                                    options={stateOptions}
                                    placeholder='Select State'
                                    onChange={(e, { value }) => {
                                        setFormData({
                                            ...formData,
                                            state: value
                                        })
                                    }}
                                    value={formData.state}
                                    name="state"
                                    error={
                                        submitted && !formData.state
                                            ? true
                                            : false
                                    }
                                />
                                <Form.Select
                                    fluid
                                    label='Select City'
                                    options={cityOptions}
                                    placeholder='Select City'
                                    onChange={(e, { value }) => {
                                        setFormData({
                                            ...formData,
                                            city: value
                                        })
                                    }}
                                    value={formData.city}
                                    name="city"
                                    error={
                                        submitted && !formData.city
                                            ? true
                                            : false
                                    }
                                /> */}
                                        {/* </Form.Group> */}


                                        <Form.Group widths='equal' style={{ marginTop: 10 }}>


                                            <Form.Input
                                                fluid
                                                type={"password"}
                                                // label='Password'
                                                placeholder="Password"
                                                value={formData.password}
                                                onKeyUp={() => setPasswordSameError(false)}
                                                name="password"
                                                error={submitted && !formData.password ? true : false}
                                                onChange={handleInputChangePassword}
                                            />
                                            <Form.Input
                                                fluid
                                                type={"password"}
                                                // label='Confirm Password'
                                                placeholder="Confirm Password"
                                                onKeyUp={() => setPasswordSameError(false)}
                                                error={
                                                    submitted && !confirmPassword
                                                        ? true
                                                        : false
                                                }
                                                value={formData.confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                        </Form.Group>

                                        <div style={{ margin: 8 }}>
                                            <span style={{ color: "red" }}>{passwordSameError ? "Password does not match" :
                                                passwordError ?
                                                    passwordError
                                                    :
                                                    null
                                            }</span>
                                        </div>
                                    </div>
                                    <div style={{ width: '70%', margin: '0 0 0 auto' }}>
                                        <Button
                                            className="next-button"
                                            onClick={doUserSignUp}
                                            disabled={disableSubmit}
                                        >
                                            Register
                                        </Button>
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
