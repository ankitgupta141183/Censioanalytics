import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Grid, Form } from "semantic-ui-react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from 'react-redux';
import { userUpdateProfile } from '../../Actions/ProfileAction';
import '../Register/register.scss';
// import { useHistory } from "react-router-dom";
import { showNotification } from "../../Actions/componentActions";
import "react-datepicker/dist/react-datepicker.css";
// var validateAlphabate = /^[A-Za-z]+$/;
export default function SettingProfile({ formData, setFormData, avatarPath, setName, setOpen, setUserName, getUserDetail }) {
    // const history = useHistory()
    const dispatch = useDispatch()
    const [submitted, setSubmitted] = useState(false); /* eslint-disable-line*/
    // const validEmailRegex = RegExp(
    //     /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i  // eslint-disable-line
    // );
    // var validationPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
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

        setUserName(`${formData.firstName} ${formData.lastName}`)

        dispatch(userUpdateProfile(form_data))
            .then(
                (data) => {
                    if (data) {
                        sessionStorage.setItem("userName", `${data.payload.data.user.first_name} ${data.payload.data.user.last_name}`)
                        setTimeout(() => {
                            getUserDetail()
                        }, 2000);
                        dispatch(showNotification(true, data.payload.message ? data.payload.message : "Successful !!!", "success"))
                        // sessionStorage.setItem("profileImage", data.payload.data.user.user_image)
                        setFormData({
                            ...formData, firstName: data.payload.data.user.first_name,
                            lastName: data.payload.data.user.last_name,
                            userName: data.payload.data.user.username ? data.payload.data.user.username : "",
                            mobile: data.payload.data.user.mobile,
                            city: data.payload.data.user.city,
                            state: data.payload.data.user.state,
                            Race: data.payload.data.user.race,
                            Enrollment: data.payload.data.user.enrollment,
                            Job: data.payload.data.user.job,
                            Own_Business: data.payload.data.user.own_business,
                            Mother_Education_Level: data.payload.data.user.mother_education_level,
                            Father_Education_Level: data.payload.data.user.father_education_level,
                            Zip_Code: data.payload.data.user.zipcode,
                            email: data.payload.data.user.email,
                            gender: data.payload.data.user.gender,
                            age: data.payload.data.user.age,
                            born_usa: data.payload.data.user.born_in_usa,
                            year_of_birth: data.payload.data.user.year_of_birth
                        })
                    }

                },
                (error) => {
                    console.log("error.response.status", error);
                }
            );
        setOpen(false)

    };
    const form1 = () => {
        return <div className="profile-popup-page-form h-100" style={{ marginTop: '0' }}>
            <div>

                <Form.Group widths='equal'>
                    <div className='field'>
                        <label htmlFor=""> First Name <span style={{ color: "red" }}>*</span></label>
                        <input placeholder='First Name'
                            maxLength={12}
                            type="text"
                            onChange={(e) => {
                                const re = /^[a-zA-Z\s]*$/;
                                if (e.target.value === "" || re.test(e.target.value)) {
                                    setFormData({
                                        ...formData,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            }}
                            value={formData.firstName}
                            name="firstName"

                            required={true}
                            selection
                            style={{ marginBottom: 2 }}
                        />

                    </div>
                    <div className='field'>
                        <label htmlFor=""> Last Name <span style={{ color: "red" }}>*</span></label>
                        <input placeholder='Last Name'
                            maxLength={12}
                            name="lastName"
                            onChange={(e) => {
                                const re = /^[a-zA-Z\s]*$/;
                                if (e.target.value === "" || re.test(e.target.value)) {
                                    setFormData({
                                        ...formData,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            }}
                            value={formData.lastName}
                            required={true}
                            selection
                            style={{ marginBottom: 2 }}
                        />

                    </div>
                </Form.Group>

                <Form.Group widths='equal'>
                    <div className='field'>
                        <label>Username <span style={{ color: "red" }}>*</span></label>
                        <Form.Group widths='equal'>
                            <Form.Input
                                fluid
                                placeholder='UserName'
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        userName: e.target.value,
                                    });
                                }}
                                value={formData.userName}
                                name="userName"
                                error={
                                    (submitted && !formData.userName)
                                        ? true
                                        : false
                                }
                            />
                        </Form.Group>
                    </div>
                    <div className='field'>
                        <label>Email <span style={{ color: "red" }}>*</span></label>
                        <Form.Group widths='equal'>
                            <input fluid
                                placeholder='Email'
                                type="email"
                                value={formData.email}
                                name="email"
                                required={true}
                                style={{ marginBottom: 0, backgroundColor: "#e1e0e0", cursor: "none" }}

                            />
                        </Form.Group>
                    </div>
                </Form.Group>

                <Form.Group widths='equal'>
                    <div className='field'>
                        <label>Randomized ID <span style={{ color: "red" }}>*</span></label>
                        <Form.Group widths='equal'>
                            <input fluid
                            maxLength={12}
                            minLength={10}
                                placeholder='XXXX XXXX XXXX'
                                // type="email"
                                value={formData.Randomized_ID}
                                name="Randomized_ID"
                                required={true}
                                readOnly={true}
                                style={{ marginBottom: 0, backgroundColor: "#e1e0e0", cursor: "none" }}

                            />
                        </Form.Group>
                    </div>
                </Form.Group>
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
                                                            {form1()}
                                                        </Grid.Column>

                                                    </Grid.Row>

                                                </Grid>
                                                <Grid.Column computer={16} mobile={16} tablet={16}>
                                                    <br />
                                                    <div style={{ width: '100%', textAlign: 'center', padding: '0 0 10px 0' }}>
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