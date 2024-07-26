const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i  // eslint-disable-line
);

const validateAlphabate = /^[A-Za-z]+$/;
const validdateNumber = /^[0-9]+$/;
const validationPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

let ValidRegex = {validEmailRegex ,validateAlphabate , validationPassword, validdateNumber }

export default ValidRegex
