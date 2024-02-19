import * as Yup from "yup";
const FormData2 = Yup.object().shape({
    // initialValues={{ FromDate: "", toDate: "", Gender: "", userAge: "", MartialStatus: ""}}


    FromDate: Yup.string()
        .trim()
        .required("From Date is a Required Field"),
    // .matches(/^[0-9]{8}$/, "Invalid Date"),

    toDate: Yup.string()
        .trim()
        .required("To Date is a Required Field"),
    // .matches(/^[0-9]{8}$/, "Invalid Date"),




});
export { FormData2 }
