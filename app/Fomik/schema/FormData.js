import * as Yup from "yup";
const FormData = Yup.object().shape({

    category: Yup.string()
        .required("Category is a Required Field"),

    Courses: Yup.string()
        .required("Courses is a Required Field")
        .notOneOf(["N/A"], "Please Select Courses"),



    firstName: Yup.string()
        .trim()
        .required("First Name is a Required Field")
        .matches(/^[a-zA-Z ]*$/, "Name must contain only letters and spaces"),

    lastName: Yup.string()
        .trim()
        .required("Last Name is a Required Field")
        .matches(/^[a-zA-Z ]*$/, "Name must contain only letters and spaces"),

    // >>>>>>>>>
    gender: Yup.string().required("Gender is a Required Field").oneOf(["male", "female"], "Invalid gender"),

    age: Yup.string()
        .trim()
        .required("Enter age")
        .matches(/^[1-9][0-9]?$/, "Age must be a number between 1 and 100")
        .min(1, "Age must be between 1 and 100")
        .max(100, "Age must be between 1 and 100"),
    // .matches(/^[0-9]$/, "Age must be a number")

    // .positive("User Age must be a positive number")
    // .integer("User Age must be an integer")
    // .min(18, "User Age must be at least 18 years old")
    // .max(120, "User Age cannot exceed 120 years"),
    
    education: Yup.string()
        .required("education Name is a Required Field"),
    // .min(6, "To short"),


    // >>>>>>>>>>>>

    guardianName: Yup.string()
        .required("Guardian Name is a Required Field"),






    language: Yup.string()
        .required("language is a Required Field"),
    Language: Yup.string(),

    martialStatus: Yup.string()
        .required("martialStatus is a Required Field"),
    // .oneOf(["single", "married", "windower", "widow", "separated", "divorced"], "Invalid martial Status"),













    mobileNumber: Yup.string()
        .trim()
        .required("Mobile Number is a Required Field")
        .matches(/^[0-9]{10}$/, "Mobile Number must be a 10-digit number"),

    eMail: Yup.string().email().required("Email is a Required Field"),
    address: Yup.string()
        .required("address is a Required Field"),
    // .min(15, "Length is short"),

    regularMedicine: Yup.string()
        .required("regularMedicine is a Required Field"),
    // .oneOf(["yes", "no"], "Invalid regular Medicine"),


    brief: Yup.string()

        .min(15, "Length is short")
        // .max(225, "referenceFrom Length is too Long")
        .required("Brief Information is a Required Field."),
    referenceFrom: Yup.string()
        .required("referenceFrom is a Required Field").oneOf(["Friend", "News-Paper", "TV", "Lectures", "Others"], "Invalid Reference "),

    oldStuName: Yup.string(),
    firstCoursePlace: Yup.string(),
    dateFirstCourse: Yup.string(),
    dateLastCourse: Yup.string(),
    firstAsstTeacher: Yup.string(),
    lastCoursePlace: Yup.string(),
    lastAsstTeacher: Yup.string(),
    courseDetails: Yup.string().oneOf(["10-Days", "20-Days", "30-Days", "50-Days", "60-Days", "Self-Course", "Service", "Courses"], "Invalid Input"),
    triedAnyPractise: Yup.string(),
    practiseRegularly: Yup.string().oneOf(["yes", "no", "Courses"], "Invalid Input"),
    dailyHours: Yup.string(),
    reason: Yup.string(),
    changeInYourSelf: Yup.string(),




    personName: Yup.string(),
    personRelation: Yup.string(),

    courseDone: Yup.string().oneOf(["yes", "no"], "Invalid course Done yes or no"),

    relation: Yup.string(),


    designation: Yup.string(),
    companyName: Yup.string(),
    companyAddress: Yup.string(),


    inPastOne: Yup.string(),
    inPresentOne: Yup.string(),
    inPastTwo: Yup.string(),
    inPresentTwo: Yup.string(),
    medicineName: Yup.string(),
    medicineDose: Yup.string(),

});
export { FormData }
