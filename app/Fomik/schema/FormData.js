import * as Yup from "yup";
const FormData = Yup.object().shape({

    category: Yup.string()
        .required("Category is a required field"),

    Courses: Yup.string()
        .required("Courses is a required field")
        .notOneOf(["N/A"], "Please select courses"),



    firstName: Yup.string()
        .trim()
        .required("First name is a required field")
        .matches(/^[a-zA-Z ]*$/, "Name must contain only letters and spaces"),

    lastName: Yup.string()
        .trim()
        .required("Last name is a required field")
        .matches(/^[a-zA-Z ]*$/, "Name must contain only letters and spaces"),

    // >>>>>>>>>
    gender: Yup.string().required("Gender is a required field").oneOf(["Male", "Female"], "Invalid gender"),

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
        .required("Education name is a required field "),
    // .min(6, "To short"),


    // >>>>>>>>>>>>

    guardianName: Yup.string()
        .required("Father or spouse name is a required field"),



        type: Yup.string(),


    language: Yup.string()
        .required("Language is a required field"),
    Language: Yup.string(),

    martialStatus: Yup.string()
        .required("Marital status is a required field")
        .oneOf(["Single", "Married", "Widower", "Widow", "Separated", "Divorced"], "Invalid marital status"),













    mobileNumber: Yup.string()
        .trim()
        .required("Mobile number is a required field")
        .matches(/^[0-9]{10}$/, "Mobile number must be a 10-digit number"),

    eMail: Yup.string().email("Please enter a valid Email").required("Please enter a valid email"),
    address: Yup.string()
        .required("Address is a required field"),
    // .min(15, "Length is short"),


    // .oneOf(["yes", "no"], "Invalid regular Medicine"),


    brief: Yup.string()

        .min(2, "Length is short")
        // .max(225, "referenceFrom Length is too Long")
        .required("Brief information is a required field."),
    referenceFrom: Yup.string()
        .required("Reference from is a required field").oneOf(["Friend", "News-Paper", "TV", "Lectures", "Others"], "Invalid reference "),

    oldStuName: Yup.string(),
    firstCoursePlace: Yup.string(),
    dateFirstCourse: Yup.string(),
    dateLastCourse: Yup.string(),
    firstAsstTeacher: Yup.string(),
    lastCoursePlace: Yup.string(),
    lastAsstTeacher: Yup.string(),
    courseDetails: Yup.string().oneOf(["10-Days", "20-Days", "30-Days", "50-Days", "60-Days", "Self-Course", "Service", "Courses"], "Invalid input"),
    triedAnyPractise: Yup.string(),
    practiseRegularly: Yup.string().oneOf(["yes", "no", "Courses"], "Invalid input"),




    FitnessCertificate: Yup.string(),
    state: Yup.string().required("City is a required Field "),
    // .oneOf(["Kolkata", "Bikaner", "Other"], "Invalid input"),




    personName: Yup.string(),
    personRelation: Yup.string(),

    courseDone: Yup.string().oneOf(["yes", "no"], "Invalid course done yes or no"),

    // relation: Yup.string(),

       relation: Yup.string()
        .when(['courseDone'], ([courseDone], schema) => {
            if (courseDone === "yes")
                return schema
                    .required('Family person`s relation is required')
            return
        }),


    designation: Yup.string(),
    companyName: Yup.string(),
    companyAddress: Yup.string(),
    inPastOne: Yup.string(),
    inPresentOne: Yup.string().required('Physical Ailment in present field is required'),
    inPastTwo: Yup.string(),
    inPresentTwo: Yup.string(),

    otherState: Yup.string()
        .when(['state'], ([state], schema) => {
            if (state === "Other")
                return schema
                    .required('Other city is required')
            return
        }),

    FitnessCertificate: Yup.string()
        .when(['inPastTwo', 'inPresentTwo'], ([inPastTwo, inPresentTwo], schema) => {

            if (inPresentTwo === "Yes" || inPastTwo === "Yes")
                return schema
                    .required('Fitness certificate is required').oneOf(["Yes", "No"], "Invalid value for Fitness Certificate")
            return
        }),



    regularMedicine: Yup.string().when('FitnessCertificate', ([FitnessCertificate], schema) => {

        if (FitnessCertificate === "Yes")
            return schema
                .required("Please select if taking any medicie regular")
        return
    }),


    medicineName: Yup.string().when('FitnessCertificate', ([FitnessCertificate], schema) => {

        if (FitnessCertificate === "Yes")
            return schema
                .required("Medicine name is a required field")
        return
    }),
    medicineDose: Yup.string().when('FitnessCertificate', ([FitnessCertificate], schema) => {

        if (FitnessCertificate === "Yes")
            return schema
                .required("Medicine dose is a required field")
        return
    }),




    medicineDose: Yup.string().when('FitnessCertificate', ([FitnessCertificate], schema) => {

        if (FitnessCertificate === "Yes")
            return schema
                .required("Medicine dose is a required field")
        return
    }),

    changeInYourSelf: Yup.string().when('practiseRegularly', ([practiseRegularly], schema) => {
        if (practiseRegularly === "yes")
            return schema.required("Required field")
        return
    }),
    dailyHours: Yup.string().when('practiseRegularly', ([practiseRegularly], schema) => {
        if (practiseRegularly === "yes")
            return schema.required("Required field")
        return
    }),
    reason: Yup.string().when('practiseRegularly', ([practiseRegularly], schema) => {
        if (practiseRegularly === "yes")
            return schema.required("Required field")
        return
    }),

    
});
export { FormData }
