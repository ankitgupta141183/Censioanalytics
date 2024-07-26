const Years = () => {
    var year = [];
    for (let i = 1947; i <= 2010; i++) {
        year.push(i)
    }
    return year;
}
const Yearofbirthoption = Years()
const enrolmentOptions = ["Select", "High school student", "College Freshman", "College Sophomore", "College Junior", "College Senior", "Graduate school (MS, MA, JD, MBA, MD, Ph.D.)"]
const jobOptions = ["Select", "Internship", "Employed Full-Time", "Employed Part-time", "Not working"]
const eduOptions = ["Select", "12th grade or less", "High school graduate or GED", "Some college/AA degree/Technical school training", "College graduate (BA or BS)", "Graduate school degree: Master’s or Doctorate degree (MD, PhD, JD)", "DK/NA"]
const isBusiness = ["Select", "I currently own a business", "I plan to start a business in the next 5 years", "N/A"]
const genderOptions = ["Select", "Female", "Male", "Non-binary", "Prefer not to respond"]
const businessPlanOptions = ["Select", "Yes", "No"]
const bornOption = ["Select", "Yes", "No", "N/A"]
const familyOptions = ['<$27,000', '$27,000 to <$52,000', '$52,000 to <$85,000', '$85,000 to <$140,000', '$140,000 and above', 'Prefer not to respond']
const parentsGraduateOptions = ['No', 'Yes, both parents', 'Yes, father only', 'Yes, mother only', 'Don’t know']
const raceOptions = ["Select", "White", "Black or African American", "American Indian or Alaska Native", "Asian or Asian American", "Native Hawaiian or Other Pacific Islander", "Mixed Race", "Prefer not to respond"]
const newGenderOptions = ["Select", "Female", "Male"]
const newRaceOptions = ["Select", "White", "Black or African American", "American Indian or Alaska Native", "Asian", "Native Hawaiian or Other Pacific Islander"]
const gamesOption = ["Game 1", "Game 2", "Game 3", "Game 4", "Game 5",]

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
    Randomized_ID: "",
    UDC: false,
    familyIncome: "",
    isParentsGraduate: ""
}

let sharingDetails = {
    mail: "",
    subject: "",
    message: "",
    base64Url: "",
    fileName: ""
}

let adminFilterDropDown = {
    race: "",
    enrollment: "",
    gender: "",
    date: "",
}

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`



function formatDateToCustomString(isoDate) {
    const date = new Date(isoDate);
    const day = date.getUTCDate();
    const monthIndex = date.getUTCMonth();
    const year = date.getUTCFullYear();

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const formattedDate = `${day} ${months[monthIndex]} ${year}`;
    return formattedDate;
}

const checkFilterDate = (inputDate) => {
    // Parse the inputDate into a Date object
    const dateObj = new Date(inputDate);

    // Get the day, month, and year components
    const day = dateObj.getDate();
    const monthIndex = dateObj.getMonth(); // Month index (0-11)
    const year = dateObj.getFullYear();

    // Array of month names
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Get the month name based on the month index
    const monthName = monthNames[monthIndex];

    // Create the desired formatted date string
    return `${day} ${monthName} ${year}`;
  }


let ProfileOptions = {
    genderOptions, Yearofbirthoption, raceOptions,
    bornOption, enrolmentOptions, jobOptions, eduOptions,
    isBusiness, businessPlanOptions, FormFieldValue,
    familyOptions, parentsGraduateOptions, sharingDetails, adminFilterDropDown,
    formattedDate, newGenderOptions, newRaceOptions,
    gamesOption, formatDateToCustomString , checkFilterDate
}

export default ProfileOptions