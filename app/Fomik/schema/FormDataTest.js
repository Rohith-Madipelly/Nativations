import * as Yup from "yup";
const FormDataTest = Yup.object().shape({
    // initialValues={{ FromDate: "", toDate: "", Gender: "", userAge: "", MartialStatus: ""}}


    // >>>>>>>>>
    // gender: Yup.string().required("Gender is a Required Field").oneOf(["male", "female"], "Invalid gender"),


    category: Yup.string().required("Category is a Required Field").oneOf(["For New Students","For Old Students","For Children/Teens","For Executives"], "Invalid gender"),




});
export { FormDataTest }
