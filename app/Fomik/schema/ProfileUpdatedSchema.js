import * as Yup from "yup";
const ProfileUpdatedSchema = Yup.object().shape({
  fName: Yup.string().required("First Name is a Required Field"),
  lName: Yup.string().required("Last Name is a Required Field"),
  // email: Yup.string().email().required("Email is a Required Field"),

  userAge: Yup.number()
  .required("Age is a Required Field")
  .integer("Age must be an integer")
  .min(18, "You must be at least 18 years old")
  .max(120, "Age must be less than or equal to 120"),


  // phoneNo: Yup.string()
  //   .required("Phone Number is a Required Field")
  //   .matches(/^[0-9]{10}$/, "Invalid phone number. Must be 10 digits."),


});
export { ProfileUpdatedSchema }

