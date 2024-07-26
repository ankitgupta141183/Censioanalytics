import React, { useState } from 'react'
import { Button, Icon, Modal, Form, TextArea, Grid, Segment, Card, Image, Feed } from 'semantic-ui-react'
// import censioLogo from '../../assets/img/censio_logo.png';
import censioLogo from '../../assets//img/censio_logo.png'
import "./ContactModalPopUp.scss";
import { showNotification } from "../../Actions/componentActions";
import { useDispatch } from "react-redux";
import axios from "axios";


// import '../../Config'
var apiUrl = global.platformURI;


const ContectModalPopUp = ({ open, size, handleClose, dispatch }) => {

    const [contactData, setContactData] = useState({ firstName: "", lastName: "", email: "", message: "" })

    const textRegx = /^[a-zA-Z ]*$/
    const dispatchMassage = useDispatch()
    const handleSubmitData = (e) => {
        e.preventDefault();
        console.log("data")
        axios.get(apiUrl + `/api/v1/contact_us`, {
            params: {
                'contact[first_name]': contactData.firstName,
                'contact[last_name]': contactData.lastName,
                'contact[email]': contactData.email,
                'contact[message]': contactData.message
            }
        })
            .then(res => {
                if (res.status === 200) {
                    dispatch({ type: 'close' })
                    dispatchMassage(showNotification(true, "Thanks for contacting us! We will be in touch with you shortly", "success"))

                } else {
                    dispatchMassage(showNotification(true, "Something went wrong!"))
                    dispatch({ type: 'close' })

                }
                setContactData({ firstName: "", lastName: "", email: "", message: "" })
            })

    }

    const handleChange = (e) => {
        setContactData({
            ...contactData,
            [e.target.name]: e.target.value,
        })

    }

    console.log("contactData:", contactData)

    return (
        <>

            <Modal
                size={size}
                open={open}
                onClose={handleClose}
                closeIcon
            >
                <div className='modal-padding'>
                    <Grid columns='equal'>
                        <Grid.Row>
                            <Grid.Column  >
                                <Modal.Header>
                                    <h6>Send Us A message</h6>
                                    <hr />
                                </Modal.Header>
                                <Form onSubmit={(e) => { handleSubmitData(e) }} >
                                    <Modal.Content>
                                        <div className='section-padding'>

                                            <Form.Group widths='equal'>
                                                <Form.Input fluid
                                                    required={true} placeholder='First name'
                                                    name='firstName'
                                                    value={contactData.firstName}
                                                    onChange={(e) => { handleChange(e) }}
                                                />
                                                <Form.Input fluid
                                                    name='lastName'
                                                    required={true} placeholder='Last name'
                                                    value={contactData.lastName}
                                                    onChange={(e) => { handleChange(e) }}

                                                />
                                            </Form.Group>
                                            <Form.Input fluid
                                                value={contactData.email}
                                                onChange={(e) => { handleChange(e) }}
                                                name='email'
                                                type='email' required={true} placeholder='Email' />

                                            <Form.Field
                                                className='form-textarea-control-opinion'
                                                control={TextArea}
                                                name='message'
                                                value={contactData.message}
                                                onChange={(e) => { handleChange(e) }}
                                                required={true}
                                                // label='message'
                                                placeholder='Type your message here...'
                                            />

                                        </div>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <div className='text-right'>
                                            <Button primary type='submit' >
                                                Submit
                                            </Button>
                                        </div>
                                    </Modal.Actions>
                                </Form   >
                            </Grid.Column>
                            <Grid.Column mobile={16} tablet={16} computer={6} >
                                <Modal.Header>
                                    <h6>Contact Details</h6>
                                    <hr />
                                </Modal.Header>
                                <div className='section-padding-second'>
                                    <div>
                                        <Image src={censioLogo} wrapped ui={false} />
                                        <Card.Content>
                                            <Card.Header>Email Us</Card.Header>
                                            <p>sangeeta.badal@censioanalytics.com</p>

                                            {/* <Card.Header>Mailing Address</Card.Header> */}

                                            {/* <Feed.Summary>
                                                F-21, first floor, treasure Island, MG road, indore, Indore, Madhya Pradesh 452001
                                              
                                                </Feed.Summary>
                                             */}
                                        </Card.Content>
                                    </div>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </Modal>
        </>
    )
}

export default ContectModalPopUp
