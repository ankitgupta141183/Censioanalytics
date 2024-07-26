import { Form } from "semantic-ui-react";

const GeneralSetting = (props) => {
    const { formData, handleInputChange } = props

    return (
        <div className="profile-popup-page-form h-100 demographics-header" style={{ marginRight: '0' }}>
            <div>

                <Form.Group widths='equal'>
                    <div className='field'>
                        <label htmlFor=""> First Name <span style={{ color: "red" }}>*</span></label>
                        <input placeholder='First Name'
                            maxLength={12}
                            type="text"
                            onChange={(e) => handleInputChange(e, "onlyAlphabets")}
                            value={formData?.firstName}
                            name="firstName"
                            required={true}
                            selection={"true"}
                            style={{ marginBottom: 2 }}
                        />

                    </div>
                    <div className='field'>
                        <label htmlFor=""> Last Name <span style={{ color: "red" }}>*</span></label>
                        <input
                            placeholder='Last Name'
                            maxLength={12}
                            name="lastName"
                            onChange={(e) => handleInputChange(e, "onlyAlphabets")}
                            value={formData?.lastName}
                            required={true}
                            selection={"true"}
                            style={{ marginBottom: 2 }}
                        />

                    </div>
                </Form.Group>

                <Form.Group widths='equal'>
                    <div className='field'>
                        <label>Username <span style={{ color: "red" }}>*</span></label>
                        <Form.Group widths='equal'>
                            <input
                                // fluid
                                type={"text"}
                                placeholder='UserName'
                                defaultValue={formData?.userName}
                                name="userName"
                                readOnly={true}
                                required={true}
                                style={{ marginBottom: 0, backgroundColor: "#e1e0e0", cursor: "none" }}
                            />
                        </Form.Group>
                    </div>
                    <div className='field'>
                        <label>Email <span style={{ color: "red" }}>*</span></label>
                        <Form.Group widths='equal'>
                            <input 
                            // fluid
                                placeholder='Email'
                                type="email"
                                defaultValue={formData?.email}
                                name="email"
                                required={true}
                                readOnly={true}
                               
                                style={{ marginBottom: 0, backgroundColor: "#e1e0e0", cursor: "none" }}
                            />
                        </Form.Group>
                    </div>
                </Form.Group>

                <Form.Group widths='equal'>
                    <div className='field'>
                        <label>Randomized ID <span style={{ color: "red" }}>*</span></label>
                        <Form.Group widths='equal'>
                            <input 
                            // fluid
                                maxLength={12}
                                minLength={10}
                                placeholder='XXXX XXXX XXXX'
                                defaultValue={formData?.Randomized_ID}
                                name="Randomized_ID"
                                required={true}
                                readOnly={true}
                                onChange= {()=>{}}
                                style={{ marginBottom: 0, backgroundColor: "#e1e0e0", cursor: "none" }}
                            />
                        </Form.Group>
                    </div>
                </Form.Group>
            </div>
        </div>
    )
}

export default GeneralSetting