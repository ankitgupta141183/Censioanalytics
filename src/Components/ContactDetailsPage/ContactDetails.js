import React, { useState } from "react";
// import "./ContactDetails.css"
import "./ContactDetails.scss"
import { Grid } from 'semantic-ui-react'
// import censioLogo from '../../assets//img/censio_logo.png'
// import { showNotification } from "../../Actions/componentActions";
import { showNotification } from "../../Actions/componentActions";
import { useDispatch } from "react-redux";
import { Button, Form, TextArea} from 'semantic-ui-react'
import axios from "axios";


function ContactDetails({ isUserLogged }) {
    const [contactData, setContactData] = useState({ firstName: "", lastName: "", email: "", message: "" })
    var apiUrl = global.platformURI;

    const dispatch = useDispatch()
    const handleSubmitData = (e) => {
        e.preventDefault();

        axios.get(apiUrl + `/api/v1/contact_us`, {
            params: {
                'contact[first_name]': contactData.firstName,
                'contact[last_name]': contactData.lastName,
                'contact[email]': contactData.email,
                'contact[message]': contactData.message
            }
        })
            .then(res => {
                console.log("Resoponse:", res)
                if (res.status === 200) {


                    dispatch(showNotification(true, "Thanks for contacting us! We will be in touch with you shortly", "success"))

                } else {
                    dispatch(showNotification(true, "Something went wrong!"))


                }
                setContactData({ firstName: "", lastName: "", email: "", message: "" })
            }).catch(error => {
                console.log("error:", error)
            })


    }

    const handleChange = (e) => {
        setContactData({
            ...contactData,
            [e.target.name]: e.target.value,
        })

    }

    return (
        <div>
            <section id="contact-form" class={isUserLogged ? "chat-form-user-active pt-2" : "chat-form"}>
                <div class="container" >
                    <div className='modal-padding'>
                        <Grid columns='equal' >
                            <Grid.Row>
                                <Grid.Column>
                                    <div class={isUserLogged ? "form bg-white dark:bg-[#212121]" : "form"}>
                                        <Form onSubmit={(e) => { handleSubmitData(e) }} >

                                            <div className='section-padding'>
                                                <p class={isUserLogged ? "p-tag-font row-bottom_gap-small dark:text-[#F5F5F5]" : "above-title-text"}  >
                                                    {isUserLogged ? <>If you are experiencing technical difficulties, please send us an email.<br /> We will respond to you shortly.</> : "Not sure where to start"}
                                                </p>

                                                {
                                                    !isUserLogged &&
                                                    <h2
                                                        className={isUserLogged ? "font-big-h discover-heading" : "discover-heading"}
                                                    >Let's get a free Discovery Call</h2>
                                                }


                                                <div className="mb-3 input_group grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                                                    <input fluid className="mb-3 dark:bg-[#212121]"
                                                        required={true} placeholder='First name'
                                                        name='firstName'
                                                        value={contactData.firstName}
                                                        onChange={(e) => { handleChange(e) }}
                                                    />
                                                    <input fluid className="mb-3 dark:bg-[#212121]"
                                                        name='lastName'
                                                        required={true} placeholder='Last name'
                                                        value={contactData.lastName}
                                                        onChange={(e) => { handleChange(e) }}

                                                    />
                                                </div>
                                                <div className="mb-3 input_group grid gap-6 grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
                                                    <input fluid className="mb-3 dark:bg-[#212121]"
                                                        value={contactData.email}
                                                        onChange={(e) => { handleChange(e) }}
                                                        name='email'
                                                        type='email' required={true} placeholder='Email' />
                                                </div>

                                                <textarea className="dark:bg-[#212121]"
                                                    id='form-textarea-control-opinion'
                                                    control={TextArea}
                                                    name='message'
                                                    value={contactData.message}
                                                    onChange={(e) => { handleChange(e) }}
                                                    required={true}
                                                    // label='message'
                                                    placeholder='Type your message here...'
                                                />

                                            </div>


                                            <div className='text-center'>
                                                <Button secondary type='submit' >
                                                    Submit
                                                </Button>
                                            </div>

                                        </Form   >

                                    </div>

                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>


                </div>
            </section>
        </div>
    )
}

export default ContactDetails;