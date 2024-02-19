import * as Yup from "yup";
const FormData = Yup.object().shape({

    FromDate: Yup.string()
        .trim()
        .required("From Date is a Required Field"),
    // .matches(/^[0-9]{8}$/, "Invalid Date"),

    toDate: Yup.string()
        .trim()
        .required("To Date is a Required Field"),
    // .matches(/^[0-9]{8}$/, "Invalid Date"),


    fName: Yup.string()
        .trim()
        .required("First Name is a Required Field")
        .matches(/^[a-zA-Z ]*$/, "Name must contain only letters and spaces"),

    lName: Yup.string()
        .trim()
        .required("Last Name is a Required Field")
        .matches(/^[a-zA-Z ]*$/, "Name must contain only letters and spaces"),

    // >>>>>>>>>
    Gender: Yup.string().required("Gender is a Required Field").oneOf(["male", "female"], "Invalid gender"),

    userAge: Yup.string()
        .trim()
        .required("Enter age")
    // .matches(/^[0-9]$/, "Age must be a number")

    // .positive("User Age must be a positive number")
    // .integer("User Age must be an integer")
    // .min(18, "User Age must be at least 18 years old")
    // .max(120, "User Age cannot exceed 120 years"),
    ,
    Education: Yup.string()
        .required("Education Name is a Required Field")
        .min(6, "Length is short"),


    // >>>>>>>>>>>>
    MartialStatus: Yup.string()
        .required("MartialStatus is a Required Field"),


    GuardianName: Yup.string()
        .required("Guardian Name is a Required Field"),

    MotherTongue: Yup.string()
        .required("Mother Tongue is a Required Field"),

    Mobile_Number: Yup.string()
        .trim()
        .required("Mobile Number is a Required Field")
        .matches(/^[0-9]{10}$/, "Mobile Number must be a 2-digit number"),

    email: Yup.string().email().required("Email is a Required Field"),
    Address: Yup.string()
        .required("Address is a Required Field")
        .min(15, "Length is short"),

    RegularMedicine: Yup.string()
        .required("Password is a Required Field")
        .oneOf(["Yes", "No"], "Invalid gender"),


    briefData: Yup.string()

        .min(15, "Length is short")
        // .max(225, "ReferenceFrom Length is too Long")
        .required("Information is a Required Field."),
    ReferenceFrom: Yup.string()
        .required("ReferenceFrom is a Required Field").oneOf(["Friend", "News-Paper","TV","Lectures","Others"], "Invalid Reference "),

});
export { FormData }
