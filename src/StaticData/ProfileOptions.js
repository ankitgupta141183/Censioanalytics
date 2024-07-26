const Years = () => {
    var year = [];
    for (let i = 1947; i <= 2010; i++) {
        year.push(i)
    }
    return year;
}
const Yearofbirthoption = Years()
const raceOptions = ["Select", "White", "Black or African American", "American Indian or Alaska Native", "Asian", "Native Hawaiian or Other Pacific Islander", "Other"]
const enrolmentOptions = ["Select", "High school student", "College Freshman", "College Sophomore", "College Junior", "College Senior", "Graduate school (MS, MA, JD, MBA, MD, Ph.D.)"]
const jobOptions = ["Select", "Full-Time", "Part-Time", "Not-Working", "Internship"]
const eduOptions = ["Select", "12th grade or less", "High school graduate or GED", "Some college/AA degree/Technical school training", "College graduate (BA or BS)", "Graduate school degree: Master’s or Doctorate degree (MD, PhD, JD)", "DK/NA"]
const isBusiness = ["Select", "I currently own a business", "I plan to start a business in the next 5 years", "N/A"]
const genderOptions = ["Select", "Female", "Male", "Other", "N/A"]
const businessPlanOptions = ["Select", "Yes", "No"]
const bornOption = ["Select", "Yes", "No", "N/A"]

const FormFieldValue = {
    firstName: "",
    lastName: "",
    email: "",
    organisation_name: "",
    password: "",
    confirmPassword: "",
    gender: "",
    country: "United States",
    Race: "",
    Enrollment: "",
    Job: "",
    Own_Business: "",
    born_usa: "",
    Mother_Education_Level: "",
    Father_Education_Level: "",
    Zip_Code: "",
    isChecked: false,
    year_of_birth: "",
    role: "",
    Randomized_ID: ""
}

let ProfileOptions = {
    genderOptions, Yearofbirthoption, raceOptions,
    bornOption, enrolmentOptions, jobOptions, eduOptions , 
    isBusiness , businessPlanOptions , FormFieldValue
}

export default ProfileOptions