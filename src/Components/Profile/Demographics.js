import React, { useState} from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Grid, Form } from "semantic-ui-react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from 'react-redux';
import {  userUpdateProfile } from '../../Actions/ProfileAction';
import '../Register/register.scss';
import { showNotification } from "../../Actions/componentActions";
import "react-datepicker/dist/react-datepicker.css";
// var validateAlphabate = /^[A-Za-z]+$/;

export default function Demographics({ formData, setFormData, avatarPath  , setOpen ,setUserName}) {
    const dispatch = useDispatch()
    const [submitted, setSubmitted] = useState(false); /* eslint-disable-line*/
    // const [avatarPath, setAvatarPath] = useState("");
    // const validEmailRegex = RegExp(
    //     /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i  // eslint-disable-line
    // );
    // var validationPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
   
    const genderOptions = ["Select", "Female", "Male", "Other", "N/A"]

    const doUserProfileUpdate = (e) => {
        e.preventDefault();
        // var isValidate = false;
        var user = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            username: formData.userName,
            gender: formData.gender,
            avatar: avatarPath,
            race: formData.Race,
            enrollment: formData.Enrollment,
            job: formData.Job,
            own_business: formData.Own_Business,
            mother_education_level: formData.Mother_Education_Level,
            father_education_level: formData.Father_Education_Level,
            zipcode: formData.Zip_Code,
            born_in_usa: formData.born_usa,
            year_of_birth: formData.year_of_birth
        };
        var form_data = new FormData();
        for (var key in user) {
            form_data.append(`user[${key}]`, user[key])
        }
        dispatch(userUpdateProfile(form_data))
            .then(
                (data) => {
                    if (data) {
                        // sessionStorage.setItem("profileImage", data.payload.data.user.user_image)
                        dispatch(showNotification(true, data.payload.message ? data.payload.message : "Successful !!!", "success"))
                    }
                },
                (error) => {
                    console.log("error.response.status", error);
                }
            );
        setOpen(false)
    };
    /**Data */
    const raceOptions = ["Select", "White", "Black or African American", "American Indian or Alaska Native", "Asian", "Native Hawaiian or Other Pacific Islander", "Other"]
    const enrolmentOptions = ["Select", "High school student", "College Freshman", "College Sophomore", "College Junior", "College Senior", "Graduate school (MS, MA, JD, MBA, MD, Ph.D.)"]
    const jobOptions = ["Select", "Full-Time", "Part-Time", "Not-Working", "Internship"]
    const eduOptions = ["Select", "12th grade or less", "High school graduate or GED", "Some college/AA degree/Technical school training", "College graduate (BA or BS)", "Graduate school degree: Master’s or Doctorate degree (MD, PhD, JD)", "DK/NA"]
    const bornOption = ["Select", "Yes", "No", "N/A"]
    const isBusiness = ["Select", "I currently own a business", "I plan to start a business in the next 5 years", "N/A"]

    const Yearofbirthoption = () => {
        var year = [];
        for (let i = 1947; i <= 2010; i++) {
            year.push(<option key={i} value={i}>{i}</option>)
        }
        return year;
    }
    const form2 = () => {
        return <div>
            <div className="profile-popup-page-form h-100">
                <div style={{ width: "100%", margin: "auto" }}>

                    <Form.Group widths='equal'>

                    </Form.Group>
                    <Form.Group widths="equal">
                        <div className='field'>
                            <label >Gender <span style={{ color: "red" }}>*</span></label>
                            <select name="gender" id="gender" required placeholder="Select Gender" value={formData.gender} onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    gender: e.target.value
                                })
                            }} error={
                                submitted && !formData.gender
                                    ? true
                                    : false
                            }
                                style={{ marginBottom: 8 }}>

                                {genderOptions.map((option) => {
                                    return <option value={option === 'Select' ? '' : option}>{option}</option>
                                })}

                            </select>
                        </div>

                        <div className='field'>
                            <label>Year of birth<span style={{ color: "red" }}>*</span></label>
                            <select name="age" id="age" required placeholder="Select year" value={formData.year_of_birth} onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    year_of_birth: e.target.value
                                })
                            }} error={
                                submitted && !formData.year_of_birth
                                    ? true
                                    : false
                            }
                                style={{ marginBottom: 8 }}>


                                <option value={""}>Select</option>
                                {Yearofbirthoption()}

                            </select>

                        </div>
                        <div className='field'>
                            <label htmlFor="">Race <span style={{ color: "red" }}>*</span></label>
                            <select name="Race" id="Race" required placeholder="Select Race" value={formData.Race} onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    Race: e.target.value
                                })
                            }} error={
                                submitted && !formData.Race
                                    ? true
                                    : false
                            }
                                 style={{ marginBottom: 8 }}>

                                {raceOptions.map((option) => {
                                    return <option value={option === 'Select' ? '' : option}>{option}</option>
                                })}
                            </select>
                        </div>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <div className='field'>
                            <label htmlFor="">Zip Code <span style={{ color: "red" }}>*</span></label>
                            <input placeholder='Zip Code'
                                onChange={(e) => {
                                    const re = /^[0-9]+$/;
                                    if (e.target.value === "" || re.test(e.target.value)) {
                                        setFormData({
                                            ...formData,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                }}
                                error={
                                    submitted && !formData.Zip_Code
                                        ? true
                                        : false
                                }
                                value={formData.Zip_Code}
                                name="Zip_Code"
                                selection
                                style={{ marginBottom: 8 }}
                                required />

                        </div>
                        <div className='field'>
                            <label htmlFor="">Were you born in the US? <span style={{ color: "red" }}>*</span></label>
                            <select name="born_usa" id="born_usa" placeholder="" onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    born_usa: e.target.value
                                })
                            }}
                                error={
                                    submitted && !formData.born_usa
                                        ? true
                                        : false
                                }
                                value={formData.born_usa}
                                style={{ marginBottom: 8 }}
                                required>

                                {bornOption.map((option) => {
                                    return <option value={option === 'Select' ? '' : option}>{option}</option>
                                })}
                            </select>
                        </div>
                        <div className='field'>
                            <label htmlFor="">Enrollment Status <span style={{ color: "red" }}>*</span></label>
                            <select name="Enrollment" id="Enrollment" placeholder="Select Enrolment" onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    Enrollment: e.target.value
                                })
                            }}
                                error={
                                    submitted && !formData.Enrollment
                                        ? true
                                        : false
                                }
                                value={formData.Enrollment}
                                style={{ marginBottom: 8 }}
                                required>

                                {enrolmentOptions.map((option) => {
                                    return <option value={option === 'Select' ? '' : option}>{option}</option>
                                })}
                            </select>

                        </div>
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <div className='field'>
                            <label htmlFor="">Work Status<span style={{ color: "red" }}>*</span></label>
                            <select placeholder='Select Job'
                                fluid
                                search
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        Job: e.target.value
                                    })
                                }}
                                error={
                                    submitted && !formData.Job
                                        ? true
                                        : false
                                }
                                value={formData.Job}
                                name="Job"
                                selection
                                style={{ marginBottom: 8 }}
                                options={jobOptions}
                                required>

                                {jobOptions.map((option) => {
                                    return <option value={option === 'Select' ? '' : option}>{option}</option>
                                })}
                            </select>

                        </div>

                        <div className='field'>
                            <label htmlFor="">Business Ownership <span style={{ color: "red" }}>*</span></label>
                            <select placeholder='Business Ownership'
                                fluid
                                search
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        Own_Business: e.target.value
                                    })
                                }}
                                error={
                                    submitted && !formData.Own_Business
                                        ? true
                                        : false
                                }
                                value={formData.Own_Business}
                                name="Business Ownership"
                                selection
                                style={{ marginBottom: 8 }}
                                options={isBusiness}
                                required>

                                {isBusiness.map((option) => {
                                    return <option value={option === 'Select' ? '' : option}>{option}</option>
                                })}
                            </select>
                        </div>
                        <div className='field'>
                            <label htmlFor="">Mother's Education <span style={{ color: "red" }}>*</span></label>
                            <select placeholder="Mother's Education"
                                fluid
                                search
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        Mother_Education_Level: e.target.value
                                    })
                                }}
                                error={
                                    submitted && !formData.Mother_Education_Level
                                        ? true
                                        : false
                                }
                                value={formData.Mother_Education_Level}
                                name="Mother Edu Level"
                                selection
                                style={{ marginBottom: 8 }}
                                required>

                                {eduOptions.map((option) => {
                                    return <option value={option === 'Select' ? '' : option}>{option}</option>
                                })}
                            </select>

                        </div>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <div className='field'>
                            <label htmlFor="">Father's Education <span style={{ color: "red" }}>*</span></label>
                            <select placeholder="Father's Education"
                                fluid
                                search
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        Father_Education_Level: e.target.value
                                    })
                                }}
                                error={
                                    submitted && !formData.Father_Education_Level
                                        ? true
                                        : false
                                }
                                value={formData.Father_Education_Level}
                                name="Father Edu Level"
                                selection
                                style={{ marginBottom: 8 }}
                                options={eduOptions}
                                required>

                                {eduOptions.map((option) => {
                                    return <option value={option === 'Select' ? '' : option}>{option}</option>
                                })}
                            </select>
                        </div>
                        <div className='field'></div>
                        <div className='field'></div>
                    </Form.Group >
                </div>
                <div style={{ width: '70%', margin: '0 auto 0 auto', textAlign: 'center' }}>

                </div>

            </div>

        </div>

    }
    return (
        <div className="" >
            <Grid className='h-100'>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <div className="main-content h-100">
                            <div className='h-100'>
                                <Grid className='h-100'>
                                    <Grid.Row className='vt-align-center'>
                                        <Grid.Column computer={16} mobile={16} tablet={16}>
                                            <Form className='' onSubmit={(e) => doUserProfileUpdate(e)}>
                                                <Grid>

                                                    <Grid.Row className='vt-align-center'>

                                                        <Grid.Column computer={16} mobile={16} tablet={16} className='h-100'>
                                                            {form2()}
                                                        </Grid.Column>
                                                    </Grid.Row>

                                                </Grid>
                                                <Grid.Column computer={16} mobile={16} tablet={16}>
                                                    <div style={{ width: '100%', textAlign: 'center', padding: '0 0 0px 0' }}>
                                                        <Button
                                                            className="next-button profile-btn"
                                                        >
                                                            Update
                                                        </Button>
                                                    </div>
                                                </Grid.Column>
                                            </Form>
                                        </Grid.Column>

                                    </Grid.Row>
                                </Grid>
                            </div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
}