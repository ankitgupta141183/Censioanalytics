import React from 'react';
import "semantic-ui-css/semantic.min.css";
import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Button, Form } from "semantic-ui-react";
import "react-datepicker/dist/react-datepicker.css";
import "react-step-progress-bar/styles.css";
import "../register.css";
import ProfileOptions from "../../CommonComponent/StaticData/ProfileOptions";

// const validEmailRegex = RegExp(
//     /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i  // eslint-disable-line
// );
const Step2 = ({ formData, submitted, setFormData = () => { }, disableSubmit, doUserSignUp = () => { }, raceOptions, enrolmentOptions, jobOptions, isBusiness, eduOptions, previousClick = () => { }, isShowOrginizationName, genderOptions, bornOption }) => {

    const Yearofbirthoption = () => {
        var year = [];
        for (let i = 1947; i <= 2010; i++) {
            year.push(<option key={i} value={i}>{i}</option>)
        }
        return year;
    }

    return <>
        {
            <div className="login-content-sec" style={{ alignSelf: 'center' }}>
                <Form onSubmit={(e) => doUserSignUp(e)} style={{ padding: '0 0 0px 0' }}>
                    <div className="question-register-page-form">
                        <div style={{ width: "80%", margin: "auto", padding: '25px 0 0 0' }}>
                            <Form.Group widths='equal'>
                                <div className='field'>
                                    <label htmlFor=""> First Name<span style={{ color: "red" }}>*</span></label>
                                    <input placeholder='First Name'
                                        maxLength={12}
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
                                        selection="true"
                                        style={{ marginBottom: 2 }}
                                    />

                                </div>

                                <div className='field'>
                                    <label htmlFor=""> Last Name <span style={{ color: "red" }}>*</span></label>
                                    <input placeholder='Last Name'
                                        maxLength={12}
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
                                        name="lastName"
                                        required={true}
                                        selection="true"
                                        style={{ marginBottom: 2 }}
                                    />
                                </div>
                            </Form.Group>
                            {/* <Form.Group widths='equal'>
                            <div className='field'>
                                    <label htmlFor="">Randomized ID<span style={{ color: "red" }}>*</span></label>
                                    <input placeholder='XXXX XXXX XXXX'
                                         maxLength={12}
                                         minLength={10}
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
                                            submitted && !formData?.Randomized_ID
                                                ? "true"
                                                : "false"
                                        }
                                        value={formData?.Randomized_ID}
                                        name="Randomized_ID"
                                        selection="true"
                                        style={{ marginBottom: 8 }}
                                        required />
                                </div>
                            </Form.Group> */}
                            {
                                isShowOrginizationName === "Organization" && <div className='field'>
                                    <label > Organization Name <span style={{ color: "red" }}>*</span></label>
                                    <Form.Group widths="equal">
                                        <Form.Input
                                            fluid="true"
                                            placeholder='Organization Name'
                                            value={formData.organisation_name}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                organisation_name: e.target.value
                                            })}
                                            name="orginizationName"
                                            required={true}
                                        />
                                    </Form.Group>
                                </div>
                            }
                            <Form.Group widths="equal">
                                <div className='field'>
                                    <label >Gender <span style={{ color: "red" }}>*</span></label>
                                    <select name="gender" id="gender" required placeholder="Select GEnder" value={formData.gender} onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            gender: e.target.value
                                        })
                                    }} error={
                                        submitted && !formData.gender
                                            ? "true"
                                            : "false"
                                    }
                                        style={{ marginBottom: 8 }}>

                                        {genderOptions.map((option) => {
                                            return <option value={option === 'Select' ? '' : option} key={option} >{option}</option>
                                        })}
                                    </select>
                                </div>
                                <div className='field'>
                                    <label>Year of Birth <span style={{ color: "red" }}>*</span></label>
                                    <select name="age" id="age" required placeholder="Select year" value={formData.year_of_birth} onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            year_of_birth: e.target.value
                                        })
                                    }} error={
                                        submitted && !formData.year_of_birth
                                            ? "true"
                                            : "false"
                                    }
                                        style={{ marginBottom: 8 }}>
                                        <option value={""}>Select</option>
                                        {Yearofbirthoption()}
                                    </select>
                                </div>
                            </Form.Group>

                            <Form.Group widths='equal'>

                                <div className='field'>
                                    <label htmlFor="">Race <span style={{ color: "red" }}>*</span></label>
                                    <select name="Race" id="Race" required placeholder="Select Race"
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                Race: e.target.value
                                            })
                                        }} error={
                                            submitted && !formData.Race
                                                ? "true"
                                                : "false"
                                        }
                                        value={formData.Race} style={{ marginBottom: 8 }}>

                                        {raceOptions.map((option) => {
                                            return <option value={option === 'Select' ? '' : option} key={option}>{option}</option>
                                        })}
                                    </select>
                                </div>
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
                                                ? "true"
                                                : "false"
                                        }
                                        value={formData.Zip_Code}
                                        name="Zip_Code"
                                        selection="true"
                                        style={{ marginBottom: 8 }}
                                        required />
                                </div>
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <div className='field'>
                                    <label htmlFor="">Were you born in the US? <span style={{ color: "red" }}>*</span></label>
                                    <select name="Born" id="Born" required placeholder="Select Born Country"
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                born_usa: e.target.value
                                            })
                                        }} error={
                                            submitted && !formData.born_usa
                                                ? "true"
                                                : "false"
                                        }
                                        value={formData.born_usa} style={{ marginBottom: 8 }}
                                    >
                                        {bornOption.map((option) => {
                                            return <option value={option === 'Select' ? '' : option} key={option}>{option}</option>
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
                                                ? "true"
                                                : "false"
                                        }
                                        value={formData.Enrollment}
                                        style={{ marginBottom: 8 }}
                                        required>
                                        {enrolmentOptions.map((option) => {
                                            return <option value={option === 'Select' ? '' : option} key={option}>{option}</option>
                                        })}
                                    </select>

                                </div>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <div className='field'>
                                    <label htmlFor="">Work Status <span style={{ color: "red" }}>*</span></label>
                                    <select placeholder='Select Job'
                                        fluid="true"
                                        search="true"
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                Job: e.target.value
                                            })
                                        }}
                                        error={
                                            submitted && !formData.Job
                                                ? "true"
                                                : "false"
                                        }
                                        value={formData.Job}
                                        name="Job"
                                        selection="true"
                                        style={{ marginBottom: 8 }}
                                        options={jobOptions}
                                        required>

                                        {jobOptions.map((option) => {
                                            return <option value={option === 'Select' ? '' : option} key={option}>{option}</option>
                                        })}
                                    </select>

                                </div>

                                <div className='field'>
                                    <label htmlFor="">Business Ownership <span style={{ color: "red" }}>*</span></label>
                                    <select placeholder='Business Ownership'
                                        fluid="true"
                                        search="true"
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                Own_Business: e.target.value
                                            })
                                        }}
                                        error={
                                            submitted && !formData.Own_Business
                                                ? "true"
                                                : "false"
                                        }
                                        value={formData.Own_Business}
                                        name="Business Ownership"
                                        selection="true"
                                        style={{ marginBottom: 8 }}
                                        options={isBusiness}
                                        required>

                                        {isBusiness.map((option) => {
                                            return <option value={option === 'Select' ? '' : option} key={option}>{option}</option>
                                        })}
                                    </select>
                                </div>
                            </Form.Group>
                            {/* <Form.Group widths='equal'>
                                <div className='field'>
                                    <label htmlFor="">Mother's Education <span style={{ color: "red" }}>*</span></label>
                                    <select placeholder="Mother's Education"
                                        fluid="true"
                                        search="true"
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                Mother_Education_Level: e.target.value
                                            })
                                        }}
                                        error={
                                            submitted && !formData.Mother_Education_Level
                                                ? "true"
                                                : "false"
                                        }
                                        value={formData.Mother_Education_Level}
                                        name="Mother Edu Level"
                                        selection="true"
                                        style={{ marginBottom: 8 }}
                                        required>
                                        {eduOptions.map((option) => {
                                            return <option value={option === 'Select' ? '' : option} key={option}>{option}</option>
                                        })}
                                    </select>
                                </div>
                                <div className='field'>
                                    <label htmlFor="">Father's Education <span style={{ color: "red" }}>*</span></label>
                                    <select placeholder="Father's Education"
                                        fluid="true"
                                        search="true"
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                Father_Education_Level: e.target.value
                                            })
                                        }}
                                        error={
                                            submitted && !formData.Father_Education_Level
                                                ? "true"
                                                : "false"
                                        }
                                        value={formData.Father_Education_Level}
                                        name="Father Edu Level"
                                        selection="true"
                                        style={{ marginBottom: 8 }}
                                        options={eduOptions}
                                        required>
                                        {eduOptions.map((option) => {
                                            return <option value={option === 'Select' ? '' : option} key={option}>{option}</option>
                                        })}
                                    </select>
                                </div>
                            </Form.Group > */}

                             <Form.Group widths='equal'>
                                <div className='field' style={{width: '50%'}}>
                                    <label htmlFor=""><br /> Family Income<span style={{ color: "red" }}>* </span></label>
                                    <select placeholder="Family Income"
                                        fluid="true"
                                        search="true"
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                familyIncome: e.target.value
                                            })
                                        }}
                                        error={
                                            submitted && !formData.familyIncome
                                                ? "true"
                                                : "false"
                                        }
                                        value={formData.familyIncome}
                                        name="Family Income"
                                        selection="true"
                                        style={{ marginBottom: 8 }}
                                        required>
                                        <option>Select</option>
                                        {ProfileOptions.familyOptions.map((option) => {
                                            return <option value={option === 'Select' ? '' : option} key={option}>{option}</option>
                                        })}
                                    </select>
                                </div>
                                <div className='field' style={{width: '50%'}}>
                                    <label htmlFor=""> Did either of your parents graduate from college?<span style={{ color: "red" }}>*</span></label>
                                    <select placeholder="Enter parents Graduate Status"
                                        fluid="true"
                                        search="true"
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                isParentsGraduate: e.target.value
                                            })
                                        }}
                                        error={
                                            submitted && !formData.isParentsGraduate
                                                ? "true"
                                                : "false"
                                        }
                                        value={formData.isParentsGraduate}
                                        name="Father Edu Level"
                                        selection="true"
                                        style={{ marginBottom: 8 }}
                                        options={eduOptions}
                                        required>
                                         <option>Select</option>
                                        {ProfileOptions.parentsGraduateOptions.map((option) => {
                                            return <option value={option === 'Select' ? '' : option} key={option}>{option}</option>
                                        })}
                                    </select>
                                </div>
                            </Form.Group >


                            <div className='field'>
                                <div className='d-flex'>
                                    <div className='agree-txt-input'>
                                        <input type="checkbox" id="password" className='hidden-agree-input' style={{ margin: '3px 5px 0 0', cursor: 'pointer' }} name="agree" checked={formData.isChecked} onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                isChecked: !formData.isChecked
                                            })
                                        }} />I confirm I have read Censio's <Link to="/terms" target="_blank" >T&C</Link>
                                        <span className='checkmark-agree'></span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ margin: 8 }}>
                                <span style={{ color: "red" }}>{submitted && !formData.isChecked ? "Please accept the terms and conditions" :
                                    null
                                }</span>
                            </div>
                        </div>
                        <div style={{ width: '70%', margin: '0 auto 0 auto', textAlign: 'center' }} className='buttons-div'>
                            <Button
                                className="btn-new primary-btn"
                                onClick={(e) => previousClick(e)}
                                disabled={disableSubmit}
                                type="button"
                            >
                                Previous
                            </Button>
                            <Button
                                className="btn-new primary-btn"
                                disabled={disableSubmit}
                                type="submit"
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </Form>
            </div >
        }
    </>
};

export default Step2;
