import React, { useState } from "react";
import { Form, Radio, Button, Icon } from 'semantic-ui-react'
import './AssessmentUserCollegeStatus.scss'
import { useHistory } from "react-router-dom";
import { sendCollegeStatus } from '../../../Services/AssessementQuestionsServices'
const AssessmentUserCollegeStatus = ({isHeaderManu}) => {
    const [userStatus, setUserStatus] = useState('')
    const userStatusLabels = ['I am currently in college', 'I have completed college', 'I dropped out of college', 'None of the above']
    const history = useHistory()
    const handleChange = (e, items) => {
        setUserStatus(items)
    }
    const handleRedirect = () => {
        handleCollegeStatus(userStatus)
        history.push(`/assessment-questions-list/${sessionStorage.getItem("questionUuid")}`)
    }
    const handleCollegeStatus = (payload) => {
        sendCollegeStatus(payload)
    }
    return (
        <>
            <main
                className="talwind-dashboard max-w-xs mx-auto pt-24 pb-20 flex flex-col gap-6 w-full transition-all duration-300 sm:max-w-[420px] md:max-w-[calc(100vw-80px)] md:pl-16"
            >
                <div
                    id="main_section"
                    className={isHeaderManu ? "flex flex-col gap-6 transition-all duration-30 md:w-[72%] lg:w-[79%] xl:w-[84.5%] 2xl:w-[86.5%] 3xl:w-[90%] md:ml-auto md:w-full lg:w-full xl:w-full 2xl:w-full 3xl:w-full"
                        : "flex flex-col gap-6 transition-all duration-30 md:w-[72%] lg:w-[79%] xl:w-[84.5%] 2xl:w-[86.5%] 3xl:w-[90%] md:ml-auto"}
                >
                    <div className="user-status-container">
                        <Form className="user-status_form">
                            <Form.Field className="user-status_form-header">
                                <b>Question 1: Please select from the following-</b>
                            </Form.Field>
                            <Form.Field className="user-status_form-options">
                                {
                                    userStatusLabels.map((items, index) => {
                                        return <div key={index} className="user-status_form-labels">
                                            <Radio
                                                label={items}
                                                name='radioGroup'
                                                value={items}
                                                required={true}
                                                checked={userStatus === items}
                                                onChange={(e) => { handleChange(e, items) }}
                                            />
                                        </div>
                                    })
                                }
                            </Form.Field>
                            {
                                userStatus &&
                                <div style={{ textAlign: "center" }}>

                                    <Button
                                        className="yellow-button"
                                        onClick={handleRedirect}
                                    >
                                        <Icon name="arrow right" style={{ margin: '0' }} /> Next
                                    </Button>
                                </div>
                            }

                        </Form>
                    </div>
                </div>
            </main>

        </>
    )
}
export default AssessmentUserCollegeStatus;