import React, { Component } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Form } from "semantic-ui-react";
import "../../App.scss";

export default class PhoneInputField extends Component {
  render() {
    return (
      <Form.Field error={this.props.error}>
        {/* <label>Mobile Number</label> */}
        <PhoneInput
         className="phone-input-style"
        //  country={"in"}
         value={this.props.value}
         onChange={this.props._handlePhoneNumber}
         country={'us'}
         inputProps={{
           name: "phone",
           required: true,
         }}
/>
      </Form.Field>
    );
  }
}
