export function checkRegistrationCompleted(isRegistered) {
    return {
        type: "REGISTER_COMPLETED",
        payload: isRegistered
    }
}

export function registerSecondForm(isReg) {
    return {
        type: "REGISTER_SECOND",
        payload: isReg
    }
}

export function emailExist(payload) {

    return {
        type: "EMAIL_EXIST",
        payload: payload
    }
}

export function SignatureExpired(payload){
    return {
        type : "SIGNATURE_EXPIRED",
        payload
    }
}