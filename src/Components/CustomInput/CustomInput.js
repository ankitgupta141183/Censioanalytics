import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Form } from "semantic-ui-react";
import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from "react-datepicker";
import './customInput.scss';

export default function CommonInput(props) {
    const  {type="text", className , onChange= ()=>{}, fluid="true", onFocus= () =>{} ,
    readOnly, placeholder, value ,name ,error , required ,style , onBlur=() =>{}} = props
    return (
        // <div className={divClass}>
            <Form.Input
             fluid={fluid}
             type={type} 
             className={className} 
             placeholder={placeholder}
             value={value}
             name={name}
             error={error}
             required={required}
             style={{style}}
             onChange={onChange}
             onBlur={onBlur}
             readOnly={readOnly}
             onFocus={onFocus}
             />
            // <span>{placeholder}</span>
        // </div>
    );
}
